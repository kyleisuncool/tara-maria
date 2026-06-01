'use client'

import { SESSION_TYPES } from '../config'
import type { SessionType } from '../types'

interface Props {
  selected: SessionType | null
  onSelect: (session: SessionType) => void
}

export function StepSessionPicker({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="font-display text-forest text-2xl tracking-tight mb-2">
        What are you here for?
      </h2>
      <p className="text-earth/55 text-sm leading-relaxed mb-8">
        Choose a session type to get started.
      </p>

      <div className="space-y-3">
        {SESSION_TYPES.map((session) => {
          const isSelected = selected?.id === session.id
          return (
            <button
              key={session.id}
              onClick={() => onSelect(session)}
              className={[
                'w-full text-left rounded-xl border px-5 py-4 transition-all duration-150 group',
                isSelected
                  ? 'border-forest bg-forest text-parchment'
                  : 'border-earth/15 bg-parchment hover:border-forest/40 hover:bg-cream',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className={[
                        'font-display text-xs tracking-[0.1em]',
                        isSelected ? 'text-parchment/50' : 'text-teal/50',
                      ].join(' ')}
                    >
                      {session.num}
                    </span>
                    <span
                      className={[
                        'font-display text-base tracking-tight',
                        isSelected ? 'text-parchment' : 'text-forest',
                      ].join(' ')}
                    >
                      {session.name}
                    </span>
                  </div>
                  <p
                    className={[
                      'text-xs leading-relaxed line-clamp-2',
                      isSelected ? 'text-parchment/70' : 'text-earth/50',
                    ].join(' ')}
                  >
                    {session.desc}
                  </p>
                </div>
                <div
                  className={[
                    'shrink-0 text-right text-xs tracking-wide whitespace-nowrap pt-0.5',
                    isSelected ? 'text-parchment/60' : 'text-earth/35',
                  ].join(' ')}
                >
                  {session.price !== null && (
                    <div className={['font-medium mb-0.5', isSelected ? 'text-parchment/80' : 'text-earth/60'].join(' ')}>
                      ${Math.floor(session.price / 100)}
                    </div>
                  )}
                  <div>{session.duration} min</div>
                  <div className="mt-0.5">{session.formatLabel}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
