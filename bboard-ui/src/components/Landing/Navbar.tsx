import React, { useState, useEffect } from 'react';
import { Box, Chip, Button, Link, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Cpu } from 'lucide-react';
import GithubIcon from '@mui/icons-material/GitHub';

export interface NavbarProps {
  onNavigateSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'section-overview', label: 'Overview' },
    { id: 'section-features', label: 'Features' },
    { id: 'section-how-it-works', label: 'How It Works' },
    { id: 'section-privacy', label: 'Privacy Hub' },
    { id: 'section-architecture', label: 'Architecture' },
    { id: 'section-faq', label: 'FAQ' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: isScrolled ? 'rgba(8, 10, 16, 0.85)' : 'rgba(8, 10, 16, 0.5)',
          backdropFilter: 'blur(20px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          py: 1.8,
          boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.8)' : 'none',
        }}
      >
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => onNavigateSection('section-overview')}>
            <motion.img
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              src="/midnight-logo.png"
              alt="Midnight Network"
              height={38}
              style={{ filter: 'drop-shadow(0 0 12px rgba(0,242,254,0.4))' }}
            />
            <Chip
              icon={<Shield size={14} color="#00F2FE" />}
              label="ZK Private Journal"
              size="small"
              sx={{
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                borderColor: 'rgba(0, 242, 254, 0.3)',
                borderWidth: 1,
                borderStyle: 'solid',
                color: '#00F2FE',
                fontWeight: 700,
                display: { xs: 'none', lg: 'inline-flex' },
                px: 1,
                '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
              }}
            />
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            {navLinks.map((link) => (
              <Box
                key={link.id}
                onClick={() => onNavigateSection(link.id)}
                sx={{
                  color: '#94A3B8',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#00F2FE' },
                }}
              >
                {link.label}
              </Box>
            ))}
          </Box>

          {/* Status Badges & GitHub Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
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
                display: { xs: 'none', sm: 'inline-flex' },
                px: 1,
                '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
              }}
            />

            <Chip
              icon={<Cpu size={14} color="#C084FC" />}
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
        </Container>
      </Box>
    </motion.header>
  );
};
