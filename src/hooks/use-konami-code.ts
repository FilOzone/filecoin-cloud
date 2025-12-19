import { useCallback, useEffect, useRef, useState } from 'react'

const SEQUENCES = {
  merry: ['m', 'e', 'r', 'r', 'y'],
  xmas: ['x', 'm', 'a', 's'],
  christmas: ['c', 'h', 'r', 'i', 's', 't', 'm', 'a', 's'],
  santa: ['s', 'a', 'n', 't', 'a'],
  claus: ['c', 'l', 'a', 'u', 's'],
  hat: ['h', 'a', 't'],
  hohoho: ['h', 'o', 'h', 'o', 'h', 'o'],
  ohohoh: ['o', 'h', 'o', 'h', 'o', 'h', 'o'],
  jingle: ['j', 'i', 'n', 'g', 'l', 'e'],
  bells: ['b', 'e', 'l', 'l', 's'],
  konami: [
    'arrowup',
    'arrowup',
    'arrowdown',
    'arrowdown',
    'arrowleft',
    'arrowright',
    'arrowleft',
    'arrowright',
    'b',
    'a',
  ],
}

const BUFFER_MAX_LENGTH = 10
const TIMEOUT_MS = 2000

export function useKonamiCode() {
  const [showHat, setShowHat] = useState(false)
  const keyBuffer = useRef<Array<string>>([])
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (['INPUT', 'TEXTAREA'].includes(target.tagName)) {
      return
    }

    const key = event.key.toLowerCase()
    keyBuffer.current.push(key)

    if (keyBuffer.current.length > BUFFER_MAX_LENGTH) {
      keyBuffer.current.shift()
    }

    const bufferString = keyBuffer.current.join(',')
    const isMatch = Object.values(SEQUENCES).some((sequence) => {
      const sequenceString = sequence.join(',')
      return bufferString.endsWith(sequenceString)
    })

    if (isMatch) {
      setShowHat(true)
      keyBuffer.current = []
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      keyBuffer.current = []
    }, TIMEOUT_MS)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleKeyDown])

  return { showHat }
}
