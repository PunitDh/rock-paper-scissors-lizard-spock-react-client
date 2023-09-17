import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import DashboardCard from '../../../../../components/shared/DashboardCard'
import { Bold, ResponsiveFlexBox } from '../../../../../components/shared/styles'
import { Grid, Theme as MuiTheme, Paper, Typography, useMediaQuery } from '@mui/material';
import { Ingredient } from '../types';
import FlexBox from '../../../../../components/shared/FlexBox';
import ActionButton from './ActionButton';
import { Bolt, Close, Refresh, Star } from '@mui/icons-material';
import recipe from "./recipe.json";
import { IconHeart } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { useSwipeable } from 'react-swipeable';

type SwipeContainerProps = {
  delta: number;
}

const SwipeContainer = styled.div(({ delta }: SwipeContainerProps) => ({
  position: "relative",
  transform: `translateX(${delta}px)`
}));

const ImageContainer = styled(Paper)({
  borderRadius: "4px",
  touchAction: "pan-x"
});

const Recipe = () => {
  const { recipeId } = useParams();
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();
  const swipeHandlers = useSwipeable({
    onSwiping: (event) => {
      const delta = event.deltaX;
      setPosition(delta);
    },
    onSwipedLeft: () => {
      console.log("Swipe left");
      setTimeout(() => navigate(`/utils/recipes/${Math.random().toString(16)}`), 100)
    },
    onSwipedRight: () => {
      console.log("Swipe right");
      setTimeout(() => navigate(`/utils/recipes/${Math.random().toString(16)}`), 100)
    },
  });

  useEffect(() => {
    setPosition(0);
  }, [recipeId])

  const mdUp = useMediaQuery((theme: MuiTheme) => theme.breakpoints.up("md"));
  const ingredients = Array.from(new Set<string>(recipe.extendedIngredients.map((it: Ingredient) => it.name))).sort();
  return (

    <DashboardCard sx={{ height: "90vh", width: "92dvw" }} title={""}>
      <SwipeContainer {...swipeHandlers} delta={position}>
        <ResponsiveFlexBox
          flexDirection="column"
          gap="1.5rem"
          alignItems="flex-start"
          height="100%"
          // position="absolute"
          top="0"
          left="0"
        >
          <ImageContainer elevation={8}>
            <img src={recipe.image} alt={recipe.title} style={{ width: "100%" }} />
          </ImageContainer>
          <Typography variant="h5" textAlign="center">{recipe.title}</Typography>
          <Typography><Bold>Cooking time:</Bold> {recipe.readyInMinutes} mins</Typography>
          <Typography><Bold>Ingredients: ({ingredients.length})</Bold></Typography>
          <Grid container spacing={2}>
            {ingredients.map((ingredient: string): JSX.Element =>
              <Grid xs={6} md={4} item key={ingredient}>{ingredient}</Grid>
            )}
          </Grid>

          <FlexBox width="100%" justifyContent={mdUp ? "center" : "space-between"} gap="1rem">
            <ActionButton Icon={Refresh} color="#BBBB66" title="Rewind" onClick={() => { }} />
            <ActionButton Icon={Close} color="red" title="Dislike it" onClick={() => { }} />
            <ActionButton Icon={Star} color="#4466FF" title="Favourite!" onClick={() => { }} />
            <ActionButton Icon={() => <IconHeart color="green" fill="green" stroke="3" />} onClick={() => { }} color="green" title="Like it" />
            <ActionButton Icon={Bolt} color="purple" title="Random" onClick={() => { }} />
          </FlexBox>
        </ResponsiveFlexBox>
      </SwipeContainer>
    </DashboardCard>
  )
}

export default Recipe