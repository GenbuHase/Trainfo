async function test() {
  const url = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEzo-oYANGRSNz84OKprLxMImi-2knHDuUuxBuzC-8WbqUKYKfFlhgU7Yh4wKFU0Gq0hDC00vHjnG8R1l39cX8L-8Jtu_DqirQAPbHYXJ_v0or2jRaABvKVf8VbjAXaWu9kuVR8eTFmN4JLNsskiw=';
  const res = await fetch(url, { redirect: 'manual' });
  console.log('Location:', res.headers.get('location'));
}
test().catch(console.error);
