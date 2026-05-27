import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export default function BalanceSheetView({ members = [] }) {

  // Paid members only
  const paidMembers = members.filter(
    (member) => member.paymentStatus === 'Paid'
  );

  // Balance entries
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('balanceEntries');
    return saved ? JSON.parse(saved) : [];
  });

  // Form state
  const [selectedMember, setSelectedMember] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      'balanceEntries',
      JSON.stringify(entries)
    );
  }, [entries]);

  // Add Entry
  const handleAddEntry = () => {
    if (!selectedMember || !amount || !paymentDate) {
      return;
    }

    const newEntry = {
      memberName: selectedMember,
      amount: Number(amount), // Ensure it is treated as a number
      paymentDate,
    };

    setEntries([...entries, newEntry]);

    // Reset fields
    setSelectedMember('');
    setAmount('');
    setPaymentDate('');
    setSelectedIndex(null);
  };

  // Delete Entry
  const handleDelete = () => {
    if (selectedIndex === null) {
      return;
    }

    const updated = entries.filter(
      (_, i) => i !== selectedIndex
    );

    setEntries(updated);
    setSelectedIndex(null);
  };

  // --- Dynamic Calculation Logic Fixes ---
  
  // 1. Total Paid (Only for the currently selected member)
  const selectedMemberTotal = entries
    .filter((entry) => entry.memberName === selectedMember)
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // 2. All Members Total (Combined sum of everything)
  const allMembersTotal = entries.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <Box>

      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#0f172a',
          mb: 1,
        }}
      >
        Balance Sheet Management
      </Typography>

      <Typography
        sx={{
          color: '#64748b',
          mb: 4,
        }}
      >
        Manage payment ledger records for paid members.
      </Typography>

      {/* Top Controls */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 3,
        }}
      >

        {/* Member Select */}
        <Box>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#1e293b',
            }}
          >
            Select Paid Member
          </Typography>

          <Select
            value={selectedMember}
            onChange={(e) => {
              setSelectedMember(e.target.value);
              setSelectedIndex(null); // Reset selection highlight on change
            }}
            displayEmpty
            sx={{
              width: '290px',
              height: '42px',
              bgcolor: '#ffffff',
            }}
          >
            <MenuItem value="">
              Select Member
            </MenuItem>

            {paidMembers.map((member, index) => (
              <MenuItem
                key={index}
                value={`${member.firstName} ${member.lastName}`}
              >
                {member.firstName} {member.lastName}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Amount */}
        <Box>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#1e293b',
            }}
          >
            Amount
          </Typography>

          <TextField
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            size="small"
          />
        </Box>

        {/* Date */}
        <Box>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#1e293b',
            }}
          >
            Payment Date
          </Typography>

          <TextField
            type="date"
            value={paymentDate}
            onChange={(e) =>
              setPaymentDate(e.target.value)
            }
            size="small"
          />
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={handleAddEntry}
            sx={{
              bgcolor: '#0f766e',
              '&:hover': {
                bgcolor: '#115e59',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              px: 4,
            }}
          >
            Update
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              px: 4,
            }}
          >
            Delete Selected
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Paper
        sx={{
          height: '540px',
          overflowY: 'auto',
          border: '1px solid #cbd5e1',
        }}
      >
        <Table stickyHeader>

          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  bgcolor: '#e2e8f0',
                }}
              >
                Member Name
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  bgcolor: '#e2e8f0',
                }}
              >
                Amount
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  bgcolor: '#e2e8f0',
                }}
              >
                Payment Date
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {entries.map((entry, originalIndex) => {
              // Determine visibility based on selected filter
              const isVisible = selectedMember 
                ? entry.memberName === selectedMember
                : true;

              if (!isVisible) return null;

              return (
                <TableRow
                  key={originalIndex}
                  hover
                  onClick={() => setSelectedIndex(originalIndex)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor:
                      selectedIndex === originalIndex
                        ? '#dbeafe'
                        : 'transparent',
                    '&:hover': {
                      bgcolor:
                        selectedIndex === originalIndex
                          ? '#dbeafe'
                          : '#f8fafc',
                    },
                  }}
                >
                  <TableCell align="center">
                    {entry.memberName}
                  </TableCell>

                  <TableCell align="center">
                    ₹{Number(entry.amount)}
                  </TableCell>

                  <TableCell align="center">
                    {entry.paymentDate}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </Paper>

      {/* Bottom Totals */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            color: '#0f766e',
            fontWeight: 'bold',
            fontSize: '1.6rem',
          }}
        >
          Total Paid: ₹{selectedMemberTotal}
        </Typography>

        <Typography
          sx={{
            color: '#0f172a',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          All Members Total: ₹{allMembersTotal.toFixed(2)}
        </Typography>
      </Box>

    </Box>
  );
}