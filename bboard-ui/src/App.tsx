import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  MainLayout,
  Board,
  DashboardStats,
  PrivacyExplanation,
  AnimatedSidebar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  ArchitectureSection,
  FaqSection,
  BlockchainLoader,
} from './components';
import { useDeployedBoardContext } from './hooks';
import { type BoardDeployment } from './contexts';
import { type Observable } from 'rxjs';

const App: React.FC = () => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployments, setBoardDeployments] = useState<Array<Observable<BoardDeployment>>>([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const subscription = boardApiProvider.boardDeployments$.subscribe(setBoardDeployments);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardApiProvider]);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId.replace('section-', ''));
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeployClick = () => {
    setIsDeploying(true);
    boardApiProvider.resolve();
    handleNavigateSection('section-proposals');
    setTimeout(() => setIsDeploying(false), 4500);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#080A10' }}>
      <BlockchainLoader isLoading={isDeploying} />
      <MainLayout onNavigateSection={handleNavigateSection}>
        {/* Section 01: Hero Section */}
        <HeroSection
          onDeployClick={handleDeployClick}
          onViewDashboardClick={() => handleNavigateSection('section-dashboard')}
        />

        {/* Section 02: Dashboard Workspace with Side Navigation Bar */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, width: '100%', alignItems: 'flex-start', mb: 8 }}>
          {/* Collapsible Animated Side Navigation Bar */}
          <AnimatedSidebar activeSection={activeSection} onSelectSection={handleNavigateSection} />

          {/* Main Dashboard Workspace */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Real-Time Dashboard Statistics */}
            <div id="section-dashboard">
              <DashboardStats />
            </div>

            {/* Dynamic Contract Workspace Grid */}
            <div id="section-proposals">
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 4,
                  width: '100%',
                  mb: 6,
                }}
              >
                {boardDeployments.map((boardDeployment, idx) => (
                  <div data-testid={`board-${idx}`} key={`board-${idx}`}>
                    <Board boardDeployment$={boardDeployment} />
                  </div>
                ))}
                <div data-testid="board-start">
                  <Board />
                </div>
              </Box>
            </div>

            {/* ZK Selective Disclosure & Privacy Explanation Section */}
            <div id="section-privacy">
              <PrivacyExplanation />
            </div>
          </Box>
        </Box>

        {/* Section 03: Features Showcase */}
        <FeaturesSection />

        {/* Section 04: How It Works Protocol Timeline */}
        <HowItWorksSection />

        {/* Section 05: System Architecture & Tech Stack */}
        <ArchitectureSection />

        {/* Section 06: Frequently Asked Questions */}
        <FaqSection />
      </MainLayout>
    </Box>
  );
};

export default App;
