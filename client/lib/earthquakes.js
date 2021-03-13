export async function fetchEarthquakes(type, period) {
  let result;
  
  try {
    result = await fetch(`/proxy?period=${period}&type=${type}`);
  } catch (e) {
    console.error('Villa við að sækja', e);
    return null;
  }

  if (!result.ok) {
    console.error('Ekki 200 svar', await result.text());
    return null;
  }

  return await result.json();
}
