import { useState, useEffect } from 'react';
import { Alert } from 'react-native';


const HookToFetchData = (func) => {


  const [ allFetchedData, setAllFetchedData ] = useState([]);

  const [ isLoading, setIsLoading ] = useState(true);


  const fetchAllData = async () => {

    setIsLoading(true);

    try {

      const res = await func();

      setAllFetchedData(res);

    } catch (error) {

      console.log(error);

      Alert.alert('Error: ', error.message);

    } finally {

      setIsLoading(false);

    }

  };


  useEffect(() => {

    fetchAllData();

  }, []);


  const refetchingAllData = () => fetchAllData();


  return {
    fetchedDataFromTheFunction: allFetchedData,
    isLoading: isLoading,
    refetchAllDataOnPageRefresh: refetchingAllData
  }

};


export default HookToFetchData;
