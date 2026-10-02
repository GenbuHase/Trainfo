async function test() {
  const url = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_3orrH5U-FaUZoTTFEwQlYqUM0sgEDNTH99b1RkLMH4EWU_qZmGl1E0WCclR4n-9RA7WwASUw5lSojp-EU4dUpHS1v9HHST2uyrcDWmxcI-kYpQeVYVYSN3fQCpbr1o81XcmQr7oCCvtCTgvLxJbTmg==';
  const res = await fetch(url, { redirect: 'manual' });
  console.log('Location:', res.headers.get('location'));
}
test().catch(console.error);
