import React, { useState } from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Vote,
  ShieldCheck,
  Cpu,
  Radio,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Lock,
} from 'lucide-react';

export interface AnimatedSidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export const AnimatedSidebar: React.FC<AnimatedSidebarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'proposals', label: 'Active Proposals', icon: <Vote size={20} /> },
    { id: 'privacy', label: 'Privacy Hub', icon: <ShieldCheck size={20} /> },
    { id: 'circuits', label: 'ZK Circuit Spec', icon: <Cpu size={20} /> },
    { id: 'network', label: 'Network Health', icon: <Radio size={20} /> },
    { id: 'docs', label: 'Documentation', icon: <FileText size={20} /> },
  ];

  return (
    <motion.div
      animate={{ width: isCollapsed ? 76 : 250 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'sticky',
        top: 80,
        height: 'calc(100vh - 100px)',
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 5,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px 0 rgba(0, 242, 254, 0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Top Header & Toggle Section */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'space-between',
              mb: 3,
              px: isCollapsed ? 0 : 1,
            }}
          >
            {!isCollapsed && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Box
                  sx={{
                    p: 0.8,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 242, 254, 0.12)',
                    color: '#00F2FE',
                    display: 'flex',
                  }}
                >
                  <Lock size={16} />
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#F8FAFC', letterSpacing: '0.02em' }}>
                  NAVIGATOR
                </Typography>
              </Box>
            )}

            <Tooltip title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'} placement="right">
              <IconButton
                onClick={() => setIsCollapsed(!isCollapsed)}
                size="small"
                sx={{
                  color: '#94A3B8',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  '&:hover': {
                    color: '#00F2FE',
                    backgroundColor: 'rgba(0, 242, 254, 0.1)',
                    borderColor: 'rgba(0, 242, 254, 0.3)',
                  },
                }}
              >
                {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Menu Items List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Tooltip key={item.id} title={isCollapsed ? item.label : ''} placement="right">
                  <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
                    <Box
                      onClick={() => onSelectSection(item.id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.8,
                        px: 1.8,
                        py: 1.4,
                        borderRadius: 3,
                        cursor: 'pointer',
                        position: 'relative',
                        backgroundColor: isActive ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
                        color: isActive ? '#00F2FE' : '#94A3B8',
                        border: isActive ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid transparent',
                        transition: 'all 0.25s ease',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        '&:hover': {
                          color: '#00F2FE',
                          backgroundColor: isActive ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        },
                      }}
                    >
                      {/* Active Indicator Glow Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSidePill"
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '20%',
                            height: '60%',
                            width: 4,
                            borderRadius: 4,
                            backgroundColor: '#00F2FE',
                            boxShadow: '0 0 12px #00F2FE',
                          }}
                        />
                      )}

                      <Box sx={{ display: 'flex', color: isActive ? '#00F2FE' : 'inherit' }}>
                        {item.icon}
                      </Box>

                      {!isCollapsed && (
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: isActive ? 700 : 500,
                            fontSize: '0.88rem',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.label}
                        </Typography>
                      )}
                    </Box>
                  </motion.div>
                </Tooltip>
              );
            })}
          </Box>
        </Box>

        {/* Bottom ZK Shield Status Pill */}
        <Box sx={{ pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: 1.5,
              px: isCollapsed ? 0 : 1.5,
              py: 1,
              borderRadius: 3,
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <Sparkles size={16} color="#10B981" />
            {!isCollapsed && (
              <Box>
                <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 800, display: 'block' }}>
                  ZK SHIELD ACTIVE
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.7rem' }}>
                  Local Witness Shielded
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};
