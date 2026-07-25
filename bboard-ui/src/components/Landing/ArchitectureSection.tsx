import React from 'react';
import { Box, Typography, Paper, Chip, Stack } from '@mui/material';
import { Cpu, Server, Database, Lock, Code2, Sparkles } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const techStack = [
    { name: 'Compact ZK Language', icon: <Code2 size={14} color="#00F2FE" />, color: '#00F2FE' },
    { name: 'Midnight Preprod Testnet', icon: <Server size={14} color="#10B981" />, color: '#10B981' },
    { name: 'Proof Server (Port 6300)', icon: <Cpu size={14} color="#A855F7" />, color: '#A855F7' },
    { name: 'TypeScript & Vite', icon: <Code2 size={14} color="#6366F1" />, color: '#6366F1' },
    { name: 'Framer Motion & Lucide', icon: <Sparkles size={14} color="#F59E0B" />, color: '#F59E0B' },
  ];

  return (
    <Box id="section-architecture" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="caption" sx={{ color: '#A855F7', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          FULL-STACK SPECS
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#F8FAFC', mt: 1, mb: 2 }}>
          System Architecture & Tech Stack
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#94A3B8', maxWidth: 680, mx: 'auto' }}>
          Explore the modular three-tier architecture separating local witness memory, off-chain proof generation, and on-chain ledger state.
        </Typography>
      </Box>

      {/* Tech Stack Chips */}
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap', mb: 5 }}>
        {techStack.map((tech, idx) => (
          <Chip
            key={idx}
            icon={tech.icon}
            label={tech.name}
            sx={{
              backgroundColor: `${tech.color}15`,
              color: tech.color,
              border: `1px solid ${tech.color}40`,
              fontWeight: 700,
              py: 0.5,
              px: 1.5,
              '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
            }}
          />
        ))}
      </Box>

      {/* 3-Tier Architecture Flow Visualizer */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {/* Tier 1: Client Witness */}
        <Paper
          sx={{
            p: 3.5,
            borderRadius: 4.5,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            textAlign: 'center',
          }}
        >
          <Box sx={{ p: 1.5, borderRadius: 3, backgroundColor: 'rgba(0, 242, 254, 0.1)', mx: 'auto', width: 'fit-content', mb: 2 }}>
            <Lock size={28} color="#00F2FE" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#00F2FE', mb: 1 }}>
            1. Local Client Witness
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Holds 32-byte <code>localSecretKey()</code> in private memory. Evaluates ZK circuit predicates locally.
          </Typography>
        </Paper>

        {/* Tier 2: Proof Server */}
        <Paper
          sx={{
            p: 3.5,
            borderRadius: 4.5,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            textAlign: 'center',
          }}
        >
          <Box sx={{ p: 1.5, borderRadius: 3, backgroundColor: 'rgba(168, 85, 247, 0.1)', mx: 'auto', width: 'fit-content', mb: 2 }}>
            <Cpu size={28} color="#A855F7" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#A855F7', mb: 1 }}>
            2. Midnight Proof Server
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Compiles off-chain ZK proofs on port 6300 using ZKIR circuit assets.
          </Typography>
        </Paper>

        {/* Tier 3: Ledger */}
        <Paper
          sx={{
            p: 3.5,
            borderRadius: 4.5,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            textAlign: 'center',
          }}
        >
          <Box sx={{ p: 1.5, borderRadius: 3, backgroundColor: 'rgba(16, 185, 129, 0.1)', mx: 'auto', width: 'fit-content', mb: 2 }}>
            <Database size={28} color="#10B981" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#10B981', mb: 1 }}>
            3. Midnight Preprod Ledger
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Verifies zero-knowledge proofs and updates public state (<code>VACANT</code> / <code>OCCUPIED</code>).
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};
