async function probeOSMRelations() {
  const query = `
[out:json][timeout:30];
(
  relation["route"="train"]["name"~"相鉄|東急新横浜|いずみ野|新横浜線"](35.35,139.35,35.58,139.68);
  relation["route"="railway"]["name"~"相鉄|東急新横浜|いずみ野|新横浜線"](35.35,139.35,35.58,139.68);
  relation["railway"="rail"](35.35,139.35,35.58,139.68);
  way["railway"="rail"]["operator"~"相模鉄道|東急"](35.35,139.35,35.58,139.68);
);
out tags;
`;


  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
  ];

  for (const ep of endpoints) {
    try {
      console.log(`Trying ${ep}...`);
      const res = await fetch(`${ep}?data=${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'Trainfo/1.0' }
      });
      if (res.ok) {
        const json = await res.json();
        console.log(`Success! Found ${json.elements.length} relations:`);
        json.elements.forEach(el => {
          console.log(`ID: ${el.id}, Name: ${el.tags.name}, From: ${el.tags.from}, To: ${el.tags.to}, Operator: ${el.tags.operator}`);
        });
        return;
      } else {
        console.log(`Response not ok: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log(`Body: ${text.slice(0, 300)}`);
      }
    } catch (e) {
      console.warn(`Exception:`, e);
    }

  }
}

probeOSMRelations().catch(console.error);
