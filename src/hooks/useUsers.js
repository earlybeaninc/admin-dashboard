import { useEffect, useState } from 'react';

import * as ROUTE from '../constants/routes'
import useDidMount from './useDidMount';

const useUsers = () => {
  const [parentList, setParentList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  useEffect(() => {
		(async () => {
      try {
        setLoading(true);
        setError('');
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const requestOptions = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken.token}`
          }
        }
        if (parentList.length === 0 && didMount) {
          const _parents =  await fetch(`${ROUTE.ADMIN_API}/users/parents`, 
            requestOptions)
          .then(res => res.json())
          .then(data =>{
            return data
          })
          .catch(err => console.log(err))
          if (!_parents?.data) {
            if (didMount) {
              setError('No parent found.');
              setLoading(false);
            }
          } else {
            const data = _parents;
            if (didMount) {
              setLoading(false);
              setParentList(data);
            }
          }
        }
      } catch (e) {
        if (didMount) {
          setError('Failed to fetch parents');
          setLoading(false);
        }
      }
    })();
	}, [parentList, didMount]);

  return {
    parentList, isLoading, error
  };
};

export default useUsers;