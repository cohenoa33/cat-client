export function Button({ addFeeding, wight, type }: Props) {
  return (
    <button onClick={() => addFeeding(wight, type)}>
      Add {type} grams ({type})
    </button>
  );
}

interface Props {
  addFeeding: (weight: number, type: string, food?: string | undefined) => void;
  wight: number;
  type: string;
}
