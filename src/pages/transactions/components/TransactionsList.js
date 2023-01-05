import { useState } from 'react';

// material
import {
  Card,
  Table,
  Stack,
  // Avatar,
  // Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';
import { useTransactions } from '../../../hooks';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'reference', label: 'Reference', alignRight: false },
	{ id: 'amount', label: 'Amount', alignRight: false },
	{ id: 'type', label: 'Type', alignRight: false },
	{ id: 'amountCurrency', label: 'Currency', alignRight: false },
	{ id: 'moneyFrom', label: 'From', alignRight: false },
	{ id: 'moneyTo', label: 'To', alignRight: false },
	{ id: 'description', label: 'Description', alignRight: false },
	{ id: 'reason', label: 'Reason', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((_transaction) => `${_transaction.reference}`.indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TransactionsList() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterRefNo, setFilterRefNo] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);  
  
  const { transactionsList, isLoading } = useTransactions();

  const transactions = transactionsList?.data?.data.map((parent) => ({
    id: parent?.id,
	reference: parent?.reference,
    amount: parent?.amount,
    type: parent?.type,
    amountCurrency: parent?.amount_currency,
    moneyFrom: parent?.money_from ? parent?.money_from : 'N/A',
    moneyTo: parent?.money_to ? parent?.money_to : 'N/A',
    description: parent?.description ? parent?.description : 'N/A',
    reason: parent?.reason ? parent?.reason : 'N/A'
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = transactions.map((n) => n.reference);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (reference) => {
    const selectedIndex = selected.indexOf(reference);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, reference);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterRefNo(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactionsList?.data?.total) : 0;

  const _transactionsList = transactionsList?.data ? transactions : []
  const filteredTransactions = applySortFilter(_transactionsList, getComparator(order, orderBy), filterRefNo);
  const isTransactionNotFound = !filteredTransactions.length;

  return (
    <Page title="Transactions">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Transactions
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar placeholder='Search reference...' numSelected={selected.length} filterName={filterRefNo} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={transactionsList?.data?.total}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {transactionsList.length === 0 ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper>
                          <Typography gutterBottom align="center" variant="subtitle1">
                          {isLoading ? 'Fetching records...' : 'No record found'}
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { 
                        id, reference, amount, type, 
                        amountCurrency, moneyFrom, moneyTo, 
                        description, reason } = row;
                      const isItemSelected = selected.indexOf(reference) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={() => handleClick(reference)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {reference}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{fCurrency(amount)}</TableCell>
                          <TableCell align="left">{type}</TableCell>
                          <TableCell align="left">{amountCurrency}</TableCell>
						  <TableCell align="left">{moneyFrom}</TableCell>
						  <TableCell align="left">{moneyTo}</TableCell>
						  <TableCell align="left">{description}</TableCell>
						  <TableCell align="left">{reason}</TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                )}

                {isTransactionNotFound && !isLoading && emptyRows > 0 &&(
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterRefNo} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25  ]}
            component="div"
            count={transactionsList?.data ? transactionsList?.data?.total : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
