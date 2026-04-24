const API_BASE_URL = 'http://localhost:5000'

/**
 * Отправляет данные заявки на бэкенд.
 * Бэкенд принимает { features: [...] } — массив из 8 чисел.
 * Возвращает { prediction: число_от_0_до_1 }.
 */
export async function scoreCredit(data) {
    // Порядок признаков строго как у бэкенда:
    // [age, monthly_income, employment_years, loan_amount,
    //  loan_term_months, interest_rate, past_due_30d, inquiries_6m]
    const features = [
        Number(data.age) || 0,
        Number(data.monthly_income) || 0,
        Number(data.employment_years) || 0,
        Number(data.loan_amount) || 0,
        Number(data.loan_term_months) || 0,
        Number(data.interest_rate) || 0,
        Number(data.past_due_30d) || 0,
        Number(data.inquiries_6m) || 0,
    ]

    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features }),
    })

    if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`)
    }

    const json = await response.json()

    if (json.error) {
        throw new Error(json.error)
    }

    return {
        probability: parseFloat(json.prediction),
        processed_at: new Date().toISOString(),
    }
}