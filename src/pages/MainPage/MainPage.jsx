import React from 'react';
import Slider from '../../components/Slider/Slider';
import BerryList from '../../components/BerryList/BerryList';
import { useBerries } from '../../hooks/useBerries';

const MainPage = () => {
  const { data: berries, isLoading, isError, error } = useBerries();
  console.log(berries);
  return (
    <div className="main-shell">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Poké Berries</div>
            <div className="card-sub">How tough are you</div>
          </div>
          <div className="placeholder">Search by name</div>
        </div>
        <div className="layout">
          <div className="panel">
            <div className="panel-title">Firmness</div>
            <Slider />
          </div>
          <div className="panel">
            <div className="panel-title">Berries</div>
            <BerryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
