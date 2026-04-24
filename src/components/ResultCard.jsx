import { useEffect, useRef, useState } from 'react'

const TIER_CONFIG = {
    excellent: { label: 'Отличный профиль', color: 'text-signal-green' },
    good:      { label: 'Хороший профиль',  color: 'text-signal-green' },
    fair:      { label: 'Средний риск',     color: 'text-signal-amber' },
    poor:      { label: 'Высокий риск',     color: 'text-signal-red' },
    very_poor: { label: 'Критический риск', color: 'text-signal-red' },
}

export default function ResultCard({ result, onReset }) {
    const isDefault = result.decision === 'default'
    const probability = result.probability
    const score = result.score
    const [animatedScore, setAnimatedScore] = useState(0)
    const [animatedProb, setAnimatedProb] = useState(0)
    const animRef = useRef(null)

    useEffect(() => {
        let start = null
        const duration = 1200
        const step = (timestamp) => {
            if (!start) start = timestamp
            const elapsed = timestamp - start
            const p = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setAnimatedScore(Math.round(score * eased))
            setAnimatedProb(probability * eased)
            if (p < 1) animRef.current = requestAnimationFrame(step)
        }
        animRef.current = requestAnimationFrame(step)
        return () => cancelAnimationFrame(animRef.current)
    }, [score, probability])

    const tierConfig = TIER_CONFIG[result.recommendation?.tier] || TIER_CONFIG.fair

    return (
        <div className="animate-slide-up">
            {/* Decision header */}
            <div className={`glass rounded-2xl p-6 mb-4 relative overflow-hidden transition-colors ${
                isDefault ? 'glow-red border-signal-red/20' : 'glow-green border-signal-green/20'
            } border`}>
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 ${
                    isDefault ? 'bg-signal-red' : 'bg-signal-green'
                }`} />
                <div className="relative flex items-start justify-between gap-4">
                    <div>
                        <div className={`tag mb-3 ${
                            isDefault
                                ? 'bg-signal-red/10 text-signal-red border border-signal-red/20'
                                : 'bg-signal-green/10 text-signal-green border border-signal-green/20'
                        }`}>
                            {isDefault ? (
                                <><svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 1v4M5 8v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>DEFAULT</>
                            ) : (
                                <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>NON-DEFAULT</>
                            )}
                        </div>
                        <h2 className="text-2xl font-semibold text-content mb-1 transition-colors">
                            {isDefault ? 'Кредит не одобрен' : 'Кредит одобрен'}
                        </h2>
                        <p className="text-content-dim text-sm transition-colors">{result.recommendation?.text}</p>
                    </div>
                    <div className="flex-shrink-0 text-center">
                        <div className={`w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center transition-colors ${
                            isDefault ? 'border-signal-red/30 bg-signal-red/5' : 'border-signal-green/30 bg-signal-green/5'
                        }`}>
              <span className={`text-xl font-bold font-mono ${isDefault ? 'text-signal-red' : 'text-signal-green'}`}>
                {animatedScore}
              </span>
                            <span className="text-xs text-content-dim transition-colors">балл</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Probability meter */}
            <div className="glass rounded-2xl p-6 mb-4 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-content-dim uppercase tracking-widest transition-colors">Вероятность дефолта</h3>
                    <span className={`text-2xl font-bold font-mono ${
                        probability >= 0.5 ? 'text-signal-red' : probability >= 0.35 ? 'text-signal-amber' : 'text-signal-green'
                    }`}>
            {(animatedProb * 100).toFixed(1)}%
          </span>
                </div>
                <div className="relative h-3 rounded-full overflow-hidden mb-2" style={{ background: 'var(--progress-track)' }}>
                    <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
                        style={{
                            width: `${animatedProb * 100}%`,
                            background: probability >= 0.5
                                ? 'linear-gradient(90deg, #ffab00, #ff1744)'
                                : probability >= 0.35
                                    ? 'linear-gradient(90deg, #00e676, #ffab00)'
                                    : 'linear-gradient(90deg, #00e676, #00b8d9)',
                        }}
                    />
                    <div className="absolute top-0 bottom-0 w-0.5" style={{ left: '50%', background: 'var(--threshold)' }} />
                </div>
                <div className="flex justify-between text-xs font-mono text-content-faint transition-colors">
                    <span>0% — безопасно</span>
                    <span>50% — порог</span>
                    <span>100% — дефолт</span>
                </div>
            </div>

            {/* Factors */}
            {result.factors && result.factors.length > 0 && (
                <div className="glass rounded-2xl p-6 mb-4 transition-colors">
                    <h3 className="text-sm font-medium text-content-dim uppercase tracking-widest mb-4 transition-colors">
                        Ключевые факторы
                    </h3>
                    <div className="flex flex-col gap-3">
                        {result.factors.map((factor, i) => (
                            <FactorRow key={i} factor={factor} index={i} />
                        ))}
                    </div>
                </div>
            )}

            {/* Meta */}
            <div className="glass rounded-2xl p-4 mb-6 transition-colors">
                <div className="flex flex-wrap gap-4 text-xs font-mono text-content-faint transition-colors">
                    <span>ID: {Date.now().toString(36).toUpperCase()}</span>
                    <span>•</span>
                    <span>{new Date(result.processed_at).toLocaleString('ru', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    <span>•</span>
                    <span>Модель v1.0.0</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={onReset} className="btn-primary flex-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8a6 6 0 1 0 1-3.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M2 4v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Новая заявка
                </button>
                <button onClick={() => window.print()} className="btn-ghost flex-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4V2h8v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <rect x="2" y="5" width="12" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M4 14h8M4 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Распечатать
                </button>
            </div>
        </div>
    )
}

function FactorRow({ factor, index }) {
    const isPositive = factor.impact === 'positive'
    const isNeutral = factor.impact === 'neutral'

    return (
        <div
            className="flex items-center gap-3 animate-slide-in"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
        >
            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                isPositive
                    ? 'bg-signal-green/10 text-signal-green'
                    : isNeutral
                        ? 'bg-surface-glass text-content-dim'
                        : 'bg-signal-red/10 text-signal-red'
            }`}>
                {isPositive ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : isNeutral ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                ) : (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M8 5L5 8 2 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
            </div>
            <span className="text-sm text-content-muted flex-1 transition-colors">{factor.name}</span>
            <span className="text-xs font-mono text-content-dim shrink-0 transition-colors">{factor.value}</span>
            <div className="w-16 h-1.5 rounded-full overflow-hidden flex-shrink-0" style={{ background: 'var(--progress-track)' }}>
                <div
                    className={`h-full rounded-full transition-all duration-500 ${
                        isPositive ? 'bg-signal-green' : isNeutral ? 'bg-content-faint' : 'bg-signal-red'
                    }`}
                    style={{ width: `${factor.weight * 100}%` }}
                />
            </div>
        </div>
    )
}