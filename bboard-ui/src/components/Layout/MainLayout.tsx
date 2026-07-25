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

import React from 'react';
import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import { Header } from './Header';
import ShieldIcon from '@mui/icons-material/SecurityOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUserOutlined';

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#080A10',
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(0, 242, 254, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 85% 75%, rgba(127, 0, 255, 0.08) 0%, transparent 40%)
        `,
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ py: 6, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hero Banner Section */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2, justifyContent: 'center' }}>
            <Chip
              icon={<ShieldIcon sx={{ fontSize: 16, color: '#00F2FE !important' }} />}
              label="Zero-Knowledge Enabled"
              size="small"
              sx={{ backgroundColor: 'rgba(0,242,254,0.1)', color: '#00F2FE', border: '1px solid rgba(0,242,254,0.2)' }}
            />
            <Chip
              icon={<VerifiedUserIcon sx={{ fontSize: 16, color: '#00FF88 !important' }} />}
              label="Local Witness Privacy"
              size="small"
              sx={{ backgroundColor: 'rgba(0,255,136,0.1)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.2)' }}
            />
          </Stack>

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1.5,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Midnight Private Journal DApp
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              maxWidth: 680,
              mx: 'auto',
              color: '#94A3B8',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Securely record, verify, and manage on-chain journal entries using Zero-Knowledge proofs. Prove key ownership without disclosing client secret keys to the network.
          </Typography>
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
          py: 3,
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          color: '#64748B',
          fontSize: '0.85rem',
        }}
      >
        Built for Midnight Network Level 1 Challenge • Powered by Compact ZK Language
      </Box>
    </Box>
  );
};
