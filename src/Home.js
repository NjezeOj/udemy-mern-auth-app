import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

//he is using useEffect that is why he is using functions

const Home = (props) => {
    const [user, setUser] = useState({});

    const getUser = async () => {
        const res = await axios.get("/auth", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setUser(res.data)
    } 

    //we want to call getUser to setUser whenever the component mounts
    useEffect(() => {
        getUser();
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        props.history.push('/login')
    }

    if(!localStorage.getItem('token')){
        props.history.push('/login')
    }
    
    return (
        <div className="m-5">
            <div className="jumbotrun">
                <p className="lead">Welcome {user.name}</p>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
        </div>    
    );
}

export default Home;
