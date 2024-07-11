import { useState } from "react";
import { GridItem } from "./GridItem";

const INITIAL_STATE = [
  0, 0, 0, 3, 1, 0, 9, 0, 0, 0, 7, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 4, 8, 0, 0,
  0, 0, 0, 0, 1, 8, 0, 5, 0, 0, 8, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 5, 0, 2, 9, 0, 0, 1, 0, 9, 4, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0, 0,
  0, 0, 0,
];

export const Grid = () => {
  const [grid, setGrid] = useState(INITIAL_STATE);

  const updateGrid = (value: number, index: number) => {
    setGrid((prevGrid) =>
      prevGrid.map((item, itemIndex) => (itemIndex === index ? value : item))
    );
  };

  const gridToString = () => {
    let str = "";
    grid.map((item) => (item === 0 ? (str += ".") : (str += item)));
    return str;
  };

  const solutionToGrid = (solution: string) => {
    const solutionGrid: number[] = [];
    Array.from(solution).forEach((item) => solutionGrid.push(+item));
    return solutionGrid;
  };

  const solvePuzzle = async () => {
    const response = await fetch("http://0.0.0.0:9090/http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sudoku: [gridToString()],
      }),
    });

    const json = await response.json();

    const solution = json.data[0].solution;

    setGrid(solutionToGrid(solution));
  };

  return (
    <div className="flex gap-4">
      <div className="grid gap-4 grid-cols-9 grid-rows-9">
        {grid.map((item, index) => (
          <GridItem
            key={index}
            value={item}
            index={index}
            updateGrid={updateGrid}
          />
        ))}
      </div>
      <button className="self-center bg-purple-600" onClick={solvePuzzle}>
        Solve!
      </button>
    </div>
  );
};
