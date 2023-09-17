import React, { useState } from 'react'
import { ReloadIcon } from '../styles';
import { Tooltip } from '@mui/material';

const RefreshCuisines = ({ onClick }) => {
  const [rotateicon, setRotateIcon] = useState(false);
  const duration = 500;

  const handleRefreshCuisines = () => {
    setRotateIcon(true);
    onClick()
    setTimeout(() => {
      setRotateIcon(false);
    }, duration);
  }

  return (
    <Tooltip title="Show more cuisines" disableInteractive onClick={handleRefreshCuisines}>
      <ReloadIcon rotateicon={Number(rotateicon)} duration={duration} />
    </Tooltip>
  )
}

export default RefreshCuisines