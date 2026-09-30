const fs = require('fs');

async function checkRelation() {
  const query = `
    [out:json][timeout:30];
    relation["route"="railway"]["name"~"東上"];
    out tags;
  `;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  console.log('Fetching route relation for Tobu Tojo Line...');
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Relations found:', data.elements);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

checkRelation();
