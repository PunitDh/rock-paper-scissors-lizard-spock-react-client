import { ResponsiveFlexBox } from "../../../../components/shared/styles";
import {
  IndentedBox,
  ResponsiveTypography,
} from "../styles";

const InputGroup = ({ title, children }) => (
  <ResponsiveFlexBox gap="1rem" flexDirection="column" width="100%">
    <ResponsiveTypography variant="subtitle1">{title}</ResponsiveTypography>
    <IndentedBox>{children}</IndentedBox>
  </ResponsiveFlexBox>
);

export default InputGroup;
