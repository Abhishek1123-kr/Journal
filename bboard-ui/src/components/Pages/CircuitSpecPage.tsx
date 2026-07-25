import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Database, Lock, Code2 } from 'lucide-react';
import { ArchitectureSection } from '../Landing/ArchitectureSection';

export const CircuitSpecPage: React.FC = () => {
  const predicates = [
    {
      name: 'post(Bytes<32>) Circuit',
      type: 'PUBLIC MUTATION',
      assertion: 'assert(state == State.VACANT)',
      effect: 'state = State.OCCUPIED, sequence.increment(1), owner = publicKey(secretKey, sequence)',
      icon: <Code2 size={22} color="#00F2FE" />,
      color: '#00F2FE',
    },
    {
      name: 'takeDown() Circuit',
      type: 'ZK WITNESS ASSERTION',
      assertion: 'assert(state == State.OCCUPIED && owner == publicKey(secretKey, sequence))',
      effect: 'state = State.VACANT, sequence.increment(1)',
      icon: <ShieldCheck size={22} color="#A855F7" />,
      color: '#A855F7',
    },
    {
      name: 'publicKey(secretKey, counter)',
      type: 'PRIVATE IMPLICIT PREDICATE',
      assertion: 'assert(secretKey.length == 32)',
      effect: 'Returns 32-byte cryptographic commitment hash without exposing secret key',
      icon: <Lock size={22} color="#10B981" />,
      color: '#10B981',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Cpu size={28} color="#A855F7" />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#F8FAFC' }}>
            Zero-Knowledge Circuit Specifications
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#94A3B8' }}>
          Detailed technical breakdown of Compact ZK circuit assets, proving key keys, and ZKIR compilation binaries.
        </Typography>
      </Box>

      {/* Predicates Grid */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 6 }}>
        {predicates.map((pred, idx) => (
          <Paper
            key={idx}
            sx={{
              p: 3.5,
              borderRadius: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${pred.color}40`,
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: 2, backgroundColor: `${pred.color}15`, display: 'flex' }}>
                  {pred.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#F8FAFC' }}>
                  {pred.name}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: pred.color,
                  backgroundColor: `${pred.color}15`,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  border: `1px solid ${pred.color}30`,
                }}
              >
                {pred.type}
              </Typography>
            </Box>

            <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: 'rgba(0,0,0,0.5)', fontFamily: 'monospace', mb: 1.5, fontSize: '0.85rem', color: '#00F2FE' }}>
              Predicate: {pred.assertion}
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
              Effect: {pred.effect}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* System Architecture Section */}
      <ArchitectureSection />
    </motion.div>
  );
};
