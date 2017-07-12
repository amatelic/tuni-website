
export function filterByIndex(index: number): (_: any, index: number) => boolean {
  return (d, i) => {
    return i !== index;
  };
}
