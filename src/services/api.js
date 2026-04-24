const API_BASE_URL = 'http://localhost:5001'

export async function scoreCredit(data) {
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

    // Бэкенд возвращает массив: { "prediction": [0.429...] }
    // Берём первый элемент массива
    const raw = json.prediction
    const probability = Array.isArray(raw) ? raw[0] : raw

    console.log('✅ Ответ бэкенда:', json)
    console.log('✅ Шанс дефолта:', probability)

    return {
        probability: parseFloat(probability),
        processed_at: new Date().toISOString(),
    }
}