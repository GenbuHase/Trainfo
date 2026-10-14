const fs = require('fs');
const groups = JSON.parse(fs.readFileSync('scripts/scratch_groups.json', 'utf8'));

console.log('=== TOKYU SHIN-YOKOHAMA ===');
['23212', '29939', '23297'].forEach(code => {
  const st = groups[code];
  console.log(`Station: ${st.stationName} (${code})`);
  st.routes.forEach(r => {
    if (r.railName.includes('東急新横浜') || r.railName.includes('新横浜線')) {
      console.log(`  ${r.railName}:`, r.railGroup);
    }
  });
});

console.log('\n=== SOTETSU SHIN-YOKOHAMA ===');
['23212', '29682', '23267'].forEach(code => {
  const st = groups[code];
  console.log(`Station: ${st.stationName} (${code})`);
  st.routes.forEach(r => {
    if (r.railName.includes('相鉄') || r.railName.includes('新横浜線') || r.railName.includes('ＪＲ')) {
      console.log(`  ${r.railName}:`, r.railGroup);
    }
  });
});

console.log('\n=== SOTETSU MAIN ===');
['23368', '23299', '23267', '23310', '23088'].forEach(code => {
  const st = groups[code];
  console.log(`Station: ${st.stationName} (${code})`);
  st.routes.forEach(r => {
    if (r.railName.includes('相鉄')) {
      console.log(`  ${r.railName}:`, r.railGroup);
    }
  });
});

console.log('\n=== SOTETSU IZUMINO ===');
['23310', '23336', '23191'].forEach(code => {
  const st = groups[code];
  console.log(`Station: ${st.stationName} (${code})`);
  st.routes.forEach(r => {
    if (r.railName.includes('相鉄') || r.railName.includes('いずみ野')) {
      console.log(`  ${r.railName}:`, r.railGroup);
    }
  });
});
