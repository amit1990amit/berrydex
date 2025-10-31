import React, { useMemo } from "react";
import Slider from "@mui/material/Slider";
import "./firmnessSlider.css";


const OPTIONS = [
  { key: "super-hard", label: "Super Hard" },
  { key: "very-hard",  label: "Very Hard"  },
  { key: "hard",       label: "Hard"       },
  { key: "soft",       label: "Soft"       },
  { key: "very-soft",  label: "Very Soft"  },
];

const FirmnessSlider = ({ value , onChange, counts = {} }) => {
  const idx = useMemo(() => {
    const i = OPTIONS.findIndex(o => o.key === value);
    return i === -1 ? 3 : i;
  }, [value]);

  const sliderValue = (OPTIONS.length - 1) - idx;
  const marks = useMemo(
    () => OPTIONS.map((_, i) => ({ value: (OPTIONS.length - 1) - i })),
    []
  );

  const handleSliderChange = (_e, newValue) => {
    const newIdx = (OPTIONS.length - 1) - Number(newValue);
    const option = OPTIONS[newIdx];
    if (option && onChange) onChange(option.key);
  };

  const handleClickLabel = (key) => onChange?.(key);

  return (
    <div className={`firmness firmness--${value}`}>
      <div className="firmness__slider">
        <Slider
          orientation="vertical"
          min={0}
          max={OPTIONS.length - 0.9}
          step={1}
          value={sliderValue} 
          onChange={handleSliderChange}
          marks={marks}
          aria-label="Firmness"
        />
      </div>

      <div className="firmness__labels">
        {OPTIONS.map((o, i) => {
          const active = i === idx;
          return (
            <div
              key={o.key}
              className={`firmnessItem ${active ? "is-active" : ""}`}
              onClick={() => handleClickLabel(o.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClickLabel(o.key)}
            >
              <div className="firmnessItem__label">{o.label}</div>
              <div className="firmnessItem__count">{typeof counts[o.key] === "number" ? counts[o.key] : 0}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FirmnessSlider;
