'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCheckCircle, MdEventNote, MdStar } from 'react-icons/md';

const blobs = [
  { size: 450, start: { x: -320, y: -250 }, color: 'bg-indigo-600' },{ size: 370, start: { x: 280, y: -200 }, color: 'bg-purple-600' },
  { size: 400, start: { x: -270, y: 280 }, color: 'bg-pink-500' }, { size: 320, start: { x: 220, y: 250 }, color: 'bg-cyan-500' },
];

const blobVariants = {
  initial: ({ start }) => ({ x: start.x, y: start.y, scale: 0, opacity: 0 }),
  animate: {scale: [1, 1.15, 1],opacity: [0.3, 0.2, 0.3],rotate: [0, 30, 0],
    transition: {duration: 12,repeat: Infinity, ease: 'easeInOut',
    },
  },
};
const iconVariants = {
  float: { y: [0, -20, 0],opacity: [1, 0.7, 1],
    transition: {duration: 4,repeat: Infinity,ease: 'easeInOut',
    },
  },
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
};

export default function Splash({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Blobs */}
          {blobs.map((blob, idx) => (
            <motion.div key={idx}  custom={blob} variants={blobVariants} initial="initial" animate="animate"
              className={`${blob.color} absolute rounded-full mix-blend-overlay filter blur-3xl`} style={{ width: blob.size, height: blob.size }}
            />
          ))}

          <motion.div className="absolute top-20 left-20 text-cyan-400" variants={iconVariants} initial="initial" animate="float"
            transition={{ delay: 0.5 }}
          >
            <MdCheckCircle size={64} />
          </motion.div>

          <motion.div className="absolute top-28 right-24 text-pink-400" variants={iconVariants} initial="initial" animate="float" transition={{ delay: 1 }}
          >
            <MdEventNote size={60} />
          </motion.div>

          <motion.div className="absolute bottom-24 left-28 text-purple-400"  variants={iconVariants} initial="initial" animate="float"  transition={{ delay: 1.5 }}
          >
            <MdStar size={56} />
          </motion.div>
          <motion.div  initial={{ scale: 0.7, opacity: 0 }}  animate={{ scale: 1, opacity: 1 }}  transition={{ duration: 1.4, ease: 'easeOut' }}  className="text-center px-6"
          >
            <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg">
              Welcome to the
            </h1>

            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1.2 }}  className="block mt-3 text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              Welcome to Your Smart Task Manager 
              
            </motion.span>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}


