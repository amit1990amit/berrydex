import React from 'react';
import FirmnessSlider from '../../components/FirmnessSlider/FirmnessSlider';
import SearchBar from '../../components/SearchBar/SearchBar';
import BerryList from '../../components/BerryList/BerryList';
import { useBerries } from '../../hooks/useBerries';
import { useBerryFilters } from "../../hooks/useBerryFilters";


const MainPage = () => {
  const { data: berries = [], isLoading, isError, error } = useBerries();
  const { query, onQueryChange, firmness, setFirmness, filtered, counts } =
  useBerryFilters(berries);

  if (isLoading) {
    return (
      <div className="main-shell">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Poké Berries</div>
            <div className="card-sub">Loading berries...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="main-shell">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Poké Berries</div>
            <div className="card-sub" style={{ color: 'red' }}>
              Failed to load berries 😢
            </div>
          </div>
          <div style={{ padding: '1rem', color: 'red' }}>
            {error?.message || 'Unknown error occurred'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-shell">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Poké Berries</div>
            <div className="card-sub">How tough are you</div>
          </div>
          <div className="placeholder">
            <SearchBar value={query} onChange={onQueryChange}/>
          </div>
        </div>
        <div className="layout">
          <div className="panel">
            <div className="panel-title">Firmness</div>
            <FirmnessSlider value={firmness} onChange={setFirmness} counts={counts}/>

          </div>
          <div className="panel">
            <div className="panel-title">Berries</div>
            <BerryList berries={filtered}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
