import { useEffect, useMemo, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import Hotspot from './components/Hotspot'
import Modal from './components/Modal'
import Onboarding from './components/Onboarding'
import worldData from './worldData.json'

const categories = ['Eat', 'Donate', 'Compost', 'Trash']

function GuessLocalGame({ onClose }) {
  const [selected, setSelected] = useState(null)
  return (
    <div>
      <h3 className="font-semibold mb-3">Guess Local Food</h3>
      <p className="text-sm text-gray-600 mb-4">Which items are local? Tap to choose.</p>
      <div className="grid grid-cols-2 gap-3">
        {worldData.guessLocal.map((f, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`rounded-lg border p-3 text-left hover:border-emerald-500 ${selected===i? 'ring-2 ring-emerald-500': ''}`}
          >
            <div className="font-medium">{f.name}</div>
            {selected===i && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`mt-2 text-sm ${f.local? 'text-emerald-600':'text-red-600'}`}>
                {f.local ? '✅ Local! Supporting nearby farmers reduces transport emissions.' : '❌ Likely imported. Consider seasonal local alternatives.'}
              </motion.div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-4 text-right">
        <button onClick={onClose} className="px-4 py-2 rounded bg-emerald-600 text-white">Close</button>
      </div>
    </div>
  )
}

function ShopSmartGame({ onClose }) {
  const [index, setIndex] = useState(0)
  const item = worldData.shopSmart[index]
  const [result, setResult] = useState(null)
  const next = () => { setIndex((v)=> Math.min(v+1, worldData.shopSmart.length-1)); setResult(null)}
  return (
    <div>
      <h3 className="font-semibold mb-3">Shop Smart – Need or Not?</h3>
      <p className="text-sm text-gray-600 mb-4">Decide if this is a real need.</p>
      <motion.div key={index} initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} className="rounded-lg border p-4 mb-3 bg-gray-50">
        <div className="text-lg font-medium">{item.item}</div>
      </motion.div>
      <div className="flex gap-2">
        <button onClick={()=>setResult('Need')} className="flex-1 px-4 py-2 rounded bg-emerald-600 text-white">Need</button>
        <button onClick={()=>setResult('Not Need')} className="flex-1 px-4 py-2 rounded bg-rose-600 text-white">Not Need</button>
      </div>
      {result && (
        <div className="mt-3 text-sm">
          { (result==='Need') === item.need ? (
            <div className="text-emerald-700">✅ Great choice! Thoughtful buying prevents waste.</div>
          ) : (
            <div className="text-red-700">❌ Not quite. Try prioritizing essentials before extras.</div>
          )}
          {index < worldData.shopSmart.length-1 ? (
            <button onClick={next} className="mt-3 px-3 py-2 rounded bg-blue-600 text-white">Next</button>
          ) : (
            <button onClick={onClose} className="mt-3 px-3 py-2 rounded bg-emerald-600 text-white">Finish</button>
          )}
        </div>
      )}
    </div>
  )
}

function RiceTimeline({ onClose }) {
  const [step, setStep] = useState(0)
  return (
    <div>
      <h3 className="font-semibold mb-3">Rice Field Timeline</h3>
      <div className="flex items-center justify-between gap-2">
        {worldData.timeline.map((t, i)=>(
          <button key={i} onClick={()=>setStep(i)} className={`flex-1 rounded-lg p-2 text-xs sm:text-sm border ${step===i? 'bg-emerald-50 border-emerald-500':'hover:border-emerald-400'}`}>
            {t.stage}
          </button>
        ))}
      </div>
      <motion.div key={step} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="mt-4 text-gray-700">
        {worldData.timeline[step].text}
      </motion.div>
      <div className="mt-4 text-right">
        <button onClick={onClose} className="px-4 py-2 rounded bg-emerald-600 text-white">Close</button>
      </div>
    </div>
  )
}

function FactsPopup({ onClose }) {
  const [i, setI] = useState(0)
  const next = () => setI((v)=> (v+1)%worldData.facts.length)
  return (
    <div>
      <h3 className="font-semibold mb-3">Smart Café Facts</h3>
      <motion.p key={i} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="text-gray-700">
        {worldData.facts[i]}
      </motion.p>
      <div className="mt-4 flex justify-between">
        <button onClick={next} className="px-3 py-2 rounded bg-blue-600 text-white">Another</button>
        <button onClick={onClose} className="px-3 py-2 rounded bg-emerald-600 text-white">Close</button>
      </div>
    </div>
  )
}

function SortingGame({ onClose }) {
  const [score, setScore] = useState(0)
  const [current, setCurrent] = useState(0)
  const item = worldData.sortingItems[current]
  const choose = (cat) => {
    if(!item) return
    if(cat === item.category) setScore(s=>s+1)
    setCurrent((v)=>v+1)
  }
  const finished = current >= worldData.sortingItems.length
  return (
    <div>
      <h3 className="font-semibold mb-3">Sort the Waste</h3>
      {!finished ? (
        <>
          <div className="rounded-lg border p-4 mb-3 bg-gray-50 text-lg font-medium">{item.name}</div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c)=> (
              <button key={c} onClick={()=>choose(c)} className="px-3 py-2 rounded bg-white border hover:border-emerald-500">
                {c}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-700">Score: {score}/{worldData.sortingItems.length}</div>
          <p className="mt-2 text-gray-700">Great job! Little choices make big impact.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 rounded bg-emerald-600 text-white">Close</button>
        </div>
      )}
    </div>
  )
}

function WorldCanvas() {
  const [active, setActive] = useState(null)
  const containerRef = useRef(null)

  // keep 16:9 aspect
  const worldStyle = {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundImage: `url(${worldData.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
  }

  const renderModalContent = () => {
    if (!active) return null
    switch(active.type){
      case 'guess-local': return <GuessLocalGame onClose={()=>setActive(null)} />
      case 'shop-smart': return <ShopSmartGame onClose={()=>setActive(null)} />
      case 'timeline': return <RiceTimeline onClose={()=>setActive(null)} />
      case 'facts': return <FactsPopup onClose={()=>setActive(null)} />
      case 'sorting': return <SortingGame onClose={()=>setActive(null)} />
      default: return null
    }
  }

  return (
    <div className="relative">
      <TransformWrapper
        minScale={0.8}
        initialScale={1}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
        pinch={{ disabled: false }}
        panning={{ velocityDisabled: true }}
        limitToBounds={false}
      >
        <TransformComponent>
          <div ref={containerRef} style={worldStyle} className="relative overflow-hidden">
            {worldData.hotspots.map((h, i)=> (
              <Hotspot key={h.id} index={i} x={h.x} y={h.y} label={h.label} onClick={()=>setActive(h)} />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <Modal open={!!active} onClose={()=>setActive(null)} title={active?.label || ''}>
        {renderModalContent()}
      </Modal>
    </div>
  )
}

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-amber-50 to-sky-50 text-gray-900">
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-white shadow grid place-items-center ring-1 ring-black/5">🌾</div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">The Journey of Food</h1>
            <p className="text-xs sm:text-sm text-gray-600">From Market to Waste</p>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 pb-10 space-y-6">
        <section className="h-[280px] sm:h-[380px] md:h-[460px] rounded-2xl overflow-hidden relative">
          <Spline scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />
        </section>

        <section className="max-w-6xl mx-auto">
          <WorldCanvas />
        </section>
      </main>

      <Onboarding />
    </div>
  )
}
