import React, { useMemo } from 'react';
import { Box, Slider, Stack, Typography } from '@mui/material';

  const levels = [
    { label: 'Super Hard', key: "super-hard", color: '#ff5c8a' },
    { label: 'Very Hard', key: "very-hard", color: '#e74c3c' },
    { label: 'Hard', key: "hard",  color: '#f39c12' },
    { label: 'Soft',key: "soft",   color: '#27ae60' },
    { label: 'Very Soft',key: "very-soft", color: '#2ecc71' },
  ];

const FirmnessSlider = ({ value , onChange, counts = {} }) => {

  const idx = useMemo(() => {
      const i = levels.findIndex(o => o.key === value);
      return i === -1 ? 3 : i;
    }, [value]);
  
  const sliderValue = (levels.length - 1) - idx;
  const max = levels.length - 0.9;
  const selected = levels[idx];

  const marks = useMemo(() => levels.map((_, i) => ({ value: i })), [levels]);

  const handleSliderChange = (e, newValue) => {
    const newIdx = (levels.length - 1) - Number(newValue);
    const option = levels[newIdx];
    if (option && onChange) onChange(option.key);
  }

  const handleClickLabel = (key) => {
    onChange(key);
  }

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '24px 1fr',
          alignItems: 'stretch',
          columnGap: 2,
          userSelect: 'none',
        }}
      >
        <Slider
          orientation="vertical"
          min={0}
          max={max}
          step={1}
          marks={marks}
          value={sliderValue}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          sx={{
            height: 340,
            '& .MuiSlider-rail': {
              width: 36,
              height: 360,
              bgcolor: 'grey.200',
              opacity: 1,
              borderRadius: 40,
            },
            '& .MuiSlider-track': {
              display: 'none',
              transition: 'transform 240ms cubic-bezier(0.2, 0, 0, 1), height 240ms cubic-bezier(0.2, 0, 0, 1)',
            },
            '& .MuiSlider-thumb': {
              width: 26,
              height: 26,
              bgcolor: '#fff',
              border: '4px solid',
              borderColor: selected ?.color || 'primary.main',
              boxShadow: `
                  0 2px 6px rgba(0,0,0,0.10),
                  0 0 0 6px ${selected?.color}22,
                  0 0 0 12px ${selected.color}11
              !important`,
              transition:
                'transform 240ms cubic-bezier(0.2, 0, 0, 1), border-color 140ms ease',
              '&:hover, &.Mui-focusVisible': { boxShadow: 0 },
            },
            '& .MuiSlider-mark': {
              width: 0,
            },
          }}
        />
        <Stack height={340} justifyContent="space-between" sx={{ py: 0.5 }}>
          {levels
            .map((lvl, i) => {
              const active = i === idx;
              return (
                <Box
                  key={lvl.label}
                  onClick={() => handleClickLabel(lvl.key)}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: active ? 700 : 500,
                      color: active ? lvl.color : 'text.primary',
                      lineHeight: 1,
                    }}
                  >
                    {lvl.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: active ? lvl.color : 'text.secondary',
                      fontWeight: active ? 700 : 400,
                    }}
                    title={`${counts[lvl.key]} items`}
                  >
                    {counts[lvl.key] || 0}
                  </Typography>
                </Box>
              );
            })
            }
        </Stack>
      </Box>
    </Box>
  );
}

export default React.memo(FirmnessSlider);