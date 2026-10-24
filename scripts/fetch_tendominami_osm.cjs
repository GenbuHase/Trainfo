const query = `
[out:json][timeout:40];
node["railway"~"station|halt|stop"]["name"="天童南"](38.3,140.3,38.4,140.45);
out body;
`.trim();

async function main() {
  const res = await fetch('https://overpass.kumi.systems/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Trainfo' },
    body: 'data=' + encodeURIComponent(query),
  });
  if (!res.ok) {
    console.error(res.status, (await res.text()).slice(0, 200));
    process.exit(1);
  }
  const json = await res.json();
  for (const n of json.elements || []) {
    console.log(n.id, n.lat, n.lon, n.tags?.name, n.tags?.railway);
  }
  if (!(json.elements || []).length) console.log('none');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
