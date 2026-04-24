// ============================================================
// MOCK API SERVICE
// Здесь будут подключены реальные эндпоинты от бэкендщика.
// Замените функцию scoreCredit на реальный fetch-запрос.
// ============================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Отправляет данные заявки на скоринг.
 * @param {Object} data - данные формы
 * @returns {Promise<ScoringResult>}
 */
export async function scoreCredit(data) {
    // ── MOCK: имитация задержки и ответа ──────────────────────
    // TODO: заменить на реальный запрос:
    //
    // const response = await fetch(`${API_BASE_URL}/api/score`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    // if (!response.ok) throw new Error('API error')
    // return response.json()
    // ──────────────────────────────────────────────────────────

    await sleep(1800)

    // Простая моковая логика на основе признаков
    const riskScore = computeMockRisk(data)
    const probability = riskScore
    const isDefault = probability >= 0.5

    return {
        decision: isDefault ? 'default' : 'non-default',
        probability: parseFloat(probability.toFixed(4)),
        score: Math.round((1 - probability) * 1000), // скоринговый балл 0–1000
        factors: computeFactors(data, probability),
        recommendation: getRecommendation(probability),
        processed_at: new Date().toISOString(),
    }
}

// ── Вспомогательные mock-функции ──────────────────────────

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function computeMockRisk(data) {
    let risk = 0.35 // базовый риск

    // Возраст: молодые и пожилые чуть рискованнее
    const age = Number(data.age)
    if (age < 25) risk += 0.10
    else if (age > 60) risk += 0.05
    else if (age >= 30 && age <= 50) risk -= 0.05

    // Доход: чем выше, тем ниже риск
    const income = Number(data.monthly_income)
    if (income < 30000) risk += 0.15
    else if (income < 60000) risk += 0.05
    else if (income > 150000) risk -= 0.10

    // Отношение суммы кредита к доходу
    const loanAmount = Number(data.loan_amount)
    const loanToIncome = loanAmount / (income * 12)
    if (loanToIncome > 5) risk += 0.15
    else if (loanToIncome > 3) risk += 0.08
    else if (loanToIncome < 1) risk -= 0.08

    // Стаж
    const experience = Number(data.employment_years)
    if (experience < 1) risk += 0.12
    else if (experience < 3) risk += 0.05
    else if (experience > 5) risk -= 0.07

    // Процентная ставка
    const rate = Number(data.interest_rate)
    if (rate > 20) risk += 0.08
    else if (rate < 12) risk -= 0.03

    // Просрочки
    const overdue = Number(data.days_overdue)
    if (overdue > 60) risk += 0.25
    else if (overdue > 30) risk += 0.15
    else if (overdue > 0) risk += 0.08
    else risk -= 0.05

    // Запросы за 6 месяцев
    const inquiries = Number(data.credit_inquiries)
    if (inquiries > 5) risk += 0.12
    else if (inquiries > 2) risk += 0.05
    else if (inquiries === 0) risk -= 0.03

    return Math.max(0.02, Math.min(0.98, risk))
}

function computeFactors(data, probability) {
    const overdue = Number(data.days_overdue)
    const inquiries = Number(data.credit_inquiries)
    const income = Number(data.monthly_income)
    const loanAmount = Number(data.loan_amount)
    const experience = Number(data.employment_years)

    const factors = []

    if (overdue > 30) {
        factors.push({ name: 'Просрочки по платежам', impact: 'negative', value: `${overdue} дней`, weight: 0.28 })
    } else if (overdue === 0) {
        factors.push({ name: 'Отсутствие просрочек', impact: 'positive', value: '0 дней', weight: 0.28 })
    }

    const lti = loanAmount / (income * 12)
    if (lti > 3) {
        factors.push({ name: 'Долговая нагрузка', impact: 'negative', value: `${lti.toFixed(1)}x годового дохода`, weight: 0.22 })
    } else {
        factors.push({ name: 'Долговая нагрузка', impact: 'positive', value: `${lti.toFixed(1)}x годового дохода`, weight: 0.22 })
    }

    if (experience < 2) {
        factors.push({ name: 'Трудовой стаж', impact: 'negative', value: `${experience} лет`, weight: 0.18 })
    } else {
        factors.push({ name: 'Трудовой стаж', impact: 'positive', value: `${experience} лет`, weight: 0.18 })
    }

    if (inquiries > 3) {
        factors.push({ name: 'Кредитные запросы', impact: 'negative', value: `${inquiries} за 6 мес.`, weight: 0.15 })
    } else {
        factors.push({ name: 'Кредитные запросы', impact: 'positive', value: `${inquiries} за 6 мес.`, weight: 0.15 })
    }

    factors.push({
        name: 'Уровень дохода',
        impact: income > 80000 ? 'positive' : income < 40000 ? 'negative' : 'neutral',
        value: `${Number(income).toLocaleString('ru')} ₽/мес`,
        weight: 0.17,
    })

    return factors.sort((a, b) => b.weight - a.weight)
}

function getRecommendation(probability) {
    if (probability < 0.2) {
        return {
            text: 'Отличный кредитный профиль. Клиент соответствует требованиям для одобрения.',
            tier: 'excellent',
        }
    } else if (probability < 0.35) {
        return {
            text: 'Хороший кредитный профиль с минимальными рисками.',
            tier: 'good',
        }
    } else if (probability < 0.5) {
        return {
            text: 'Приемлемый риск. Рекомендуется дополнительная проверка документов.',
            tier: 'fair',
        }
    } else if (probability < 0.7) {
        return {
            text: 'Повышенный риск дефолта. Рекомендуется залоговое обеспечение или поручитель.',
            tier: 'poor',
        }
    } else {
        return {
            text: 'Высокий риск дефолта. Рекомендуется отказ или существенное снижение суммы.',
            tier: 'very_poor',
        }
    }
}