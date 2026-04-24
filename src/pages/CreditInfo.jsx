import { useState } from 'react'
import { Link } from 'react-router-dom'

function Accordion({ items }) {
    const [openId, setOpenId] = useState(null)
    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => (
                <div key={item.id} className="glass rounded-xl overflow-hidden transition-colors">
                    <button
                        onClick={() => setOpenId(openId === item.id ? null : item.id)}
                        className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-glass-hover transition-colors"
                    >
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <span className="font-semibold text-content flex-1 transition-colors">{item.title}</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`text-content-dim transition-transform duration-300 flex-shrink-0 ${openId === item.id ? 'rotate-180' : ''}`}><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div className={`grid transition-all duration-300 ease-in-out ${openId === item.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="px-5 pb-5 pl-16 text-sm text-content-dim leading-relaxed transition-colors">{item.desc}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const TERMS = [
    { id: 1, icon: '📊', title: 'Процентная ставка', desc: '«Цена» кредита. Если ставка 18% годовых — за год ты доплачиваешь 18% от суммы долга. Чем ниже ставка — тем выгоднее.' },
    { id: 2, icon: '📅', title: 'Срок кредита', desc: 'Как долго ты будешь выплачивать. Можно взять на 6 месяцев или на 5 лет. Чем дольше срок — меньше платёж, но больше переплата в итоге.' },
    { id: 3, icon: '💳', title: 'Ежемесячный платёж', desc: 'Сумма которую ты платишь каждый месяц. Включает часть долга + проценты.' },
    { id: 4, icon: '🏠', title: 'Залог', desc: 'Имущество (дом, машина), которое ты оставляешь как гарантию. Если не платишь — банк может забрать залог. Некоторые кредиты выдаются без залога.' },
    { id: 5, icon: '📋', title: 'Кредитная история', desc: 'Твоя «репутация» в банках. Платил вовремя — история хорошая, банк доверяет. Были просрочки — банк видит это и может отказать.' },
    { id: 6, icon: '⚠️', title: 'Просрочка', desc: 'Когда ты пропустил день оплаты. Просрочки портят кредитную историю — старайся платить вовремя.' },
    { id: 7, icon: '🤝', title: 'Поручитель', desc: 'Человек который подписывается что поможет выплатить долг если ты не сможешь. Иногда банк требует поручителя вместо залога.' },
]

const FAQ = [
    { id: 1, icon: '❓', title: 'Если у меня нет официальной зарплаты — мне откажут?', desc: 'Не обязательно. Банк может учесть доход от бизнеса, фермерства, аренды. Главное — подтвердить что доход есть и он стабильный.' },
    { id: 2, icon: '❓', title: 'Можно взять кредит если уже есть один?', desc: 'Можно, но банк смотрит на общую долговую нагрузку. Если текущие платежи уже большие — могут отказать или уменьшить сумму нового кредита.' },
    { id: 3, icon: '❓', title: 'Что будет если пропустить платёж?', desc: 'Начнётся просрочка. Банк начислит штраф, это испортит кредитную историю. Лучше сразу позвонить в банк и договориться — они могут перенести платёж.' },
    { id: 4, icon: '❓', title: 'Как узнать свою кредитную историю?', desc: 'В Кыргызстане это можно сделать через Кредитное Бюро КР. Банк также проверяет её автоматически при рассмотрении заявки.' },
]

const CRITERIA = [
    { icon: '💰', title: 'Доход', desc: 'Хватает ли у тебя денег чтобы платить каждый месяц?' },
    { icon: '📋', title: 'Кредитная история', desc: 'Платил ли ты вовремя раньше?' },
    { icon: '👔', title: 'Стаж работы', desc: 'Как долго работаешь на текущем месте?' },
    { icon: '🏠', title: 'Залог', desc: 'Есть ли у тебя имущество в качестве гарантии?' },
    { icon: '📅', title: 'Возраст', desc: 'Обычно от 21 до 65 лет.' },
    { icon: '💳', title: 'Текущие долги', desc: 'Есть ли другие кредиты прямо сейчас?' },
]

export default function CreditInfo() {
    return (
        <main className="pt-28 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 opacity-0-init animate-fade-up">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-content transition-colors">
                        Кредит — это не страшно 💬
                    </h1>
                    <p className="text-lg text-content-dim max-w-2xl mx-auto transition-colors">
                        Простым языком о том, как работает кредит, на что смотрит банк и как подготовиться к заявке.
                    </p>
                </div>

                {/* What is credit */}
                <div className="glass rounded-2xl p-8 mb-12 opacity-0-init animate-fade-up animate-delay-100 transition-colors">
                    <h2 className="text-2xl font-bold mb-4 text-content transition-colors">Что такое кредит?</h2>
                    <p className="text-content-dim leading-relaxed mb-6 transition-colors">
                        Кредит — это когда банк даёт тебе деньги сейчас, а ты возвращаешь их частями каждый месяц, плюс небольшой процент за то, что банк помог.
                    </p>
                    <div className="bg-signal-green/5 border border-signal-green/20 rounded-xl p-6">
                        <h3 className="font-semibold text-signal-green mb-2">Пример из жизни:</h3>
                        <p className="text-sm text-content-dim leading-relaxed transition-colors">
                            Айгуль хотела открыть магазин, но у неё было только 50 000 сомов из нужных 200 000. Она взяла кредит на 150 000 сомов на 2 года. Каждый месяц она отдавала банку примерно 7 500 сомов — это и есть кредитный платёж.
                        </p>
                    </div>
                </div>

                {/* Terms */}
                <div className="mb-12 opacity-0-init animate-fade-up animate-delay-200">
                    <h2 className="text-2xl font-bold mb-6 text-content transition-colors">Термины простым языком</h2>
                    <Accordion items={TERMS} />
                </div>

                {/* Criteria */}
                <div className="mb-12 opacity-0-init animate-fade-up animate-delay-300">
                    <h2 className="text-2xl font-bold mb-6 text-content transition-colors">На что смотрит банк?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CRITERIA.map((c, i) => (
                            <div key={i} className="glass glass-hover rounded-xl p-6 transition-colors">
                                <div className="text-2xl mb-3">{c.icon}</div>
                                <h3 className="font-semibold text-content mb-1 transition-colors">{c.title}</h3>
                                <p className="text-sm text-content-dim transition-colors">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="mb-16 opacity-0-init animate-fade-up animate-delay-400">
                    <h2 className="text-2xl font-bold mb-6 text-content transition-colors">Частые вопросы</h2>
                    <Accordion items={FAQ} />
                </div>

                {/* CTA */}
                <div className="text-center glass rounded-3xl p-12 relative overflow-hidden noise transition-colors">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-signal-green/10 rounded-full blur-[100px] pointer-events-none" />
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-content relative transition-colors">Готовы проверить свои шансы?</h2>
                    <Link to="/apply" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-3 relative">
                        <span>Проверить мои шансы на кредит</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                </div>
            </div>
        </main>
    )
}