const fs = require('fs');
const path = require('path');

console.log('Migrating oito_east station IDs from OE- to OIE-...');

const filesToMigrate = [
  'src/data/lines/oito_east/stations.ts',
  'src/data/lines/oito_east/trackGeometry.ts',
  'src/data/lines/oito_east/stationTimetables.json',
  'src/data/lines/oito_east/globalTimetable.json',
  'src/data/lines/shinonoi/globalTimetable.json',
];

for (const relPath of filesToMigrate) {
  const fullPath = path.resolve(relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // OE-XX を OIE-XX に置換 (大糸線東日本の駅番号: OE-01 〜 OE-33)
    const updated = content.replace(/OE-(\d{2})/g, 'OIE-$1');
    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`Updated ${relPath}`);
  }
}

console.log('Migration completed!');
