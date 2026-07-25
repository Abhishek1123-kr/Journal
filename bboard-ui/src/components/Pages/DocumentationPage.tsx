import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FileText, Code2, BookOpen, ExternalLink, Copy, Check } from 'lucide-react';

export const DocumentationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const sampleCompactCode = `// journal.compact - Midnight Network ZK Contract
pragma language_version 0.14;
import CompactStandardLibrary;

export enum State { VACANT, OCCUPIED }

export ledger state: State;
export ledger message: Cell<Bytes<32>>;
export ledger sequence: Counter;
export ledger owner: Bytes<32>;

export circuit post(m: Bytes<32>): [] {
    assert(state == State.VACANT, "Journal is occupied");
    state = State.OCCUPIED;
    message = m;
    sequence.increment(1);
    owner = publicKey(localSecretKey(), sequence);
}

export circuit takeDown(): [] {
    assert(state == State.OCCUPIED, "Journal is vacant");
    assert(owner == publicKey(localSecretKey(), sequence), "Not owner author");
    state = State.VACANT;
    sequence.increment(1);
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCompactCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <FileText size={28} color="#00F2FE" />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#F8FAFC' }}>
            Developer Documentation & API
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#94A3B8' }}>
          Comprehensive guide to developing, deploying, and integrating Zero-Knowledge smart contracts on Midnight Preprod network.
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            '& .MuiTab-root': { color: '#94A3B8', fontWeight: 700, fontSize: '0.95rem' },
            '& .Mui-selected': { color: '#00F2FE' },
            '& .MuiTabs-indicator': { backgroundColor: '#00F2FE' },
          }}
        >
          <Tab icon={<BookOpen size={16} />} iconPosition="start" label="Quick Start Guide" />
          <Tab icon={<Code2 size={16} />} iconPosition="start" label="Compact Smart Contract" />
          <Tab icon={<FileText size={16} />} iconPosition="start" label="API & DApp Connector" />
        </Tabs>
      </Box>

      {/* Tab 0: Quick Start Guide */}
      {activeTab === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#00F2FE', mb: 2 }}>
              1. Prerequisites & Environment Setup
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.7, mb: 2 }}>
              Ensure Node.js v24+, Midnight Lace Wallet extension, and Docker Desktop are installed on your machine.
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                fontFamily: 'monospace',
                color: '#00FF88',
                fontSize: '0.85rem',
              }}
            >
              docker run -p 6300:6300 midnightntwrk/proof-server:preprod-latest
            </Box>
          </Paper>

          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#A855F7', mb: 2 }}>
              2. Connecting Lace Wallet Extension
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.7 }}>
              The DApp automatically detects <code>window.midnight.mnLace</code> API provider. Connect your wallet to receive preprod tDUST tokens from the Midnight Faucet.
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Tab 1: Compact Smart Contract */}
      {activeTab === 1 && (
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#F8FAFC' }}>
              journal.compact Source Code
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              onClick={handleCopy}
              sx={{ borderColor: 'rgba(255,255,255,0.2)', color: copied ? '#10B981' : '#F8FAFC' }}
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </Button>
          </Box>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: '#05070C',
              color: '#00F2FE',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              whiteSpace: 'pre-wrap',
              overflowX: 'auto',
              border: '1px solid rgba(0, 242, 254, 0.2)',
            }}
          >
            {sampleCompactCode}
          </Box>
        </Paper>
      )}

      {/* Tab 2: API Reference */}
      {activeTab === 2 && (
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#10B981', mb: 2 }}>
            DeployedBBoardAPI Interface Methods
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.7, mb: 3 }}>
            All contract state mutations return an Observable tracking ZK proof compilation, transaction building, block mining, and indexer confirmation.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderLeft: '4px solid #00F2FE' }}>
              <Typography variant="subtitle2" sx={{ color: '#00F2FE', fontFamily: 'monospace' }}>
                post(message: string): Promise&lt;FinalizedTxData&gt;
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Executes the <code>post()</code> Compact circuit, computing secret key witness commitment and writing message to ledger.
              </Typography>
            </Box>

            <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderLeft: '4px solid #A855F7' }}>
              <Typography variant="subtitle2" sx={{ color: '#A855F7', fontFamily: 'monospace' }}>
                takeDown(): Promise&lt;FinalizedTxData&gt;
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Asserts ownership proof matching secret key with commitment and resets journal state back to VACANT.
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </motion.div>
  );
};
