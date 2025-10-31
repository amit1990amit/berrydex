// import Stack from '@mui/material/Stack';
// import Slider from '@mui/material/Slider';
// FirmnessSlider.js
import React, { useMemo, useState } from 'react';
import { Box, Slider, Stack, Typography } from '@mui/material';

export default function FirmnessSlider({ value , onChange, counts = {} }) {
  const [firmness, setFirmness] = useState(0);

  const levels = [
    { label: 'Very Soft', count: 12, color: '#2ecc71' },
    { label: 'Soft', count: 26, color: '#27ae60' },
    { label: 'Hard', count: 1, color: '#f39c12' },
    { label: 'Very Hard', count: 0, color: '#e74c3c' },
    { label: 'Super Hard', count: 39, color: '#ff5c8a' },
  ];

  const max = levels.length - 0.9;
  const selected = levels[firmness];
  const marks = useMemo(() => levels.map((_, i) => ({ value: i })), [levels]);

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
        {/* Vertical Slider */}
        <Slider
          orientation="vertical"
          min={0}
          max={max}
          step={1}
          marks={marks}
          value={firmness}
          onChange={(_, v) => setFirmness(v)}
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
              boxShadow: 0,
              transition:
                'transform 240ms cubic-bezier(0.2, 0, 0, 1), border-color 140ms ease',
              '&:hover, &.Mui-focusVisible': { boxShadow: 0 },
            },
            '& .MuiSlider-mark': {
              width: 0,
            },
          }}
        />

        {/* Firmness Labels */}
        <Stack height={340} justifyContent="space-between" sx={{ py: 0.5 }}>
          {levels
            .map((lvl, i) => {
              const active = i === firmness;
              return (
                <Box
                  key={lvl.label}
                  onClick={() => setFirmness(i)}
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
                    title={`${lvl.count} items`}
                  >
                    {lvl.count}
                  </Typography>
                </Box>
              );
            })
            .reverse()}
        </Stack>
      </Box>
    </Box>
  );
}