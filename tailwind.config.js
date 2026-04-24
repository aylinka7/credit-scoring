/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Geist', 'DM Sans', 'system-ui', 'sans-serif'],
                mono: ['Geist Mono', 'DM Mono', 'monospace'],
                display: ['Cabinet Grotesk', 'Geist', 'sans-serif'],
            },
            colors: {
                ink: {
                    50: '#f0f0f0', 100: '#e0e0e0', 200: '#c0c0c0', 300: '#a0a0a0',
                    400: '#707070', 500: '#404040', 600: '#282828', 700: '#1a1a1a',
                    800: '#111111', 900: '#080808',
                },
                signal: {
                    green: '#00e676', red: '#ff1744', amber: '#ffab00', blue: '#2979ff',
                },
                surface: {
                    DEFAULT: 'var(--bg)',
                    raised: 'var(--bg-raised)',
                    glass: 'var(--bg-glass)',
                    'glass-hover': 'var(--bg-glass-hover)',
                    input: 'var(--bg-input)',
                    'input-focus': 'var(--bg-input-focus)',
                },
                content: {
                    DEFAULT: 'var(--text)',
                    muted: 'var(--text-muted)',
                    dim: 'var(--text-dim)',
                    faint: 'var(--text-faint)',
                },
                line: {
                    DEFAULT: 'var(--border-color)',
                    hover: 'var(--border-hover)',
                },
            },
            animation: {
                'fade-up': 'fadeUp 0.6s ease forwards',
                'fade-in': 'fadeIn 0.4s ease forwards',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'gradient': 'gradient 8s ease infinite',
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
    plugins: [],
}