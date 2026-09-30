const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
console.log('Total elements:', raw.elements.length);

const ways = raw.elements.filter(e => e.type === 'way');
console.log('Total ways:', ways.length);

// タグの種類を調査
const usageCount = {};
const serviceCount = {};
const nameCount = {};

ways.forEach(w => {
  const tags = w.tags || {};
  const usage = tags.usage || 'none';
  const service = tags.service || 'main';
  const name = tags.name || 'none';
  usageCount[usage] = (usageCount[usage] || 0) + 1;
  serviceCount[service] = (serviceCount[service] || 0) + 1;
  nameCount[name] = (nameCount[name] || 0) + 1;
});

console.log('Usage:', usageCount);
console.log('Service:', serviceCount);
console.log('Sample names:', Object.entries(nameCount).slice(0, 10));
