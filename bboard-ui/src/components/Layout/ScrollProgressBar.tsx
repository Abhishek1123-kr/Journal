import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #00F2FE 0%, #6366F1 50%, #A855F7 100%)',
        transformOrigin: '0%',
        zIndex: 9999,
        boxShadow: '0 0 10px #00F2FE, 0 0 20px #A855F7',
      }}
    />
  );
};
