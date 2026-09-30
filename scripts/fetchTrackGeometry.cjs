// Overpass APIから東武東上線の実線路ジオメトリ（way geometry）を取得するスクリプト
const fs = require('fs');

async function main() {
  console.log('Querying Overpass API for Tobu Tojo Line track...');

  // 東武東上線 (池袋 35.7289, 139.7113 〜 寄居 36.1182, 139.1901)
  // Bounding box: 35.72, 139.18, 36.13, 139.73
  // railway=rail
  const query = `
    [out:json][timeout:25];
    (
      relation["name"~"東上本線"]["route"="railway"];
      relation["name"~"東上本線"]["route"="train"];
      way["railway"="rail"]["name"~"東上本線"];
      way["railway"="rail"]["operator"~"東武鉄道"](35.72,139.18,36.13,139.73);
    );
    out geom;
  `;

  const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TrainfoApp/1.0' }
  });

  if (!res.ok) {
    throw new Error(`Overpass API responded with ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  console.log(`Received ${data.elements ? data.elements.length : 0} elements from Overpass.`);
  fs.writeFileSync('scripts/overpass_tojo_raw.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Saved to scripts/overpass_tojo_raw.json');
}

main().catch(err => console.error(err));
