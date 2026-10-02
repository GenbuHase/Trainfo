const fs = require('fs');

async function main() {
  console.log('Querying Overpass API for Tsukuba Express (TX)...');

  const query = `
    [out:json][timeout:60];
    (
      relation(4589046);
      relation(2549404);
      node["railway"="station"]["name"~"^秋葉原$|^新御徒町$|^浅草$|^南千住$|^北千住$|^青井$|^六町$|^八潮$|^三郷中央$|^南流山$|^流山セントラルパーク$|^流山おおたかの森$|^柏の葉キャンパス$|^柏たなか$|^守谷$|^みらい平$|^みどりの$|^万博記念公園$|^研究学園$|^つくば$"];
    );
    out body;
    >;
    out skel qt;
  `;

  const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
  console.log('Sending request to Overpass API...');
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TrainfoApp/1.0' }
  });

  if (!res.ok) {
    throw new Error(`Overpass API responded with ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  console.log(`Received ${data.elements ? data.elements.length : 0} elements from Overpass.`);
  fs.writeFileSync('scripts/osm_tx_raw.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Saved to scripts/osm_tx_raw.json');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
