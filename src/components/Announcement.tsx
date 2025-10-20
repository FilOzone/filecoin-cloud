export type AnnouncementProps = {
  children: string
}

export function Announcement({ children }: AnnouncementProps) {
  return (
    <output
      className="rounded-full border border-zinc-700/80 bg-zinc-800/80 px-5 py-2.5 font-sans"
      aria-live="polite"
    >
      <p className="font-medium text-zinc-50">{children}</p>
    </output>
  )
}
