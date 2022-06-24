export interface HealthState {
  readonly game: string,
  readonly endpoint: string,
  readonly url: string,
  timeoutTimestamp?: number
}