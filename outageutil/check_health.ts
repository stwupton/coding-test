import axios, { AxiosError } from 'axios';
import { HealthState } from './health_state';

export async function checkHealth(
  state: HealthState, 
  interval: number
): Promise<void> {
  const start: number = Date.now();

  try {
    await axios.get(state.url);

    state.timedOut = false;
    state.timeoutTimestamp = undefined;
  } catch (e) {
    state.timedOut = axios.isAxiosError(e) && e.code === AxiosError.ECONNABORTED;
    state.timeoutTimestamp ??= start;
  }

  const timeout: number = Math.max(0, interval - (Date.now() - start));
  setTimeout(() => checkHealth(state, interval), timeout);
}