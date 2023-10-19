type MqPs = 'min' | 'max';

const toMq = (bp: number, ps: MqPs) => `@media (${ps}-width: ${bp}px)`;

const transformBps = (bps: Record<string, number>, ps: MqPs) =>
  Object.entries(bps).reduce(
    (acc, [key, val]) => {
      acc[key] = toMq(val, ps);
      return acc;
    },
    {} as Record<string, string>
  );

const breakpoints = {
  md: 600,
  lg: 1200,
};

export const mqW = transformBps(breakpoints, 'min');
export const mqH = transformBps(breakpoints, 'max');
