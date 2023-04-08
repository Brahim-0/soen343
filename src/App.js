import './App.css';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


function App() {
  const [registerpage, setRegisterpage] = useState(false);

  //function to check the validity of email input
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

 //function to check the validity of names
  function hasNumber(str) {
    return /\d/.test(str);
  }

  //function to check the validity of the date of birth
  function isOver18Years(dateStr) {
    const inputDate = new Date(dateStr);
    const currentDate = new Date();
    const diff = currentDate.getTime() - inputDate.getTime();
    console.log(dateStr=="")
    const diffYears = diff / (1000 * 60 * 60 * 24 * 365.25); // Approximate number of years (leap year is taken into account)
    return diffYears >= 18;
  }

  //function to check the validity of dates
  function IsValidDate(dateStr) {
    const inputDate = new Date(dateStr);
    const currentDate = new Date();
    return inputDate > currentDate;

  }

  //function to check the validity of password
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])[0-9a-zA-Z-+_!@#$%^&*.,?]{8,}$/;
    return passwordRegex.test(password);
  }

  //variable
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');


  //function to handle the submission of the login form
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const login_data = {
      email_address: email,
      user_password: password
    }
    const myArray = JSON.parse(localStorage.getItem('myArray')) || [];
    let bool = false
    myArray.forEach((obj) => {
      if (obj.email_address === login_data.email_address) {
        if (obj.user_password === login_data.user_password) {
          bool = true;
        }
      }
    })
    if (bool) {
      alert("you have successfully logged in")
    } else {
      alert("wrong parameters of authentication")

    }

  };
  //function to handle signup form submission
  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
    const newData = {
      first_name: firstName,
      last_name: lastName,
      location: address,
      birth_date: dateOfBirth,
      email_address: email,
      user_password: password
    };


    // validation
    let alert_message = ""
    if ((newData.first_name === "")
      || (newData.last_name === "")
      || (newData.user_password === "")
      || (newData.location === "")
    ) {
      alert_message += "no empty fields.\n"

    }
    if (hasNumber(newData.first_name)) {
      alert_message += "first name can not a number.\n"
      console.log(alert_message)
    }
    if (hasNumber(newData.last_name)) {
      alert_message += "last name can not a number.\n"
      console.log(alert_message)
    }

    if (IsValidDate(newData.birth_date) || newData.birth_date=="") {
      alert_message += "Incorrect Date.\n"
      console.log(alert_message)
    } else {
      if (!isOver18Years(newData.birth_date)) {
        alert_message += "you must be over 18 years old.\n"
        console.log(alert_message)
      }
    }
    if (!isValidEmail(newData.email_address)) {
      alert_message += "invalid email address.\n"
      console.log(alert_message)
    }
    if (!isValidPassword(newData.user_password)) {
      alert_message += "invalid password.\n " +
        "At least 8 characters long\n" +
        "Contains at least one uppercase letter\n" +
        "Contains at least one lowercase letter\n" +
        "Contains at least one number\n"
      console.log(alert_message)
    }
    if (alert_message === "") {

      alert("successfully registered")
      // Retrieve the existing array from local storage
      const myArray = JSON.parse(localStorage.getItem('myArray')) || [];
      // Add new data to the array
      let bool = false;
      myArray.forEach((obj) => {
        if (obj.email_address === newData.email_address) {
          bool = true
        }
      })
      if (bool === false) {
        myArray.push(newData);
      }


      // Store the updated array back in local storage
      const jsonArray = JSON.stringify(myArray)
      localStorage.setItem('myArray', jsonArray);
      setRegisterpage(false)

    }

    if (alert_message !== "") {
      alert(alert_message)
    }


  };


  return (

    (registerpage !== true) ?
      (<div className="App">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={6}>
              <h1 className="text-center mb-4">Login</h1>
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-3"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Submit
                </Button>
                <h2 style={{cursor: 'pointer'}} variant="red" className="w-100 mt-3" onClick={() => { setRegisterpage(true) }} >
                  Don't have an account? register here
                </h2>


              </Form>
            </Col>
          </Row>
        </Container>
      </div>) :
      (
        <Container style={{ textAlign: 'center' }}>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={8} lg={6}>
              <h1 className="text-center mb-4">Register</h1>
              <Form onSubmit={handleSignUpSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}

                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}

                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}

                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="formBasicDateOfBirth">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}

                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100 mt-3" >
                  Register
                </Button>
                <h2 style={{cursor: 'pointer'}} variant="red" className="w-100 mt-3" onClick={() => { setRegisterpage(false) }} >
                  Already have an account? login here
                </h2>
                <br/>
                <h5>Note: You must be at least 18 years-old to be eligible to apply</h5>


              </Form>
            </Col>
          </Row>
        </Container>)





  );
}

export default App;
