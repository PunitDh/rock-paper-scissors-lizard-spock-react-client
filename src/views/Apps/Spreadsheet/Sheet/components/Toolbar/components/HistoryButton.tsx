import { SvgIconTypeMap, Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Props = {
  onClick: (e: React.MouseEvent) => void;
  title: string;
  disabled: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
};

const HistoryButton = ({
  title,
  disabled,
  onClick,
  Icon,
}: Props): JSX.Element => (
  <Tooltip title={`${title} ${disabled ? "(disabled)" : ""}`}>
    <span>
      <FieldButton type="button" onClick={onClick} disabled={disabled}>
        <Icon sx={{ width: "1rem" }} />
      </FieldButton>
    </span>
  </Tooltip>
);

export default HistoryButton;
