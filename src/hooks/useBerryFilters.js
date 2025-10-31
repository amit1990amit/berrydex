import { useMemo, useState, useCallback } from "react";
import debounce from "lodash.debounce";

export function useBerryFilters(berries = []) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [firmness, _setFirmness] = useState(null);

  const setFirmness = (e) => {
    console.log("Setting firmness to:", e);
    _setFirmness(e);
  }

  const setDebouncedQueryDelayed = useMemo(
    () => debounce((val) => setDebouncedQuery(val), 500),
    []
  );

  const onQueryChange = useCallback(
    (val) => {
      setQuery(val);
      setDebouncedQueryDelayed(val);
    },
    [setDebouncedQueryDelayed]
  );

  const filtered = useMemo(() => {
    let list = berries ?? []; 

    if (firmness) {
      list = list.filter((b) => b.firmness === firmness);
    }

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter((b) => b.name?.toLowerCase().includes(q));
    }

    return list;
  }, [berries, firmness, debouncedQuery]);

  const counts = useMemo(() => {
    const c = {};
    for (const b of berries) {
      const key = b.firmness;
      if (key) c[key] = (c[key] || 0) + 1;
    }
    return c;
  }, [berries]);

  return {
    query,
    onQueryChange,
    firmness,
    setFirmness,
    filtered,
    counts,
  };
}
