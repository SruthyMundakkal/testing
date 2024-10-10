"use client";

import { useEffect, useState } from 'react';

import { getJSONData } from '@/tools/Toolkit';
import { Orders, Order } from '@/tools/orders.model';

import ClipLoader from "react-spinners/ClipLoader";

export default function OrdersReport({setAppState, appState}: {setAppState:Function, appState:number}) {
    // retrieve server sided script
    const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";
  
    //----------------------------------------private methods
    const getOrders = async () => {
        const data: Orders = await getJSONData(RETRIEVE_SCRIPT, false, true);
        console.log(data);

        // save it in a state variable - because it is used in JSX and needs to persist
        setOrders(data.orders);

        // data all loaded! change app state of web app
        setAppState(3);

    }

    // ---------------------------------------use effects
    useEffect(() => {
        if (appState == 2) getOrders();
    }, [appState]);

    //----------------------------------------state variables
    const [orders, setOrders] = useState<Order[]>([]);

    if (appState == 1) {
        return (<>No orders retrieved...</>);
    } else if ( appState == 2) {
        return (
            <div className="flex flex-col items-center">
                <ClipLoader
                    color="#b82308"
                    loading={true}
                    // cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <p>Loading...</p>
            </div>
        )
    }
    else if ( appState == 3) {
        return (
            <>
                !!! render out orders content here!!
            </>
        )
    }

    
}




