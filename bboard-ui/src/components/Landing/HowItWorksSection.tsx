import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Wallet, Key, Cpu, Send } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Connect Midnight Wallet',
      desc: 'Connect your 1AM or Lace browser wallet extension to grant preprod network permissions.',
      icon: <Wallet size={24} color="#00F2FE" />,
      color: '#00F2FE',
    },
    {
      num: '02',
      title: 'Derive Private Secret Witness',
      desc: 'Generate a 32-byte secret key held strictly in client-side private witness memory.',
      icon: <Key size={24} color="#10B981" />,
      color: '#10B981',
    },
    {
      num: '03',
      title: 'Compile Off-Chain ZK Proof',
      desc: 'The Midnight Proof Server on port 6300 constructs a cryptographic proof asserting key possession.',
      icon: <Cpu size={24} color="#A855F7" />,
      color: '#A855F7',
    },
    {
      num: '04',
      title: 'Verify & Settle On-Chain',
      desc: 'Broadcast transaction to Midnight Preprod ledger for deterministic validation.',
      icon: <Send size={24} color="#6366F1" />,
      color: '#6366F1',
    },
  ];

  return (
    <Box id="section-how-it-works" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          WORKFLOW & PROTOCOL
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#F8FAFC', mt: 1, mb: 2 }}>
          How Zero-Knowledge Privacy Works
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#94A3B8', maxWidth: 650, mx: 'auto' }}>
          Follow the step-by-step cryptographic sequence behind every private transaction.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3.5,
        }}
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 4.5,
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(20px)',
                border: `1px solid rgba(255, 255, 255, 0.08)`,
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  borderColor: step.color,
                  boxShadow: `0 0 25px ${step.color}25`,
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 15,
                  fontWeight: 900,
                  color: 'rgba(255, 255, 255, 0.04)',
                  fontSize: '3.5rem',
                  pointerEvents: 'none',
                }}
              >
                {step.num}
              </Typography>

              <Box sx={{ p: 1.2, borderRadius: 2.5, backgroundColor: `${step.color}15`, width: 'fit-content', mb: 2.5 }}>
                {step.icon}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800, color: '#F8FAFC', mb: 1.5 }}>
                {step.title}
              </Typography>

              <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.65 }}>
                {step.desc}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
