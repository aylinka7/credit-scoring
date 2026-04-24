import { Link } from 'react-router-dom'

const FACTS = [
    { icon: '📅', value: '1996', label: 'Год основания', desc: 'Более 28 лет на рынке' },
    { icon: '🏦', value: '125+', label: 'Филиалов', desc: 'Отделения во всех регионах КР' },
    { icon: '💰', value: '201 млрд', label: 'Активы банка', desc: 'По итогам 1 полугодия 2025 г.' },
]

const CREDITS = [
    { icon: '🏠', title: 'Ипотека', desc: 'Доступное жильё от 8% годовых. Программа накопительной ипотеки совместно с ГИК. Первоначальный взнос от 20%.' },
    { icon: '🌾', title: 'Сельское хозяйство', desc: 'Льготные кредиты от 3% до 10% годовых. Для фермеров, животноводов, растениеводов. Поддержка регионов КР.' },
    { icon: '💼', title: 'Бизнес', desc: 'Кредиты для ИП и юридических лиц. Продукты «Элет» и «Ишкер». Ставка от 15%, суммы до 35 млн сомов, срок до 36 мес.' },
    { icon: '⚡', title: 'Экспресс-кредит', desc: 'До 300 000 сомов без залога и поручителей. Быстрое одобрение. Ставка 19% годовых.' },
]

const STORIES = [
    { name: 'Айбек, Каракол', text: 'Взял кредит по сельскохозяйственной программе под 10% годовых, купил теплицу и оборудование для капельного орошения. Через два года расширил хозяйство и нанял троих работников из соседнего села.' },
    { name: 'Нургуль, Ош', text: 'Открыла швейный цех на кредит по программе для малого бизнеса. Первый заказ — школьная форма для местной школы. Сегодня её продукция продаётся по всему Кыргызстану.' },
    { name: 'Супруги Маматовы, Бишкек', text: 'Годами снимали квартиру. Через программу накопительной ипотеки Элдик Банка они смогли купить первое собственное жильё — с первоначальным взносом всего 30%.' },
]

const CONTACTS = [
    { icon: '📞', label: 'Горячая линия', value: '9111 (ежедневно)' },
    { icon: '🌐', label: 'Сайт', value: 'eldik.kg' },
    { icon: '📍', label: 'Головной офис', value: 'г. Бишкек, ул. Московская, 80/1' },
    { icon: '📧', label: 'Email', value: 'info@eldik.kg' },
    { icon: '📱', label: 'Приложение', value: 'ELDIK (iOS и Android)' },
]

export default function About() {
    return (
        <main>
            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-signal-blue/10 rounded-full blur-[128px] orb pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-signal-amber/10 rounded-full blur-[128px] orb-2 pointer-events-none" />

                <div className="relative max-w-3xl mx-auto text-center opacity-0-init animate-fade-up">
                    <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
                        <span className="text-lg">🇰🇬</span>
                        <span className="text-xs font-mono text-content-dim">ЭЛ ҮЧҮН — ДЛЯ НАРОДА</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6 text-content transition-colors">
                        Элдик Банк — <br/>
                        <span className="text-signal-green">финансовый партнёр</span><br/>
                        каждого кыргызстанца
                    </h1>
                    <p className="text-lg text-content-dim max-w-xl mx-auto mb-8 leading-relaxed transition-colors">
                        С 1996 года мы помогаем людям строить жизнь, бизнес и дом.
                    </p>
                    <Link to="/apply" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-3">
                        <span>Проверить заявку</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                </div>
            </section>

            {/* Facts */}
            <section className="border-y border-line py-16 px-4 transition-colors">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {FACTS.map((f, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <div className="text-4xl font-bold font-mono text-signal-green mb-1">{f.value}</div>
                            <div className="text-lg font-semibold text-content mb-1 transition-colors">{f.label}</div>
                            <div className="text-sm text-content-dim transition-colors">{f.desc}</div>
                        </div>
                    ))}
                </div>
                <p className="max-w-4xl mx-auto text-sm text-content-dim text-center mt-10 leading-relaxed transition-colors">
                    Элдик Банк — государственный банк Кыргызстана. 100% акций принадлежат Правительству КР, что гарантирует надёжность и стабильность. Банк входит в ТОП-3 кредитных организаций страны и обслуживает физических лиц и предпринимателей по всей республике.
                </p>
            </section>

            {/* Credits */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight mb-10 text-center text-content transition-colors">Виды кредитов</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CREDITS.map((c, i) => (
                            <div key={i} className="glass glass-hover rounded-2xl p-8 transition-colors">
                                <div className="text-3xl mb-4">{c.icon}</div>
                                <h3 className="text-xl font-semibold text-content mb-2 transition-colors">{c.title}</h3>
                                <p className="text-sm text-content-dim leading-relaxed transition-colors">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stories */}
            <section className="py-20 px-4 bg-surface-raised/50 transition-colors">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight mb-10 text-center text-content transition-colors">Истории успеха</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {STORIES.map((s, i) => (
                            <div key={i} className="glass rounded-2xl p-8 flex flex-col transition-colors">
                                <div className="w-12 h-12 rounded-full bg-signal-green/10 flex items-center justify-center text-xl mb-4">👤</div>
                                <h3 className="font-semibold text-content mb-2 transition-colors">{s.name}</h3>
                                <p className="text-sm text-content-dim leading-relaxed flex-1 transition-colors">«{s.text}»</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contacts */}
            <section className="py-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight mb-10 text-center text-content transition-colors">Контакты</h2>
                    <div className="glass rounded-2xl p-6 divide-y divide-line transition-colors">
                        {CONTACTS.map((c, i) => (
                            <div key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                                <span className="text-2xl">{c.icon}</span>
                                <div>
                                    <div className="text-xs font-mono text-content-dim uppercase tracking-widest transition-colors">{c.label}</div>
                                    <div className="text-sm font-medium text-content transition-colors">{c.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}