const https = require('https');
const fs = require('fs');
const path = require('path');

const query = `
[out:json][timeout:60];
(
  relation["route"="train"]["name"~"川越線"];
  relation["railway"="rail"]["name"~"川越線"];
  way["railway"="rail"]["name"~"川越線"];
);
out body;
>;
out skel qt;
`;

async function fetchOverpass() {
  console.log('Querying Overpass API for 川越線...');
  const postData = 'data=' + encodeURIComponent(query);

  const options = {
    hostname: 'overpass-api.de',
    port: 443,
    path: '/api/interpreter',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Trainfo/1.0 (https://github.com/GenbuHase/Trainfo)'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (e) {
            reject(new Error('JSON parse error: ' + e.message + ', raw: ' + data.slice(0, 200)));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

fetchOverpass()
  .then((data) => {
    const outPath = path.resolve('scripts/cache/osm_kawagoe_raw.json');
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Saved ${data.elements.length} elements to ${outPath}`);
    const rels = data.elements.filter(e => e.type === 'relation');
    console.log('Relations:', rels.map(r => ({ id: r.id, tags: r.tags })));
    const ways = data.elements.filter(e => e.type === 'way');
    console.log('Ways count:', ways.length);
  })
  .catch((err) => {
    console.error('Error fetching Overpass data:', err.message);
  });
