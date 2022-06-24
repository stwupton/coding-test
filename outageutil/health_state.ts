export interface HealthState {
  readonly game: string,
  readonly endpoint: string,
  readonly url: string,
  timedOut: boolean,
  timeoutTimestamp?: number
}