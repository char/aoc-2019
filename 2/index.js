const { readFileSync } = require('fs');

const initialInstructions = readFileSync('./input.txt').toString().split(',').map(Number);

const OPCODES = {
  FINISHED_EXECUTION: 99,
  ADDITION: 1,
  MULTIPLY: 2,
};

const fixInstructions = (instructions, noun = 12, verb = 2) => {
  const fixedInstructions = [...instructions];

  // restore the gravity assist program (your puzzle input) to the '1202 program alarm' state it had just before the last computer caught fire
  fixedInstructions[1] = noun;
  fixedInstructions[2] = verb;

  // instruction pointer
  let ip = 0;
  let currentOpCode = fixedInstructions[ip];

  while (currentOpCode !== OPCODES.FINISHED_EXECUTION) {
    currentOpCode = fixedInstructions[ip];
    switch (currentOpCode) {
      case OPCODES.ADDITION:
        // get value at addresses and add them storing them in the sumPos
        const augend = fixedInstructions[fixedInstructions[ip + 1]];
        const addend = fixedInstructions[fixedInstructions[ip + 2]];
        const sumPos = fixedInstructions[ip + 3];
        fixedInstructions[sumPos] = augend + addend;
        ip += 4;
        break;
      case OPCODES.MULTIPLY:
        // get value at addresses and add them storing them in the productPos
        const multiplicand = fixedInstructions[fixedInstructions[ip + 1]];
        const multiplier = fixedInstructions[fixedInstructions[ip + 2]];
        const productPos = fixedInstructions[ip + 3];
        fixedInstructions[productPos] = multiplicand * multiplier;
        ip += 4;
        break;
      case OPCODES.FINISHED_EXECUTION:
        break;
      default:
        throw new Error('Unknown Opcode', currentOpCode)
    }
  }
  return fixedInstructions;
};

console.log('Fixed instructions:', fixInstructions(initialInstructions).join(','));
console.log('========================================');

// part 2

const bruteforceParameters = () => {
  for (let i = 0; i <= 90; i++) {
    for (let j = 0; j <= 90; j++) {
      try {
        const test = fixInstructions(initialInstructions, i, j);
        if (test[0] === 19690720) {
          console.log('Special opcode detected.');
          console.log('Inputs:', i, j);
          console.log('Output:', 100 * test[1] + test[2]);
        }
      } catch (e) { }
    }
  }
}

bruteforceParameters();