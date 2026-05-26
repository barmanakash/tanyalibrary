import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

export default function FinanceTrackerView({
  members = [],
  setMembers,
}) {

  // Toggle Payment Status
  const handlePaymentToggle = (index) => {
    const updatedMembers = [...members];

    updatedMembers[index].paymentStatus =
      updatedMembers[index].paymentStatus === 'Paid'
        ? 'Unpaid'
        : 'Paid';

    setMembers(updatedMembers);

    // Save instantly
    localStorage.setItem(
      'libraryMembers',
      JSON.stringify(updatedMembers)
    );
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          color: '#0f172a',
        }}
      >
        Finance Tracker
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#e2e8f0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Member Name
              </TableCell>

              <TableCell sx={{ fontWeight: 'bold' }}>
                Seat Number
              </TableCell>

              <TableCell sx={{ fontWeight: 'bold' }}>
                Phone Number
              </TableCell>

              <TableCell sx={{ fontWeight: 'bold' }}>
                Payment Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index}>
                {/* Name */}
                <TableCell>
                  {member.firstName} {member.lastName}
                </TableCell>

                {/* Seat */}
                <TableCell>{member.seat}</TableCell>

                {/* Phone */}
                <TableCell>{member.phone}</TableCell>

                {/* Status */}
                <TableCell>
                  <Chip
                    label={member.paymentStatus}
                    onClick={() => handlePaymentToggle(index)}
                    clickable
                    sx={{
                      bgcolor:
                        member.paymentStatus === 'Paid'
                          ? '#16a34a'
                          : '#dc2626',

                      color: '#ffffff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        sx={{
          mt: 3,
          fontWeight: 'bold',
          color: '#0f172a',
        }}
      >
        Total Members : {members.length}
      </Typography>
    </Box>
  );
}