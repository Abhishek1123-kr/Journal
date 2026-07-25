import React from 'react';
import { Box, Container, Typography, Link, Chip } from '@mui/material';
import { Shield, Sparkles } from 'lucide-react';
import GithubIcon from '@mui/icons-material/GitHub';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(5, 7, 12, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        pt: 8,
        pb: 4,
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '2fr 1fr 1fr 1.5fr' },
            gap: 5,
            mb: 6,
          }}
        >
          {/* Brand Column */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <img src="/midnight-logo.png" alt="Midnight Logo" height={36} style={{ filter: 'drop-shadow(0 0 10px rgba(0,242,254,0.4))' }} />
              <Chip
                icon={<Shield size={13} color="#00F2FE" />}
                label="ZK Private Journal"
                size="small"
                sx={{
                  backgroundColor: 'rgba(0, 242, 254, 0.1)',
                  color: '#00F2FE',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  fontWeight: 700,
                  px: 1,
                  '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.7, maxWidth: 320, mb: 3 }}>
              Production-grade Web3 private journaling and voting application built on Midnight Network with Zero-Knowledge proofs and local witness encryption.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                icon={<Sparkles size={13} color="#10B981" />}
                label="Midnight Preprod Verified"
                size="small"
                sx={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.3)' }}
              />
            </Box>
          </Box>

          {/* Column 1: Navigation */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 800, mb: 2.5, letterSpacing: '0.05em' }}>
              PRODUCT
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="#section-overview" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#00F2FE' } }}>
                Overview
              </Link>
              <Link href="#section-features" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#00F2FE' } }}>
                Features
              </Link>
              <Link href="#section-how-it-works" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#00F2FE' } }}>
                How It Works
              </Link>
              <Link href="#section-privacy" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#00F2FE' } }}>
                Privacy Hub
              </Link>
            </Box>
          </Box>

          {/* Column 2: Specs & Tech */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 800, mb: 2.5, letterSpacing: '0.05em' }}>
              SPECIFICATIONS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="#section-architecture" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#00F2FE' } }}>
                Compact ZK Circuit
              </Link>
              <Link href="#section-architecture" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#00F2FE' } }}>
                Proof Server Port 6300
              </Link>
              <Link href="https://github.com/Abhishek1123-kr/Journal" target="_blank" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#00F2FE' } }}>
                GitHub Repository
              </Link>
              <Link href="#section-faq" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: '#00F2FE' } }}>
                FAQ & Docs
              </Link>
            </Box>
          </Box>

          {/* Column 3: Community */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 800, mb: 2.5, letterSpacing: '0.05em' }}>
              COMMUNITY & NETWORK
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
              Built for Midnight Network Challenge Level 3. Source code available under MIT License.
            </Typography>
            <Link
              href="https://github.com/Abhishek1123-kr/Journal"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: '#00F2FE',
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              <GithubIcon sx={{ fontSize: 18 }} /> View Source Code on GitHub
            </Link>
          </Box>
        </Box>

        {/* Bottom Copyright */}
        <Box
          sx={{
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            © 2026 Midnight Private Journal DApp. Built with Compact ZK Language & Midnight DApp Connector API.
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748B' }}>
            Preprod Network • Zero-Knowledge Enabled
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
