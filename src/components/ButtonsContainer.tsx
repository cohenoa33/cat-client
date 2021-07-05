import { Button } from "./Button";

export function ButtonsContainer({ addFeeding }: Props) {
  return (
    <div>
      {buttons.map((button) => (
        <Button
          addFeeding={addFeeding}
          wight={button.wight}
          type={button.type}
        />
      ))}
    </div>
  );
}

const buttons: ButtonProps[] = [
  { wight: 5, type: "Ball" },
  { wight: 10, type: "Ball" },
  { wight: 5, type: "Board" },
  { wight: 10, type: "Board" },
  { wight: 5.5, type: "automatic feeder" },
  { wight: 11, type: "automatic feeder" }
];

interface ButtonProps {
  wight: number;
  type: string;
}

interface Props {
  addFeeding: (weight: number, type: string, food?: string | undefined) => void;
}
