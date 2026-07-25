import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, RefreshCw, CheckCircle, Cpu, EyeOff } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck size={28} color="#00F2FE" />,
      title: 'Zero-Knowledge Encryption',
      desc: 'Private state witnesses are computed locally and proven using Compact ZK circuits without disclosing underlying secrets.',
      borderColor: 'rgba(0, 242, 254, 0.3)',
      glowColor: 'rgba(0, 242, 254, 0.12)',
    },
    {
      icon: <Lock size={28} color="#10B981" />,
      title: 'Local Witness Privacy',
      desc: 'Your 32-byte secret key stays inside local browser memory. No private key is ever broadcast to network validators.',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      glowColor: 'rgba(16, 185, 129, 0.12)',
    },
    {
      icon: <RefreshCw size={28} color="#A855F7" />,
      title: 'Anti-Replay Sequence',
      desc: 'Incrementing on-chain sequence counters guard against replay attacks and guarantee deterministic order verification.',
      borderColor: 'rgba(168, 85, 247, 0.3)',
      glowColor: 'rgba(168, 85, 247, 0.12)',
    },
    {
      icon: <CheckCircle size={28} color="#6366F1" />,
      title: 'Instant On-Chain Verification',
      desc: 'Midnight network nodes verify zero-knowledge proof assertions instantly without needing raw pre-image values.',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      glowColor: 'rgba(99, 102, 241, 0.12)',
    },
    {
      icon: <Cpu size={28} color="#F59E0B" />,
      title: 'Decoupled Proof Engine',
      desc: 'Integrated with Midnight Proof Server running on port 6300 for high-performance off-chain circuit compiling.',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      glowColor: 'rgba(245, 158, 11, 0.12)',
    },
    {
      icon: <EyeOff size={28} color="#EC4899" />,
      title: 'Selective Disclosure Control',
      desc: 'Disclose journal entry content publicly while keeping the identity of the author completely shielded.',
      borderColor: 'rgba(236, 72, 153, 0.3)',
      glowColor: 'rgba(236, 72, 153, 0.12)',
    },
  ];

  return (
    <Box id="section-features" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="caption" sx={{ color: '#00F2FE', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          ARCHITECTURE & FEATURES
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#F8FAFC', mt: 1, mb: 2 }}>
          Built for Uncompromising Privacy
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#94A3B8', maxWidth: 650, mx: 'auto' }}>
          Explore the core privacy primitives powering our decentralized zero-knowledge application architecture.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3.5,
        }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 4.5,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${feature.borderColor}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.6)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: feature.borderColor,
                  boxShadow: `0 20px 45px -10px ${feature.glowColor}, 0 0 25px ${feature.borderColor}`,
                },
              }}
            >
              <Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    backgroundColor: feature.glowColor,
                    width: 'fit-content',
                    mb: 2.5,
                    display: 'flex',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#F8FAFC', mb: 1.5 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.65 }}>
                  {feature.desc}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
