import os from 'os';
import { makePromtMessage } from '../index.mjs';

export function receiveCPU() {
    const cpus = os.cpus();
    console.log('Host Machine CPUs Info:');
    console.log('Overall Amount of CPUs:', cpus.length);
    cpus.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log('Model:', cpu.model);
      console.log('Clock Rate (GHz):', (cpu.speed / 1000).toFixed(2));
    });
  makePromtMessage();
}
