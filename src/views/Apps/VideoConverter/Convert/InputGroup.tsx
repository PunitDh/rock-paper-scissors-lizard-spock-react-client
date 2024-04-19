import { ResponsiveFlexBox } from "../../../../components/shared/styles";
import { IndentedBox, ResponsiveTypography } from "../styles";

type Props = {
  title: string;
  children: string | JSX.Element;
};

const InputGroup = ({ title, children }: Props): JSX.Element => (
  <ResponsiveFlexBox gap="1rem" flexDirection="column" width="100%">
    <ResponsiveTypography variant="subtitle1">{title}</ResponsiveTypography>
    <IndentedBox>{children}</IndentedBox>
  </ResponsiveFlexBox>
);

export default InputGroup;
