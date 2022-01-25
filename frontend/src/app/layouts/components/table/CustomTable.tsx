import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


import CustomTablePagination from './CustomTablePagination';
import { Button, Col, Form, Row } from 'react-bootstrap';


interface CustomTableProps {
  columns: Array<{ title: string; style?: any }>,
  rows: JSX.Element[],
  searchValue?: string,
  onSearch?: (value: string) => void
  buttonTitle?: string,
  navigateTo?: string,
}

const CustomTable = ({ columns, rows, searchValue, onSearch, buttonTitle, navigateTo }: CustomTableProps) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (

    <div>
      <Row className="d-flex align-items-center justify-content-between py-4 ms-1" md={5}>
        <Col className="d-flex align-items-center p-0" >
          <Form.Control type="email" placeholder="Search..." value={searchValue}
          // onChange={evt => onSearch(evt.target.value)} 
          />
        </Col>

        {buttonTitle ?
          <Col className="d-flex justify-content-end">
            <Button className="d-flex align-item-center main-page__button" href={navigateTo}>
              <AddOutlinedIcon className='me-2' />
              {buttonTitle}
            </Button>
          </Col>
          :
          <></>
        }
      </Row>


      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 500 }}>

          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell align="center" key={index} style={{ ...column.style, fontSize: 14 }} >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => row)}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                colSpan={columns.length}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={CustomTablePagination}
              />
            </TableRow>
          </TableFooter>

        </Table>
      </TableContainer>
    </div>

  );
}

export default CustomTable;