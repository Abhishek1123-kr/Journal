import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { MainLayout, Board, DashboardStats, PrivacyExplanation, AnimatedSidebar } from './components';
import { useDeployedBoardContext } from './hooks';
import { type BoardDeployment } from './contexts';
import { type Observable } from 'rxjs';

const App: React.FC = () => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployments, setBoardDeployments] = useState<Array<Observable<BoardDeployment>>>([]);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const subscription = boardApiProvider.boardDeployments$.subscribe(setBoardDeployments);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardApiProvider]);

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#080A10' }}>
      <MainLayout>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, width: '100%', alignItems: 'flex-start' }}>
          {/* Collapsible Animated Side Navigation Bar */}
          <AnimatedSidebar activeSection={activeSection} onSelectSection={handleSelectSection} />

          {/* Main Dashboard & Content Workspace */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Section: Dashboard Stats */}
            <div id="section-dashboard">
              <DashboardStats />
            </div>

            {/* Section: Dynamic Contract Workspace Grid */}
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

            {/* Section: Privacy Hub & ZK Circuit Engine */}
            <div id="section-privacy">
              <PrivacyExplanation />
            </div>
          </Box>
        </Box>
      </MainLayout>
    </Box>
  );
};

export default App;
