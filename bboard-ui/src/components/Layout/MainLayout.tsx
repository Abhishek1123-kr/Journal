import React from 'react';
import { Box, Container } from '@mui/material';
import { BackgroundCanvas } from './BackgroundCanvas';
import { ScrollProgressBar } from './ScrollProgressBar';
import { Navbar } from '../Landing/Navbar';
import { Footer } from '../Landing/Footer';

export interface MainLayoutProps extends React.PropsWithChildren {
  onNavigateSection?: (id: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavigateSection }) => {
  const handleNavigate = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
      {/* Scroll Progress Bar at Top */}
      <ScrollProgressBar />

      {/* Particle Constellation Background Canvas */}
      <BackgroundCanvas />

      {/* Animated Floating Ambient Background Mesh Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '-8%',
          left: '12%',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.16) 0%, rgba(0, 242, 254, 0) 70%)',
          filter: 'blur(80px)',
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
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(168, 85, 247, 0) 70%)',
          filter: 'blur(90px)',
          animation: 'floatGlow 10s ease-in-out infinite 2s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Transparent Sticky Glass Navbar */}
      <Navbar onNavigateSection={handleNavigate} />

      {/* Main Container Content Area */}
      <Container maxWidth="xl" sx={{ flex: 1, py: 4, position: 'relative', zIndex: 1, px: { xs: 2, md: 4 } }}>
        {children}
      </Container>

      {/* Premium Multi-Column Footer */}
      <Footer />
    </Box>
  );
};
