/**
 * Generate a test ZIP file for bulk product upload testing.
 * 
 * Usage: node scripts/generate-test-zip.js
 * 
 * This script creates a ZIP file with sample products across all categories.
 */

const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

// Sample product data for each category
const sampleProducts = [
  // Fahrzeuge (Vehicles) - 5 samples
  {
    folder: 'vehicle-001',
    json: {
      title: 'BMW 320i Limousine',
      category: 'Fahrzeuge',
      description: 'BMW 320i in gutem Zustand, TÜV bis 2025',
      price: 15000,
      condition: 'Gut',
      location: 'Hamburg',
      year: 2018,
      make: 'BMW',
      model: '320i',
      mileage: '85.000 km',
      fuelType: 'Benzin'
    }
  },
  {
    folder: 'vehicle-002',
    json: {
      title: 'Mercedes-Benz Sprinter 314 CDI',
      category: 'Fahrzeuge',
      description: 'Transporter mit Kühlaufbau',
      price: 22000,
      condition: 'Ausgezeichnet',
      location: 'München',
      year: 2019,
      make: 'Mercedes-Benz',
      model: 'Sprinter 314 CDI',
      mileage: '65.000 km',
      fuelType: 'Diesel'
    }
  },
  {
    folder: 'vehicle-003',
    json: {
      title: 'Volkswagen Golf 7 GTI',
      category: 'Fahrzeuge',
      description: 'Sportlicher Kompaktwagen',
      price: 18500,
      condition: 'Gut',
      location: 'Berlin',
      year: 2017,
      make: 'Volkswagen',
      model: 'Golf GTI',
      mileage: '72.000 km',
      fuelType: 'Benzin'
    }
  },
  // Edelmetalle (Precious Metals) - 3 samples
  {
    folder: 'gold-bar-001',
    json: {
      title: 'Goldbarren 100g LBMA',
      category: 'Edelmetalle',
      description: 'LBMA-zertifizierter Goldbarren',
      price: 6200,
      condition: 'Neu',
      location: 'Frankfurt',
      metalType: 'Gold',
      purity: '999.9',
      weight: '100g',
      certification: 'LBMA'
    }
  },
  {
    folder: 'silver-coins-001',
    json: {
      title: 'Silbermünzen Maple Leaf (10 Stück)',
      category: 'Edelmetalle',
      description: '10x 1oz Canadian Maple Leaf',
      price: 280,
      condition: 'Neu',
      location: 'Frankfurt',
      metalType: 'Silber',
      purity: '999.9',
      weight: '311g (10x 1oz)',
      certification: 'Royal Canadian Mint'
    }
  },
  // Bau-/Landmaschinen (Machinery) - 3 samples
  {
    folder: 'excavator-001',
    json: {
      title: 'CAT 320 Kettenbagger',
      category: 'Bau-/Landmaschinen',
      description: 'Caterpillar Kettenbagger, einsatzbereit',
      price: 85000,
      condition: 'Gut',
      location: 'Düsseldorf',
      manufacturer: 'Caterpillar',
      operatingHours: 4500,
      machineType: 'Bagger'
    }
  },
  {
    folder: 'tractor-001',
    json: {
      title: 'John Deere 6130R Traktor',
      category: 'Bau-/Landmaschinen',
      description: 'Landwirtschaftlicher Traktor mit Frontlader',
      price: 65000,
      condition: 'Ausgezeichnet',
      location: 'Oldenburg',
      manufacturer: 'John Deere',
      operatingHours: 2800,
      machineType: 'Traktor'
    }
  },
  // Verschiedenes (Miscellaneous) - 3 samples
  {
    folder: 'electronics-001',
    json: {
      title: 'Apple MacBook Pro 16 Zoll',
      category: 'Verschiedenes',
      description: 'MacBook Pro M2 Max, 32GB RAM',
      price: 2200,
      condition: 'Neu',
      location: 'Köln',
      source: 'Zollbeschlagnahmung',
      tags: ['elektronik', 'laptop', 'apple']
    }
  },
  {
    folder: 'watch-001',
    json: {
      title: 'Rolex Submariner Date',
      category: 'Verschiedenes',
      description: 'Luxusuhr mit Papieren',
      price: 12500,
      condition: 'Ausgezeichnet',
      location: 'München',
      source: 'Pfändung',
      tags: ['uhren', 'luxus', 'sammlerstück']
    }
  }
];

// Placeholder image (1x1 pixel PNG in base64)
const PLACEHOLDER_IMAGE = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// Generate a simple colored placeholder image
function generatePlaceholderImage() {
  // Using the 1x1 pixel as placeholder - in production, you'd use real test images
  return PLACEHOLDER_IMAGE;
}

async function generateTestZip() {
  console.log('Generating test ZIP file for bulk product upload...\n');

  const zip = new JSZip();

  for (const product of sampleProducts) {
    console.log(`Adding: ${product.folder} - ${product.json.title}`);

    // Add product.json
    zip.file(`${product.folder}/product.json`, JSON.stringify(product.json, null, 2));

    // Add placeholder images (1-3 images per product)
    const imageCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 1; i <= imageCount; i++) {
      zip.file(`${product.folder}/image${i}.png`, generatePlaceholderImage());
    }
  }

  // Generate the ZIP file
  const content = await zip.generateAsync({ type: 'nodebuffer' });

  // Save to public folder for easy access
  const outputPath = path.join(__dirname, '..', 'public', 'test-bulk-upload.zip');
  fs.writeFileSync(outputPath, content);

  console.log(`\n✅ Test ZIP file generated: ${outputPath}`);
  console.log(`   Contains ${sampleProducts.length} products across all categories`);
  console.log('\nCategories included:');
  const categories = [...new Set(sampleProducts.map(p => p.json.category))];
  categories.forEach(cat => {
    const count = sampleProducts.filter(p => p.json.category === cat).length;
    console.log(`   - ${cat}: ${count} product(s)`);
  });
}

generateTestZip().catch(console.error);

