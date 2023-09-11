import { FlexBox } from "src/components/shared/styles";

export default function NoAuth() {
  return (
    <FlexBox
      height="20rem"
      alignItems="flex-start"
      justifyContent="flex-start"
      width="100%"
      marginLeft="2rem"
    >
      This request does not use any authorization
    </FlexBox>
  );
}
