async function check() {
  const url = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEvEjzQbYxzPb8LXHxMVK-4SdH0Fgv5QCNVHG5zfMc-dK87JjtRXjjqLnqWYHwg26Jbvh7AHBAMXCOeCFW4zEsmooUzQm69EpiWMFYX91N9DxrHjVT6VZM8HnJZA8cCBVAddF4Wu9FK-5jj8zIu1RPX';
  const res = await fetch(url, { redirect: 'manual' });
  console.log('Location:', res.headers.get('location'));
}
check().catch(console.error);
