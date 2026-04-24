import { Link } from 'react-router-dom'

function DonutChart({ percentage }) {
    const radius = 60
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - percentage / 100)

    return (
        <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--border-color)" strokeWidth="12" />
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#00e676" strokeWidth="12" strokeLinecap="round"
                        strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold font-mono text-signal-green">{percentage}% 🎉</span>
                <span className="text-xs text-content-dim transition-colors">шанс</span>
            </div>
        </div>
    )
}

export default function ResultScenarioB({ result, onReset }) {
    const chance = Math.round((1 - result.probability) * 100)

    const DOCS = [
        { icon: '📋', name: 'Паспорт гражданина КР', desc: 'Удостоверение личности' },
        { icon: '💼', name: 'Справка о доходах', desc: 'Подтверждение платёжеспособности' },
        { icon: '📄', name: 'Трудовая книжка или договор', desc: 'Подтверждение стажа' },
        { icon: '🏠', name: 'Документы на залог', desc: 'Если кредит с залогом' },
        { icon: '📱', name: 'ИНН', desc: 'Идентификационный налоговый номер' },
    ]

    const TIPS = [
        'Не берите новые кредиты перед оформлением — это снизит ваш балл',
        'Не меняйте работу в этот период — стабильность важна для банка',
        'Подготовьте документы заранее — это ускорит процесс',
        'Если есть вопросы по залогу — позвоните на горячую линию',
        'Приходите в банк в первой половине дня — меньше очередей',
    ]

    return (
        <div className="animate-slide-up max-w-3xl mx-auto pt-24 pb-12 px-4">
            {/* B1 Result */}
            <div className="glass rounded-2xl p-8 mb-6 text-center border border-signal-green/20 glow-green transition-colors">
                <DonutChart percentage={chance} />
                <h2 className="text-2xl font-bold text-content mb-2 transition-colors">Ваш шанс на одобрение: {chance}%</h2>
                <p className="text-content-dim transition-colors">Отличные показатели! Банк скорее всего одобрит вашу заявку. Вот что делать прямо сейчас:</p>
            </div>

            {/* B2 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Step 1 */}
                <div className="glass rounded-2xl p-6 md:col-span-2 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-signal-green/10 flex items-center justify-center text-signal-green font-bold font-mono">1</div>
                        <h3 className="font-bold text-content transition-colors">Соберите документы</h3>
                    </div>
                    <div className="space-y-3">
                        {DOCS.map((d, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-lg">{d.icon}</span>
                                <div>
                                    <div className="text-sm font-medium text-content transition-colors">{d.name}</div>
                                    <div className="text-xs text-content-dim transition-colors">{d.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-content-dim mt-4 italic transition-colors">* Точный список зависит от вида кредита — уточните при визите в банк.</p>
                </div>

                {/* Steps 2 & 3 */}
                <div className="flex flex-col gap-6">
                    <div className="glass rounded-2xl p-6 flex-1 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-signal-green/10 flex items-center justify-center text-signal-green font-bold font-mono">2</div>
                            <h3 className="font-bold text-content text-sm transition-colors">Найдите филиал</h3>
                        </div>
                        <p className="text-xs text-content-dim mb-3 transition-colors">В Элдик Банке более 125 филиалов по всему КР.</p>
                        <a href="https://eldik.kg" target="_blank" rel="noreferrer" className="btn-ghost text-xs py-2 px-3 w-full">📍 Найти на карте</a>
                    </div>

                    <div className="glass rounded-2xl p-6 flex-1 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-signal-green/10 flex items-center justify-center text-signal-green font-bold font-mono">3</div>
                            <h3 className="font-bold text-content text-sm transition-colors">Свяжитесь с нами</h3>
                        </div>
                        <div className="space-y-2 text-xs font-mono text-content-dim">
                            <div>📞 9111 (ежедневно)</div>
                            <div>🌐 eldik.kg</div>
                            <div>📱 Приложение ELDIK</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* B3 Tips */}
            <div className="glass rounded-2xl p-6 mb-6 transition-colors">
                <h3 className="text-lg font-bold text-content mb-4 transition-colors">Несколько советов чтобы всё прошло гладко</h3>
                <ul className="space-y-3">
                    {TIPS.map((t, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-content-dim transition-colors">
                            <span className="text-signal-green mt-0.5">•</span>
                            <span>{t}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* B4 CTA */}
            <div className="glass rounded-2xl p-8 text-center border border-signal-green/10 transition-colors">
                <p className="text-lg text-content mb-6 leading-relaxed transition-colors">
                    Тысячи кыргызстанцев уже построили свой бизнес, купили жильё и осуществили мечты с помощью Элдик Банка. Теперь ваша очередь. 🇰🇬
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://eldik.kg" target="_blank" rel="noreferrer" className="btn-primary px-8 py-3">Перейти на сайт Элдик Банка</a>
                    <button onClick={onReset} className="btn-ghost px-8 py-3">Новая заявка</button>
                </div>
            </div>
        </div>
    )
}