import { Tab } from "@mui/material";
import { Green } from "./styles";

export default function CustomTab({ label, subLabel, ...others }) {
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
