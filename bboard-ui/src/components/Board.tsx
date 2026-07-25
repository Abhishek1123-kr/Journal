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

import React, { useCallback, useEffect, useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import WriteIcon from '@mui/icons-material/EditNoteOutlined';
import CopyIcon from '@mui/icons-material/ContentPasteOutlined';
import StopIcon from '@mui/icons-material/HighlightOffOutlined';
import { type BBoardDerivedState, type DeployedBBoardAPI } from '../../../api/src/index';
import { useDeployedBoardContext } from '../hooks';
import { type BoardDeployment } from '../contexts';
import { type Observable } from 'rxjs';
import { State } from '../../../contract/src/index';
import { EmptyCardContent } from './Board.EmptyCardContent';

/** The props required by the {@link Board} component. */
export interface BoardProps {
  /** The observable bulletin board deployment. */
  boardDeployment$?: Observable<BoardDeployment>;
}

/**
 * Provides the UI for a deployed bulletin board contract; allowing messages to be posted or removed
 * following the rules enforced by the underlying Compact contract.
 *
 * @remarks
 * With no `boardDeployment$` observable, the component will render a UI that allows the user to create
 * or join bulletin boards. It requires a `<DeployedBoardProvider />` to be in scope in order to manage
 * these additional boards. It does this by invoking the `resolve(...)` method on the currently in-
 * scope `DeployedBoardContext`.
 *
 * When a `boardDeployment$` observable is received, the component begins by rendering a skeletal view of
 * itself, along with a loading background. It does this until the board deployment receives a
 * `DeployedBBoardAPI` instance, upon which it will then subscribe to its `state$` observable in order
 * to start receiving the changes in the bulletin board state (i.e., when a user posts a new message).
 */
export const Board: React.FC<Readonly<BoardProps>> = ({ boardDeployment$ }) => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployment, setBoardDeployment] = useState<BoardDeployment>();
  const [deployedBoardAPI, setDeployedBoardAPI] = useState<DeployedBBoardAPI>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [boardState, setBoardState] = useState<BBoardDerivedState>();
  const [messagePrompt, setMessagePrompt] = useState<string>();
  const [isWorking, setIsWorking] = useState(!!boardDeployment$);

  // Two simple callbacks that call `resolve(...)` to either deploy or join a bulletin board
  // contract. Since the `DeployedBoardContext` will create a new board and update the UI, we
  // don't have to do anything further once we've called `resolve`.
  const onCreateBoard = useCallback(() => boardApiProvider.resolve(), [boardApiProvider]);
  const onJoinBoard = useCallback(
    (contractAddress: ContractAddress) => boardApiProvider.resolve(contractAddress),
    [boardApiProvider],
  );

  // Callback to handle the posting of a message. The message text is captured in the `messagePrompt`
  // state, and we just need to forward it to the `post` method of the `DeployedBBoardAPI` instance
  // that we received in the `deployedBoardAPI` state.
  const onPostMessage = useCallback(async () => {
    if (!messagePrompt) {
      return;
    }

    try {
      if (deployedBoardAPI) {
        setIsWorking(true);
        await deployedBoardAPI.post(messagePrompt);
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, setErrorMessage, setIsWorking, messagePrompt]);

  // Callback to handle the taking down of a message. Again, we simply invoke the `takeDown` method
  // of the `DeployedBBoardAPI` instance.
  const onDeleteMessage = useCallback(async () => {
    try {
      if (deployedBoardAPI) {
        setIsWorking(true);
        await deployedBoardAPI.takeDown();
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, setErrorMessage, setIsWorking]);

  const onCopyContractAddress = useCallback(async () => {
    if (deployedBoardAPI) {
      await navigator.clipboard.writeText(deployedBoardAPI.deployedContractAddress);
    }
  }, [deployedBoardAPI]);

  // Subscribes to the `boardDeployment$` observable so that we can receive updates on the deployment.
  useEffect(() => {
    if (!boardDeployment$) {
      return;
    }

    const subscription = boardDeployment$.subscribe(setBoardDeployment);

    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment$]);

  // Subscribes to the `state$` observable on a `DeployedBBoardAPI` if we receive one, allowing the
  // component to receive updates to the change in contract state; otherwise we update the UI to
  // reflect the error was received instead.
  useEffect(() => {
    if (!boardDeployment) {
      return;
    }
    if (boardDeployment.status === 'in-progress') {
      return;
    }

    setIsWorking(false);

    if (boardDeployment.status === 'failed') {
      setErrorMessage(
        boardDeployment.error.message.length ? boardDeployment.error.message : 'Encountered an unexpected error.',
      );
      return;
    }

    // We need the board API as well as subscribing to its `state$` observable, so that we can invoke
    // the `post` and `takeDown` methods later.
    setDeployedBoardAPI(boardDeployment.api);
    const subscription = boardDeployment.api.state$.subscribe(setBoardState);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment, setIsWorking, setErrorMessage, setDeployedBoardAPI]);

  return (
    <Card
      sx={{
        position: 'relative',
        width: { xs: '100%', sm: 380 },
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1,
      }}
    >
      {!boardDeployment$ && (
        <EmptyCardContent onCreateBoardCallback={onCreateBoard} onJoinBoardCallback={onJoinBoard} />
      )}

      {boardDeployment$ && (
        <React.Fragment>
          {/* ZK Working Backdrop */}
          <Backdrop
            sx={{
              position: 'absolute',
              color: '#00F2FE',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: 'rgba(8, 10, 16, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: 5,
              flexDirection: 'column',
              gap: 2,
            }}
            open={isWorking}
          >
            <CircularProgress data-testid="board-working-indicator" color="primary" size={48} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#00F2FE' }}>
              Executing ZK Circuit & Generating Proof...
            </Typography>
          </Backdrop>

          {/* Header Bar */}
          <CardHeader
            avatar={
              boardState ? (
                boardState.state === State.VACANT || (boardState.state === State.OCCUPIED && boardState.isOwner) ? (
                  <Chip
                    icon={<LockOpenIcon sx={{ fontSize: '14px !important', color: '#00FF88 !important' }} />}
                    label={boardState.state === State.VACANT ? 'Vacant' : 'Unlocked (Author)'}
                    size="small"
                    sx={{ backgroundColor: 'rgba(0,255,136,0.1)', color: '#00FF88', fontWeight: 700 }}
                  />
                ) : (
                  <Chip
                    icon={<LockIcon sx={{ fontSize: '14px !important', color: '#E100FF !important' }} />}
                    label="Occupied (Shielded)"
                    size="small"
                    sx={{ backgroundColor: 'rgba(127,0,255,0.15)', color: '#E100FF', fontWeight: 700 }}
                  />
                )
              ) : (
                <Skeleton variant="rectangular" width={90} height={24} sx={{ borderRadius: 2 }} />
              )
            }
            title={
              deployedBoardAPI?.deployedContractAddress ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono', color: '#94A3B8' }}>
                    {toShortFormatContractAddress(deployedBoardAPI.deployedContractAddress)}
                  </Typography>
                  <Tooltip title="Copy Contract Address">
                    <IconButton size="small" onClick={onCopyContractAddress} sx={{ color: '#00F2FE' }}>
                      <CopyIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Skeleton variant="text" width={100} />
              )
            }
          />

          {/* Error Banner inside Card */}
          {errorMessage && (
            <Alert
              severity="error"
              sx={{
                mx: 2,
                mb: 1,
                backgroundColor: 'rgba(255, 51, 102, 0.1)',
                border: '1px solid rgba(255, 51, 102, 0.3)',
                color: '#FF3366',
                borderRadius: 3,
                fontSize: '0.8rem',
              }}
              onClose={() => setErrorMessage(undefined)}
              data-testid="board-error-message"
            >
              {errorMessage}
            </Alert>
          )}

          {/* Main Card Content */}
          <CardContent sx={{ flex: 1, pt: 1 }}>
            {boardState ? (
              boardState.state === State.OCCUPIED ? (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    minHeight: 140,
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#00F2FE', fontWeight: 600, display: 'block', mb: 1 }}>
                    Active Journal Entry:
                  </Typography>
                  <Typography data-testid="board-posted-message" variant="body2" sx={{ color: '#F8FAFC', whiteSpace: 'pre-wrap' }}>
                    {boardState.message}
                  </Typography>
                </Box>
              ) : (
                <TextField
                  id="message-prompt"
                  data-testid="board-message-prompt"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  placeholder="Write your private journal entry here..."
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      borderRadius: 3,
                      color: '#F8FAFC',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                      '&:hover fieldset': { borderColor: '#00F2FE' },
                      '&.Mui-focused fieldset': { borderColor: '#00F2FE' },
                    },
                  }}
                  onChange={(e) => setMessagePrompt(e.target.value)}
                />
              )
            ) : (
              <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 3 }} />
            )}
          </CardContent>

          {/* Action Buttons */}
          <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between', gap: 1 }}>
            {deployedBoardAPI ? (
              <React.Fragment>
                <Button
                  data-testid="board-post-message-btn"
                  variant="contained"
                  size="medium"
                  startIcon={<WriteIcon />}
                  disabled={boardState?.state === State.OCCUPIED || !messagePrompt?.length}
                  onClick={onPostMessage}
                  sx={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                    color: '#080A10',
                    fontWeight: 700,
                  }}
                >
                  Post Entry
                </Button>
                <Button
                  data-testid="board-take-down-message-btn"
                  variant="outlined"
                  size="medium"
                  color="error"
                  startIcon={<DeleteIcon />}
                  disabled={
                    boardState?.state === State.VACANT || (boardState?.state === State.OCCUPIED && !boardState.isOwner)
                  }
                  onClick={onDeleteMessage}
                  sx={{
                    borderColor: 'rgba(255, 51, 102, 0.4)',
                    color: '#FF3366',
                    '&:hover': {
                      borderColor: '#FF3366',
                      backgroundColor: 'rgba(255, 51, 102, 0.1)',
                    },
                  }}
                >
                  Take Down
                </Button>
              </React.Fragment>
            ) : (
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 3 }} />
            )}
          </CardActions>
        </React.Fragment>
      )}
    </Card>
  );
};

/** @internal */
const toShortFormatContractAddress = (contractAddress: ContractAddress | undefined): string | undefined =>
  contractAddress ? `0x${contractAddress.slice(0, 6)}...${contractAddress.slice(-6)}` : undefined;
