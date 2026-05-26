import React from 'react';
import { Box, Typography } from '@mui/material';

export default function SeatsLayoutView({ members = [] }) {

  // Get booked seats from members data
  const bookedSeats = members.map((member) => Number(member.seat));

  // Total seats
  const totalSeats = 34;
  const bookedCount = bookedSeats.length;
  const availableCount = totalSeats - bookedCount;

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
        Seats Layout
      </Typography>

      {/* Seat Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 2,
        }}
      >
        {Array.from({ length: totalSeats }, (_, index) => {
          const seatNumber = index + 1;

          // Check if seat is booked
          const isBooked = bookedSeats.includes(seatNumber);

          return (
            <Box
              key={seatNumber}
              sx={{
                height: '90px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#ffffff',
                bgcolor: isBooked ? '#6b7280' : '#16a34a',
                boxShadow: 2,
                transition: '0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            >
              {/* Seat Number */}
              <Typography
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  lineHeight: 1,
                }}
              >
                {seatNumber}
              </Typography>

              {/* Member Name */}
              {isBooked && (
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    mt: 1,
                    textAlign: 'center',
                    px: 1,
                  }}
                >
                  {
                    members.find(
                      (member) => Number(member.seat) === seatNumber
                    )?.firstName
                  }{' '}
                  {
                    members.find(
                      (member) => Number(member.seat) === seatNumber
                    )?.lastName
                  }
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Legend */}
      {/* Legend */}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          mt: 4,
          flexWrap: 'wrap',
        }}
      >
        {/* Available */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: '#f1f5f9',
            px: 2,
            py: 1,
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: '#16a34a',
              borderRadius: '4px',
            }}
          />

          <Typography sx={{ fontWeight: '600' }}>
            Available Seats : {availableCount}
          </Typography>
        </Box>

        {/* Booked */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: '#f1f5f9',
            px: 2,
            py: 1,
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: '#6b7280',
              borderRadius: '4px',
            }}
          />

          <Typography sx={{ fontWeight: '600' }}>
            Booked Seats : {bookedCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}