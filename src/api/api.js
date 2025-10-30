import axios from 'axios';

const BASE = 'https://pokeapi.co/api/v2';

export async function getAllBerrySummaries() {
  const res = await axios.get(`${BASE}/berry?limit=100`);
  return res.data.results;
}

export async function getBerryDetailByUrl(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function getAllFirmness() {
  const res = await axios.get(`${BASE}/berry-firmness`);
  return res.data.results;
}

export async function getFirmnessBucket(url) {
  const res = await axios.get(url);
  return res.data;
}
