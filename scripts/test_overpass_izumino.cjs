async function test() {
  const query = `[out:json][timeout:25];
(
  relation["name"~"いずみ野"];
  relation["name"~"Izumino"];
  relation(3569502);
);
out tags;
`;

  const res = await fetch('https://maps.mail.ru/osm/tools/overpass/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Trainfo/1.0',
    },
    body: 'data=' + encodeURIComponent(query)
  });
  const data = await res.json();
  console.log(`Found ${data.elements.length} elements:`);
  data.elements.forEach(el => console.log(el.id, el.tags?.name, el.tags?.operator, el.tags?.from, el.tags?.to));
}

test().catch(console.error);
