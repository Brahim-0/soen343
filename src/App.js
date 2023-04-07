import './App.css';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';



const LoginPage = (registerPage) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here

  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="mb-3"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
            <Button variant="red" type="submit" className="w-100 mt-3" onClick={() => registerPage = true}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


const RegisterPage = (registerPage) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-4">Register</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
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
                    onChange={handleLastNameChange}
                    required
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
                onChange={handleAddressChange}
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formBasicDateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

function App() {
  const [registerpage, setRegisterpage] = useState(false);


  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');



  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const login_data = {
      email_address: email,
      user_password: password    }
    const myArray = JSON.parse(localStorage.getItem('myArray')) || [];
    let bool = false 
    myArray.forEach((obj)=>{
      if(obj.email_address === login_data.email_address){
        if(obj.user_password === login_data.user_password){
          bool = true;
        }
      }
    })
    if(bool){
      alert("you have successfully logged in")
    }else{
      alert("wrong parameters of authentication")
 
    }
    
  };
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
    // Retrieve the existing array from local storage
    const myArray = JSON.parse(localStorage.getItem('myArray')) || [];
    console.log(myArray)
    // Add new data to the array
    let bool = false;
    myArray.forEach((obj)=>{
      if (obj.email_address===newData.email_address){
        bool = true
      }
    })
    if (bool===false){
      myArray.push(newData);
    }


    // Store the updated array back in local storage
    const jsonArray = JSON.stringify(myArray)
    localStorage.setItem('myArray', jsonArray);
    console.log(JSON.stringify(myArray))

  };
  // const data = localStorage.getItem('data');
  // const jsonData = JSON.stringify(data);
  // console.log(jsonData);
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
                <Button variant="red" type="submit" className="w-100 mt-3" onClick={() => { setRegisterpage(true) }} >
                  Register
                </Button>
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
                        required
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
                        required
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
                    required
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
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>)





  );
}

export default App;
