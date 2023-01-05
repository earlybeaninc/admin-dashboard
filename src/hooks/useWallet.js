import { useCallback, useEffect, useState } from 'react';

import * as ROUTE from '../constants/routes'
import useDidMount from './useDidMount';

const useWallets = () => {
  const [walletsList, setWalletsList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isDidMount = useDidMount();

  const fetchWalletsList = useCallback(async () => {
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
      if (walletsList.length === 0 && isDidMount) {
        setLoading(true);
        setError('');
        const _wallets =  await fetch(`${ROUTE.ADMIN_API}/wallets`, 
          requestOptions)
        .then(res => res.json())
        .then(data =>{
          return data
        })
        .catch(err => console.log(err))
        if (!_wallets?.data) {
          if (isDidMount) {
            setError('No wallet found.');
            setLoading(false);
          }
        } else {
          const data = _wallets;
          if (isDidMount) {
            setLoading(false);
            setWalletsList(data);
          }
        }
      }
    } catch (e) {
      if (isDidMount) {
        setError('Failed to fetch wallets');
        setLoading(false);
      }
    }
  }, [isDidMount, walletsList]);

  useEffect(() => {
    fetchWalletsList();
  }, [fetchWalletsList]);

  return {
    fetchWalletsList, walletsList, 
    isLoading, error
  };
};

export default useWallets;
