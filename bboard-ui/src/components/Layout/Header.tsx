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
import { AppBar, Box, Chip, Link, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Header: React.FC = () => (
  <AppBar
    position="sticky"
    data-testid="header"
    elevation={0}
    sx={{
      backgroundColor: 'rgba(8, 10, 16, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      px: { xs: 2, sm: 4, md: 6 },
      py: 1.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    {/* Left Logo Section */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
      data-testid="header-logo"
    >
      <img src="/midnight-logo.png" alt="Midnight Network Logo" height={38} style={{ filter: 'drop-shadow(0 0 10px rgba(0,242,254,0.3))' }} />
      <Chip
        icon={<LockIcon sx={{ fontSize: '14px !important', color: '#00F2FE !important' }} />}
        label="ZK Private Journal"
        size="small"
        sx={{
          backgroundColor: 'rgba(0, 242, 254, 0.1)',
          borderColor: 'rgba(0, 242, 254, 0.3)',
          borderWidth: 1,
          borderStyle: 'solid',
          color: '#00F2FE',
          fontWeight: 600,
          display: { xs: 'none', sm: 'inline-flex' },
        }}
      />
    </Box>

    {/* Right Network and Action Controls */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Network Pill */}
      <Chip
        icon={<CheckCircleIcon sx={{ fontSize: '14px !important', color: '#00FF88 !important' }} />}
        label="Preprod Network"
        size="small"
        sx={{
          backgroundColor: 'rgba(0, 255, 136, 0.1)',
          borderColor: 'rgba(0, 255, 136, 0.3)',
          borderWidth: 1,
          borderStyle: 'solid',
          color: '#00FF88',
          fontWeight: 600,
        }}
      />

      {/* Wallet Status Badge */}
      <Chip
        label="1AM / Lace Ready"
        size="small"
        sx={{
          backgroundColor: 'rgba(127, 0, 255, 0.15)',
          borderColor: 'rgba(127, 0, 255, 0.4)',
          borderWidth: 1,
          borderStyle: 'solid',
          color: '#E100FF',
          fontWeight: 600,
        }}
      />

      {/* GitHub Repo Quick Link */}
      <Button
        component={Link}
        href="https://github.com/Abhishek1123-kr/Journal"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        size="small"
        startIcon={<GitHubIcon />}
        sx={{
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: '#F8FAFC',
          '&:hover': {
            borderColor: '#00F2FE',
            color: '#00F2FE',
            backgroundColor: 'rgba(0, 242, 254, 0.05)',
          },
        }}
      >
        GitHub
      </Button>
    </Box>
  </AppBar>
);
