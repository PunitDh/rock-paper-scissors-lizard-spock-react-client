import { ResponsiveFlexBox } from "../../../../components/shared/styles";
import { IndentedBox, ResponsiveTypography } from "../styles";

type Props = {
  title: string;
  children: string | React.ReactNode;
};

const InputGroup = ({ title, children }: Props): React.ReactNode => (
  <ResponsiveFlexBox gap="1rem" flexDirection="column" width="100%">
    <ResponsiveTypography variant="subtitle1">{title}</ResponsiveTypography>
    <IndentedBox>{children}</IndentedBox>
  </ResponsiveFlexBox>
);

export default InputGroup;
