import { useState } from 'react'

export default function InputField({ field, value, onChange, error }) {
    const [focused, setFocused] = useState(false)

    const handleChange = (e) => {
        onChange(field.id, e.target.value)
    }

    return (
        <div className="relative">
            {/* Label */}
            <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-1.5 text-sm font-medium text-content-muted transition-colors">
                    <span>{field.icon}</span>
                    <span>{field.label}</span>
                </label>
                <span className="text-xs font-mono text-content-dim transition-colors">{field.description}</span>
            </div>

            {/* Input wrapper */}
            <div className={`relative transition-transform duration-200 ${focused ? 'scale-[1.01]' : ''}`}>
                <input
                    type={field.type}
                    id={field.id}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className={`input-field ${error ? 'input-field-error' : ''}`}
                />

                {/* Unit badge */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span
              className="text-xs font-mono font-medium px-2 py-1 rounded-md transition-colors duration-200"
              style={{
                  background: focused ? 'rgba(0,230,118,0.15)' : 'var(--bg-glass)',
                  color: focused ? '#00e676' : 'var(--text-dim)',
              }}
          >
            {field.unit}
          </span>
                </div>

                {/* Focus glow */}
                {focused && !error && (
                    <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ boxShadow: '0 0 0 1px var(--border-focus)' }}
                    />
                )}
            </div>

            {/* Error */}
            {error && (
                <p className="mt-1.5 text-xs text-signal-red flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 1L1 10h10L6 1zm0 2l3.5 6h-7L6 3zm0 2v2m0 1v1" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
                    </svg>
                    {error}
                </p>
            )}
        </div>
    )
}