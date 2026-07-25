import React, { useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { CardContent, Button, Stack, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { PlusCircle, Link2, BookOpen, Sparkles } from 'lucide-react';
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
      <CardContent sx={{ p: 4.5, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Glow Radial Aura */}
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 242, 254, 0.2) 0%, rgba(0, 242, 254, 0) 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 242, 254, 0.1)',
              color: '#00F2FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2.5,
              border: '1px solid rgba(0, 242, 254, 0.3)',
              boxShadow: '0 0 25px rgba(0, 242, 254, 0.2)',
            }}
          >
            <BookOpen size={36} color="#00F2FE" />
          </Box>
        </motion.div>

        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#F8FAFC', letterSpacing: '-0.01em' }}>
          Midnight Private Journal
        </Typography>

        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3.5, maxWidth: 360, mx: 'auto', lineHeight: 1.6 }}>
          Deploy a new ZK private journal contract on Preprod, or join an existing contract address.
        </Typography>

        <Stack spacing={2} sx={{ width: '100%' }}>
          {/* Deploy New Journal Radiant Button with Sheen Animation */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              data-testid="board-deploy-btn"
              variant="contained"
              fullWidth
              startIcon={<PlusCircle size={18} />}
              onClick={onCreateBoardCallback}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #00F2FE 0%, #7F00FF 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                py: 1.6,
                borderRadius: 3,
                boxShadow: '0 10px 25px -5px rgba(0, 242, 254, 0.4), 0 0 15px rgba(127, 0, 255, 0.3)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shimmerSheen 3s infinite',
                },
              }}
            >
              Deploy New Journal
            </Button>
          </motion.div>

          {/* Join Existing Contract Glass Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              data-testid="board-join-btn"
              variant="outlined"
              fullWidth
              startIcon={<Link2 size={18} />}
              onClick={() => setTextPromptOpen(true)}
              sx={{
                borderRadius: 3,
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: '#F8FAFC',
                fontWeight: 600,
                py: 1.6,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: '#A855F7',
                  color: '#C084FC',
                  backgroundColor: 'rgba(168, 85, 247, 0.12)',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.25)',
                },
              }}
            >
              Join Existing Contract
            </Button>
          </motion.div>
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
