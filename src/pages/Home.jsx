import { Link } from 'react-router-dom'

const METRICS = [
    { value: '94.2%', label: 'ROC-AUC', desc: 'качество модели' },
    { value: '<1.8с', label: 'Latency', desc: 'время ответа' },
    { value: '8', label: 'Признаков', desc: 'для скоринга' },
    { value: '500', label: 'Обучающих', desc: 'записей' },
]

const STEPS = [
    {
        num: '01', title: 'Заполните заявку',
        desc: 'Введите данные клиента: возраст, доход, параметры кредита и кредитную историю.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="9" y="2" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 14l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
    },
    {
        num: '02', title: 'Модель анализирует',
        desc: 'Обученная модель обрабатывает признаки и вычисляет вероятность дефолта.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        num: '03', title: 'Получите решение',
        desc: 'Одобрение или отказ с вероятностью дефолта и разбором ключевых факторов.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
    },
]

const FEATURES = [
    { title: 'Интерпретируемость', desc: 'Для каждой заявки система показывает, какие факторы повлияли на решение — просрочки, долговая нагрузка, стаж.', accent: 'green' },
    { title: 'Быстрый ответ', desc: 'Скоринг выполняется за считанные секунды. Клиент получает решение без ожидания.', accent: 'blue' },
    { title: 'Калиброванная модель', desc: 'Вероятность дефолта соответствует реальному риску — можно использовать для лимитирования.', accent: 'amber' },
]

export default function Home() {
    return (
        <main>
            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-signal-green/5 rounded-full blur-[128px] orb pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-signal-blue/5 rounded-full blur-[128px] orb-2 pointer-events-none" />

                <div className="relative max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 opacity-0-init animate-fade-up">
                        <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
                        <span className="text-xs font-mono text-content-dim tracking-wide transition-colors">
              ХАКАТОН · КРЕДИТНЫЙ СКОРИНГ
            </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 opacity-0-init animate-fade-up animate-delay-100 text-content transition-colors">
                        Интеллектуальный
                        <br />
                        <span className="text-signal-green">кредитный скоринг</span>
                    </h1>

                    <p className="text-base sm:text-lg text-content-dim max-w-xl mx-auto mb-10 leading-relaxed opacity-0-init animate-fade-up animate-delay-200 transition-colors">
                        Автоматизированная система оценки кредитного риска. Введите данные клиента — получите решение с вероятностью дефолта и разбором факторов.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0-init animate-fade-up animate-delay-300">
                        <Link to="/apply" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                            <span>Подать заявку на скоринг</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <a href="#how-it-works" className="btn-ghost text-base px-8 py-4 w-full sm:w-auto text-center">
                            Как это работает
                        </a>
                    </div>
                </div>
            </section>

            {/* Metrics */}
            <section className="border-y border-line transition-colors">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
                    {METRICS.map((m, i) => (
                        <div key={i} className="py-8 px-6 border-r border-line last:border-r-0 text-center transition-colors">
                            <div className="text-2xl sm:text-3xl font-bold font-mono text-content mb-1 transition-colors">{m.value}</div>
                            <div className="text-xs font-mono text-signal-green/60 uppercase tracking-widest mb-0.5">{m.label}</div>
                            <div className="text-xs text-content-dim transition-colors">{m.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="tag bg-surface-glass text-content-dim border border-line mb-4 inline-flex transition-colors">ПРОЦЕСС</span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-content transition-colors">Три простых шага</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {STEPS.map((step, i) => (
                            <div key={i} className="glass glass-hover rounded-2xl p-8 relative group transition-colors">
                <span className="absolute top-6 right-6 text-5xl font-bold font-mono text-content-faint group-hover:text-content-dim transition-colors" style={{ opacity: 0.04 }}>
                  {step.num}
                </span>
                                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-signal-green mb-6 transition-colors">{step.icon}</div>
                                <h3 className="text-lg font-semibold text-content mb-3 transition-colors">{step.title}</h3>
                                <p className="text-sm text-content-dim leading-relaxed transition-colors">{step.desc}</p>
                                {i < 2 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-line transition-colors" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-4 relative">
                <div className="absolute inset-0 bg-signal-green/[0.02] pointer-events-none" />
                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center mb-16">
                        <span className="tag bg-surface-glass text-content-dim border border-line mb-4 inline-flex transition-colors">ПРЕИМУЩЕСТВА</span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-content transition-colors">Почему эта модель</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="glass glass-hover rounded-2xl p-8 transition-colors">
                                <div className={`w-2 h-2 rounded-full mb-6 ${f.accent === 'green' ? 'bg-signal-green' : f.accent === 'blue' ? 'bg-signal-blue' : 'bg-signal-amber'}`} />
                                <h3 className="text-lg font-semibold text-content mb-3 transition-colors">{f.title}</h3>
                                <p className="text-sm text-content-dim leading-relaxed transition-colors">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="glass rounded-3xl p-12 relative overflow-hidden noise transition-colors">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-signal-green/10 rounded-full blur-[100px] pointer-events-none" />
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-content relative transition-colors">Готовы проверить клиента?</h2>
                        <p className="text-content-dim mb-8 relative transition-colors">Заполните форму с данными заявки и получите мгновенный результат скоринга.</p>
                        <Link to="/apply" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-3 relative">
                            <span>Перейти к форме</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}