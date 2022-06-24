import { HealthState } from './health_state';
import { writeFileSync } from 'fs';

const reportTemplateM = 'Game \"{gamecode}\" has been down on \"{endpoint}\" for {minutes} minutes\n';
const reportTemplateHM = 'Game \"{gamecode}\" has been down on \"{endpoint}\" for {hours} hours and {minutes} minutes\n';

function logHealth(states: HealthState[]): void {
  let output = '';
  
  for (const state of states) {
    if (state.timeoutTimestamp != undefined) {
      const msElapsed: number = Date.now() - state.timeoutTimestamp;
      const minutesElapsed: number = Math.floor(msElapsed / 1000 / 60);
      const hoursElapsed: number = Math.floor(minutesElapsed / 60);

      let report = hoursElapsed > 0 ? reportTemplateHM : reportTemplateM;
      report = report.replace('{gamecode}', state.game);
      report = report.replace('{endpoint}', state.endpoint);
      report = report.replace('{hours}', hoursElapsed.toString());
      report = report.replace('{minutes}', (minutesElapsed - hoursElapsed * 60).toString());

      output += report;
    }
  }

  writeFileSync('./outageutil/log.txt', output);
}

export function startLog(states: HealthState[], interval: number): void {
  logHealth(states);
  setInterval(() => logHealth(states), interval);
}