export type AnnouncementProps = {
  children: string
}

// TODO: Delete this component
export function Announcement({ children }: AnnouncementProps) {
  return (
    <div className="rounded-full border border-zinc-700/80 bg-zinc-800/80 px-5 py-2.5 font-sans">
      <p className="font-medium text-zinc-50">{children}</p>
    </div>
  )
}
