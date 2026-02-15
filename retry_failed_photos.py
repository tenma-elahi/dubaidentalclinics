#!/usr/bin/env python3
"""Retry failed photo downloads with rate limit handling."""

import json
import urllib.request
import urllib.error
from pathlib import Path
from typing import List, Dict
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

API_KEY = "AIzaSyA7sFLszMz62PeGJVjT8y12BUEDWc4LjTE"
BASE_URL = "https://places.googleapis.com/v1"
MAX_WIDTH = 800
CONCURRENT_DOWNLOADS = 3  # Reduced to avoid rate limits
DELAY_BETWEEN_BATCHES = 2  # Seconds

def load_clinics() -> List[Dict]:
    """Load clinics from JSON file."""
    with open('data/clinics.json', 'r') as f:
        data = json.load(f)
    return data['clinics']

def get_existing_images() -> set:
    """Get set of existing image filenames (without extension)."""
    images_dir = Path('public/images/clinics')
    if not images_dir.exists():
        return set()
    return {f.stem for f in images_dir.glob('*.jpg')}

def get_missing_clinics(clinics: List[Dict], existing: set) -> List[Dict]:
    """Get list of clinics that need photos downloaded."""
    missing = []
    for clinic in clinics:
        slug = clinic.get('slug')
        photos = clinic.get('photos', [])
        
        if slug and photos and slug not in existing:
            missing.append({
                'slug': slug,
                'name': clinic.get('name'),
                'photo_ref': photos[0]  # Take first photo
            })
    return missing

def download_photo(clinic: Dict) -> Dict:
    """Download a single photo with retry logic."""
    slug = clinic['slug']
    photo_ref = clinic['photo_ref']
    name = clinic['name']
    
    # Construct URL
    url = f"{BASE_URL}/{photo_ref}/media?maxWidthPx={MAX_WIDTH}&key={API_KEY}"
    output_path = f"public/images/clinics/{slug}.jpg"
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            # Add delay before each attempt (except first)
            if attempt > 0:
                time.sleep(2 ** attempt)  # Exponential backoff: 2s, 4s
            
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=30) as response:
                content = response.read()
                
                # Save the image
                with open(output_path, 'wb') as f:
                    f.write(content)
                
                return {
                    'status': 'success',
                    'slug': slug,
                    'name': name,
                    'size': len(content),
                    'attempts': attempt + 1
                }
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < max_retries - 1:
                print(f"   Rate limited on {slug}, waiting before retry {attempt + 2}/{max_retries}...")
                continue
            return {
                'status': 'failed',
                'slug': slug,
                'name': name,
                'error': f"HTTP {e.code}"
            }
        except Exception as e:
            if attempt < max_retries - 1:
                continue
            return {
                'status': 'failed',
                'slug': slug,
                'name': name,
                'error': str(e)
            }
    
    return {
        'status': 'failed',
        'slug': slug,
        'name': name,
        'error': 'Max retries exceeded'
    }

def download_all_photos(missing_clinics: List[Dict]) -> List[Dict]:
    """Download all missing photos with concurrency control and rate limiting."""
    results = []
    
    # Process in batches to control rate
    batch_size = CONCURRENT_DOWNLOADS
    for i in range(0, len(missing_clinics), batch_size):
        batch = missing_clinics[i:i+batch_size]
        
        with ThreadPoolExecutor(max_workers=CONCURRENT_DOWNLOADS) as executor:
            futures = [executor.submit(download_photo, clinic) for clinic in batch]
            
            for future in as_completed(futures):
                result = future.result()
                results.append(result)
        
        # Progress update
        processed = min(i + batch_size, len(missing_clinics))
        print(f"Progress: {processed}/{len(missing_clinics)} photos processed...")
        
        # Delay between batches (except last batch)
        if i + batch_size < len(missing_clinics):
            time.sleep(DELAY_BETWEEN_BATCHES)
    
    return results

def main():
    print("🔍 Loading clinics data...")
    clinics = load_clinics()
    
    print("\n📁 Checking existing images...")
    existing = get_existing_images()
    print(f"   Existing images: {len(existing)}")
    
    print("\n🔎 Finding remaining missing photos...")
    missing = get_missing_clinics(clinics, existing)
    print(f"   Still missing: {len(missing)}")
    
    if not missing:
        print("\n✅ All photos already downloaded!")
        return
    
    print(f"\n⬇️  Retrying {len(missing)} photos ({CONCURRENT_DOWNLOADS} concurrent, with delays)...")
    results = download_all_photos(missing)
    
    # Summary
    successful = [r for r in results if r['status'] == 'success']
    failed = [r for r in results if r['status'] == 'failed']
    
    print(f"\n{'='*60}")
    print(f"✅ Successfully downloaded: {len(successful)}")
    print(f"❌ Failed: {len(failed)}")
    
    if failed and len(failed) <= 20:
        print("\n❌ Failed downloads:")
        for f in failed:
            print(f"   - {f['slug']}: {f.get('error', 'Unknown error')}")
    elif failed:
        print(f"\n❌ First 20 failures:")
        for f in failed[:20]:
            print(f"   - {f['slug']}: {f.get('error', 'Unknown error')}")
        print(f"   ... and {len(failed) - 20} more")
    
    # Calculate total size
    total_mb = sum(r.get('size', 0) for r in successful) / (1024 * 1024)
    print(f"\n📦 Total downloaded: {total_mb:.2f} MB")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
