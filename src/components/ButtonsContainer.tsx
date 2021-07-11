import { Button } from "./Button";

export function ButtonsContainer({ addFeeding }: Props) {
  return (
    <div>
      {buttons.map((button, index) => (
        <Button
          key={"button-" + index + "-" + button.type}
          addFeeding={addFeeding}
          wight={button.wight}
          type={button.type}
        />
      ))}
    </div>
  );
}

const buttons: ButtonProps[] = [
  { wight: 5, type: "ball" },
  { wight: 10, type: "ball" },
  { wight: 5, type: "board" },
  { wight: 10, type: "board" },
  { wight: 5.5, type: "auto" },
  { wight: 11, type: "auto" }
];

interface ButtonProps {
  wight: number;
  type: string;
}

interface Props {
  addFeeding: (weight: number, type: string, food?: string | undefined) => void;
}
