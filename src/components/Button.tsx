export function Button({ addFeeding, wight, type }: Props) {
  return (
    <button
      className="add-feeding-button"
      onClick={() => addFeeding(wight, type)}
    >
      Add {wight}g
      <br /> ({type})
    </button>
  );
}

interface Props {
  addFeeding: (weight: number, type: string, food?: string | undefined) => void;
  wight: number;
  type: string;
}
