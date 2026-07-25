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

import React, { useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { CardContent, Button, Stack, Typography, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircleOutlined';
import LinkIcon from '@mui/icons-material/Link';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { TextPromptDialog } from './TextPromptDialog';

export interface EmptyCardContentProps {
  onCreateBoardCallback: () => void;
  onJoinBoardCallback: (contractAddress: ContractAddress) => void;
}

export const EmptyCardContent: React.FC<Readonly<EmptyCardContentProps>> = ({
  onCreateBoardCallback,
  onJoinBoardCallback,
}) => {
  const [textPromptOpen, setTextPromptOpen] = useState(false);

  return (
    <React.Fragment>
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 242, 254, 0.1)',
            color: '#00F2FE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            border: '1px solid rgba(0, 242, 254, 0.2)',
          }}
        >
          <MenuBookIcon sx={{ fontSize: 32 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#F8FAFC' }}>
          Midnight Journal
        </Typography>

        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
          Deploy a new ZK private journal contract on Preprod, or join an existing contract address.
        </Typography>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            data-testid="board-deploy-btn"
            variant="contained"
            fullWidth
            startIcon={<AddCircleIcon />}
            onClick={onCreateBoardCallback}
            sx={{
              background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
              color: '#080A10',
              fontWeight: 700,
              py: 1.5,
              '&:hover': {
                background: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
              },
            }}
          >
            Deploy New Journal
          </Button>

          <Button
            data-testid="board-join-btn"
            variant="outlined"
            fullWidth
            startIcon={<LinkIcon />}
            onClick={() => setTextPromptOpen(true)}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.15)',
              color: '#F8FAFC',
              py: 1.5,
              '&:hover': {
                borderColor: '#7F00FF',
                color: '#E100FF',
                backgroundColor: 'rgba(127, 0, 255, 0.1)',
              },
            }}
          >
            Join Existing Contract
          </Button>
        </Stack>
      </CardContent>

      <TextPromptDialog
        prompt="Enter contract address (e.g. 0x...)"
        isOpen={textPromptOpen}
        onCancel={() => setTextPromptOpen(false)}
        onSubmit={(text) => {
          setTextPromptOpen(false);
          onJoinBoardCallback(text);
        }}
      />
    </React.Fragment>
  );
};
