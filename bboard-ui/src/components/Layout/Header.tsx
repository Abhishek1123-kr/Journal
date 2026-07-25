import React from 'react';
import { AppBar, Box, Chip, Link, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Cpu } from 'lucide-react';
import GithubIcon from '@mui/icons-material/GitHub';

export const Header: React.FC = () => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  >
    <AppBar
      position="sticky"
      data-testid="header"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(8, 10, 16, 0.75)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        px: { xs: 2, sm: 4, md: 6 },
        py: 1.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(0, 242, 254, 0.05)',
      }}
    >
      {/* Left Logo & ZK Shield Badge Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
        data-testid="header-logo"
      >
        <motion.img
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          transition={{ duration: 0.3 }}
          src="/midnight-logo.png"
          alt="Midnight Network Logo"
          height={38}
          style={{ filter: 'drop-shadow(0 0 12px rgba(0,242,254,0.4))', cursor: 'pointer' }}
        />

        <Chip
          icon={<Shield size={14} color="#00F2FE" />}
          label="ZK Private Journal"
          size="small"
          sx={{
            backgroundColor: 'rgba(0, 242, 254, 0.08)',
            borderColor: 'rgba(0, 242, 254, 0.3)',
            borderWidth: 1,
            borderStyle: 'solid',
            color: '#00F2FE',
            fontWeight: 700,
            letterSpacing: '0.02em',
            display: { xs: 'none', sm: 'inline-flex' },
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.15)',
          }}
        />
      </Box>

      {/* Right Network and Action Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
        {/* Pulsating Proof Server Status Pill */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1,
            px: 1.8,
            py: 0.6,
            borderRadius: 50,
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)',
          }}
        >
          <Box sx={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                opacity: 0.75,
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10B981',
              }}
            />
          </Box>
          <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
            Port 6300 Active
          </span>
        </Box>

        {/* Preprod Network Badge */}
        <Chip
          icon={<CheckCircle2 size={14} color="#00FF88" />}
          label="Preprod Network"
          size="small"
          sx={{
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            borderColor: 'rgba(0, 255, 136, 0.3)',
            borderWidth: 1,
            borderStyle: 'solid',
            color: '#00FF88',
            fontWeight: 700,
            px: 1,
            '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
          }}
        />

        {/* Wallet Status Badge */}
        <Chip
          icon={<Cpu size={14} color="#A855F7" />}
          label="1AM / Lace Ready"
          size="small"
          sx={{
            backgroundColor: 'rgba(168, 85, 247, 0.12)',
            borderColor: 'rgba(168, 85, 247, 0.35)',
            borderWidth: 1,
            borderStyle: 'solid',
            color: '#C084FC',
            fontWeight: 700,
            px: 1,
            '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
          }}
        />

        {/* GitHub Repo Button */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Button
            component={Link}
            href="https://github.com/Abhishek1123-kr/Journal"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<GithubIcon sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: 3,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              color: '#F8FAFC',
              fontWeight: 600,
              px: 2,
              py: 0.6,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                borderColor: '#00F2FE',
                color: '#00F2FE',
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                boxShadow: '0 0 20px rgba(0, 242, 254, 0.25)',
              },
            }}
          >
            GitHub
          </Button>
        </motion.div>
      </Box>
    </AppBar>
  </motion.div>
);
