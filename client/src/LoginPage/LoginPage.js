import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import sonichr from "assets/img/sonichr.png";
import "./login.css";


function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = { from: { pathname: "/admin/dashboard" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <div className="auth-wrapper">
          
        <div className="auth-inner">
            <form name="formLogin" onSubmit={handleSubmit}>
            <div className="logoApp">
              <img
                src={require("assets/img/sonichr.png").default}
                alt="..."
              /> 
            </div>
                <div className="form-group-loginHR" >
                    
                <label>Username</label> <input type="text" id="InputLogin" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    {submitted && !username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group-loginHR">
                    <label id="labelPass">Password</label>
                    <input type="password" name="password" id="InputLogin" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group-loginHR">
                    <button className="btnS">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Sign-In
                    </button>
                </div>

               <br/>
               <br/>
               
       <p className="forgot-password text-right">
                    Don't have an account ? <a href="/register">Sign-Up ?</a>
                </p>     
                  
            </form>        
</div>
</div>
           
    );
}

export { LoginPage };