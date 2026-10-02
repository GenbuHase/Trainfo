const fs = require('fs');

async function main() {
  console.log('Querying Overpass API for Musashino Line & Direct Lines...');

  const query = `
    [out:json][timeout:60];
    (
      relation["name"~"武蔵野線"]["route"~"train|railway"];
      relation["name"~"京葉線"]["route"~"train|railway"];
      node["railway"="station"]["name"~"府中本町|北府中|西国分寺|新小平|新秋津|東所沢|新座|北朝霞|西浦和|武蔵浦和|南浦和|東浦和|東川口|南越谷|越谷レイクタウン|吉川|吉川美南|新三郷|三郷|南流山|新松戸|新八柱|東松戸|市川大野|船橋法典|西船橋|市川塩浜|新浦安|舞浜|葛西臨海公園|新木場|潮見|越中島|八丁堀|東京|南船橋|新習志野|幕張豊砂|海浜幕張|大宮|国立|立川|日野|豊田|八王子"];
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
  fs.writeFileSync('scripts/osm_musashino_raw.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Saved to scripts/osm_musashino_raw.json');
}

main().catch(err => console.error(err));
