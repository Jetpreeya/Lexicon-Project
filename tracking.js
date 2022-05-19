import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Tracking = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://my.api.mockaroo.com/orders.json?key=e49e6840");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                /*If change from false to true the products will not show up*/
                setError()
            }
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                componentMounted = false;
            }
        }
        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                Loading....
            </>
        )
    };

    if (error) {
        return (
            <div className="App">
                <p>Error fetching data </p>
            </div>
        );
    }
    const ShowProducts = () => {
        return (
            <>
                {filter.map((item, id) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4" key={id}>
                                <div className="card h-100 p-4" key={id}>
                                    <div className="card-body">
                                        <ul>
                                            <li key={item.id}>
                                                <h5 className="card-title mb-0">Status : {item.status.substring(0, 12)}</h5>
                                                <p className="card-text">Eta: {item.eta}</p>
                                                <p className="card-parcel">Parcel_id : {item.parcel_id}</p>
                                                <p className="card-sender">Sender name : {item.sender}</p>
                                                <p className="card-verification">Verification_required : {item.verification_required.toString()}</p>
                                                <p className="card-LocationID">Location_id : {item.location_id}</p>
                                                <p className="card-name">Location_name : {item.location_name}</p>
                                                <p className="card-locationLatitude">Location_coordinate_latitude : {item.location_coordinate_latitude}</p>
                                                <p className="card-longitude">location_coordinate_longitude : {item.location_coordinate_longitude}</p>
                                                <p className="card-status">Location_status_ok : {item.location_status_ok.toString()}</p>
                                                <p className="card-phone">User_Phone : {item.user_phone}</p>
                                                <p className="card-Username">User_name : {item.user_name}</p>
                                                <p className="card-Notes">Notes : {item.notes}</p>
                                                <p className="card-Notes">Last_updated : {item.last_updated}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        );

    };

    return (
        <div >
            <div className="container" >
                <div className="row">
                    <div className="text-center">
                        <hr />
                        <h1>Fetch Tracking </h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center" >
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>

        </div>
    )
}

Tracking.propTypes = {
    id: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
}

export default Tracking
