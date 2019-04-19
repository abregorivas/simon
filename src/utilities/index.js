const generateRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateCompMoves = len => {
  let results = [];
  for (let i = 0; i < len; i++) {
    results.push(generateRandNum(0, 3));
  }
  return results;
};

// handy iief function to trigger a delay between state update and sound/animation
export const timeout = (cb, time) => {
  return setTimeout(
    (function() {
      return function() {
        cb();
      };
    })(),
    time
  );
};
