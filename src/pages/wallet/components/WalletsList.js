import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { sentenceCase } from 'change-case';
// material
import {
  Card,
  Table,
  Stack,
  // Avatar,
  // Button,
  Checkbox,
  Link,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';

import * as ROUTES from '../../../constants/routes';

// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, WalletMoreMenu } from '../../../sections/@dashboard/user';
import { useWallets } from '../../../hooks';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Name', alignRight: false },
  { id: 'parentId', label: 'User Type', alignRight: false },
	{ id: 'acctNo', label: 'Account No.', alignRight: false },
	{ id: 'acctType', label: 'Account Type', alignRight: false },
	{ id: 'bankName', label: 'Bank Name', alignRight: false },
  { id: 'balance', label: 'balance', alignRight: false },
	{ id: 'currency', label: 'Currency', alignRight: false },
	{ id: 'walletType', label: 'Type', alignRight: false },
	{ id: 'status', label: 'Status', alignRight: false },
  { id: '' },
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
    return array.filter((_wallet) => `${_wallet.name}`.indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function WalletsList() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);  
  
  const { walletsList, isLoading } = useWallets();

  const wallets = walletsList?.data?.data.map((parent) => ({
    id: parent?.id,
	  name: parent?.name,
    acctNo: parent?.account_number,
    acctType: parent?.account_type,
    bankName: parent?.bank_name,
    currency: parent?.currency,
    walletType: parent?.type,
    balance: parent?.balance ,
    parentId: parent?.parent_id ? 'Parent' : 'Child',
    status: parent?.status,
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = wallets.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - walletsList?.data?.total) : 0;

  const _walletsList = walletsList?.data ? wallets : []
  const filteredWallets = applySortFilter(_walletsList, getComparator(order, orderBy), filterName);
  const isWalletNotFound = !filteredWallets.length;

  return (
    <Page title="Wallets">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Wallets
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar placeholder='Search name...' numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={walletsList?.data?.total}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {walletsList.length === 0 ? (
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
                    {filteredWallets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { 
                        id, name, balance, parentId,
                        acctNo, acctType, currency, 
                        bankName, walletType, status } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

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
                            <Checkbox checked={isItemSelected} onChange={() => handleClick(name)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                            <Link to={`${ROUTES.PATH_ADMIN.wallet.root}/${id}`} 
                              color="inherit" underline="hover" 
                              component={RouterLink}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Link>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{parentId}</TableCell>
                          <TableCell align="left">{acctNo}</TableCell>
                          <TableCell align="left">{acctType}</TableCell>
                          <TableCell align="left">{bankName}</TableCell>
                          <TableCell align="left">{fCurrency(balance)}</TableCell>
                          <TableCell align="left">{currency}</TableCell>
                          <TableCell align="left">{walletType}</TableCell>
                          <TableCell align="left">
                            <Label variant="ghost" color={(status !== 'active' && 'error') || 'success'}>
                              {sentenceCase((status !== 'active' && 'non-active') || 'active')}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <WalletMoreMenu walletId={id} />
                          </TableCell>
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

                {isWalletNotFound && !isLoading && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
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
            count={walletsList?.data ? walletsList?.data?.total : 0}
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
