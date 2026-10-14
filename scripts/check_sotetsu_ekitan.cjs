async function check(lineNo) {
  const url = `https://ekitan.com/timetable/railway/line/${lineNo}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
  });
  console.log(`Status: ${res.status}`);
  const html = await res.text();
  console.log('Title:', html.match(/<title>([^<]+)<\/title>/)?.[1]);
  const links = [...html.matchAll(/href="([^"]*line-station[^"]*)"/gi)].map(m => m[1]);
  console.log('Links:', links.slice(0, 10));
}

check(452).catch(console.error);
