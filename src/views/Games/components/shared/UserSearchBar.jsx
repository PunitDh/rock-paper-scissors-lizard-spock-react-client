import { IconSearch } from "@tabler/icons";
import DashboardCard from "../../../../components/shared/DashboardCard";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import styled from "@emotion/styled";

const SearchGroup = styled.span({
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  position: "relative",
});

const SearchField = styled(CustomTextField)({
  width: "100%",
});

const FloatingFab = styled.div({
  position: "absolute",
  right: 10,
  top: 15,
  cursor: "pointer",
});

const UserSearchBar = ({ search, setSearch }) => (
  <DashboardCard title="Search User">
    <SearchGroup>
      <SearchField
        type="search"
        name="search"
        autoComplete="off"
        placeholder="Search for a user"
        search={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FloatingFab size="medium">
        <IconSearch />
      </FloatingFab>
    </SearchGroup>
  </DashboardCard>
);

export default UserSearchBar;
