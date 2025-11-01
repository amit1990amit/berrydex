import { useQuery } from '@tanstack/react-query';
import { getAllBerrySummaries, getBerryDetailByUrl } from '../api/api';

async function fetchAllBerriesWithDetails() {
  try {
    const summaries = await getAllBerrySummaries();

    const results = await Promise.allSettled(
      summaries.map(summary => getBerryDetailByUrl(summary.url))
    );

    results.forEach((res, idx) => {
      if (res.status === "rejected") {
        console.log(`Failed to fetch berry at ${summaries[idx].url}`);
      }
    });

    const fulfilled = results
      .filter(res => res.status === "fulfilled")
      .map(res => res.value);

    return fulfilled.map(detail => ({
      name: detail.name,
      firmness: detail.firmness?.name || "unknown",
      flavors: (detail.flavors || [])
        .filter(f => (f.potency ?? 0) > 0)
        .map(f => ({
          name: f.flavor?.name,
          potency: f.potency
        }))
    }));
  } catch (error) {
    console.error("Unexpected error fetching berries:", error);
    throw error;
  }
}


export function useBerries() {
  return useQuery({
    queryKey: ['berries'],
    queryFn: fetchAllBerriesWithDetails,
    staleTime: 300000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
