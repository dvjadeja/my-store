export const findMaxFromKey = <T>(array: T[], key: keyof T) => {
  return Math.max(...array.map((item) => Number(item[key])));
};

export const findMinFromKey = <T>(array: T[], key: keyof T) => {
  return Math.min(...array.map((item) => Number(item[key])));
};
