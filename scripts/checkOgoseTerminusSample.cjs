async function checkOgoseStation() {
  const url = 'https://ekitan.com/timetable/railway/line-station/210-7/d1?dw=0';
  console.log(`Fetching ${url}...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    }
  });
  const html = await res.text();
  const tabMatches = [...html.matchAll(/<li[^>]*data-ek-direction_name="([^"]+)"[^>]*>/gi)];
  console.log('Direction tabs:');
  tabMatches.forEach((m, idx) => console.log(`  Tab ${idx}: ${m[1]}`));

  const liMatches = [...html.matchAll(/<li[^>]*class="[^"]*ek-train-tooltip[^"]*"[\s\S]*?<\/li>/gi)];
  console.log('Total train items found:', liMatches.length);
  for (let i = 0; i < Math.min(5, liMatches.length); i++) {
    console.log(`\nTrain ${i + 1}:`, liMatches[i][0]);
  }
}

checkOgoseStation().catch(console.error);
