import { useQuery } from '@tanstack/react-query';
import { getAllBerrySummaries, getBerryDetailByUrl } from '../api/api';

async function fetchAllBerriesWithDetails() {
  const summaries = await getAllBerrySummaries();
  const details = await Promise.all(
    summaries.map(s => getBerryDetailByUrl(s.url))
  );
  // Normalize flavors (only potency > 0) + flatten useful fields
  return details.map(d => ({
    name: d.name,
    firmness: d.firmness?.name || 'unknown',
    flavors: (d.flavors || [])
      .filter(f => (f.potency ?? 0) > 0)
      .map(f => ({ name: f.flavor?.name, potency: f.potency })),
  }));
}

export function useBerries() {
  return useQuery({
    queryKey: ['berries'],
    queryFn: fetchAllBerriesWithDetails,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
