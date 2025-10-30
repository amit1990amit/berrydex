import { useMemo, useState, useCallback } from "react";
import debounce from "lodash.debounce";

export function useBerryFilters(berries = []) {
  // immediate input the user sees
  const [query, setQuery] = useState("");
  // debounced query used for filtering-by-name only
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // firmness filter (instant)
  const [firmness, setFirmness] = useState(null);

  // stable debounced setter for the query used in filtering
  const setDebouncedQueryDelayed = useMemo(
    () => debounce((val) => setDebouncedQuery(val), 300),
    []
  );

  // call this from SearchBar onChange
  const onQueryChange = useCallback(
    (val) => {
      setQuery(val);                // update input immediately
      setDebouncedQueryDelayed(val); // update filtering value AFTER 300ms
    },
    [setDebouncedQueryDelayed]
  );

  // filter-by-firmness happens instantly
  const filtered = useMemo(() => {
    let list = berries ?? [];

    // 1) firmness: instant
    if (firmness) {
      list = list.filter((b) => b.firmness === firmness);
    }

    // 2) name: debounced
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter((b) => b.name?.toLowerCase().includes(q));
    }

    return list;
  }, [berries, firmness, debouncedQuery]);

  // counts don’t debounce (they should reflect the full dataset)
  const counts = useMemo(() => {
    const c = {};
    for (const b of berries) {
      const key = b.firmness;
      if (key) c[key] = (c[key] || 0) + 1;
    }
    return c;
  }, [berries]);

  return {
    // search (use in <SearchBar value={query} onChange={onQueryChange} />)
    query,
    onQueryChange,

    // firmness (instant)
    firmness,
    setFirmness,

    // derived
    filtered,
    counts,
  };
}
