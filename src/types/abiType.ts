export type ABIVersion = 'current' | 'legacy'
export type ABI = Array<string>
export type VersionedABI = Record<ABIVersion, ABI>
