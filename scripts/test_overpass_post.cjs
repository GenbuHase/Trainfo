async function test() {
  const query = `[out:json][timeout:25];
relation["route"="train"](35.35,139.35,35.58,139.68);
out tags;
`;


  const endpoints = [
    'https://overpass.private.coffee/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
  ];
  for (const ep of endpoints) {
    console.log(`Trying ${ep}...`);
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Trainfo/1.0',
        },
        body: 'data=' + encodeURIComponent(query)
      });
      console.log(`${ep} -> Status:`, res.status);
      if (res.ok) {
        const data = await res.json();
        console.log(`Success! Found ${data.elements.length} elements.`);
        data.elements.forEach(el => console.log(el.id, el.tags?.name, el.tags?.['name:ja'], el.tags?.operator));
        return;
      }
    } catch (e) {
      console.warn(e.message);
    }
  }

}

test().catch(console.error);
