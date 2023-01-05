import { useCallback, useEffect, useState } from 'react';

import * as ROUTE from '../constants/routes'
import useDidMount from './useDidMount';

const useTransactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isDidMount = useDidMount();

  const fetchTransactionsList = useCallback(async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      const requestOptions = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken.token}`
        }
      }
      if (transactionsList.length === 0 && isDidMount) {
        setLoading(true);
        setError('');
        const _parents =  await fetch(`${ROUTE.ADMIN_API}/transactions`, 
          requestOptions)
        .then(res => res.json())
        .then(data =>{
          return data
        })
        .catch(err => console.log(err))
        if (!_parents?.data) {
          if (isDidMount) {
            setError('No parent found.');
            setLoading(false);
          }
        } else {
          const data = _parents;
          if (isDidMount) {
            setLoading(false);
            setTransactionsList(data);
          }
        }
      }
    } catch (e) {
      if (isDidMount) {
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    }
  }, [isDidMount, transactionsList]);

  useEffect(() => {
    fetchTransactionsList();
  }, [fetchTransactionsList]);

  return {
    fetchTransactionsList, transactionsList, 
    isLoading, error
  };
};

export default useTransactions;
