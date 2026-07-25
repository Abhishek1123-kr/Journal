import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Vote, ShieldCheck, Lock, Radio } from 'lucide-react';

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      label: 'Active Proposals / Journals',
      value: '1 Active',
      subtext: 'Preprod Ledger',
      icon: <Vote size={22} color="#00F2FE" />,
      color: '#00F2FE',
      borderColor: 'rgba(0, 242, 254, 0.4)',
      bgGlow: 'rgba(0, 242, 254, 0.08)',
    },
    {
      label: 'Total ZK Shielded Votes',
      value: '9 Verified',
      subtext: 'Zero-Knowledge',
      icon: <ShieldCheck size={22} color="#10B981" />,
      color: '#10B981',
      borderColor: 'rgba(16, 185, 129, 0.4)',
      bgGlow: 'rgba(16, 185, 129, 0.08)',
    },
    {
      label: 'Private Witness Privacy',
      value: 'Enabled',
      subtext: 'Secret Key Protected',
      icon: <Lock size={22} color="#A855F7" />,
      color: '#A855F7',
      borderColor: 'rgba(168, 85, 247, 0.4)',
      bgGlow: 'rgba(168, 85, 247, 0.08)',
    },
    {
      label: 'Network & Proof Server',
      value: 'Online',
      subtext: 'Port 6300 Active',
      icon: <Radio size={22} color="#6366F1" />,
      color: '#6366F1',
      borderColor: 'rgba(99, 102, 241, 0.4)',
      bgGlow: 'rgba(99, 102, 241, 0.08)',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
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
          whileHover={{ y: -6, scale: 1.02 }}
        >
          <Paper
            sx={{
              p: 3,
              position: 'relative',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${stat.borderColor}`,
              // Unique Cyberpunk Chamfered Tech Shape
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              boxShadow: `0 15px 35px -10px rgba(0,0,0,0.7), inset 0 0 15px ${stat.bgGlow}`,
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: `0 20px 40px -10px ${stat.bgGlow}, 0 0 30px ${stat.borderColor}`,
              },
            }}
          >
            {/* Cyberpunk Top-Right Glowing Corner Bracket Accent */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 14,
                height: 14,
                borderTop: `2px solid ${stat.color}`,
                borderRight: `2px solid ${stat.color}`,
                boxShadow: `0 0 10px ${stat.color}`,
              }}
            />

            {/* Header row with icon & status pill */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  backgroundColor: stat.bgGlow,
                  border: `1px solid ${stat.color}35`,
                  display: 'flex',
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  color: stat.color,
                  backgroundColor: stat.bgGlow,
                  px: 1.2,
                  py: 0.4,
                  borderRadius: 2,
                  border: `1px solid ${stat.color}30`,
                }}
              >
                {stat.subtext}
              </Typography>
            </Box>

            {/* Stat metric value & label */}
            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block', mb: 0.5 }}>
              {stat.label}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: '#F8FAFC',
                fontSize: { xs: '1.6rem', md: '1.9rem' },
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </Typography>
          </Paper>
        </motion.div>
      ))}
    </Box>
  );
};
