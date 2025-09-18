export function parseData<T>(data: Array<Record<string, T>>): T[] {
  return data.map((item) => {
    const [, value] = Object.entries(item)[0];
    return value;
  });
}
