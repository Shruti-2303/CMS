import React, { useState } from 'react'
import Base from '../components/Base'
import { Container,Card, CardHeader, CardBody, Form, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap'
import { loginUser } from '../services/user-services'
import { doLogin } from '../auth'
const Login = () => {

  const [loginDetail,setLoginDetail] = useState({
    email : '',
    password:''
  })  

  const handleChange=(event,field)=>{

    let actualValue=event.target.value
    setLoginDetail({
        ...loginDetail,
        [field] : actualValue
    })
  }

  const handleReset = () => {
    setLoginDetail({
        email: '',
        password: ''
    });
  };

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if(loginDetail.email.trim() == '' || loginDetail.password.trim() == ''){
        toast.error("Email or Password is required !!")
        return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail).then((data)=>{
    
        console.log(data)

        //save the data to localstorage
        doLogin(data,()=>{
            console.log("login detail is saved to localstorage")
        })
    }).catch(error=>{
        console.log(error)
        toast.error("Something went wrong !!")
    })
  }
  return (
    <Base>
        <Container>
            <Row className='mt-4'>

                <Col sm={{size:6,offset:3}}>
                    <Card color='info' inverse>
                        <CardHeader>

                            <h3>Login Here!!!</h3>

                        </CardHeader>
                        <CardBody>
                            {/* creating form */}

                            <Form onSubmit={handleFormSubmit}>
                                
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type='email' placeholder='Enter here' id='email' value={loginDetail.email} onChange={(e)=>handleChange(e,'email')}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type='password' placeholder='Enter Password' id='password' value={loginDetail.password} onChange={(e)=>handleChange(e,'password')}/>
                                </FormGroup>
                                
                                <Container className='text-center'>
                                    <Button outline color='light'>Login</Button>
                                    <Button color='danger' type='reset' className='ms-2' onClick={handleReset}>Reset</Button>
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

export default Login