#!/usr/bin/env python3
"""Download missing clinic photos from Google Places API."""

import json
import urllib.request
import urllib.error
from pathlib import Path
from typing import List, Dict
from concurrent.futures import ThreadPoolExecutor, as_completed

API_KEY = "AIzaSyA7sFLszMz62PeGJVjT8y12BUEDWc4LjTE"
BASE_URL = "https://places.googleapis.com/v1"
MAX_WIDTH = 800
CONCURRENT_DOWNLOADS = 10

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
    """Download a single photo."""
    slug = clinic['slug']
    photo_ref = clinic['photo_ref']
    name = clinic['name']
    
    # Construct URL
    url = f"{BASE_URL}/{photo_ref}/media?maxWidthPx={MAX_WIDTH}&key={API_KEY}"
    output_path = f"public/images/clinics/{slug}.jpg"
    
    try:
        # Download with timeout
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
                'size': len(content)
            }
    except urllib.error.HTTPError as e:
        return {
            'status': 'failed',
            'slug': slug,
            'name': name,
            'error': f"HTTP {e.code}"
        }
    except Exception as e:
        return {
            'status': 'failed',
            'slug': slug,
            'name': name,
            'error': str(e)
        }

def download_all_photos(missing_clinics: List[Dict]) -> List[Dict]:
    """Download all missing photos with concurrency control."""
    results = []
    
    with ThreadPoolExecutor(max_workers=CONCURRENT_DOWNLOADS) as executor:
        # Submit all tasks
        future_to_clinic = {
            executor.submit(download_photo, clinic): clinic 
            for clinic in missing_clinics
        }
        
        # Process as they complete
        for i, future in enumerate(as_completed(future_to_clinic), 1):
            result = future.result()
            results.append(result)
            
            # Progress updates every 50 or at the end
            if i % 50 == 0 or i == len(missing_clinics):
                print(f"Progress: {i}/{len(missing_clinics)} photos processed...")
    
    return results

def main():
    print("🔍 Loading clinics data...")
    clinics = load_clinics()
    print(f"   Total clinics: {len(clinics)}")
    
    print("\n📁 Checking existing images...")
    existing = get_existing_images()
    print(f"   Existing images: {len(existing)}")
    
    print("\n🔎 Finding missing photos...")
    missing = get_missing_clinics(clinics, existing)
    print(f"   Clinics with photos: {sum(1 for c in clinics if c.get('photos'))}")
    print(f"   Missing images: {len(missing)}")
    
    if not missing:
        print("\n✅ All photos already downloaded!")
        return
    
    print(f"\n⬇️  Downloading {len(missing)} photos ({CONCURRENT_DOWNLOADS} concurrent)...")
    results = download_all_photos(missing)
    
    # Summary
    successful = [r for r in results if r['status'] == 'success']
    failed = [r for r in results if r['status'] == 'failed']
    
    print(f"\n{'='*60}")
    print(f"✅ Successfully downloaded: {len(successful)}")
    print(f"❌ Failed: {len(failed)}")
    
    if failed and len(failed) <= 10:
        print("\n❌ Failed downloads:")
        for f in failed:
            print(f"   - {f['slug']}: {f.get('error', 'Unknown error')}")
    elif failed:
        print(f"\n❌ First 10 failures:")
        for f in failed[:10]:
            print(f"   - {f['slug']}: {f.get('error', 'Unknown error')}")
        print(f"   ... and {len(failed) - 10} more")
    
    # Calculate total size
    total_mb = sum(r.get('size', 0) for r in successful) / (1024 * 1024)
    print(f"\n📦 Total downloaded: {total_mb:.2f} MB")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
