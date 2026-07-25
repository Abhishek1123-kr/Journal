// This file is part of midnightntwrk/example-bboard.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { MainLayout, Board, DashboardStats, PrivacyExplanation } from './components';
import { useDeployedBoardContext } from './hooks';
import { type BoardDeployment } from './contexts';
import { type Observable } from 'rxjs';

const App: React.FC = () => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployments, setBoardDeployments] = useState<Array<Observable<BoardDeployment>>>([]);

  useEffect(() => {
    const subscription = boardApiProvider.boardDeployments$.subscribe(setBoardDeployments);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardApiProvider]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#080A10' }}>
      <MainLayout>
        {/* Real-Time Dashboard Statistics */}
        <DashboardStats />

        {/* Dynamic Contract Deployments Workspace Grid */}
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

        {/* ZK Selective Disclosure & Privacy Explanation Section */}
        <PrivacyExplanation />
      </MainLayout>
    </Box>
  );
};

export default App;
