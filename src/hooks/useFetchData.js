import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData(params = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather',
            {
                params : params
            }
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (params !== null) {
        fetchData();
    }
  }, [params]);

  return { data, isLoading, error };
}

export default useFetchData;
