import React from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { COLORS } from '../styles/theme';

export default function AllMembersView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0f172a', mb: 0.5 }}>
        All Registered System Members
      </Typography>
      <Typography variant="body2" sx={{ color: COLORS.textGray, mb: 3 }}>
        Select any profile from rows below to update or modify information data logs.
      </Typography>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid #000000',
          borderRadius: '0px',
          flexGrow: 1,
          maxHeight: '400px',
          overflowY: 'scroll',
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {['S.No.', 'Full Name', 'DOB', 'Phone Number', 'Address', 'Joining Date', 'Seat Assigned', 'Status'].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    bgcolor: '#e2e8f0',
                    color: '#0f172a',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #94a3b8',
                    textAlign: head === 'S.No.' ? 'center' : 'left',
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:hover': { bgcolor: '#f1f5f9' }, cursor: 'pointer' }}>
              <TableCell sx={{ textAlign: 'center', color: COLORS.textGray }}>1</TableCell>
              <TableCell sx={{ color: '#334155' }}>Akash Barman</TableCell>
              <TableCell sx={{ color: '#334155' }}>26-05-2000</TableCell>
              <TableCell sx={{ color: '#334155' }}>6261081914</TableCell>
              <TableCell sx={{ color: '#334155' }}>Barela</TableCell>
              <TableCell sx={{ color: '#334155' }}>26-05-2026</TableCell>
              <TableCell sx={{ color: '#334155' }}>Seat 1</TableCell>
              <TableCell sx={{ color: '#334155' }}>Active</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon sx={{ transform: 'scale(0.8)' }} />}
          sx={{
            bgcolor: COLORS.orangeMain,
            '&:hover': { bgcolor: COLORS.orangeHover },
            borderRadius: '0px',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 3,
            py: 1,
          }}
        >
          Edit Selected Profile
        </Button>
      </Box>
    </Box>
  );
}
