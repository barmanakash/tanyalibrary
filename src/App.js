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
  Select,
  MenuItem,
  FormControl
} from '@mui/material';

import {
  PersonAdd as PersonAddIcon,
  ExitToApp as ExitToAppIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import { COLORS } from './styles/theme';
import LoginView from './views/LoginView';
import SeatsLayoutView from './views/SeatsLayoutView';
import FinanceTrackerView from './views/FinanceTrackerView';
import BalanceSheetView from './views/BalanceSheetView';

// Helper for initial form state structure
const initialFormState = {
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  address: '',
  joiningDate: '',
  seat: '',
  status: 'Active',
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('All Members');
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);

  // Distinguish form submissions between additions vs profile edits
  const [isEditMode, setIsEditMode] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem('libraryMembers');
    return savedMembers
      ? JSON.parse(savedMembers)
      : [
          {
            firstName: 'Akash',
            lastName: 'Barman',
            phone: '9876543210',
            dob: '1999-01-01',
            address: 'Jabalpur',
            joiningDate: '2026-01-01',
            seat: '12',
            status: 'Active',
            paymentStatus: 'Unpaid',
          },
        ];
  });

  // Keep persistent state synchronized with changes
  useEffect(() => {
    localStorage.setItem('libraryMembers', JSON.stringify(members));
  }, [members]);

  // Form Field Tracking States
  const [memberData, setMemberData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Operational Fields Validators
  const validateFirstName = (value) => {
    if (!value) return 'First Name is required';
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return 'First Name must contain only alphabetic characters';
    }
    return '';
  };

  const validateLastName = (value) => {
    if (!value) return 'Last Name is required';
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return 'Last Name must contain only alphabetic characters';
    }
    return '';
  };

  const validateDOB = (value) => {
    if (!value) return 'Date of Birth is required';
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate.getTime() === today.getTime()) {
      return 'Date of Birth cannot be today';
    }
    if (selectedDate.getFullYear() >= 2010) {
      return 'Date of Birth must be before 2010';
    }
    return '';
  };

  const validatePhone = (value) => {
    if (!value) return 'Phone Number is required';
    if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
      return 'Phone Number must be exactly 10 digits';
    }
    return '';
  };

  const validateSeat = (value) => {
    if (!value) return 'Seat is required';
    const seatNum = parseInt(value);
    if (isNaN(seatNum) || seatNum < 1 || seatNum > 50) {
      return 'Seat number must be between 1 and 50';
    }
    
    // Check if the target seat is already occupied by someone else
    const isBooked = members.some(
      (member, idx) => parseInt(member.seat) === seatNum && idx !== selectedMemberIndex && member.status === 'Active'
    );
    if (isBooked && memberData.status === 'Active') {
      return 'This seat is already booked. Please select an empty seat.';
    }
    return '';
  };

  const validateAddress = (value) => {
    if (!value) return 'Address is required';
    return '';
  };

  const validateJoiningDate = (value) => {
    if (!value) return 'Joining Date is required';
    return '';
  };

  // Open Form Handler for adding a fresh record
  const handleOpenForm = () => {
    setIsEditMode(false);
    setMemberData(initialFormState);
    setOpenForm(true);
    setErrors({});
  };

  // Open Form Handler for mutating a selected record
  const handleOpenEditForm = () => {
    if (selectedMemberIndex !== null) {
      setIsEditMode(true);
      const targetMember = members[selectedMemberIndex];
      setMemberData({
        firstName: targetMember.firstName || '',
        lastName: targetMember.lastName || '',
        dob: targetMember.dob || '',
        phone: targetMember.phone || '',
        address: targetMember.address || '',
        joiningDate: targetMember.joiningDate || '',
        seat: targetMember.seat || '',
        status: targetMember.status || 'Active',
      });
      setOpenForm(true);
      setErrors({});
    }
  };

  // Safe-closing execution
  const handleCloseForm = () => {
    setOpenForm(false);
    setErrors({});
    setMemberData(initialFormState);
  };

  // Interactive UI Change Listeners
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({
      ...memberData,
      [name]: value,
    });

    let error = '';
    if (name === 'firstName') error = validateFirstName(value);
    if (name === 'lastName') error = validateLastName(value);
    if (name === 'dob') error = validateDOB(value);
    if (name === 'phone') error = validatePhone(value);
    if (name === 'address') error = validateAddress(value);
    if (name === 'joiningDate') error = validateJoiningDate(value);
    if (name === 'seat') error = validateSeat(value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Direct state mutation handler dedicated to the dropdown select field
  const handleStatusChange = (e) => {
    setMemberData({
      ...memberData,
      status: e.target.value
    });
  };

  // Central submission hub logic
  const handleSubmit = () => {
    const newErrors = {
      firstName: validateFirstName(memberData.firstName),
      lastName: validateLastName(memberData.lastName),
      dob: validateDOB(memberData.dob),
      phone: validatePhone(memberData.phone),
      address: validateAddress(memberData.address),
      joiningDate: validateJoiningDate(memberData.joiningDate),
      seat: validateSeat(memberData.seat),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasErrors) {
      return;
    }

    if (isEditMode && selectedMemberIndex !== null) {
      const updatedMembers = [...members];
      updatedMembers[selectedMemberIndex] = {
        ...updatedMembers[selectedMemberIndex],
        ...memberData,
      };
      setMembers(updatedMembers);
    } else {
      setMembers([
        ...members,
        {
          ...memberData,
          paymentStatus: 'Unpaid',
        },
      ]);
    }

    // Tear down panel states cleanly
    setMemberData(initialFormState);
    setErrors({});
    setSelectedMemberIndex(null);
    setOpenForm(false);
  };

  // Deletion logic execution
  const handleRemoveMember = () => {
    if (selectedMemberIndex !== null) {
      const newMembers = members.filter((_, index) => index !== selectedMemberIndex);
      setMembers(newMembers);
      setSelectedMemberIndex(null);
      setOpenRemoveConfirm(false);
    }
  };

  const handleRemoveClick = () => {
    if (selectedMemberIndex !== null) {
      setOpenRemoveConfirm(true);
    }
  };

  // Strict dynamic isolation layer: masks out inactive entities for layouts and financial operations
  const activeMembersOnly = members.filter((member) => member.status === 'Active');

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
      {/* Top Navigation Strip */}
      <Box
        sx={{
          height: '60px',
          bgcolor: COLORS.sidebarBg,
          display: 'flex',
          alignItems: 'center',
          px: 3,
          gap: 2,
          borderBottom: '1px solid #1e293b',
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

        {/* Dynamic Context Update Profile Trigger */}
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleOpenEditForm}
          disabled={selectedMemberIndex === null}
          sx={{
            marginLeft: 'auto',
            bgcolor: selectedMemberIndex !== null ? COLORS.tealMain : '#cbd5e1',
            '&:hover': { bgcolor: selectedMemberIndex !== null ? COLORS.tealHover : '#cbd5e1' },
            textTransform: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
          }}
        >
          Update Member
        </Button>

        {/* Selected Destruction Controller */}
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleRemoveClick}
          disabled={selectedMemberIndex === null}
          sx={{
            bgcolor: selectedMemberIndex !== null ? '#ef4444' : '#cbd5e1',
            '&:hover': { bgcolor: selectedMemberIndex !== null ? '#dc2626' : '#cbd5e1' },
            textTransform: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
          }}
        >
          Remove Selected
        </Button>

        {/* Registration Creation Link */}
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleOpenForm}
          sx={{
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

      {/* Shared Adaptive Dialog Wrapper Form */}
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
          {isEditMode ? 'Update Member Profile' : 'Enroll New Member'}
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
              <Typography sx={labelStyle}>First Name *</Typography>
              <TextField
                fullWidth
                name="firstName"
                value={memberData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                sx={inputStyle}
              />
              {errors.firstName && (
                <Typography sx={{ color: '#dc2626', fontSize: '0.8rem', mt: 0.5 }}>
                  {errors.firstName}
                </Typography>
              )}
            </Box>

            {/* Last Name */}
            <Box>
              <Typography sx={labelStyle}>Last Name *</Typography>
              <TextField
                fullWidth
                name="lastName"
                value={memberData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                sx={inputStyle}
              />
              {errors.lastName && (
                <Typography sx={{ color: '#dc2626', fontSize: '0.8rem', mt: 0.5 }}>
                  {errors.lastName}
                </Typography>
              )}
            </Box>

            {/* Date of Birth */}
            <Box>
              <Typography sx={labelStyle}>Date of Birth * (dd-mm-yyyy)</Typography>
              <TextField
                type="date"
                fullWidth
                name="dob"
                value={memberData.dob}
                onChange={handleChange}
                error={!!errors.dob}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
              {errors.dob && (
                <Typography sx={{ color: '#dc2626', fontSize: '0.8rem', mt: 0.5 }}>
                  {errors.dob}
                </Typography>
              )}
            </Box>

            {/* Phone Number */}
            <Box>
              <Typography sx={labelStyle}>Phone Number * (10 Digits Only)</Typography>
              <TextField
                fullWidth
                name="phone"
                value={memberData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                sx={inputStyle}
              />
              {errors.phone && (
                <Typography sx={{ color: '#dc2626', fontSize: '0.8rem', mt: 0.5 }}>
                  {errors.phone}
                </Typography>
              )}
            </Box>

            {/* Address */}
            <Box>
              <Typography sx={labelStyle}>Address Details *</Typography>
              <TextField
                fullWidth
                name="address"
                value={memberData.address}
                onChange={handleChange}
                error={!!errors.address}
                sx={inputStyle}
              />
              {errors.address && (
                <Typography sx={{ color: '#dc2626', fontSize: '0.8rem', mt: 0.5 }}>
                  {errors.address}
                </Typography>
              )}
            </Box>

            {/* Joining Date */}
            <Box>
              <Typography sx={labelStyle}>Joining Operational Date *</Typography>
              <TextField
                type="date"
                fullWidth
                name="joiningDate"
                value={memberData.joiningDate}
                onChange={handleChange}
                error={!!errors.joiningDate}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
              {errors.joiningDate && (
                <Typography sx={{ color: '#dc2626', fontSize: '0.8rem', mt: 0.5 }}>
                  {errors.joiningDate}
                </Typography>
              )}
            </Box>

            {/* Seat Field */}
            <Box>
              <Typography sx={labelStyle}>Assigned Seat Track * (1-50)</Typography>
              <TextField
                fullWidth
                name="seat"
                value={memberData.seat}
                onChange={handleChange}
                error={!!errors.seat}
                sx={inputStyle}
              />
              {errors.seat && (
                <Typography sx={{ color: '#dc2626', fontSize: '0.8rem', mt: 0.5 }}>
                  {errors.seat}
                </Typography>
              )}
            </Box>

            {/* Robust Material UI Menu Dropdown Component Selection */}
            <Box>
              <Typography sx={labelStyle}>Initial System Status *</Typography>
              <FormControl fullWidth sx={inputStyle}>
                <Select
                  name="status"
                  value={memberData.status}
                  onChange={handleStatusChange}
                  displayEmpty
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
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
            {isEditMode ? 'Commit Updates' : 'Commit Registration'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Destruction Modal Dialog */}
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
            Are you sure you want to remove{' '}
            <strong>
              {selectedMemberIndex !== null &&
                members[selectedMemberIndex].firstName + ' ' + members[selectedMemberIndex].lastName}
            </strong>
            ?
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

      {/* Split Window Layout Context */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Navigation Control Center */}
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

            {['All Members', 'Seats Layout', 'Finance Tracker', 'Balance Sheet'].map((item) => {
              const isActive = currentView === item;

              return (
                <Box
                  key={item}
                  onClick={() => {
                    setCurrentView(item);
                    setSelectedMemberIndex(null); // Clear selections gracefully across switches
                  }}
                  sx={{
                    px: 3,
                    py: 1.5,
                    color: isActive ? '#ffffff' : '#94a3b8',
                    bgcolor: isActive ? COLORS.sidebarActive : 'transparent',
                    borderLeft: isActive ? `4px solid #ffffff` : '4px solid transparent',
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

          {/* Session Destruction Button */}
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

        {/* Display Container Engine */}
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

              {/* Master Ledger Grid */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#e2e8f0' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Seat</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
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
                          '&:hover': {
                            bgcolor: selectedMemberIndex === index ? '#e0f2fe' : '#f1f5f9',
                          },
                          transition: '0.1s',
                        }}
                      >
                        <TableCell>{member.firstName}</TableCell>
                        <TableCell>{member.lastName}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>{member.seat}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'inline-block',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              bgcolor: member.status === 'Active' ? '#dcfce7' : '#fee2e2',
                              color: member.status === 'Active' ? '#15803d' : '#b91c1c',
                            }}
                          >
                            {member.status}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Operational Area Injection Zones (Funnels only active profiles) */}
          {currentView === 'Seats Layout' && <SeatsLayoutView members={activeMembersOnly} />}
          
          {currentView === 'Finance Tracker' && (
            <FinanceTrackerView members={activeMembersOnly} setMembers={setMembers} />
          )}
          
          {currentView === 'Balance Sheet' && <BalanceSheetView members={activeMembersOnly} />}
        </Box>
      </Box>
    </Box>
  );
}

// Global Common Typography Styles
const labelStyle = {
  mb: 0.7,
  fontWeight: '700',
  color: '#1e293b',
  fontSize: '0.95rem',
};

// Global Input Theme System Configurations
const inputStyle = {
  borderRadius: '0px',
  bgcolor: '#fff',
};