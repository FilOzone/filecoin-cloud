'use client'

import { useEffect } from 'react'

export function ConsoleGreeting() {
  useEffect(() => {
    const greeting = `
    %c
            🎄
           🎄🎄
          🎄🎄🎄
         🎄🎄🎄🎄
        🎄🎄🎄🎄🎄
       🎄🎄🎄🎄🎄🎄
      🎄🎄🎄🎄🎄🎄🎄
     🎄🎄🎄🎄🎄🎄🎄🎄
    🎄🎄🎄🎄🎄🎄🎄🎄🎄
        🐱🎁🎁🎁🐱
           ||||
%c
════════════════════════════════════════

✨ Happy Holidays from the UXIT Team! ✨

    `
    console.log(
      greeting,
      'color: #16a34a; font-size: 15px; line-height: 1.1; font-family: monospace;',
      'color: #eab308; font-size: 18px; font-weight: bold; font-family: monospace;',
    )
  }, [])

  return null
}
