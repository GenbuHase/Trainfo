async function test() {
  const url = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGcAJpKqkvBTidrkZHdTjfWGDahuev3OfgJv2d5stsCIewnvnfyaxoI2JLTFnf-Q5Rh0UKqv2wbbNamcLrU5EwhGqr3ngKfzT63pXjiyc8I0LtPcovMLm46IuY2dKG4Ch4_Wa4bY9i_AZfc6BBIVQ==';
  const res = await fetch(url, { redirect: 'manual' });
  console.log('Location:', res.headers.get('location'));
}
test().catch(console.error);
