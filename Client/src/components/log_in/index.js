import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button,  Card, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey } from "@fortawesome/free-solid-svg-icons"



export default class LogIn extends Component {



  constructor(props) {
    super(props);
    this.state = { authors: { 
      name: "",
      surname: "",
      email: "",
      password: "",
      dateOfBirth: "",
      // avatar: "",
     }};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  // ON FORM INPUT CHANGE ASSIGN CHANGE TO STATE


  handleChange = (e) => {
    let nameEntry = e.target.name
    
    this.setState({ authors: {...this.state.authors, [nameEntry]: e.target.value} });

    console.log(this.state.authors)
  }
  

  // ON SUBMIT POST POST TO API
  handleSubmit = async (e) => {
    e.preventDefault();
   

    console.log(this.state.authors)

    try {
      let response = await fetch("http://localhost:3000/authors/me", {
          method: 'POST',
          body: JSON.stringify(this.state.authors),
          headers: {
              'Content-type': 'application/json'
          }
      })
      console.log(response) // the ok property from the fetch() is going to tell you if the operation was successfull
      if (response.ok) {

        const userLogged = await response.json()

        console.log(userLogged)

          this.setState({ authors: { 
            name: "",
            surname: "",
            email: "",
            password: "",
            dateOfBirth: "",
            // avatar: "",
           }})
          alert('Success! You are logged in.');
      } else {
          // this is going to catch a server problem
          // i.e: server is down, db has a problem
          alert('Houston we had a problem, try again!')
      }
  } catch (error) {
      // if we fall here it means we don't have connection
      // or maybe the url is not quite right
      console.log(error)
  }

    
}



  render() {
    return (
      <Container style={{ height: '70vh' }} className="d-flex align-items-center justify-content-center">
          <Card style={{ width: '30rem' }}>
            <Card.Body className="">
                <Form className="flex-row justify-content-center">
                    <Form.Label htmlFor="basic-url">Email Address or Username</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                            @
                            </InputGroup.Text>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={e => this.handleChange(e)} name="email"/>
                        </InputGroup>

                        <Form.Label htmlFor="basic-url">Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                                <FontAwesomeIcon icon={faKey}/>
                            </InputGroup.Text>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={e => this.handleChange(e)} name="password"/>
                        </InputGroup>
                        <Button variant="dark" tye="submit" onClick={e => this.handleSubmit(e)}>
                          Log In
                        </Button>
                </Form>
            </Card.Body>
            </Card>

      </Container>
    );
  }
}
