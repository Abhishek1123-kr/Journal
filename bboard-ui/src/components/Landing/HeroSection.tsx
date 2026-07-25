import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, LockKeyhole, Sparkles, PlusCircle, ArrowRight, ChevronDown, Lock } from 'lucide-react';

export interface HeroSectionProps {
  onDeployClick: () => void;
  onViewDashboardClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDeployClick,
  onViewDashboardClick,
}) => {
  return (
    <Box
      id="section-overview"
      sx={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        py: 8,
      }}
    >
      {/* Floating 3D ZK Security Cubes Background Graphics */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 70,
          height: 70,
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(127,0,255,0.15) 100%)',
          border: '1px solid rgba(0,242,254,0.3)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          boxShadow: '0 0 30px rgba(0,242,254,0.2)',
        }}
      >
        <Lock size={28} color="#00F2FE" />
      </motion.div>

      <motion.div
        animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '5%',
          width: 80,
          height: 80,
          borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(16,185,129,0.15) 100%)',
          border: '1px solid rgba(168,85,247,0.3)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          boxShadow: '0 0 30px rgba(168,85,247,0.2)',
        }}
      >
        <Shield size={32} color="#C084FC" />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 900, width: '100%' }}
      >
        {/* Category Pill Badges */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 3, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip
            icon={<Shield size={14} color="#00F2FE" />}
            label="Zero-Knowledge Enabled"
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 242, 254, 0.1)',
              color: '#00F2FE',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              fontWeight: 700,
              boxShadow: '0 0 15px rgba(0, 242, 254, 0.15)',
              px: 1,
              '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
            }}
          />
          <Chip
            icon={<LockKeyhole size={14} color="#10B981" />}
            label="Local Witness Privacy"
            size="small"
            sx={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10B981',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontWeight: 700,
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)',
              px: 1,
              '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
            }}
          />
          <Chip
            icon={<Sparkles size={14} color="#C084FC" />}
            label="Midnight Preprod"
            size="small"
            sx={{
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              color: '#C084FC',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              fontWeight: 700,
              px: 1,
              '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
            }}
          />
        </Box>

        {/* Hero Title */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #00F2FE 40%, #A855F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2.5,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.2rem' },
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}
        >
          Midnight Private Journal
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: '#F8FAFC',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.2rem', md: '1.5rem' },
          }}
        >
          Secure, Private, and Verifiable Journaling on Midnight Network
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: 720,
            mx: 'auto',
            color: '#94A3B8',
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.7,
            mb: 4.5,
          }}
        >
          Your data. Your keys. Your privacy. Record personal entries with cryptographically shielded Zero-Knowledge witness ownership assertions.
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2.5, justifyContent: 'center', mb: 6 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlusCircle size={20} />}
              onClick={onDeployClick}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '1.05rem',
                px: 4,
                py: 1.8,
                borderRadius: 3.5,
                boxShadow: '0 12px 30px -5px rgba(0, 242, 254, 0.4), 0 0 20px rgba(127, 0, 255, 0.3)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shimmerSheen 3s infinite',
                },
              }}
            >
              Deploy New Journal
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowRight size={20} />}
              onClick={onViewDashboardClick}
              sx={{
                borderRadius: 3.5,
                borderColor: 'rgba(255, 255, 255, 0.18)',
                color: '#F8FAFC',
                fontWeight: 700,
                fontSize: '1.05rem',
                px: 4,
                py: 1.8,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                '&:hover': {
                  borderColor: '#A855F7',
                  color: '#C084FC',
                  backgroundColor: 'rgba(168, 85, 247, 0.12)',
                  boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)',
                },
              }}
            >
              View Dashboard
            </Button>
          </motion.div>
        </Box>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ cursor: 'pointer', opacity: 0.7 }}
        onClick={onViewDashboardClick}
      >
        <ChevronDown size={28} color="#00F2FE" />
      </motion.div>
    </Box>
  );
};
