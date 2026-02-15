const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const clinicsData = require('../data/clinics.json');
const clinics = clinicsData.clinics;

const OUTPUT_DIR = path.join(__dirname, '../public/images/clinics');
const VIEWPORT_WIDTH = 1200;
const VIEWPORT_HEIGHT = 630;
const TIMEOUT = 10000; // 10 seconds

async function captureScreenshot(clinic, browser) {
  const { slug, website, name } = clinic;
  const outputPath = path.join(OUTPUT_DIR, `${slug}.jpg`);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`✓ ${slug} - already exists, skipping`);
    return { success: true, cached: true };
  }

  if (!website || website.trim() === '') {
    console.log(`⊘ ${slug} - no website, will need placeholder`);
    return { success: false, reason: 'no-website' };
  }

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });
    
    // Set a timeout for navigation
    await page.goto(website, { 
      waitUntil: 'networkidle0', 
      timeout: TIMEOUT 
    });

    // Wait a bit for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Take screenshot
    await page.screenshot({ 
      path: outputPath,
      type: 'jpeg',
      quality: 85,
      clip: {
        x: 0,
        y: 0,
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT
      }
    });

    await page.close();
    console.log(`✓ ${slug} - screenshot captured`);
    return { success: true };

  } catch (error) {
    console.log(`✗ ${slug} - failed: ${error.message}`);
    return { success: false, reason: error.message };
  }
}

async function createPlaceholder(clinic) {
  const { slug, name } = clinic;
  const outputPath = path.join(OUTPUT_DIR, `${slug}.jpg`);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`✓ ${slug} - placeholder already exists, skipping`);
    return;
  }

  try {
    // We'll use sharp to create a nice gradient placeholder
    const sharp = require('sharp');
    
    // Create an SVG with gradient and text
    const svg = `
      <svg width="${VIEWPORT_WIDTH}" height="${VIEWPORT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="48" 
          font-weight="bold"
          fill="white" 
          text-anchor="middle" 
          dominant-baseline="middle"
          opacity="0.9"
        >${name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
      </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    console.log(`✓ ${slug} - placeholder created`);
  } catch (error) {
    console.log(`✗ ${slug} - placeholder failed: ${error.message}`);
  }
}

async function main() {
  console.log(`Starting screenshot capture for ${clinics.length} clinics...\n`);

  // Check if sharp is installed for placeholders
  let sharpAvailable = false;
  try {
    require.resolve('sharp');
    sharpAvailable = true;
  } catch (e) {
    console.log('⚠ Sharp not installed, will skip placeholders. Install with: npm install sharp\n');
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    success: 0,
    failed: 0,
    noWebsite: 0,
    cached: 0
  };

  const failedClinics = [];
  const noWebsiteClinics = [];

  // Capture screenshots for clinics with websites
  for (const clinic of clinics) {
    const result = await captureScreenshot(clinic, browser);
    
    if (result.cached) {
      results.cached++;
    } else if (result.success) {
      results.success++;
    } else if (result.reason === 'no-website') {
      results.noWebsite++;
      noWebsiteClinics.push(clinic);
    } else {
      results.failed++;
      failedClinics.push({ slug: clinic.slug, reason: result.reason });
    }

    // Small delay between requests to be polite
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  await browser.close();

  // Create placeholders for clinics without websites
  if (sharpAvailable && noWebsiteClinics.length > 0) {
    console.log(`\nCreating placeholders for ${noWebsiteClinics.length} clinics without websites...\n`);
    for (const clinic of noWebsiteClinics) {
      await createPlaceholder(clinic);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total clinics: ${clinics.length}`);
  console.log(`Captured: ${results.success}`);
  console.log(`Cached (already existed): ${results.cached}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`No website: ${results.noWebsite}`);

  if (failedClinics.length > 0) {
    console.log('\nFailed clinics:');
    failedClinics.forEach(f => console.log(`  - ${f.slug}: ${f.reason}`));
  }

  console.log('\n✓ Screenshot capture complete!');
}

main().catch(console.error);
