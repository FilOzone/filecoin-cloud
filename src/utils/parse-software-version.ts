/**
 * Local fork of `parseVersionString` from
 * `@filecoin-foundation/ui-filecoin/Table/SoftwareVersion`.
 *
 * Identical output shape to the upstream parser, but the semver core also
 * accepts an optional prerelease suffix (e.g. `-rc1`, `-beta.1`) so prerelease
 * Curio builds are parsed instead of rejected. The upstream regex hard-codes
 * `\d+\.\d+\.\d+` with no prerelease segment.
 *
 * Revert to the package parser once the upstream fix ships:
 * https://github.com/FilecoinFoundationWeb/filecoin-foundation/issues/2336
 */

export type ParsedSoftwareVersion = {
  version: string
  network: string
  commit: string
  date: string
}

// Same as upstream, with an optional `-<prerelease>` segment after the patch number.
const VERSION_REGEX =
  /^(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)\+([a-z]+)\+(git_[a-f0-9]+)_(.+)$/

export function parseSoftwareVersion(
  input: string,
): ParsedSoftwareVersion | undefined {
  const match = input.match(VERSION_REGEX)
  if (!match) return undefined

  return {
    version: match[1],
    network: match[2],
    commit: match[3].replace('git_', ''),
    date: match[4],
  }
}
