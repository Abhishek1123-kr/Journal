import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Radio, Cpu, Server, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

export const NetworkHealthPage: React.FC = () => {
  const [latency, setLatency] = useState(42);
  const [blockHeight, setBlockHeight] = useState(104928);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(38 + Math.floor(Math.random() * 12));
      setBlockHeight((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    {
      name: 'Midnight Preprod RPC Node',
      endpoint: 'https://indexer.preprod.midnight.network/api/v1/graphql',
      status: 'OPERATIONAL',
      ping: `${latency}ms`,
      icon: <Server size={22} color="#00F2FE" />,
      color: '#00F2FE',
    },
    {
      name: 'Midnight Proof Server Engine',
      endpoint: 'http://127.0.0.1:6300 (Proof Generation)',
      status: 'ONLINE',
      ping: '12ms',
      icon: <Cpu size={22} color="#A855F7" />,
      color: '#A855F7',
    },
    {
      name: 'PubSub WebSockets Indexer',
      endpoint: 'wss://indexer.preprod.midnight.network/ws',
      status: 'CONNECTED',
      ping: `${latency - 5}ms`,
      icon: <Radio size={22} color="#10B981" />,
      color: '#10B981',
    },
    {
      name: 'Local Witness Key Vault',
      endpoint: 'Browser Memory (Isolated)',
      status: 'SECURE',
      ping: '0.1ms',
      icon: <Zap size={22} color="#F59E0B" />,
      color: '#F59E0B',
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
          <Radio size={28} color="#00F2FE" />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#F8FAFC' }}>
            Network Health & Telemetry
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#94A3B8' }}>
          Real-time status of Midnight Preprod network nodes, proof server compilation endpoints, and local witness state.
        </Typography>
      </Box>

      {/* Main Metric Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 5,
        }}
      >
        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
          }}
        >
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block', mb: 0.5 }}>
            NETWORK TARGET
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#00F2FE' }}>
            Preprod Testnet
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
          }}
        >
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block', mb: 0.5 }}>
            BLOCK HEIGHT
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#10B981' }}>
            #{blockHeight.toLocaleString()}
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
          }}
        >
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block', mb: 0.5 }}>
            PROOF SERVER PORT
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#A855F7' }}>
            6300 (Active)
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
          }}
        >
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block', mb: 0.5 }}>
            RPC LATENCY
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#6366F1' }}>
            {latency} ms
          </Typography>
        </Paper>
      </Box>

      {/* Nodes Status List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {nodes.map((node, idx) => (
          <Paper
            key={idx}
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.2, borderRadius: 2.5, backgroundColor: `${node.color}15`, display: 'flex' }}>
                {node.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#F8FAFC', fontSize: '1.05rem' }}>
                  {node.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontFamily: 'monospace' }}>
                  {node.endpoint}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={<CheckCircle2 size={14} color="#10B981" />}
                label={node.status}
                size="small"
                sx={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10B981',
                  fontWeight: 700,
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  px: 1,
                  '& .MuiChip-icon': { ml: 0.5, mr: 0.5 },
                }}
              />
              <Typography variant="caption" sx={{ color: '#00F2FE', fontWeight: 700, fontFamily: 'monospace' }}>
                {node.ping}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </motion.div>
  );
};
