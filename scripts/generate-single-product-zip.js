/**
 * Generate a test ZIP file with a single product for testing rollback functionality.
 * 
 * Usage: node scripts/generate-single-product-zip.js
 */

const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

// Single product for testing
const singleProduct = {
  folder: 'test-single-product',
  json: {
    title: 'Test Single Product - Audi A4',
    category: 'Fahrzeuge',
    description: 'Single product for rollback testing',
    price: 25000,
    condition: 'Sehr Gut',
    location: 'Berlin',
    year: 2020,
    make: 'Audi',
    model: 'A4',
    mileage: '45.000 km',
    fuelType: 'Benzin'
  }
};

async function generateSingleProductZip() {
  const zip = new JSZip();

  // Create product folder
  const productFolder = zip.folder(singleProduct.folder);

  // Add product.json
  productFolder.file('product.json', JSON.stringify(singleProduct.json, null, 2));

  // Add a simple test image (1x1 pixel PNG)
  const pngBuffer = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
    0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x63, 0xF8, 0x0F, 0x00, 0x00,
    0x01, 0x01, 0x00, 0x01, 0x18, 0xDD, 0x8D, 0xB4, 0x00, 0x00, 0x00, 0x00,
    0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
  ]);

  productFolder.file('image.png', pngBuffer);

  // Generate ZIP
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

  // Save to public folder
  const outputPath = path.join(__dirname, '../public/test-single-product.zip');
  fs.writeFileSync(outputPath, zipBuffer);

  console.log(`✅ Single product ZIP created: ${outputPath}`);
  console.log(`📦 File size: ${(zipBuffer.length / 1024).toFixed(2)} KB`);
}

generateSingleProductZip().catch(err => {
  console.error('❌ Error generating ZIP:', err);
  process.exit(1);
});

