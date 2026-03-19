'use client'

import { useEffect, useState } from 'react'

export function useDistanceFromTop() {
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setDistance(window.scrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return distance
}
