import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import {
  PersonAdd as PersonAddIcon,
  ExitToApp as ExitToAppIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import { COLORS } from './styles/theme';
import LoginView from './views/LoginView';
import SeatsLayoutView from './views/SeatsLayoutView';
import FinanceTrackerView from './views/FinanceTrackerView';
import BalanceSheetView from './views/BalanceSheetView';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('All Members');
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);

  // Dialog State
  const [openForm, setOpenForm] = useState(false);

  // Members Table Data
  // const [members, setMembers] = useState(() => {
  //   // Load data from localStorage
  //   const savedMembers = localStorage.getItem('libraryMembers');

  //   return savedMembers
  //     ? JSON.parse(savedMembers)
  //     : [
  //       {
  //         firstName: 'Akash',
  //         lastName: 'Barman',
  //         phone: '9876543210',
  //         seat: '12',
  //         status: 'Active',
  //       },
  //     ];
  // });
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem('libraryMembers');

    return savedMembers
      ? JSON.parse(savedMembers)
      : [
        {
          firstName: 'Akash',
          lastName: 'Barman',
          phone: '9876543210',
          seat: '12',
          status: 'Active',
          paymentStatus: 'Unpaid',
        },
      ];
  });

  // Save Members to localStorage whenever members change
  useEffect(() => {
    localStorage.setItem('libraryMembers', JSON.stringify(members));
  }, [members]);

  // Form State
  const [memberData, setMemberData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    joiningDate: '',
    seat: '',
    status: 'Active',
  });

  // Open Form
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  // Close Form
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setMemberData({
      ...memberData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = () => {
    // Validation
    if (
      !memberData.firstName ||
      !memberData.lastName ||
      !memberData.phone ||
      !memberData.seat
    ) {
      alert('Please fill all required fields');
      return;
    }

    // Add New Member
    // setMembers([...members, memberData]);
    setMembers([
      ...members,
      {
        ...memberData,
        paymentStatus: 'Unpaid',
      },
    ]);

    // Reset Form
    setMemberData({
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      address: '',
      joiningDate: '',
      seat: '',
      status: 'Active',
    });

    // Close Dialog
    setOpenForm(false);
  };

  // Handle Remove Member
  const handleRemoveMember = () => {
    if (selectedMemberIndex !== null) {
      const newMembers = members.filter((_, index) => index !== selectedMemberIndex);
      setMembers(newMembers);
      localStorage.setItem('libraryMembers', JSON.stringify(newMembers));
      setSelectedMemberIndex(null);
      setOpenRemoveConfirm(false);
    }
  };

  // Handle Remove Button Click
  const handleRemoveClick = () => {
    if (selectedMemberIndex !== null) {
      setOpenRemoveConfirm(true);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#f8fafc',
      }}
    >
      {/* Top Navbar */}
     <Box
  sx={{
    height: '60px',
    bgcolor: COLORS.sidebarBg,
    display: 'flex',
    alignItems: 'center',
    px: 3,
    gap: 2,
    borderBottom: '1px solid #1e293b',
    // Removed justifyContent: "end" from here so text stays left
  }}
>
  <Typography
    variant="h6"
    sx={{
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: '1.1rem',
    }}
  >
    Tanya Library Study Zone
  </Typography>

  {/* Remove Selected Button - added marginLeft: 'auto' to push BOTH buttons to the right */}
  <Button
    variant="contained"
    startIcon={<DeleteIcon />}
    onClick={handleRemoveClick}
    disabled={selectedMemberIndex === null}
    sx={{
      marginLeft: 'auto', // <-- Pushes this button and everything after it to the right
      bgcolor: selectedMemberIndex !== null ? '#ef4444' : '#cbd5e1',
      '&:hover': { bgcolor: selectedMemberIndex !== null ? '#dc2626' : '#cbd5e1' },
      textTransform: 'none',
      fontSize: '0.85rem',
      fontWeight: '600',
    }}
  >
    Remove Selected
  </Button>

  {/* Add Member Button */}
  <Button
    variant="contained"
    startIcon={<PersonAddIcon />}
    onClick={handleOpenForm}
    sx={{
      // Removed marginLeft: 'auto' from here so it sits right next to the remove button
      bgcolor: COLORS.tealMain,
      '&:hover': { bgcolor: COLORS.tealHover },
      textTransform: 'none',
      fontSize: '0.85rem',
      fontWeight: '600',
    }}
  >
    Add New Member
  </Button>
</Box>

      {/* Add Member Form Dialog */}
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '4px',
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            fontSize: '2rem',
            color: '#0f172a',
            pb: 0,
          }}
        >
          Enroll New Member
        </DialogTitle>

        <Typography
          sx={{
            px: 3,
            color: '#64748b',
            fontSize: '0.95rem',
            mb: 2,
          }}
        >
          All fields are strictly mandatory.
        </Typography>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* First Name */}
            <Box>
              <Typography sx={labelStyle}>
                First Name *
              </Typography>

              <TextField
                fullWidth
                name="firstName"
                value={memberData.firstName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Box>

            {/* Last Name */}
            <Box>
              <Typography sx={labelStyle}>
                Last Name *
              </Typography>

              <TextField
                fullWidth
                name="lastName"
                value={memberData.lastName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Box>

            {/* Date of Birth */}
            <Box>
              <Typography sx={labelStyle}>
                Date of Birth * (dd-mm-yyyy)
              </Typography>

              <TextField
                type="date"
                fullWidth
                name="dob"
                value={memberData.dob}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Box>

            {/* Phone Number */}
            <Box>
              <Typography sx={labelStyle}>
                Phone Number * (10 Digits Only)
              </Typography>

              <TextField
                fullWidth
                name="phone"
                value={memberData.phone}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Box>

            {/* Address */}
            <Box>
              <Typography sx={labelStyle}>
                Address Details *
              </Typography>

              <TextField
                fullWidth
                name="address"
                value={memberData.address}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Box>

            {/* Joining Date */}
            <Box>
              <Typography sx={labelStyle}>
                Joining Operational Date *
              </Typography>

              <TextField
                type="date"
                fullWidth
                name="joiningDate"
                value={memberData.joiningDate}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Box>

            {/* Seat */}
            <Box>
              <Typography sx={labelStyle}>
                Assigned Seat Track * (1-34)
              </Typography>

              <TextField
                fullWidth
                name="seat"
                value={memberData.seat}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Box>

            {/* Status */}
            <Box>
              <Typography sx={labelStyle}>
                Initial System Status *
              </Typography>

              <TextField
                select
                fullWidth
                name="status"
                value={memberData.status}
                onChange={handleChange}
                SelectProps={{ native: true }}
                sx={inputStyle}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </TextField>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: '#0f766e',
              '&:hover': {
                bgcolor: '#115e59',
              },
              py: 1.5,
              borderRadius: '0px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            Commit Registration
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <Dialog
        open={openRemoveConfirm}
        onClose={() => setOpenRemoveConfirm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#0f172a' }}>
          Remove Member
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2, color: '#475569' }}>
            Are you sure you want to remove <strong>{selectedMemberIndex !== null && (members[selectedMemberIndex].firstName + ' ' + members[selectedMemberIndex].lastName)}</strong>?
          </Typography>
          <Typography sx={{ mt: 1.5, fontSize: '0.9rem', color: '#64748b' }}>
            This will also free the assigned seat and remove associated finance records.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenRemoveConfirm(false)}
            sx={{ textTransform: 'none', fontWeight: '600' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleRemoveMember}
            sx={{
              bgcolor: '#ef4444',
              '&:hover': { bgcolor: '#dc2626' },
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: '240px',
            bgcolor: COLORS.sidebarBg,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ pt: 2 }}>
            <Typography
              variant="caption"
              sx={{
                px: 3,
                color: '#475569',
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                display: 'block',
                mb: 1,
              }}
            >
              NAVIGATION MENU
            </Typography>

            {[
              'All Members',
              'Seats Layout',
              'Finance Tracker',
              'Balance Sheet',
            ].map((item) => {
              const isActive = currentView === item;

              return (
                <Box
                  key={item}
                  onClick={() => setCurrentView(item)}
                  sx={{
                    px: 3,
                    py: 1.5,
                    color: isActive ? '#ffffff' : '#94a3b8',
                    bgcolor: isActive
                      ? COLORS.sidebarActive
                      : 'transparent',
                    borderLeft: isActive
                      ? `4px solid #ffffff`
                      : '4px solid transparent',
                    cursor: 'pointer',
                    fontWeight: isActive ? '600' : 'normal',
                    fontSize: '0.95rem',
                    transition: '0.2s',
                    '&:hover': {
                      bgcolor: COLORS.sidebarActive,
                      color: '#ffffff',
                    },
                  }}
                >
                  {item}
                </Box>
              );
            })}
          </Box>

          {/* Logout */}
          <Box sx={{ p: 1 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ExitToAppIcon />}
              onClick={() => setIsAuthenticated(false)}
              sx={{
                bgcolor: COLORS.redMain,
                '&:hover': { bgcolor: COLORS.redHover },
                textTransform: 'none',
                justifyContent: 'flex-start',
                pl: 2,
                py: 1.2,
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Log Out
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto' }}>
          {currentView === 'All Members' && (
            <Box>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 'bold',
                  color: '#0f172a',
                }}
              >
                All Members
              </Typography>

              {/* Members Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#e2e8f0' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        First Name
                      </TableCell>

                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Last Name
                      </TableCell>

                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Phone
                      </TableCell>

                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Seat
                      </TableCell>

                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {members.map((member, index) => (
                      <TableRow 
                        key={index}
                        onClick={() => setSelectedMemberIndex(index)}
                        sx={{ 
                          cursor: 'pointer',
                          bgcolor: selectedMemberIndex === index ? '#e0f2fe' : 'transparent',
                          '&:hover': { bgcolor: selectedMemberIndex === index ? '#e0f2fe' : '#f1f5f9' },
                          transition: '0.1s',
                        }}
                      >
                        <TableCell>{member.firstName}</TableCell>
                        <TableCell>{member.lastName}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>{member.seat}</TableCell>
                        <TableCell>{member.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {currentView === 'Seats Layout' && (
            <SeatsLayoutView members={members} />
          )}
          {currentView === 'Finance Tracker' && (
            <FinanceTrackerView
              members={members}
              setMembers={setMembers}
            />
          )}
          {currentView === 'Balance Sheet' && (
            <BalanceSheetView members={members} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

// Common Label Style
const labelStyle = {
  mb: 0.7,
  fontWeight: '700',
  color: '#1e293b',
  fontSize: '0.95rem',
};

// Common Input Style
const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '0px',
    bgcolor: '#fff',
  },
};