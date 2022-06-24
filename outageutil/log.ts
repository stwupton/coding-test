import { HealthState } from './health_state';
import { writeFileSync } from 'fs';

const reportTemplate = 'Game \"{gamecode}\" has been down on \"{endpoint}\" for {minutes} minutes\n';

function logHealth(states: HealthState[]): void {
  let output = '';
  
  for (const state of states) {
    if (state.timeoutTimestamp != undefined) {
      let report = reportTemplate;
      report = report.replace('{gamecode}', state.game);
      report = report.replace('{endpoint}', state.endpoint);

      const timeElapsed: number = Date.now() - state.timeoutTimestamp;
      report = report.replace('{minutes}', Math.floor(timeElapsed / 1000 / 60).toString());

      output += report;
    }
  }

  writeFileSync('./outageutil/log.txt', output);
}

export function startLog(states: HealthState[], interval: number): void {
  logHealth(states);
  setInterval(() => logHealth(states), interval);
}