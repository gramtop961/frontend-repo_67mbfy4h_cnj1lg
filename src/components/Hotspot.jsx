import { motion } from 'framer-motion'

export default function Hotspot({ x, y, label, onClick, index }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 * index }}
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 blur-md animate-pulse" />
        <span className="relative z-10 grid place-items-center w-9 h-9 rounded-full bg-white shadow-md ring-2 ring-emerald-500 text-emerald-600 font-bold">
          i
        </span>
      </motion.div>
      <span className="mt-2 block text-xs text-gray-800/80 font-medium">{label}</span>
    </button>
  )
}
