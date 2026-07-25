import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cpu, Database, CheckCircle2, Lock } from 'lucide-react';

export interface BlockchainLoaderProps {
  isLoading: boolean;
  title?: string;
  subtitle?: string;
}

export const BlockchainLoader: React.FC<BlockchainLoaderProps> = ({
  isLoading,
  title = 'Verifying Zero-Knowledge Witness...',
  subtitle = 'Compiling Compact ZK Circuit & Asserting On-Chain Commitment',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [blockHash, setBlockHash] = useState('0x7f8a9e21...b401c');

  const loaderSteps = [
    { label: 'Initializing Local Witness Memory', icon: <Lock size={18} color="#00F2FE" /> },
    { label: 'Compiling ZKIR Proof on Port 6300', icon: <Cpu size={18} color="#A855F7" /> },
    { label: 'Verifying Compact Contract Predicate', icon: <Shield size={18} color="#10B981" /> },
    { label: 'Mining Block on Midnight Preprod', icon: <Database size={18} color="#6366F1" /> },
  ];

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loaderSteps.length);
      setBlockHash(`0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 7)}`);
    }, 1800);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(5, 7, 12, 0.92)',
          backdropFilter: 'blur(25px)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '90%',
            maxWidth: 480,
            p: 4,
            borderRadius: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(0, 242, 254, 0.4)',
            boxShadow: '0 0 50px rgba(0, 242, 254, 0.25), inset 0 0 25px rgba(0, 242, 254, 0.1)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Tech Scanner Line */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #00F2FE, #A855F7, transparent)',
              animation: 'scanLine 2s infinite linear',
            }}
          />

          {/* Blockchain Interactive Linked Nodes Visualizer */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4, mt: 1 }}>
            {[0, 1, 2].map((blockIdx) => {
              const isActive = currentStep >= blockIdx;
              return (
                <React.Fragment key={blockIdx}>
                  <motion.div
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                      borderColor: isActive ? '#00F2FE' : 'rgba(255,255,255,0.1)',
                    }}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: isActive ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: `2px solid ${isActive ? '#00F2FE' : 'rgba(255, 255, 255, 0.1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isActive ? '0 0 20px rgba(0, 242, 254, 0.4)' : 'none',
                    }}
                  >
                    {blockIdx === 0 && <Lock size={22} color={isActive ? '#00F2FE' : '#64748B'} />}
                    {blockIdx === 1 && <Cpu size={22} color={isActive ? '#A855F7' : '#64748B'} />}
                    {blockIdx === 2 && <Database size={22} color={isActive ? '#10B981' : '#64748B'} />}
                  </motion.div>

                  {blockIdx < 2 && (
                    <Box sx={{ width: 30, height: 2, position: 'relative', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, #00F2FE, transparent)',
                        }}
                      />
                    </Box>
                  )}
                </React.Fragment>
              );
            })}
          </Box>

          {/* Loader Title & Subtitle */}
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#F8FAFC', mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.85rem', mb: 3 }}>
            {subtitle}
          </Typography>

          {/* Active Step Status Box */}
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              backgroundColor: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {loaderSteps[currentStep].icon}
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#00F2FE', fontSize: '0.85rem' }}>
                {loaderSteps[currentStep].label}
              </Typography>
            </Box>
            <CheckCircle2 size={16} color="#10B981" />
          </Box>

          {/* Simulated Hash Telemetry Stream */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'monospace', fontSize: '0.75rem' }}>
              BLOCK HASH:
            </Typography>
            <Typography variant="caption" sx={{ color: '#A855F7', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.75rem' }}>
              {blockHash}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};
