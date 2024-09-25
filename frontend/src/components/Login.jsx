import React, { useState } from 'react';
import loginLogo from '../assets/learnPy.png'
import nlpLogo from '../assets/nlp-logo.jpeg'
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import '../styles/login.scss'
import { useNavigate } from 'react-router-dom';

function Login({onClick}) {
    const [login, setLogin] = useState(false)
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/dashboard'); 
    };
    
  return (
    <div className='loginPage flex'>
        <div className='container flex'>
            <div className='videoDiv'>
                <img className='img2' src={loginLogo} alt="login logo" />
                <div className='textDiv'>
                    <h2 className='title'>The Future of Python Learning! </h2>
                </div>
                <div className='footerDiv flex'>
                    {login ? <span className='text'> Already have an account?</span> : <span className='text'> Don't have an account?</span>}
                    {login ? <button className='btn'> Log In </button>  : <button className='btn'> Sign Up</button>}
                </div>
            </div>

            <div className='formDiv flex'>
                <div className='headerDiv'>
                    <img src={nlpLogo} alt="login logo 2" />
                    <h3>Welcome Back!</h3>

                    
                    <form className='form grid'>
                        <div className='inputDiv'>
                            <label htmlFor='username'>Username</label>
                            <div className='input flex'>
                                <FaUserShield className='icon'/>
                                <input type='text' id='username' placeholder='Enter Username'/>
                            </div>
                        </div>

                        <div className='inputDiv'>
                            <label htmlFor='password'>Password</label>
                            <div className='input flex'>
                                <BsFillShieldLockFill className='icon'/>
                                <input type='password' id='password' placeholder='Enter Password'/>
                            </div>
                        </div>

                        <button onClick={handleLoginClick} type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon'/>
                        </button>

                        <span className='forgotPassword'>
                            Forgot Password? <a href=''>Click Here</a>
                        </span>
                  </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Login