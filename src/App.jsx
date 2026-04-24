import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import CreditInfo from './pages/CreditInfo'
import Apply from './pages/Apply'

export default function App() {
    const { pathname } = useLocation()
    useEffect(() => { window.scrollTo(0, 0) }, [pathname])

    return (
        <div className="min-h-screen bg-surface text-content">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/credit-info" element={<CreditInfo />} />
                <Route path="/apply" element={<Apply />} />
            </Routes>

            <footer className="border-t border-line py-8 px-4 mt-20 transition-colors">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-signal-green flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 18 18" fill="none"><path d="M2 9L6 5L10 9L16 3" stroke="#080808" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span className="text-sm text-content-dim">Score<span className="text-signal-green/60">IQ</span> × Элдик Банк</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-content-faint">
                        <span>📞 9111</span>
                        <span>🌐 eldik.kg</span>
                        <span>📍 Бишкек, ул. Московская, 80/1</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}