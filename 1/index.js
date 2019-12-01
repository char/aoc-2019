const { readFileSync } = require('fs');

const input = readFileSync('./input.txt').toString().split('\n').map(i => parseInt(i));

const calculateFuel = (fuel) => Math.max(Math.floor(fuel / 3) - 2, 0);

// part 1
const answer = input.map(n => calculateFuel(n)).reduce((p, c) => p + c);
console.log("Part 1:", answer);

// part 2
const calculateFuelRecursive = (startingFuel, fuels = []) => {
    if (startingFuel <= 0)
        return fuels.reduce((p, c) => p + c);

    const newMass = calculateFuel(startingFuel);
    fuels.push(newMass);
    return calculateFuelRecursive(newMass, fuels);
};

const answer2 = input.map(n => calculateFuelRecursive(n)).reduce((p, c) => p + c);
console.log("Part 2:", answer2);