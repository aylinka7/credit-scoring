import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
    const location = useLocation()
    const { theme, toggle } = useTheme()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-signal-green flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M2 9 L6 5 L10 9 L16 3" stroke="#080808" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="9" cy="14" r="2.5" fill="#080808"/>
                        </svg>
                    </div>
                    <span className="font-semibold text-content tracking-tight transition-colors">
            Score<span className="text-signal-green">IQ</span>
          </span>
                </Link>

                {/* Nav links */}
                <div className="hidden sm:flex items-center gap-1 glass rounded-full px-2 py-1.5">
                    <NavLink to="/" label="Главная" active={location.pathname === '/'} />
                    <NavLink to="/apply" label="Заявка" active={location.pathname === '/apply'} />
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* Theme toggle */}
                    <button
                        onClick={toggle}
                        className="theme-toggle"
                        aria-label="Переключить тему"
                    >
                        {theme === 'dark' ? (
                            <svg
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                style={{ transform: 'rotate(0deg)' }}
                            >
                                <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        ) : (
                            <svg
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                style={{ transform: 'rotate(-20deg)' }}
                            >
                                <path d="M14 9.68A6.5 6.5 0 017.32 2 6.5 6.5 0 1014 9.68z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </button>

                    {/* CTA */}
                    <Link to="/apply" className="hidden sm:flex btn-primary text-sm py-2 px-4">
                        <span>Подать заявку</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>

                    {/* Mobile CTA */}
                    <Link to="/apply" className="sm:hidden btn-primary text-sm py-2 px-4">
                        Заявка
                    </Link>
                </div>
            </div>
        </nav>
    )
}

function NavLink({ to, label, active }) {
    return (
        <Link
            to={to}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active
                    ? 'bg-surface-glass-hover text-content'
                    : 'text-content-dim hover:text-content hover:bg-surface-glass'
            }`}
        >
            {label}
        </Link>
    )
}