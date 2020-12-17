import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

//he is using useEffect that is why he is using functions

const Register = (props) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null
    });

    const { name, email, password, error } = data

    const handleChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setData({...data, error: null})//before sending a request set the error back to null if not, it will continue displaying
            await axios.post(
                '/auth/register',
                {name, email, password},
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                } 
            );
            props.history.push('/login');
        }  catch (err){
            setData({ ...data, error: err.response.data.error }) //err.response.data.error provided by axios
        }
    }

    
    return (
        <div className="form mt-5">
            <h4 className="text-muted text-center mb-5"> Creat an account</h4>
            <div className="card p-5 shadow ">                
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="name" name="name" value={name} onChange={handleChange}/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" value={email} onChange={handleChange}/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" value={password} onChange={handleChange}/>
                </div>
                {error ? <p className="text-danger">{error}</p> : null}  
                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleSubmit}>Register</button>
                </div>
                <p className="mt-3 text-center">
                    Already a user? <Link to="/login"></Link>
                </p>
            </div>
        </div>
    );
}

export default Register
