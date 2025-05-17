export const calculateMovingAverage = (
  data: number[],
  period: number = 3
): number[] => {
  const result: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      const slice = data.slice(0, i + 1);
      result.push(slice.reduce((sum, val) => sum + val, 0) / slice.length);
    } else {
      const slice = data.slice(i - period + 1, i + 1);
      result.push(slice.reduce((sum, val) => sum + val, 0) / period);
    }
  }

  return result;
};
