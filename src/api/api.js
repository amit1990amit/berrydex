import axios from 'axios';

const BASE = 'https://pokeapi.co/api/v2';

export async function getAllBerrySummaries() {
  try{
    const res = await axios.get(`${BASE}/berry?limit=100`);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching berry summaries:", error);
    throw error;
  }
}

export async function getBerryDetailByUrl(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching berry details:", error);
    throw error;
  }
}
