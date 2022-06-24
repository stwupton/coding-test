/**
 * Winline Calc
 *
 * Implement a function that returns an array of Winline objects for a
 * given reel matrix using standard left to right slot winline logic.
 *
 * Expected output from the three example reel matrices can be found at the
 * bottom of this file.
 */

interface Winline {
  count: number;
  offsets: number[];
  payout: number;
  symbol: number;
}

const symbolPayouts = [
  [0, 0, 1, 2, 5],
  [0, 0, 2, 4, 10],
  [0, 0, 2, 4, 10],
  [0, 0, 5, 10, 25],
  [0, 0, 10, 20, 50],
];

const winlineOffsets = [
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
];

const exampleReelMatrix1 = [
  [0, 0, 0, 1, 4],
  [4, 4, 1, 1, 1],
  [3, 3, 3, 3, 3],
];

const exampleReelMatrix2 = [
  [4, 4, 4, 4, 2],
  [3, 4, 3, 1, 0],
  [4, 1, 4, 0, 0],
];

const exampleReelMatrix3 = [
  [0, 2, 0, 1, 0],
  [4, 1, 1, 3, 0],
  [0, 2, 2, 3, 3],
];

function getWinlines(reelMatrix: number[][]): Winline[] {
  const winlines: Winline[] = [];

  for (const offsets of winlineOffsets) {
    const symbol: number = reelMatrix[offsets[0]][0];
    
    let count = 0;
    for (let x = 0; x < offsets.length; x++) {
      const y: number = offsets[x];

      if (reelMatrix[y][x] === symbol) {
        count++;
      } else {
        break;
      }
    }

    if (count > 2) {
      const payout: number = symbolPayouts[symbol][count - 1];
      winlines.push({ count, offsets, payout, symbol });
    }
  }

  return winlines;
}

/**
 * Expected outcomes for exampleReelMatrix1, exampleReelMatrix2 and exampleReelMatrix3
 */

console.assert(
  JSON.stringify(getWinlines(exampleReelMatrix1)) ===
    JSON.stringify([
      { count: 3, offsets: [0, 0, 0, 0, 0], payout: 1, symbol: 0 },
      { count: 5, offsets: [2, 2, 2, 2, 2], payout: 25, symbol: 3 },
    ]),
);

console.assert(
  JSON.stringify(getWinlines(exampleReelMatrix2)) ===
    JSON.stringify([
      { count: 4, offsets: [0, 0, 0, 0, 0], payout: 20, symbol: 4 },
      { count: 3, offsets: [0, 1, 2, 1, 0], payout: 10, symbol: 4 },
      { count: 3, offsets: [2, 1, 0, 1, 2], payout: 10, symbol: 4 },
    ]),
);

console.assert(JSON.stringify(getWinlines(exampleReelMatrix3)) === JSON.stringify([]));
