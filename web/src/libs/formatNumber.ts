const si = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "k" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "G" },
  { value: 1e12, symbol: "T" },
  { value: 1e15, symbol: "P" },
  { value: 1e18, symbol: "E" },
];
const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

export function formatNumber(num: number) {
  let i: number;
  for (i = si.length - 1; i > 0; i--) if (si[i].value <= num) break;
  return (
    (num / si[i].value)
      .toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })
      .replace(rx, "$1") + si[i].symbol
  );
}
