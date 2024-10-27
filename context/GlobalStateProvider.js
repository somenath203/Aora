import { createContext, useContext, useState, useEffect } from "react";

import { getCurrentLoggedInUserDetails } from "../appwrite-config";


const GlobalContext = createContext();


export const useGlobalContext = () => useContext(GlobalContext);


export const GlobalContextProvider = ({ children }) => {


    const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false);

    const [ loggedInUserDetails, setLoggedInUserDetails ] = useState(null);

    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(() => {

        getCurrentLoggedInUserDetails().then((res) => {

            if(res) {

                setIsUserLoggedIn(true);

                setLoggedInUserDetails(res);

            } else {

                setIsUserLoggedIn(false);

                setLoggedInUserDetails(null);

            }

        }).catch((error) => {

            console.log(error);
            
        }).finally(() => {

            setIsLoading(false);

        });

    }, []);
    

    return <GlobalContext.Provider
        value={{
            isUserLoggedIn,
            setIsUserLoggedIn,
            loggedInUserDetails,
            setLoggedInUserDetails,
            isLoading
        }}
    >

        {children}

    </GlobalContext.Provider>

}

