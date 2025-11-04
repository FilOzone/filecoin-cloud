declare module '*.md' {
  export interface MarkdownAttributes {
    [key: string]: unknown
  }

  export interface MarkdownModule {
    body: string
    attributes: MarkdownAttributes
    react?: React.ComponentType
  }

  const content: MarkdownModule
  export default content
}
