import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, LockKeyhole, Sparkles } from 'lucide-react';
import { Header } from './Header';

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#080A10',
        position: 'relative',
        overflow: 'hidden',
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Animated Floating Ambient Background Mesh Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '-8%',
          left: '12%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.18) 0%, rgba(0, 242, 254, 0) 70%)',
          filter: 'blur(75px)',
          animation: 'floatGlow 8s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '8%',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(168, 85, 247, 0) 70%)',
          filter: 'blur(85px)',
          animation: 'floatGlow 10s ease-in-out infinite 2s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Header />

      <Container maxWidth="lg" sx={{ py: 6, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Hero Banner Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                }}
              />
            </Box>

            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #00F2FE 50%, #C084FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.2rem', md: '3.1rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              Midnight Private Journal DApp
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: 720,
                mx: 'auto',
                color: '#94A3B8',
                fontSize: { xs: '0.98rem', md: '1.1rem' },
                lineHeight: 1.7,
              }}
            >
              Securely record, verify, and manage on-chain journal entries using Zero-Knowledge proofs. Prove key ownership without disclosing client secret keys to the network.
            </Typography>
          </motion.div>
        </Box>

        {/* Dynamic Contract Cards Grid Container */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          {children}
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3.5,
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#64748B',
          fontSize: '0.85rem',
          backgroundColor: 'rgba(8, 10, 16, 0.9)',
          backdropFilter: 'blur(16px)',
        }}
      >
        Built for Midnight Network Challenge • Powered by Compact ZK Language & Midnight DApp Connector
      </Box>
    </Box>
  );
};
