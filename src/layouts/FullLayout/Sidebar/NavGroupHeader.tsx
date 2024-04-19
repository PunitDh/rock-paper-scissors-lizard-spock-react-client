import { ListSubheader, styled } from "@mui/material";
import FlexBox from "../../../components/shared/FlexBox";
import { ArrowDropDown, ArrowRight } from "@mui/icons-material";
import { toggleShowNavGroup } from "../../../redux/menuSlice";
import { useDispatch } from "react-redux";

type Props = {
  groupName: string;
  maximized: boolean;
};

const ListSubheaderStyle = styled((props: any) => (
  <ListSubheader disableSticky {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  fontWeight: "700",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  color: theme.palette.text.primary,
  lineHeight: "1.6rem",
  padding: "0.2rem 0.8rem",
  borderRadius: "0.25rem",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const NavGroupHeader = ({ groupName, maximized }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const handleMaximize = () => dispatch(toggleShowNavGroup(groupName));
  return (
    <ListSubheaderStyle>
      <FlexBox
        alignItems="center"
        justifyContent="flex-start"
        cursor="pointer"
        onClick={handleMaximize}
      >
        {groupName} {maximized ? <ArrowDropDown /> : <ArrowRight />}
      </FlexBox>
    </ListSubheaderStyle>
  );
};

export default NavGroupHeader;
