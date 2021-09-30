import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector,} from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SigninScreen(props){
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const redirect=props.location.search
    ?props.location.search.split('=')[1]
    :'/';

    const userSignin=useSelector((state)=>state.userSignin);
    const {userInfo,loading,error}=userSignin;

    const dispatch=useDispatch();

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history,redirect,userInfo])

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(signin(email,password));
    };

    


    return(
        <div>
            <form className='form' onSubmit={submitHandler}> 
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading&&<LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                    type="email"
                    required
                    class="email"
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div>
                <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    required
                    class="password"
                    placeholder="Enter password"
                    onChange={(e)=>setPassword(e.target.value)}></input>

                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New Here?
                        <Link to={`/register?redirect=${redirect}`}>Register</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
