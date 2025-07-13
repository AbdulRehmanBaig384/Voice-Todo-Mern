'use client';
import { MdDashboard, MdEdit, MdEditCalendar, MdFavorite, MdHeartBroken, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Sidebar({ isOpen, onClose, current, setFilter }) {
  const sideVariants = {
    closed: { x: -260 },
    open: { x: 0 },
  };
  return (
    <motion.aside
      variants={sideVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ type: 'spring', stiffness: 80 }}
      className="fixed top-0 left-0 h-full w-[260px] bg-white/10 backdrop-blur-xl
                 border-r border-white/20 shadow-xl z-40 flex flex-col">
      <button
        onClick={onClose}
        className="self-end m-4 text-2xl font-bold text-white/70 hover:text-white">
        ✕
      </button>
      <nav className="flex flex-col gap-6 px-6 py-6 text-lg text-white/90">
        <Link
          href="#"
          onClick={() => setFilter('all')}
          className={`flex items-center gap-4 hover:text-white relative pl-3 ${
            current === 'all'
              ? 'before:absolute before:left-0 before:h-full before:w-1 before:bg-purple-500'
              : ''}`}>
          <MdDashboard size={24} /> All Tasks
        </Link>

        <button
          onClick={() => setFilter('favourite')}
          className={`flex items-center gap-4 hover:text-white relative pl-3 ${
            current === 'favourite'
              ? 'before:absolute before:left-0 before:h-full before:w-1 before:bg-purple-500'
              : ''
          }`}
        >
          <MdFavorite size={24} /> Favourites

        </button>
 

 <Link href="#" onClick={() => setFilter('today')} className={`flex items-center gap-4 relative pl-4 py-2 rounded-lg transition-all duration-200
    hover:bg-white/10 hover:text-white
    ${current === 'today' ? 'bg-purple-500 text-white' : 'text-white/80'}
  `}>
  <MdEditCalendar size={24} />
  <span>Due Today</span>
</Link>

<Link href="#" onClick={() => setFilter('upcoming')} className={`flex items-center gap-4 relative pl-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white
    ${current === 'upcoming' ? 'bg-purple-500 text-white' : 'text-white/80'}
  `}>
  <MdEdit size={24} />
  <span>Upcoming</span>
</Link>

<Link href="#" onClick={() => setFilter('missed')} className={`flex items-center gap-4 relative pl-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white
    ${current === 'missed' ? 'bg-purple-500 text-white' : 'text-white/80'}
  `}><MdHeartBroken size={24} />
  <span>Missed</span>
</Link>
        <Link href="/login" className="flex items-center gap-4 mt-auto hover:text-white">
          <MdLogout size={24} /> Logout
        </Link>
      </nav>
    </motion.aside>
  );
}

