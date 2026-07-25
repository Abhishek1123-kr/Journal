import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'What is the Midnight Private Journal DApp?',
      a: 'Midnight Private Journal is a decentralized application built on the Midnight Network using the Compact Zero-Knowledge smart contract language. It enables users to post and verify journal entries or ballots on-chain without revealing client secret keys.',
    },
    {
      q: 'How does Zero-Knowledge privacy protect my data?',
      a: 'Zero-Knowledge proofs allow you to mathematically prove to Midnight network validators that you possess the valid private key matching an on-chain entry commitment (`owner`), without ever revealing the secret key itself to anyone.',
    },
    {
      q: 'Which browser wallets are supported?',
      a: 'The DApp supports the official Midnight Lace Wallet extension, 1AM Wallet, Nightly Wallet, and any Midnight DApp Connector API injected into `window.midnight`.',
    },
    {
      q: 'Is my private secret key ever sent to a server or ledger?',
      a: 'No. Your 32-byte secret key (`localSecretKey`) is stored strictly in your browser’s local witness memory. Only zero-knowledge proof assertions are transmitted on-chain.',
    },
    {
      q: 'What happens when I perform an entry Take Down?',
      a: 'When you trigger a Take Down, your client executes a ZK assertion (`assert(owner == publicKey(secretKey, sequence))`). If the ZK proof verifies, the contract transitions state from OCCUPIED back to VACANT and increments the sequence counter.',
    },
  ];

  return (
    <Box id="section-faq" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Box sx={{ p: 1.2, borderRadius: 3, backgroundColor: 'rgba(0, 242, 254, 0.1)', color: '#00F2FE', mx: 'auto', width: 'fit-content', mb: 1.5 }}>
          <HelpCircle size={24} />
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#F8FAFC', mb: 1.5 }}>
          Frequently Asked Questions
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#94A3B8', maxWidth: 650, mx: 'auto' }}>
          Got questions about Zero-Knowledge proof execution or wallet integration? Find answers below.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 850, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {faqs.map((faq, idx) => (
          <Accordion
            key={idx}
            sx={{
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px !important',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                borderColor: 'rgba(0, 242, 254, 0.4)',
                boxShadow: '0 0 25px rgba(0, 242, 254, 0.15)',
              },
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown color="#00F2FE" />}>
              <Typography sx={{ fontWeight: 700, color: '#F8FAFC', fontSize: '1.02rem' }}>
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.7 }}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
