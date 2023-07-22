/* eslint-disable */

import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function checkInput(event) {
  const input = event.target;
  if (input.value !== '') {
    input.classList.add('filled');
  } else {
    input.classList.remove('filled');
  }
}

function App() {

  const [termsAccepted, setTermsAccepted] = useState(false);
  function validatePassword() {
    const passcheck = document.getElementById('pass').value.toString();
    const passcheck1 = document.getElementById('pass1').value.toString();
    
    if (passcheck !== passcheck1) {
      alert('Password is wrong');
    } 
    else {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('pass1').value;
  
      axios.post('http://localhost:3000/register', { name, email, password })
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message); // Display success message
      })
      .catch((error) => {
        console.error(error.response.data.error);
        alert(error.response.data.error); // Display error message
      });
    }
  };
  
  useEffect(() => {
    const wrapper = document.querySelector('.container');
    const loginLink = document.querySelector('.login');
    const registerLink = document.querySelector('.Register');

    registerLink.addEventListener('click', () => {
      wrapper.classList.add('passive');
      wrapper.classList.remove('active');
    });

    loginLink.addEventListener('click', () => {
      wrapper.classList.remove('passive');
      wrapper.classList.add('active');
    });
  }, []);


  const handleRegister = (event) => {
    event.preventDefault();
   if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
    }
    else{
      validatePassword();
    }
    
  };

  return (
    <div className="body">
      <div className="container passive">
        <form className="my-form Registration">
          <div className="header">
            <h1>Sign Up</h1>
          </div>
          <div className="form">
            <span className="material-icons">person</span>
            <input id="name" type="text" required />
            <label>Name</label>
          </div>

          <div className="form">
            <span className="material-icons">email</span>
            <input id="email" type="email" required onInput={checkInput} />
            <label>Email</label>
          </div>

          <div className="form">
            <span className="material-icons">password</span>
            <input id="pass1" type="password" required />
            <label>Password</label>
          </div>

          <div className="form">
            <span className="material-icons">lock</span>
            <input id="pass" type="password" required />
            <label>Confirm Password</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span>I agree with terms &amp; conditions</span>
          </div>
          <br/>
          <div className="btn">
            <button onClick={handleRegister}>Register</button>
          </div>
          <div className="login">
            <p>
              Already registered? <a href="#">Login</a>
            </p>
          </div>
        </form>

        <form className="my-form Login">
          <div className="header">
            <h1>Login</h1>
          </div>

          <div className="form">
            <span className="material-icons">email</span>
            <input type="email" required onInput={checkInput} />
            <label>Email</label>
          </div>

          <div className="form">
            <span className="material-icons">lock</span>
            <input type="password" required />
            <label>Password</label>
          </div>

          <div className="checkbox1">
            <input type="checkbox" />
            <span>
              Remember me <a href="#">Forgot password</a>
            </span>
          </div>
          <br/>
          <div className="btn">
            <button>Login</button>
          </div>

          <div className="Register">
            <p>
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
