import { Tab } from "@mui/material";
import { Green } from "./styles";

type Props = {
  label: string;
  subLabel: () => string;
  [x: string]: any;
};

export default function CustomTab({ label, subLabel, ...others }: Props) {
  const smallLabel = subLabel();

  const combinedLabel = smallLabel ? (
    <span>
      {label} <Green>({smallLabel})</Green>
    </span>
  ) : (
    label
  );

  return <Tab label={combinedLabel} {...others} />;
}
