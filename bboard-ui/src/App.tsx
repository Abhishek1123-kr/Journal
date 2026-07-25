import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
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
  NetworkHealthPage,
  DocumentationPage,
  CircuitSpecPage,
} from './components';
import { useDeployedBoardContext } from './hooks';
import { type BoardDeployment } from './contexts';
import { type Observable } from 'rxjs';

const App: React.FC = () => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployments, setBoardDeployments] = useState<Array<Observable<BoardDeployment>>>([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const subscription = boardApiProvider.boardDeployments$.subscribe(setBoardDeployments);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardApiProvider]);

  const handleNavigateSection = (sectionId: string) => {
    const pageId = sectionId.replace('section-', '');
    setActiveSection(pageId);
    const element = document.getElementById(`workspace-top`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeployClick = () => {
    setIsDeploying(true);
    boardApiProvider.resolve();
    setActiveSection('proposals');
    setTimeout(() => setIsDeploying(false), 4500);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#080A10' }}>
      <BlockchainLoader isLoading={isDeploying} />
      <MainLayout onNavigateSection={handleNavigateSection}>
        {/* Hero Banner Showcase */}
        <HeroSection
          onDeployClick={handleDeployClick}
          onViewDashboardClick={() => handleNavigateSection('dashboard')}
        />

        <div id="workspace-top" />

        {/* Dynamic 2-Column Sidebar & Dedicated Pages Router */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, width: '100%', alignItems: 'flex-start', mb: 8 }}>
          {/* Collapsible Animated Side Navigation Bar */}
          <AnimatedSidebar activeSection={activeSection} onSelectSection={handleNavigateSection} />

          {/* Dedicated Page View Content */}
          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            <AnimatePresence mode="wait">
              {/* PAGE 1: DASHBOARD VIEW */}
              {activeSection === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <DashboardStats />
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
                    {boardDeployments.length > 0 ? (
                      <div data-testid="board-latest">
                        <Board boardDeployment$={boardDeployments[boardDeployments.length - 1]} />
                      </div>
                    ) : (
                      <div data-testid="board-start">
                        <Board />
                      </div>
                    )}
                  </Box>
                  <PrivacyExplanation />
                </motion.div>
              )}

              {/* PAGE 2: ACTIVE PROPOSALS / CONTRACTS */}
              {activeSection === 'proposals' && (
                <motion.div
                  key="proposals"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
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
                    {boardDeployments.length > 0 ? (
                      <div data-testid="board-latest">
                        <Board boardDeployment$={boardDeployments[boardDeployments.length - 1]} />
                      </div>
                    ) : (
                      <div data-testid="board-start">
                        <Board />
                      </div>
                    )}
                  </Box>
                </motion.div>
              )}

              {/* PAGE 3: PRIVACY HUB */}
              {activeSection === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <PrivacyExplanation />
                </motion.div>
              )}

              {/* PAGE 4: ZK CIRCUIT SPEC */}
              {activeSection === 'circuits' && (
                <motion.div
                  key="circuits"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <CircuitSpecPage />
                </motion.div>
              )}

              {/* PAGE 5: NETWORK HEALTH */}
              {activeSection === 'network' && (
                <motion.div
                  key="network"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <NetworkHealthPage />
                </motion.div>
              )}

              {/* PAGE 6: DOCUMENTATION */}
              {activeSection === 'docs' && (
                <motion.div
                  key="docs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <DocumentationPage />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>

        {/* Section Features & Protocol Specs */}
        <FeaturesSection />
        <HowItWorksSection />
        <FaqSection />
      </MainLayout>
    </Box>
  );
};

export default App;
