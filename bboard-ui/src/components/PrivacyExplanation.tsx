import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/SecurityOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`privacy-tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const PrivacyExplanation: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      {/* Header Banner */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(11,15,25,0.95) 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              backgroundColor: 'rgba(0, 242, 254, 0.1)',
              color: '#00F2FE',
              display: 'flex',
            }}
          >
            <SecurityIcon fontSize="medium" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#F8FAFC' }}>
            Selective Disclosure & ZK Privacy Architecture
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#94A3B8', maxWidth: 850, lineHeight: 1.7 }}>
          Midnight's Compact zero-knowledge programming model separates sensitive private state (stored in local witness memory) from public ledger state. Users prove key ownership and state transition validity without exposing private keys on-chain.
        </Typography>
      </Paper>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <Tabs
          value={tabValue}
          onChange={(_, val) => setTabValue(val)}
          sx={{
            '& .MuiTab-root': {
              color: '#94A3B8',
              fontWeight: 600,
              fontSize: '0.95rem',
              textTransform: 'none',
              '&.Mui-selected': { color: '#00F2FE' },
            },
            '& .MuiTabs-indicator': { backgroundColor: '#00F2FE', height: 3 },
          }}
        >
          <Tab label="Public vs Private State" />
          <Tab label="What Observers Can & Cannot Learn" />
          <Tab label="ZK Circuit Breakdown" />
        </Tabs>
      </Box>

      {/* Tab 1: Public vs Private State Matrix */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Public Ledger State Card */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(0, 255, 136, 0.25)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <VisibilityIcon sx={{ color: '#00FF88' }} />
              <Typography variant="h6" sx={{ color: '#00FF88', fontWeight: 700 }}>
                Public Data (On-Chain Ledger)
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
              Data recorded directly on the Midnight network ledger, accessible to nodes and indexers.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                  <code>state: State</code> (VACANT / OCCUPIED)
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Indicates entry status availability.
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                  <code>sequence: Counter</code>
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Anti-replay incrementing transaction sequence counter.
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                  <code>owner: Bytes&lt;32&gt;</code> (Hash Commitment)
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  One-way ZK hash commitment <code>publicKey(secretKey, sequence)</code>.
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Private Client Witness Card */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(127, 0, 255, 0.3)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <VisibilityOffIcon sx={{ color: '#E100FF' }} />
              <Typography variant="h6" sx={{ color: '#E100FF', fontWeight: 700 }}>
                Private Data (Local Client Witness)
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
              Data held strictly client-side inside the local Private State Provider. NEVER transmitted on-chain.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                  <code>localSecretKey(): Bytes&lt;32&gt;</code>
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  32-byte cryptographically secure random key stored only in local private witness memory.
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                  Zero-Knowledge Proof Witnessing
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  The Midnight Proof Server constructs a ZK proof asserting possession of secret key without revealing raw bytes.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </TabPanel>

      {/* Tab 2: What Observers Can & Cannot Learn */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
            <Typography variant="h6" sx={{ color: '#00FF88', fontWeight: 700, mb: 2 }}>
              What an Observer CAN Learn
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                'Current on-chain state (VACANT or OCCUPIED).',
                'Total number of transaction sequence updates.',
                'Publicly posted/disclosed entry message text.',
                'Zero-knowledge hash commitment owner value.',
                'Valid mathematical verification that state transitions followed Compact contract rules.',
              ].map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <CheckCircleOutlinedIcon sx={{ color: '#00FF88', fontSize: 18, mt: 0.3 }} />
                  <Typography variant="body2" sx={{ color: '#F8FAFC' }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 51, 102, 0.2)' }}>
            <Typography variant="h6" sx={{ color: '#FF3366', fontWeight: 700, mb: 2 }}>
              What an Observer CANNOT Learn
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                'The user’s client-side 32-byte secret key (`localSecretKey`).',
                'Which specific wallet key derived the `owner` public key hash commitment.',
                'Un-posted draft messages or client witness state.',
                'Pre-image parameters passed to the ZK `persistentHash` function.',
                'Identity of the voter/author beyond ZK circuit proof verification.',
              ].map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <CancelOutlinedIcon sx={{ color: '#FF3366', fontSize: 18, mt: 0.3 }} />
                  <Typography variant="body2" sx={{ color: '#F8FAFC' }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </TabPanel>

      {/* Tab 3: ZK Circuit Specifications Accordion */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Accordion sx={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#00F2FE' }} />}>
              <Typography sx={{ fontWeight: 700, color: '#00F2FE' }}>Circuit: post(newMessage)</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: '#94A3B8' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Asserts that state is <code>VACANT</code>. Calculates <code>owner = disclose(publicKey(localSecretKey(), sequence))</code> and sets state to <code>OCCUPIED</code>.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#00F2FE' }} />}>
              <Typography sx={{ fontWeight: 700, color: '#00F2FE' }}>Circuit: takeDown() [Zero-Knowledge Proof Assertion]</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: '#94A3B8' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Executes ZK assertion: <code>assert(owner == publicKey(localSecretKey(), sequence), "Not current owner")</code>. Proves ownership of secret key without revealing raw secret key to the ledger.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </TabPanel>
    </Box>
  );
};
