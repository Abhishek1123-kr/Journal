import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import PollIcon from '@mui/icons-material/PollOutlined';
import HowToVoteIcon from '@mui/icons-material/HowToVoteOutlined';
import ShieldIcon from '@mui/icons-material/ShieldOutlined';
import DnsIcon from '@mui/icons-material/DnsOutlined';

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Active Elections / Proposals',
      value: '1 Active',
      icon: <PollIcon sx={{ color: '#00F2FE' }} />,
      borderColor: 'rgba(0, 242, 254, 0.2)',
      bg: 'rgba(0, 242, 254, 0.05)',
      badge: 'Preprod Ledger',
      badgeColor: '#00F2FE',
    },
    {
      title: 'Total ZK Shielded Votes',
      value: '9 Verified',
      icon: <HowToVoteIcon sx={{ color: '#00FF88' }} />,
      borderColor: 'rgba(0, 255, 136, 0.2)',
      bg: 'rgba(0, 255, 136, 0.05)',
      badge: 'Zero-Knowledge',
      badgeColor: '#00FF88',
    },
    {
      title: 'Private Witness Privacy',
      value: 'Enabled',
      icon: <ShieldIcon sx={{ color: '#E100FF' }} />,
      borderColor: 'rgba(127, 0, 255, 0.2)',
      bg: 'rgba(127, 0, 255, 0.05)',
      badge: 'Secret Key Protected',
      badgeColor: '#E100FF',
    },
    {
      title: 'Network & Proof Server',
      value: 'Online',
      icon: <DnsIcon sx={{ color: '#FFB800' }} />,
      borderColor: 'rgba(255, 184, 0, 0.2)',
      bg: 'rgba(255, 184, 0, 0.05)',
      badge: 'Port 6300 Active',
      badgeColor: '#FFB800',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
        gap: 2.5,
        width: '100%',
        mb: 4,
      }}
    >
      {stats.map((stat, idx) => (
        <Paper
          key={idx}
          sx={{
            p: 2.5,
            borderRadius: 4,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${stat.borderColor}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: stat.badgeColor,
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2.5,
                backgroundColor: stat.bg,
                display: 'flex',
              }}
            >
              {stat.icon}
            </Box>
            <Chip
              label={stat.badge}
              size="small"
              sx={{
                backgroundColor: stat.bg,
                color: stat.badgeColor,
                fontSize: '0.7rem',
                fontWeight: 700,
                height: 22,
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500, display: 'block', mb: 0.5 }}>
            {stat.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#F8FAFC' }}>
            {stat.value}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};
