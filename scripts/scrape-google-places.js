#!/usr/bin/env node

/**
 * Google Places API (New) Dental Clinic Scraper for Dubai
 * Comprehensive search across multiple queries to find ALL dental clinics
 */

const fs = require('fs').promises;
const path = require('path');

const API_KEY = 'AIzaSyA7sFLszMz62PeGJVjT8y12BUEDWc4LjTE';
const BASE_URL = 'https://places.googleapis.com/v1';
const DELAY_MS = 200; // Rate limiting delay

// Comprehensive search queries
const SEARCH_QUERIES = [
  // General queries
  'dental clinic Dubai',
  'dentist Dubai',
  'dental center Dubai',
  'dental hospital Dubai',
  'orthodontist Dubai',
  'cosmetic dentist Dubai',
  'pediatric dentist Dubai',
  
  // Area-specific queries
  'dental clinic Dubai Marina',
  'dental clinic JBR',
  'dental clinic Jumeirah Beach Residence',
  'dental clinic JLT',
  'dental clinic Jumeirah Lakes Towers',
  'dental clinic Business Bay',
  'dental clinic Downtown Dubai',
  'dental clinic DIFC',
  'dental clinic Jumeirah',
  'dental clinic Al Barsha',
  'dental clinic Deira',
  'dental clinic Bur Dubai',
  'dental clinic Karama',
  'dental clinic Al Qusais',
  'dental clinic Silicon Oasis',
  'dental clinic International City',
  'dental clinic Palm Jumeirah',
  'dental clinic JVC',
  'dental clinic Jumeirah Village Circle',
  'dental clinic Sports City',
  'dental clinic Motor City',
  'dental clinic Dubai Hills',
  'dental clinic Arabian Ranches',
  'dental clinic Mirdif',
  'dental clinic Al Nahda',
  'dental clinic Discovery Gardens',
  'dental clinic Tecom',
  'dental clinic Sheikh Zayed Road',
  'dental clinic Satwa',
  'dental clinic Oud Metha',
  'dental clinic Healthcare City',
  'dental clinic Dubai Festival City',
  'dental clinic Al Rashidiya',
  'dental clinic Al Warqa',
  'dental clinic Muhaisnah',
  'dental clinic Dubai Investment Park',
  'dental clinic Jebel Ali',
];

// Dubai areas for extraction
const DUBAI_AREAS = [
  'Dubai Marina', 'JBR', 'Jumeirah Beach Residence', 'JLT', 'Jumeirah Lakes Towers',
  'Business Bay', 'Downtown', 'Downtown Dubai', 'DIFC', 'Jumeirah', 'Jumeirah 1',
  'Jumeirah 2', 'Jumeirah 3', 'Al Barsha', 'Deira', 'Bur Dubai', 'Karama',
  'Al Qusais', 'Silicon Oasis', 'Dubai Silicon Oasis', 'International City',
  'Palm Jumeirah', 'JVC', 'Jumeirah Village Circle', 'Sports City', 'Motor City',
  'Dubai Hills', 'Arabian Ranches', 'Mirdif', 'Al Nahda', 'Discovery Gardens',
  'Tecom', 'Sheikh Zayed Road', 'Satwa', 'Oud Metha', 'Healthcare City',
  'Dubai Healthcare City', 'Festival City', 'Dubai Festival City', 'Al Rashidiya',
  'Al Warqa', 'Muhaisnah', 'Dubai Investment Park', 'Jebel Ali', 'Marina',
  'The Greens', 'The Views', 'Emirates Hills', 'Springs', 'Meadows',
  'Al Safa', 'Al Wasl', 'Umm Suqeim', 'Barsha Heights', 'Media City',
  'Internet City', 'Knowledge Village', 'Academic City'
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Text Search API call
 */
async function textSearch(query, pageToken = null) {
  const url = `${BASE_URL}/places:searchText`;
  
  const body = {
    textQuery: query,
    pageSize: 20,
    ...(pageToken && { pageToken })
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': [
      'places.id',
      'places.displayName',
      'places.formattedAddress',
      'places.rating',
      'places.userRatingCount',
      'places.nationalPhoneNumber',
      'places.websiteUri',
      'places.regularOpeningHours',
      'places.location',
      'places.googleMapsUri',
      'places.types',
      'places.photos',
      'nextPageToken'
    ].join(',')
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Text Search failed: ${response.status} - ${error}`);
  }

  return await response.json();
}

/**
 * Get Place Details (for reviews)
 */
async function getPlaceDetails(placeId) {
  const url = `${BASE_URL}/places/${placeId}`;
  
  const headers = {
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': [
      'id',
      'reviews'
    ].join(',')
  };

  const response = await fetch(url, { headers });

  if (!response.ok) {
    console.warn(`Failed to get reviews for ${placeId}: ${response.status}`);
    return null;
  }

  return await response.json();
}

/**
 * Extract area from address
 */
function extractArea(address) {
  if (!address) return 'Dubai';
  
  const addressLower = address.toLowerCase();
  
  for (const area of DUBAI_AREAS) {
    if (addressLower.includes(area.toLowerCase())) {
      return area;
    }
  }
  
  return 'Dubai';
}

/**
 * Infer services from name and types
 */
function inferServices(name, types = []) {
  const services = new Set(['General Dentistry']);
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('ortho')) {
    services.add('Orthodontics');
  }
  if (nameLower.includes('cosmetic')) {
    services.add('Cosmetic Dentistry');
  }
  if (nameLower.includes('implant')) {
    services.add('Dental Implants');
  }
  if (nameLower.includes('pediatric') || nameLower.includes('kids') || nameLower.includes('children')) {
    services.add('Pediatric Dentistry');
  }
  if (nameLower.includes('whitening')) {
    services.add('Teeth Whitening');
  }
  if (nameLower.includes('invisalign')) {
    services.add('Invisalign');
  }
  
  // Add common services based on rating/size
  services.add('Teeth Whitening');
  services.add('Root Canal');
  
  return Array.from(services);
}

/**
 * Generate slug from name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Format opening hours
 */
function formatHours(regularOpeningHours) {
  if (!regularOpeningHours || !regularOpeningHours.weekdayDescriptions) {
    return 'Hours vary - call for details';
  }
  
  const days = regularOpeningHours.weekdayDescriptions;
  
  // Try to find a pattern (e.g., Mon-Sat)
  if (days.length >= 6) {
    const firstDay = days[0];
    const match = firstDay.match(/: (.+)$/);
    if (match) {
      return `Mon-Sat: ${match[1]}`;
    }
  }
  
  return days[0] || 'Hours vary - call for details';
}

/**
 * Transform Google Place to our format
 */
async function transformPlace(place, withReviews = true) {
  const name = place.displayName?.text || 'Unknown Clinic';
  const address = place.formattedAddress || '';
  
  let reviews = [];
  if (withReviews && place.id) {
    try {
      await delay(DELAY_MS);
      const details = await getPlaceDetails(place.id);
      if (details && details.reviews) {
        reviews = details.reviews.slice(0, 5).map(r => ({
          author: r.authorAttribution?.displayName || 'Anonymous',
          rating: r.rating || 0,
          text: r.text?.text || '',
          time: r.publishTime || ''
        }));
      }
    } catch (error) {
      console.warn(`Failed to get reviews for ${name}: ${error.message}`);
    }
  }
  
  return {
    name,
    slug: generateSlug(name),
    address,
    area: extractArea(address),
    phone: place.nationalPhoneNumber || '',
    website: place.websiteUri || '',
    rating: place.rating || 0,
    reviewCount: place.userRatingCount || 0,
    services: inferServices(name, place.types),
    hours: formatHours(place.regularOpeningHours),
    description: `Professional dental care in ${extractArea(address)} offering comprehensive dental services.`,
    lat: place.location?.latitude || 0,
    lng: place.location?.longitude || 0,
    placeId: place.id || '',
    googleMapsUrl: place.googleMapsUri || '',
    reviews,
    types: place.types || [],
    photos: (place.photos || []).slice(0, 3).map(p => p.name)
  };
}

/**
 * Main scraping function
 */
async function scrapeAllClinics() {
  console.log('🦷 Starting comprehensive dental clinic scrape for Dubai...\n');
  
  const allPlaces = new Map(); // Deduplicate by place_id
  let totalQueries = 0;
  let totalResults = 0;
  
  for (const query of SEARCH_QUERIES) {
    console.log(`\n🔍 Searching: "${query}"`);
    
    try {
      let pageToken = null;
      let pageNum = 1;
      
      do {
        await delay(DELAY_MS);
        
        const result = await textSearch(query, pageToken);
        totalQueries++;
        
        if (result.places && result.places.length > 0) {
          console.log(`   Page ${pageNum}: Found ${result.places.length} places`);
          
          for (const place of result.places) {
            if (place.id && !allPlaces.has(place.id)) {
              allPlaces.set(place.id, place);
              totalResults++;
            }
          }
          
          pageToken = result.nextPageToken;
          pageNum++;
        } else {
          console.log(`   No results found`);
          break;
        }
        
      } while (pageToken);
      
      console.log(`   Total unique clinics so far: ${allPlaces.size}`);
      
    } catch (error) {
      console.error(`   ❌ Error searching "${query}": ${error.message}`);
    }
  }
  
  console.log(`\n✅ Scraping complete!`);
  console.log(`   Total queries: ${totalQueries}`);
  console.log(`   Total results: ${totalResults}`);
  console.log(`   Unique clinics: ${allPlaces.size}`);
  
  // Transform all places
  console.log(`\n🔄 Transforming ${allPlaces.size} clinics and fetching reviews...`);
  const transformedClinics = [];
  let count = 0;
  
  for (const [placeId, place] of allPlaces) {
    count++;
    if (count % 10 === 0) {
      console.log(`   Processed ${count}/${allPlaces.size} clinics...`);
    }
    
    try {
      const transformed = await transformPlace(place, true);
      transformedClinics.push(transformed);
    } catch (error) {
      console.error(`   ❌ Error transforming ${place.displayName?.text}: ${error.message}`);
    }
  }
  
  // Sort by review count (descending)
  transformedClinics.sort((a, b) => b.reviewCount - a.reviewCount);
  
  return {
    rawPlaces: Array.from(allPlaces.values()),
    transformedClinics,
    stats: {
      totalQueries,
      totalResults,
      uniqueClinics: allPlaces.size,
      scrapedAt: new Date().toISOString()
    }
  };
}

/**
 * Main execution
 */
async function main() {
  try {
    const result = await scrapeAllClinics();
    
    // Save raw data
    const rawPath = path.join(__dirname, '../data/clinics-google.json');
    await fs.writeFile(rawPath, JSON.stringify(result.rawPlaces, null, 2));
    console.log(`\n💾 Saved raw data: ${rawPath}`);
    console.log(`   ${result.rawPlaces.length} places`);
    
    // Save transformed data
    const transformedPath = path.join(__dirname, '../data/clinics.json');
    const output = {
      clinics: result.transformedClinics,
      _meta: result.stats
    };
    await fs.writeFile(transformedPath, JSON.stringify(output, null, 2));
    console.log(`\n💾 Saved transformed data: ${transformedPath}`);
    console.log(`   ${result.transformedClinics.length} clinics`);
    
    // Print summary
    console.log(`\n📊 Summary:`);
    console.log(`   Total unique clinics: ${result.stats.uniqueClinics}`);
    console.log(`   With reviews: ${result.transformedClinics.filter(c => c.reviews.length > 0).length}`);
    console.log(`   With phone: ${result.transformedClinics.filter(c => c.phone).length}`);
    console.log(`   With website: ${result.transformedClinics.filter(c => c.website).length}`);
    console.log(`   Average rating: ${(result.transformedClinics.reduce((sum, c) => sum + c.rating, 0) / result.transformedClinics.length).toFixed(2)}`);
    
    // Top 10 by reviews
    console.log(`\n🏆 Top 10 by review count:`);
    result.transformedClinics.slice(0, 10).forEach((c, i) => {
      console.log(`   ${i + 1}. ${c.name} (${c.reviewCount} reviews, ${c.rating}★)`);
    });
    
    console.log(`\n✅ All done!`);
    
  } catch (error) {
    console.error(`\n❌ Fatal error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
