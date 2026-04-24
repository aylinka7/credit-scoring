import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function DonutChart({ percentage }) {
    const radius = 60
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - percentage / 100)
    const color = percentage < 30 ? '#ff1744' : '#ffab00'

    return (
        <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--border-color)" strokeWidth="12" />
                <circle cx="70" cy="70" r={radius} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
                        strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold font-mono" style={{ color }}>{percentage}%</span>
                <span className="text-xs text-content-dim transition-colors">шанс</span>
            </div>
        </div>
    )
}

export default function ResultScenarioA({ result, onReset }) {
    const chance = Math.round((1 - result.probability) * 100)

    const [loan, setLoan] = useState(500000)
    const [term, setTerm] = useState(48)

    const FACTORS = [
        { color: 'bg-signal-red', label: 'Высокое негативное', name: 'Просрочки в прошлом', desc: 'Задержки платежей более 30 дней' },
        { color: 'bg-signal-amber', label: 'Среднее негативное', name: 'Высокая сумма кредита', desc: 'Сумма велика относительно дохода' },
        { color: 'bg-signal-amber', label: 'Среднее негативное', name: 'Небольшой стаж', desc: 'Менее 1 года на текущем месте' },
        { color: 'bg-signal-green', label: 'Позитивное', name: 'Хороший доход', desc: 'Доход выше среднего — это плюс' },
    ]

    const TIPS = [
        { icon: '✅', title: 'Закройте текущие просрочки', desc: 'Разберитесь с незакрытыми долгами. Банк видит всё.', time: 'Как можно скорее' },
        { icon: '📅', title: 'Платите вовремя 3–6 месяцев', desc: 'Даже рассрочка на телефон, выплаченная без просрочек, улучшает историю.', time: '3–6 месяцев' },
        { icon: '💼', title: 'Наращивайте трудовой стаж', desc: 'Банки любят стабильность. Не меняйте работу перед подачей заявки.', time: '6–12 месяцев' },
        { icon: '📉', title: 'Снизьте долговую нагрузку', desc: 'Постарайтесь закрыть хотя бы один текущий кредит.', time: 'Зависит от ситуации' },
    ]

    return (
        <div className="animate-slide-up max-w-3xl mx-auto pt-24 pb-12 px-4">
            {/* A1 Result */}
            <div className="glass rounded-2xl p-8 mb-6 text-center border border-signal-amber/20 glow-red transition-colors">
                <DonutChart percentage={chance} />
                <h2 className="text-2xl font-bold text-content mb-2 transition-colors">Ваш шанс на одобрение кредита: {chance}%</h2>
                <p className="text-content-dim transition-colors">Пока банк скорее всего откажет. Но это не приговор — вот почему и что можно сделать.</p>
            </div>

            {/* A2 Factors */}
            <div className="glass rounded-2xl p-6 mb-6 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-content transition-colors">Что повлияло на ваш результат</h3>
                </div>
                <p className="text-xs text-content-dim mb-5 italic transition-colors">Этот анализ будет автоматически формироваться нашей AI-моделью. Сейчас показан пример.</p>

                <div className="space-y-3">
                    {FACTORS.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface-glass transition-colors">
                            <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${f.color}`} />
                            <div>
                                <div className="text-sm font-semibold text-content transition-colors">{f.name} <span className="text-content-dim font-normal">— {f.label}</span></div>
                                <div className="text-xs text-content-dim transition-colors">{f.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* A3 Tips */}
            <div className="glass rounded-2xl p-6 mb-6 transition-colors">
                <h3 className="text-lg font-bold text-content mb-4 transition-colors">Как повысить шансы в будущем</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TIPS.map((t, i) => (
                        <div key={i} className="p-4 rounded-xl border border-line transition-colors">
                            <div className="text-xl mb-2">{t.icon}</div>
                            <h4 className="font-semibold text-sm text-content mb-1 transition-colors">{t.title}</h4>
                            <p className="text-xs text-content-dim mb-2 transition-colors">{t.desc}</p>
                            <span className="text-xs font-mono text-signal-amber">⏱ {t.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* A4 Sliders */}
            <div className="glass rounded-2xl p-6 mb-6 transition-colors">
                <h3 className="text-lg font-bold text-content mb-1 transition-colors">Хотите кредит прямо сейчас? Попробуйте изменить параметры</h3>
                <p className="text-xs text-content-dim mb-6 italic transition-colors">UI-концепт:在未来 модель подберёт оптимальные параметры автоматически.</p>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-content-muted transition-colors">💰 Сумма кредита</span>
                            <span className="font-mono text-content transition-colors">{loan.toLocaleString('ru-RU')} сом → попробуйте <span className="text-signal-amber">300 000 сом</span></span>
                        </div>
                        <input type="range" min="50000" max="1000000" step="10000" value={loan} onChange={e => setLoan(e.target.value)} className="w-full" />
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-content-muted transition-colors">📅 Срок кредита</span>
                            <span className="font-mono text-content transition-colors">{term} мес → попробуйте <span className="text-signal-amber">24 мес</span></span>
                        </div>
                        <input type="range" min="6" max="60" step="6" value={term} onChange={e => setTerm(e.target.value)} className="w-full" />
                    </div>
                </div>

                <p className="text-xs text-content-dim mt-4 mb-4 transition-colors">Меньшая сумма и более короткий срок снижают риск для банка.</p>
                <Link to="/apply" className="btn-ghost w-full text-sm py-3">Пересчитать с новыми параметрами</Link>
            </div>

            {/* A5 Support */}
            <div className="glass rounded-2xl p-6 text-center transition-colors">
                <p className="text-content-dim mb-2 transition-colors">Не уверены что делать дальше? Позвоните на горячую линию Элдик Банка.</p>
                <div className="flex items-center justify-center gap-4 text-sm font-mono text-content-muted">
                    <span>📞 9111</span>
                    <span>🌐 eldik.kg</span>
                </div>
                <button onClick={onReset} className="btn-primary mt-6 px-8 py-3">Новая заявка</button>
            </div>
        </div>
    )
}