import { useState, useCallback } from 'react'
import { FORM_FIELDS, FIELD_GROUPS, DEFAULT_VALUES } from '../data/fields'
import { scoreCredit } from '../services/api'
import InputField from '../components/InputField'
import LoadingScreen from '../components/LoadingScreen'
import ResultCard from '../components/ResultCard'

const VALIDATION_RULES = {
    age:              (v) => (!v || v < 18) && 'Минимальный возраст — 18 лет',
    monthly_income:   (v) => (!v || v < 1000) && 'Укажите корректный доход',
    loan_amount:      (v) => (!v || v < 10000) && 'Минимальная сумма — 10 000 ₽',
    loan_term_months: (v) => (!v || v < 1) && 'Укажите срок кредита',
    employment_years: (v) => v === '' && 'Укажите трудовой стаж',
    interest_rate:    (v) => (!v || v <= 0) && 'Укажите процентную ставку',
    days_overdue:     (v) => v === '' && 'Укажите количество дней просрочки',
    credit_inquiries: (v) => v === '' && 'Укажите количество запросов',
}

const GROUP_ORDER = ['personal', 'financial', 'loan', 'history']

export default function Apply() {
    const [values, setValues] = useState({ ...DEFAULT_VALUES })
    const [errors, setErrors] = useState({})
    const [stage, setStage] = useState('form')
    const [result, setResult] = useState(null)
    const [apiError, setApiError] = useState('')

    const handleChange = useCallback((fieldId, value) => {
        setValues((prev) => ({ ...prev, [fieldId]: value }))
        if (errors[fieldId]) {
            setErrors((prev) => { const n = { ...prev }; delete n[fieldId]; return n })
        }
    }, [errors])

    const validate = useCallback(() => {
        const newErrors = {}
        for (const field of FORM_FIELDS) {
            const rule = VALIDATION_RULES[field.id]
            if (rule) {
                const val = values[field.id] === '' ? '' : Number(values[field.id])
                const error = rule(val)
                if (error) newErrors[field.id] = error
            }
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [values])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiError('')
        if (!validate()) return
        setStage('loading')
        try {
            const payload = {}
            for (const key in values) payload[key] = values[key] === '' ? 0 : Number(values[key])
            const res = await scoreCredit(payload)
            setResult(res)
            setStage('result')
        } catch (err) {
            setApiError(err.message || 'Ошибка при обращении к серверу')
            setStage('form')
        }
    }

    const handleReset = () => {
        setValues({ ...DEFAULT_VALUES })
        setErrors({})
        setResult(null)
        setStage('form')
        setApiError('')
    }

    if (stage === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                <div className="w-full max-w-md"><LoadingScreen /></div>
            </div>
        )
    }

    if (stage === 'result' && result) {
        return (
            <div className="min-h-screen px-4 pt-24 pb-12">
                <div className="max-w-lg mx-auto"><ResultCard result={result} onReset={handleReset} /></div>
            </div>
        )
    }

    const filledCount = FORM_FIELDS.filter((f) => values[f.id] !== '').length

    return (
        <div className="min-h-screen px-4 pt-24 pb-12">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-10">
          <span className="tag bg-signal-green/10 text-signal-green border border-signal-green/20 mb-4">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1v4M5 8v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            ЗАЯВКА НА СКОРИНГ
          </span>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 mb-2 text-content transition-colors">Данные клиента</h1>
                    <p className="text-content-dim text-sm transition-colors">Заполните все поля для оценки кредитного риска. Все данные обрабатываются локально.</p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-content-dim transition-colors">Заполнено {filledCount} из {FORM_FIELDS.length}</span>
                        <span className="text-xs font-mono text-content-dim transition-colors">{Math.round((filledCount / FORM_FIELDS.length) * 100)}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--progress-track)' }}>
                        <div
                            className="h-full bg-signal-green rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(filledCount / FORM_FIELDS.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* API error */}
                {apiError && (
                    <div className="glass rounded-xl p-4 mb-6 border border-signal-red/20 bg-signal-red/5 animate-fade-in">
                        <div className="flex items-start gap-3">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-signal-red flex-shrink-0 mt-0.5">
                                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M6 6.5l6 5M12 6.5l-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <div>
                                <p className="text-sm text-signal-red font-medium">Ошибка</p>
                                <p className="text-xs text-signal-red/70 mt-0.5">{apiError}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                    {GROUP_ORDER.map((groupKey) => {
                        const group = FIELD_GROUPS[groupKey]
                        const groupFields = FORM_FIELDS.filter((f) => f.group === groupKey)

                        return (
                            <div key={groupKey} className="mb-8">
                                <div className="flex items-center gap-2 mb-5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                        group.color === 'blue' ? 'bg-signal-blue' :
                                            group.color === 'green' ? 'bg-signal-green' :
                                                group.color === 'purple' ? 'bg-purple-400' : 'bg-signal-amber'
                                    }`} />
                                    <h2 className="text-xs font-mono font-medium text-content-dim uppercase tracking-widest transition-colors">{group.label}</h2>
                                    <div className="flex-1 h-px bg-line transition-colors" />
                                </div>

                                <div className={`grid gap-5 ${groupFields.length === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                                    {groupFields.map((field) => (
                                        <InputField key={field.id} field={field} value={values[field.id]} onChange={handleChange} error={errors[field.id]} />
                                    ))}
                                </div>
                            </div>
                        )
                    })}

                    <div className="mt-10 pt-6 border-t border-line transition-colors">
                        <button type="submit" className="btn-primary w-full text-base py-4">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M2 9 L6 5 L10 9 L16 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="9" cy="14" r="2.5" fill="currentColor"/>
                            </svg>
                            <span>Получить результат скоринга</span>
                        </button>
                        <p className="text-center text-xs text-content-faint mt-4 font-mono transition-colors">
                            Нажимая кнопку, вы запускаете модель кредитного скоринга
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}