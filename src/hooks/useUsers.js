import { useCallback, useEffect, useState } from 'react';

import * as ROUTE from '../constants/routes'
import useDidMount from './useDidMount';

const useUsers = () => {
  const [parentsList, setparentsList] = useState([]);
  const [kidsList, setkidsList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isDidMount = useDidMount();

  const fetchParentsList = useCallback(async () => {
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
      if (parentsList.length === 0 && isDidMount) {
        setLoading(true);
        setError('');
        const _parents =  await fetch(`${ROUTE.ADMIN_API}/users/parents`, 
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
            setparentsList(data);
          }
        }
      }
    } catch (e) {
      if (isDidMount) {
        setError('Failed to fetch parents');
        setLoading(false);
      }
    }
  }, [isDidMount, parentsList]);

  const fetchKidsList = useCallback(async () => {
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
        if (kidsList.length === 0 && isDidMount) {
          setLoading(true);
          setError('');
          const _kids =  await fetch(`${ROUTE.ADMIN_API}/users/kids`, 
            requestOptions)
          .then(res => res.json())
          .then(data =>{
            return data
          })
          .catch(err => console.log(err))
          if (!_kids?.data) {
            if (isDidMount) {
              setError('No parent found.');
              setLoading(false);
            }
          } else {
            const data = _kids;
            if (isDidMount) {
              setLoading(false);
              setkidsList(data);
            }
          }
        }
      } catch (e) {
        if (isDidMount) {
          setError('Failed to fetch parents');
          setLoading(false);
        }
      }
    }, [isDidMount, kidsList]);

  useEffect(() => {
      fetchParentsList();
      fetchKidsList();
  }, [fetchParentsList, fetchKidsList]);

  return {
    fetchParentsList, fetchKidsList, parentsList, 
    kidsList, isLoading, error
  };
};

export default useUsers;
