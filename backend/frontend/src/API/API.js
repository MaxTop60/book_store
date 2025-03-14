import React, { useEffect, useState } from "react";

import axios from 'axios';

const Api = () => {
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get("http://127.0.0.1:8000/")
                .then(res => {
                    setDetails(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        }

        fetchData();
        console.log(`details: ${details}`);

        console.log(`BooksList complete`);
    }, [])

    return details;
}


export default Api;
