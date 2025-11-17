type GenerateImageObjectProps = {
  imageUrl: string
  width?: number
  height?: number
}

export function generateImageObject({
  imageUrl,
  width = 1200,
  height = 630,
}: GenerateImageObjectProps) {
  return {
    '@type': 'ImageObject' as const,
    url: imageUrl,
    width: {
      '@type': 'QuantitativeValue' as const,
      value: width,
    },
    height: {
      '@type': 'QuantitativeValue' as const,
      value: height,
    },
  }
}
