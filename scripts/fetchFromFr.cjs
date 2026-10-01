const fs = require('fs');

async function fetchFromFr(name, query, outFile) {
  console.log(`Fetching ${name}...`);
  const url = 'https://overpass.openstreetmap.fr/api/interpreter?data=' + encodeURIComponent(query);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'TrainfoApp/1.0' } });
    console.log(`${name}: HTTP ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(`${name}: got ${data.elements ? data.elements.length : 0} elements.`);
      fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');
      return true;
    }
  } catch (e) {
    console.error(`${name} error:`, e.message);
  }
  return false;
}

async function main() {
  // 1. 川越線 (大宮〜川越)
  const qKawagoe = `
    [out:json][timeout:20];
    way["railway"="rail"]["name"~"川越線"](35.89,139.47,35.94,139.63);
    out geom;
  `;
  await fetchFromFr('Kawagoe Line', qKawagoe, 'scripts/osm_kawagoe.json');

  // 2. 山手貨物線 / 山手線 (大崎〜池袋)
  const qYamanote = `
    [out:json][timeout:20];
    way["railway"="rail"]["name"~"山手"](35.61,139.69,35.74,139.74);
    out geom;
  `;
  await fetchFromFr('Yamanote', qYamanote, 'scripts/osm_yamanote.json');

  // 3. 東北新幹線・埼京線高架 (赤羽〜大宮)
  const qTohoku = `
    [out:json][timeout:20];
    way["railway"="rail"]["operator"~"東日本旅客鉄道"](35.77,139.61,35.91,139.73);
    out geom;
  `;
  await fetchFromFr('Tohoku Branch', qTohoku, 'scripts/osm_tohoku.json');
}

main();
