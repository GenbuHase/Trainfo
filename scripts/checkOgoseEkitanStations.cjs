async function checkStations() {
  console.log('Probing stations of Ekitan line 210 (東武越生線)...');
  for (let i = 0; i <= 10; i++) {
    try {
      const res = await fetch(`https://ekitan.com/timetable/railway/line-station/210-${i}/d1`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (res.ok) {
        const text = await res.text();
        const m = text.match(/<title>([^<]+)<\/title>/i);
        console.log(`210-${i}: ${m ? m[1] : 'OK'}`);
      } else {
        console.log(`210-${i}: status ${res.status}`);
      }
    } catch (e) {
      console.error(`210-${i} error:`, e.message);
    }
  }
}

checkStations().catch(console.error);
