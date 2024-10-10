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
                <div className="flex flex-col">
                    {/* !!! render out orders content here! */}
                    {orders.map((order) => (
                        <div key={order.id} className="order bg-gray-100 p-4 rounded-md mb-4">
                        <div><strong>Order #{order.id}:</strong></div>
                        <div><i className="fas fa-info-circle"></i><strong> Customer Information:</strong></div>
                        <div>{order.name}</div>
                        <div>{order.address}, {order.city}</div>
                        <div><i className="fas fa-pizza-slice"></i><strong> Pizza Size:</strong></div>
                        <div>{order.size}</div>
                        <div><strong>Order Details:</strong></div>
                        <div>{order.toppings.map(item => item.topping).join(", ")}</div>
                        <div><strong>Order Notes:</strong> </div>
                        <div>{order.notes.map(item => item.note).join(", ")}</div>
                    </div>
                    ))}
                    {/* <div className="id"></div>
                    <div><i className="fas fa-info-circle"></i> Customer Information</div>
                    <div><i className="fas fa-pizza-slice"></i> Pizza Size</div>
                    <div><i className="fas fa-list-ul"></i>Order Details</div>
                    <div><i className="fas fa-sticky-note"></i>Order Notes</div> */}
                </div>
            
        )
    }

    
}




