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

import { createTheme, alpha } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F2FE', // Neon Cyan
      light: '#4FACFE',
      dark: '#00C6FF',
      contrastText: '#0B0F19',
    },
    secondary: {
      main: '#7F00FF', // Neon Violet/Purple
      light: '#E100FF',
      dark: '#410099',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#080A10', // Deepest Obsidian
      paper: 'rgba(15, 23, 42, 0.75)', // Glassmorphic panel
    },
    success: {
      main: '#00FF88', // ZK Shielded Green
    },
    warning: {
      main: '#FFB800',
    },
    error: {
      main: '#FF3366',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, color: '#94A3B8' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#080A10',
          color: '#F8FAFC',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          overflowX: 'hidden',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(0, 242, 254, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 25px -5px rgba(0, 242, 254, 0.3)',
          },
        },
      },
    },
  },
});
