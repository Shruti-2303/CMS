import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Container,Card, CardHeader, CardBody, Form, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap'
import { signUp } from '../services/user-services'
import { toast } from 'react-toastify';
const Signup = () => {

    const [data,setData] = useState({
        name : '',
        contactNumber : '',
        email : '',
        password : ''

    })

    const [error,setError] = useState({
        errors : {},
        isError : false
    })
    const handleChange=(event,property)=>{
        setData({...data,[property]: event.target.value})
    }
    //resetting the data
    const resetData=()=>{
        setData({
            name : '',
            contactNumber : '',
            email : '',
            password : ''
        })
    }

    //submit the form
    const submitForm=(event)=>{
        event.preventDefault()
        if(error.isError){
            toast.error("Form data is invalid !!")
            return
        }
        console.log(data);
        //data validation

        //call server api for sending data
        signUp(data).then((resp)=>{
            console.log(resp)
            console.log("success log")
            toast.success("User is successfully registered!!")
            setData({
                name : '',
                contactNumber : '',
                email : '',
                password : ''
            })
        }).catch((error)=>{
            console.log(error)
            console.log("Error log")

            //handle errors properly
            setError({
                errors : error,
                isError : true
            })
        })
    }
  return (
    <Base>
        <Container>
            <Row className='mt-4'>

                <Col sm={{size:6,offset:3}}>
                    <Card color='info' inverse>
                        <CardHeader>

                            <h3>Fill Information to Register!!!</h3>

                        </CardHeader>
                        <CardBody>
                            {/* creating form */}

                            <Form onSubmit={submitForm}>
                                {/* Name Field */}

                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input 
                                        type='text' 
                                        placeholder='Enter here' 
                                        id='name' 
                                        onChange={(e)=>handleChange(e,'name')} 
                                        value={data.name} 
                                        required
                                        minLength={2}
                                    />
                                </FormGroup>

                                {/* Contact Field */}

                                <FormGroup>
                                    <Label for="contactNumber">Contact Number</Label>
                                    <Input type='tel' placeholder='Enter here' id='contactNumber' onChange={(e)=>handleChange(e,'contactNumber')} value={data.contactNumber} required minLength={10} maxLength={10}/>
                                </FormGroup>

                                {/* Email Field */}

                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type='email' placeholder='Enter here' id='email' onChange={(e)=>handleChange(e,'email')} value={data.email} required/>
                                </FormGroup>

                                {/* Password Field */}

                                <FormGroup>
                                    <Label for="pass">Password</Label>
                                    <Input type='password' placeholder='Enter Password' id='pass' onChange={(e)=>handleChange(e,'password')} value={data.password} required/>
                                </FormGroup>
                                

                                <Container className='text-center'>
                                    <Button outline color='light'>Signup</Button>
                                    <Button color='danger' type='reset' className='ms-2' onClick={resetData}>Reset</Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </Base>
  )
}

export default Signup