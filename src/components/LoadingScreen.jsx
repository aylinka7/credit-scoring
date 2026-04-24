import { useEffect, useState } from 'react'

const STEPS = [
    { label: 'Нормализация данных', duration: 400 },
    { label: 'Проверка признаков', duration: 500 },
    { label: 'Запуск модели', duration: 600 },
    { label: 'Калибровка вероятности', duration: 300 },
]

export default function LoadingScreen() {
    const [currentStep, setCurrentStep] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let elapsed = 0
        const total = STEPS.reduce((s, step) => s + step.duration, 0)

        STEPS.forEach((step, i) => {
            setTimeout(() => setCurrentStep(i), elapsed)
            elapsed += step.duration
        })

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 100 / (total / 30)
                return Math.min(next, 95)
            })
        }, 30)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-8 animate-fade-in">
            {/* Animated logo */}
            <div className="relative w-24 h-24">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="42" fill="none" stroke="var(--border-color)" strokeWidth="2" />
                    <circle
                        cx="48" cy="48" r="42" fill="none" stroke="#00e676" strokeWidth="2"
                        strokeDasharray={`${progress * 2.64} 264`} strokeDashoffset="66"
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dasharray 0.3s ease', transform: 'rotate(-90deg)', transformOrigin: '48px 48px' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 glass rounded-full flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="animate-pulse">
                            <path d="M4 14 L10 8 L16 14 L24 6" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="14" cy="21" r="3" fill="#00e676"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-2 w-full max-w-xs">
                {STEPS.map((step, i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-3 transition-all duration-300 ${
                            i < currentStep ? 'opacity-40' : i === currentStep ? 'opacity-100' : 'opacity-20'
                        }`}
                    >
                        <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                i < currentStep
                                    ? 'bg-signal-green'
                                    : i === currentStep
                                        ? 'bg-signal-green/20 border border-signal-green/50 animate-pulse'
                                        : 'bg-surface-glass border border-line'
                            }`}
                        >
                            {i < currentStep ? (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5l2 2 4-4" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : i === currentStep ? (
                                <div className="w-2 h-2 rounded-full bg-signal-green" />
                            ) : null}
                        </div>
                        <span className={`text-sm font-mono transition-colors ${i === currentStep ? 'text-content' : 'text-content-dim'}`}>
              {step.label}
            </span>
                    </div>
                ))}
            </div>

            <p className="text-content-dim text-sm font-mono transition-colors">
                Анализ кредитного риска...
            </p>
        </div>
    )
}