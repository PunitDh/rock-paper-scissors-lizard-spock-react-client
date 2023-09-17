import React, { Dispatch, Reducer, SyntheticEvent, useReducer, useState } from "react";
import { initialState, reducer } from "./reducer";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { ResponsiveFlexBox } from "../../../../components/shared/styles";
import { Action, State } from "./types";
import { Autocomplete, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Cuisine, Diet } from "./constants";
import { shuffle } from "lodash";
import { SelectableOption } from "./styles";
import RefreshCuisines from "./components/RefreshCuisines";
import { resetState, setCuisine } from "./actions";
import Debug from "./components/Debug";
import { useToken } from "../../../../hooks";
import IntolerancesSelector from "./components/IntolerancesSelector";
import FlexBox from "../../../../components/shared/FlexBox";


const Picker = () => {
  const token = useToken();
  const [state, dispatch]: [State, Dispatch<Action>] = useReducer<Reducer<State, Action>>(reducer, initialState);
  const [cuisines, setCuisines] = useState(shuffle(Object.values(Cuisine)));
  const handleReloadCuisines = () => {
    setCuisines(shuffle(cuisines));
    dispatch(resetState());
  };
  const selectCuisine = (cuisine: Cuisine) => () => dispatch(setCuisine(cuisine));
  const selectDiet = (e: SyntheticEvent) => {
    console.log(e);
    console.log((e.target as HTMLInputElement).value)
  }

  return (<>
    <DashboardCard sx={{ height: "100%" }} title="Recipe Picker">
      <ResponsiveFlexBox
        flexDirection="column"
        gap="2rem"
        alignItems="flex-start"
      >
        <Typography>What do you feel like eating today?</Typography>
        <Typography>Choose an option:</Typography>
        <ResponsiveFlexBox justifyContent="space-between" width="100%" alignItems="flex-start">
          <ResponsiveFlexBox flexDirection="column" gap="1rem">
            {cuisines.slice(0, 3).map(cuisine =>
              <SelectableOption active={Number(state.cuisine === cuisine)} key={cuisine} onClick={selectCuisine(cuisine)}>
                {cuisine}
              </SelectableOption>
            )}
          </ResponsiveFlexBox>
          <ResponsiveFlexBox width="100%" flexDirection="column">
            Or load more cuisines:
            <RefreshCuisines onClick={handleReloadCuisines} />
          </ResponsiveFlexBox>
        </ResponsiveFlexBox>

        {state.cuisine && <>
          <ResponsiveFlexBox width="100%" flexDirection="column">
            You selected:

            <SelectableOption active={1}>
              {state.cuisine}
            </SelectableOption>
          </ResponsiveFlexBox>
          <ResponsiveFlexBox width="100%" flexDirection="column" alignItems="flex-start" gap="1rem">
            <Typography>Type of diet?</Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Object.values(Diet)}
              sx={{ width: 300 }}
              value={state.diet}
              onChange={selectDiet}
              renderInput={(params) => <TextField {...params} label="Diet" />}
            />
          </ResponsiveFlexBox>

          <ResponsiveFlexBox width="100%" flexDirection="column" alignItems="flex-start" gap="1rem">
            <Typography>Select any intolerances</Typography>
            <IntolerancesSelector />
          </ResponsiveFlexBox>

          <ResponsiveFlexBox width="100%" flexDirection="column" alignItems="flex-start" gap="1rem">
            <Typography>How long do you want to spend cooking?</Typography>
            <FlexBox flexDirection="column" gap="1rem" width="100%" justifyContent="center">
              <SelectableOption active={0}>
                {"<"} 20 minutes
              </SelectableOption>
              <SelectableOption active={0}>
                20-45 minutes
              </SelectableOption>
              <SelectableOption active={0}>
                45+ minutes
              </SelectableOption>
              </FlexBox>
          </ResponsiveFlexBox>
        </>
        }


      </ResponsiveFlexBox>
    </DashboardCard>
    {token.decoded?.isAdmin && <Debug state={state} />}</>
  );
};

export default Picker;
