export const GridItem = ({
  value,
  index,
  updateGrid,
}: {
  value: number;
  index: number;
  updateGrid: (value: number, index: number) => void;
}) => {
  return (
    <div className="bg-green-500 text-purple-950 p-2">
      <input
        className="h-10 w-10 text-center text-white bg-green-500"
        value={value}
        inputMode="numeric"
        onChange={(event) => updateGrid(+event.target.value, index)}
      />
    </div>
  );
};
