import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { BarChart3, Vote, ShieldCheck, Server } from 'lucide-react';

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Active Elections / Proposals',
      value: '1 Active',
      icon: <BarChart3 size={20} color="#00F2FE" />,
      borderColor: 'rgba(0, 242, 254, 0.25)',
      bg: 'rgba(0, 242, 254, 0.08)',
      badge: 'Preprod Ledger',
      badgeColor: '#00F2FE',
    },
    {
      title: 'Total ZK Shielded Votes',
      value: '9 Verified',
      icon: <Vote size={20} color="#10B981" />,
      borderColor: 'rgba(16, 185, 129, 0.25)',
      bg: 'rgba(16, 185, 129, 0.08)',
      badge: 'Zero-Knowledge',
      badgeColor: '#10B981',
    },
    {
      title: 'Private Witness Privacy',
      value: 'Enabled',
      icon: <ShieldCheck size={20} color="#A855F7" />,
      borderColor: 'rgba(168, 85, 247, 0.25)',
      bg: 'rgba(168, 85, 247, 0.08)',
      badge: 'Secret Key Protected',
      badgeColor: '#C084FC',
    },
    {
      title: 'Network & Proof Server',
      value: 'Online',
      icon: <Server size={20} color="#F59E0B" />,
      borderColor: 'rgba(245, 158, 11, 0.25)',
      bg: 'rgba(245, 158, 11, 0.08)',
      badge: 'Port 6300 Active',
      badgeColor: '#F59E0B',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
        gap: 2.5,
        width: '100%',
        mb: 5,
      }}
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${stat.borderColor}`,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                borderColor: stat.badgeColor,
                boxShadow: `0 20px 40px -10px ${stat.bg}, 0 0 25px ${stat.borderColor}`,
              },
            }}
          >
            {/* Top Stat Bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.8 }}>
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 3,
                  backgroundColor: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 15px ${stat.bg}`,
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
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  height: 22,
                  border: `1px solid ${stat.borderColor}`,
                }}
              />
            </Box>

            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block', mb: 0.5, letterSpacing: '0.01em' }}>
              {stat.title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
              {stat.value}
            </Typography>
          </Paper>
        </motion.div>
      ))}
    </Box>
  );
};
