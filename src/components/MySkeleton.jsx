import React, { memo } from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const MySkeleton = ()=> {
  return (
    <Box sx={{margin:1}}>
        <Skeleton height={200}/>          
    </Box>
  )
}
export default memo(MySkeleton); 