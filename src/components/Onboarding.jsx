import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Onboarding() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('world_onboarded')) {
      setShow(true)
      localStorage.setItem('world_onboarded', '1')
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl rounded-2xl bg-white/70 backdrop-blur-md shadow-2xl ring-1 ring-black/5 p-4 sm:p-6 text-center text-sm sm:text-base"
          >
            <p className="font-semibold text-gray-800">Pinch to zoom • Drag to move • Tap glowing icons to learn!</p>
            <p className="mt-1 text-gray-700">Use keyboard Tab and Enter on hotspots. Press Esc to dismiss.</p>
          </motion.div>
          <button
            className="pointer-events-auto absolute top-4 right-4 rounded-full bg-white/80 p-2 shadow hover:bg-white"
            aria-label="Dismiss tutorial"
            onClick={() => setShow(false)}
          >
            ✕
          </button>
        </div>
      )}
    </AnimatePresence>
  )
}
