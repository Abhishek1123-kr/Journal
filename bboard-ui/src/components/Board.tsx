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
import { motion } from 'framer-motion';
import { Lock, Unlock, Trash2, Send, Copy, ShieldAlert } from 'lucide-react';
import { type BBoardDerivedState, type DeployedBBoardAPI } from '../../../api/src/index';
import { useDeployedBoardContext } from '../hooks';
import { type BoardDeployment } from '../contexts';
import { type Observable } from 'rxjs';
import { State } from '../../../contract/src/index';
import { EmptyCardContent } from './Board.EmptyCardContent';

export interface BoardProps {
  boardDeployment$?: Observable<BoardDeployment>;
}

export const Board: React.FC<Readonly<BoardProps>> = ({ boardDeployment$ }) => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployment, setBoardDeployment] = useState<BoardDeployment>();
  const [deployedBoardAPI, setDeployedBoardAPI] = useState<DeployedBBoardAPI>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [boardState, setBoardState] = useState<BBoardDerivedState>();
  const [messagePrompt, setMessagePrompt] = useState<string>();
  const [isWorking, setIsWorking] = useState(!!boardDeployment$);
  const [isDismissed, setIsDismissed] = useState(false);

  const onCreateBoard = useCallback(() => {
    setIsDismissed(false);
    boardApiProvider.resolve();
  }, [boardApiProvider]);

  const onJoinBoard = useCallback(
    (contractAddress: ContractAddress) => {
      setIsDismissed(false);
      boardApiProvider.resolve(contractAddress);
    },
    [boardApiProvider],
  );

  const onPostMessage = useCallback(async () => {
    if (!messagePrompt) return;
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

  useEffect(() => {
    if (!boardDeployment$) return;
    setIsDismissed(false);
    const subscription = boardDeployment$.subscribe(setBoardDeployment);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment$]);

  useEffect(() => {
    if (!boardDeployment) return;
    if (boardDeployment.status === 'in-progress') return;

    setIsWorking(false);

    if (boardDeployment.status === 'failed') {
      setErrorMessage(
        boardDeployment.error.message.length ? boardDeployment.error.message : 'Encountered an unexpected error.',
      );
      return;
    }

    setDeployedBoardAPI(boardDeployment.api);
    const subscription = boardDeployment.api.state$.subscribe(setBoardState);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment, setIsWorking, setErrorMessage, setDeployedBoardAPI]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <Card
        sx={{
          position: 'relative',
          width: { xs: '100%', sm: 390 },
          minHeight: 380,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 1.5,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px 0 rgba(0, 242, 254, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(0, 242, 254, 0.4)',
            boxShadow: '0 25px 50px -12px rgba(0, 242, 254, 0.25)',
          },
        }}
      >
        {/* Top-Right Glowing Corner Bracket Accent */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 14,
            height: 14,
            borderTop: '2px solid #00F2FE',
            borderRight: '2px solid #00F2FE',
            boxShadow: '0 0 10px #00F2FE',
          }}
        />
        {(!boardDeployment$ || isDismissed) && (
          <EmptyCardContent onCreateBoardCallback={onCreateBoard} onJoinBoardCallback={onJoinBoard} />
        )}

        {boardDeployment$ && !isDismissed && (
          <React.Fragment>
            {/* ZK Working Backdrop Loading Indicator */}
            <Backdrop
              sx={{
                position: 'absolute',
                color: '#00F2FE',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(8, 10, 16, 0.88)',
                backdropFilter: 'blur(12px)',
                borderRadius: 5,
                flexDirection: 'column',
                gap: 2,
              }}
              open={isWorking}
            >
              <CircularProgress data-testid="board-working-indicator" color="primary" size={52} thickness={4} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#00F2FE', letterSpacing: '0.02em' }}>
                Executing ZK Circuit & Generating Proof...
              </Typography>
            </Backdrop>

            {/* Header Bar */}
            <CardHeader
              avatar={
                boardState ? (
                  boardState.state === State.VACANT || (boardState.state === State.OCCUPIED && boardState.isOwner) ? (
                    <Chip
                      icon={<Unlock size={13} color="#00FF88" />}
                      label={boardState.state === State.VACANT ? 'Vacant' : 'Unlocked (Author)'}
                      size="small"
                      sx={{ backgroundColor: 'rgba(0,255,136,0.1)', color: '#00FF88', fontWeight: 700 }}
                    />
                  ) : (
                    <Chip
                      icon={<Lock size={13} color="#E100FF" />}
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
                        <Copy size={13} />
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
                icon={<ShieldAlert size={18} />}
                sx={{
                  mx: 2,
                  mb: 1,
                  backgroundColor: 'rgba(255, 51, 102, 0.1)',
                  border: '1px solid rgba(255, 51, 102, 0.3)',
                  color: '#FF3366',
                  borderRadius: 3,
                  fontSize: '0.8rem',
                }}
                onClose={() => {
                  setErrorMessage(undefined);
                  setIsDismissed(true);
                }}
                data-testid="board-error-message"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorMessage(undefined);
                      setIsDismissed(true);
                    }}
                    sx={{ color: '#FF3366', fontWeight: 700, fontSize: '0.75rem', textTransform: 'none' }}
                  >
                    Reset Card
                  </Button>
                }
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
                    <Typography variant="caption" sx={{ color: '#00F2FE', fontWeight: 700, display: 'block', mb: 1 }}>
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
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
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
            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between', gap: 1.5 }}>
              {deployedBoardAPI ? (
                <React.Fragment>
                  <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      data-testid="board-post-message-btn"
                      variant="contained"
                      fullWidth
                      startIcon={<Send size={15} />}
                      disabled={boardState?.state === State.OCCUPIED || !messagePrompt?.length}
                      onClick={onPostMessage}
                      sx={{
                        background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                        color: '#080A10',
                        fontWeight: 700,
                        py: 1.2,
                        borderRadius: 2.5,
                      }}
                    >
                      Post Entry
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      data-testid="board-take-down-message-btn"
                      variant="outlined"
                      color="error"
                      startIcon={<Trash2 size={15} />}
                      disabled={
                        boardState?.state === State.VACANT || (boardState?.state === State.OCCUPIED && !boardState.isOwner)
                      }
                      onClick={onDeleteMessage}
                      sx={{
                        borderColor: 'rgba(255, 51, 102, 0.4)',
                        color: '#FF3366',
                        fontWeight: 600,
                        py: 1.2,
                        borderRadius: 2.5,
                        '&:hover': {
                          borderColor: '#FF3366',
                          backgroundColor: 'rgba(255, 51, 102, 0.1)',
                        },
                      }}
                    >
                      Take Down
                    </Button>
                  </motion.div>
                </React.Fragment>
              ) : (
                <Skeleton variant="rectangular" width="100%" height={42} sx={{ borderRadius: 3 }} />
              )}
            </CardActions>
          </React.Fragment>
        )}
      </Card>
    </motion.div>
  );
};

/** @internal */
const toShortFormatContractAddress = (contractAddress: ContractAddress | undefined): string | undefined =>
  contractAddress ? `0x${contractAddress.slice(0, 6)}...${contractAddress.slice(-6)}` : undefined;
