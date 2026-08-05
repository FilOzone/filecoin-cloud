/** Shared by the checker's live readout and its verdict, so the two agree. */
export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
) {
  return count === 1 ? singular : plural
}
