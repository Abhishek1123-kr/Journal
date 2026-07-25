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
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Cpu,
  Lock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`privacy-tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3.5 }}>{children}</Box>}
    </div>
  );
}

export const PrivacyExplanation: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Box sx={{ width: '100%', py: 3 }}>
        {/* Cyberpunk Header Banner with Glowing Ambient Sheen */}
        <Paper
          sx={{
            p: 4.5,
            mb: 4,
            borderRadius: 5,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 242, 254, 0.1)',
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(11,15,25,0.98) 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.8 }}>
            <Box
              sx={{
                p: 1.2,
                borderRadius: 3,
                backgroundColor: 'rgba(0, 242, 254, 0.12)',
                color: '#00F2FE',
                display: 'flex',
                boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)',
              }}
            >
              <ShieldCheck size={26} color="#00F2FE" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.01em' }}>
              Selective Disclosure & Zero-Knowledge Architecture
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#94A3B8', maxWidth: 880, lineHeight: 1.75, fontSize: '0.95rem' }}>
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
                fontWeight: 700,
                fontSize: '0.95rem',
                textTransform: 'none',
                py: 1.5,
                '&.Mui-selected': { color: '#00F2FE' },
              },
              '& .MuiTabs-indicator': { backgroundColor: '#00F2FE', height: 3, borderRadius: 2 },
            }}
          >
            <Tab label="Public vs Private State" />
            <Tab label="What Observers Can & Cannot Learn" />
            <Tab label="ZK Circuit Breakdown" />
          </Tabs>
        </Box>

        {/* Tab 1: Public vs Private State Split Grid */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3.5 }}>
            {/* Public Ledger State Card */}
            <motion.div whileHover={{ y: -4 }}>
              <Paper
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  boxShadow: '0 15px 35px -10px rgba(16, 185, 129, 0.15)',
                  height: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8, mb: 2 }}>
                  <Eye size={22} color="#10B981" />
                  <Typography variant="h6" sx={{ color: '#10B981', fontWeight: 800 }}>
                    Public Data (On-Chain Ledger)
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
                  Data recorded directly on the Midnight network ledger, accessible to nodes and indexers.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 700 }}>
                      <code>state: State</code> (VACANT / OCCUPIED)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Indicates entry availability status.
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 700 }}>
                      <code>sequence: Counter</code>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Anti-replay incrementing transaction sequence counter.
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 700 }}>
                      <code>owner: Bytes&lt;32&gt;</code> (Hash Commitment)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      One-way ZK hash commitment <code>publicKey(secretKey, sequence)</code>.
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>

            {/* Private Client Witness Card */}
            <motion.div whileHover={{ y: -4 }}>
              <Paper
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(168, 85, 247, 0.35)',
                  boxShadow: '0 15px 35px -10px rgba(168, 85, 247, 0.15)',
                  height: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8, mb: 2 }}>
                  <EyeOff size={22} color="#C084FC" />
                  <Typography variant="h6" sx={{ color: '#C084FC', fontWeight: 800 }}>
                    Private Data (Local Client Witness)
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
                  Data held strictly client-side inside the local Private State Provider. NEVER transmitted on-chain.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 700 }}>
                      <code>localSecretKey(): Bytes&lt;32&gt;</code>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      32-byte cryptographically secure random key stored only in local private witness memory.
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 700 }}>
                      Zero-Knowledge Proof Witnessing
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      The Midnight Proof Server constructs a ZK proof asserting possession of secret key without revealing raw bytes.
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Box>
        </TabPanel>

        {/* Tab 2: What Observers Can & Cannot Learn */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3.5 }}>
            <Paper sx={{ p: 3.5, borderRadius: 4, backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              <Typography variant="h6" sx={{ color: '#10B981', fontWeight: 800, mb: 2.5 }}>
                What an Observer CAN Learn
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {[
                  'Current on-chain state (VACANT or OCCUPIED).',
                  'Total number of transaction sequence updates.',
                  'Publicly posted/disclosed entry message text.',
                  'Zero-knowledge hash commitment owner value.',
                  'Valid mathematical verification that state transitions followed Compact contract rules.',
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                    <CheckCircle2 size={18} color="#10B981" style={{ marginTop: 2, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: '#F8FAFC', lineHeight: 1.6 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            <Paper sx={{ p: 3.5, borderRadius: 4, backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 51, 102, 0.25)' }}>
              <Typography variant="h6" sx={{ color: '#FF3366', fontWeight: 800, mb: 2.5 }}>
                What an Observer CANNOT Learn
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {[
                  'The user’s client-side 32-byte secret key (`localSecretKey`).',
                  'Which specific wallet key derived the `owner` public key hash commitment.',
                  'Un-posted draft messages or client witness state.',
                  'Pre-image parameters passed to the ZK `persistentHash` function.',
                  'Identity of the voter/author beyond ZK circuit proof verification.',
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                    <XCircle size={18} color="#FF3366" style={{ marginTop: 2, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: '#F8FAFC', lineHeight: 1.6 }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Accordion sx={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px !important' }}>
              <AccordionSummary expandIcon={<ChevronDown color="#00F2FE" />}>
                <Typography sx={{ fontWeight: 800, color: '#00F2FE' }}>Circuit: post(newMessage)</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: '#94A3B8' }}>
                <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                  Asserts that state is <code>VACANT</code>. Calculates <code>owner = disclose(publicKey(localSecretKey(), sequence))</code> and sets state to <code>OCCUPIED</code>.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px !important' }}>
              <AccordionSummary expandIcon={<ChevronDown color="#00F2FE" />}>
                <Typography sx={{ fontWeight: 800, color: '#00F2FE' }}>Circuit: takeDown() [Zero-Knowledge Proof Assertion]</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: '#94A3B8' }}>
                <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.7 }}>
                  Executes ZK assertion: <code>assert(owner == publicKey(localSecretKey(), sequence), "Not current owner")</code>. Proves ownership of secret key without revealing raw secret key to the ledger.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </TabPanel>
      </Box>
    </motion.div>
  );
};
