import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button,  Card, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey, faMale } from "@fortawesome/free-solid-svg-icons"
// import bcrypt from "bcrypt"



export default class SignUp extends Component {



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

  // handleQuillChange = (e) => {

  //   let entry = e

  //   console.log(entry)

  //   this.setState({ blogPost: { content: entry } });
  // }

  // COUNT HTML WORDS
  // handlePassword = (e) => {

  //  const entry = document.querySelector(".ql-editor").innerHTML

  //  const passWord = e.target.value

  //   console.log(passWord)

  //   const saltRounds = 10

  //   bcrypt.hash(passWord, saltRounds, function(err, hash) {
  //     // Store hash in your password DB.
  //     this.setState({ authors: {...this.state.authors, password: hash } })
  // });
  // }

  

  // ON SUBMIT POST POST TO API
  handleSubmit = async (e) => {
    e.preventDefault();
   

    console.log(this.state.authors)

    try {
      let response = await fetch("http://localhost:3000/authors/login", {
          method: 'POST',
          body: JSON.stringify(this.state.authors),
          headers: {
              'Content-type': 'application/json'
          }
      })
      console.log(response.ok) // the ok property from the fetch() is going to tell you if the operation was successfull
      if (response.ok) {

        console.log(response.data)

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
                    <Form.Label htmlFor="basic-url">Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3" style={{ width: "3rem" }} className="d-flex justify-content-center">
                              <FontAwesomeIcon icon={faMale}/>
                            </InputGroup.Text>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" name="name" value={this.state.authors.name} onChange={e => this.handleChange(e)}/>
                        </InputGroup>

                        <Form.Label htmlFor="basic-url">Surname</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3" style={{ width: "3rem" }} className="d-flex justify-content-center">
                                <FontAwesomeIcon icon={faMale}/>
                            </InputGroup.Text>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" name="surname" value={this.state.authors.surname} onChange={e => this.handleChange(e)} />
                        </InputGroup>
                        <Form.Label htmlFor="basic-url">Email Address</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3" style={{ width: "3rem" }} className="d-flex justify-content-center">
                                @
                            </InputGroup.Text>
                            <FormControl id="basic-url" aria-describedby="basic-addon3"  name="email" value={this.state.authors.email} onChange={e => this.handleChange(e)}/>
                        </InputGroup>
                        <Form.Label htmlFor="basic-url">Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3"  style={{ width: "3rem" }} className="d-flex justify-content-center">
                                <FontAwesomeIcon icon={faKey}/>
                            </InputGroup.Text>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={e => this.handleChange(e)}/>
                        </InputGroup>
                        <Form.Label htmlFor="basic-url">Date of Birth</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3" style={{ width: "3rem" }} className="d-flex justify-content-center">
                                <FontAwesomeIcon icon={faMale}/>
                            </InputGroup.Text>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" type="date"  name="dateOfBirth" value={this.state.authors.dateOfBirth} onChange={e => this.handleChange(e)}/>
                        </InputGroup>
                        <Button variant="dark" tye="submit">
                          SignUp
                        </Button>
                </Form>
            </Card.Body>
            </Card>

      </Container>
    );
  }
}
