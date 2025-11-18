import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const copy = useCallback(async (text: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setIsCopied(true)
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2_000)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { copiedText, copy, isCopied }
}
