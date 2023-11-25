import React, { memo, useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';

const DataTable = ({data})=> {
  return (
    <TableContainer component={Paper} sx={{marginTop:"2rem"}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>            
            <TableCell align="center">Сана</TableCell>
            <TableCell align="center">Вақт</TableCell>
            <TableCell align="center">Кп индеx(max=9)</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (                        
            <TableRow
              key={uuidv4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align="center" scope="row">{row.date}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default DataTable;