export type AnnouncementProps = {
  children: string
}

export function Announcement({ children }: AnnouncementProps) {
  return (
    <div
      className="rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5"
      role="status"
      aria-live="polite"
    >
      <p className="font-medium text-zinc-50">{children}</p>
    </div>
  )
}
