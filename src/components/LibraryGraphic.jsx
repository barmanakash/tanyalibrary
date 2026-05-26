import React from 'react';
import { Box } from '@mui/material';

export default function LibraryGraphic() {
  return (
    <Box
      sx={{
        width: '85%',
        height: '240px',
        bgcolor: '#0a5c56',
        borderRadius: '4px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      {/* Shelf Row 1 */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', borderBottom: '3px solid #14b8a6', pb: 0.5, height: '90px', gap: '4px' }}>
        <Box sx={{ width: '14px', height: '75px', bgcolor: '#f43f5e' }} />
        <Box sx={{ width: '14px', height: '75px', bgcolor: '#3b82f6' }} />
        <Box sx={{ width: '16px', height: '75px', bgcolor: '#eab308' }} />
        <Box sx={{ width: '14px', height: '75px', bgcolor: '#10b981' }} />
        <Box sx={{ width: '16px', height: '75px', bgcolor: '#a855f7' }} />
        <Box sx={{ width: '12px', height: '75px', bgcolor: '#f97316' }} />
        <Box sx={{ width: '14px', height: '75px', bgcolor: '#f43f5e' }} />
        <Box sx={{ width: '14px', height: '75px', bgcolor: '#3b82f6' }} />
        <Box sx={{ width: '14px', height: '75px', bgcolor: '#eab308' }} />
      </Box>
      {/* Shelf Row 2 */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', borderBottom: '3px solid #14b8a6', pb: 0.5, height: '90px', gap: '4px' }}>
        <Box sx={{ width: '16px', height: '65px', bgcolor: '#eab308' }} />
        <Box sx={{ width: '14px', height: '65px', bgcolor: '#10b981' }} />
        <Box sx={{ width: '12px', height: '65px', bgcolor: '#a855f7' }} />
        <Box sx={{ width: '14px', height: '65px', bgcolor: '#f97316' }} />
        <Box sx={{ width: '16px', height: '65px', bgcolor: '#f43f5e' }} />
        <Box sx={{ width: '14px', height: '65px', bgcolor: '#3b82f6' }} />
        <Box sx={{ width: '16px', height: '65px', bgcolor: '#eab308' }} />
      </Box>
    </Box>
  );
}
