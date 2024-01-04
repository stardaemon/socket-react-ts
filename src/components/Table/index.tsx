import React from 'react';
import { Table as MUITable, TableBody, TableCell, TableContainer, TableHead, TableRow as MUTableRow, Paper } from '@mui/material';
import { UserData } from '../../pages/Board';
import './index.css'
import DeleteIcon from '@mui/icons-material/Delete';

interface TableProps {
  data: UserData[];
  deleteRow: (userId: string) => void;
}

interface TableRowContentProps {
  row: UserData;
  handleDelete: (userId: string) => void;
}

const TableRow:React.FC<TableRowContentProps>  = ({row, handleDelete }) => {
  return (
    <MUTableRow className='animation-background'>
      <TableCell component='th' scope='row'>
        <img src={row.avatar} width={50} height={50} alt={row.username} />
      </TableCell>
      <TableCell component='th' scope='row'>
        {row.username}
      </TableCell>
      <TableCell component='th' scope='row'>
        {row.email}
      </TableCell>
      <TableCell align='left'>{row.score.toLocaleString('en-US')}</TableCell>
      <TableCell align='right' onClick={() => handleDelete(row.userId)}>
        <DeleteIcon className='blue-icon' />
      </TableCell>
    </MUTableRow>
  );
}

const Table: React.FC<TableProps> = ({ data, deleteRow }) => {
  const handleDelete = (userId: string) => {
    deleteRow(userId)
  };

  return (
    <TableContainer component={Paper}>
      <MUITable aria-label='simple table'>
        <TableHead>
          <MUTableRow>
            <TableCell></TableCell>
            <TableCell align='left'>Username</TableCell>
            <TableCell align='left'>Email</TableCell>
            <TableCell align='left'>Score</TableCell>
            <TableCell></TableCell>
          </MUTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.userId} row={row} handleDelete={handleDelete} />
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
