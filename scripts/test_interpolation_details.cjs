const { interpolateTrackPosition } = require('../src/data/trackGeometry');

console.log('Testing interpolateTrackPosition for direct segments...\n');

// 1. SI-35 -> CR-31 (Nagatoro direct line)
console.log('=== SI-35 -> CR-31 (0% to 100%) ===');
[0, 0.25, 0.5, 0.75, 0.9, 0.95, 1.0].forEach(ratio => {
  const pos = interpolateTrackPosition('SI-35', 'CR-31', ratio);
  console.log(`ratio ${(ratio * 100).toFixed(0)}%: lat=${pos.lat.toFixed(6)}, lng=${pos.lng.toFixed(6)}, heading=${pos.heading.toFixed(1)}°`);
});

// 2. SI-36 -> CR-32 (Mitsumine direct line)
console.log('\n=== SI-36 -> CR-32 (0% to 100%) ===');
[0, 0.1, 0.2, 0.3, 0.5, 0.75, 1.0].forEach(ratio => {
  const pos = interpolateTrackPosition('SI-36', 'CR-32', ratio);
  console.log(`ratio ${(ratio * 100).toFixed(0)}%: lat=${pos.lat.toFixed(6)}, lng=${pos.lng.toFixed(6)}, heading=${pos.heading.toFixed(1)}°`);
});
