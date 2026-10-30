const fs = require('fs');

if (fs.existsSync('scripts/cache/yahoo/sobu_main/all_train_details.json')) {
  const smDetails = JSON.parse(fs.readFileSync('scripts/cache/yahoo/sobu_main/all_train_details.json', 'utf8'));
  ['29325', '29333', '29334'].forEach(id => {
    const d = smDetails.find(x => x.trainId === id);
    console.log(id, 'in sobu_main cache:', !!d);
  });
} else {
  console.log('sobu_main cache not found');
}
