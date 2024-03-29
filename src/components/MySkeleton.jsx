import React, { memo } from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const MySkeleton = memo(() => {
  return (
    <Box sx={{margin:1}}>
        <Skeleton height={200}/>          
    </Box>
  )
});