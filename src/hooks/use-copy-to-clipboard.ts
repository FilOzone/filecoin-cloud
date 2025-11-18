import { useCallback, useState } from 'react'

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2_000)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  return { copiedText, copy, isCopied }
}
