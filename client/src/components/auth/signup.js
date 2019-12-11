import React,{ useState } from 'react';
import { Form, Button } from 'react-bootstrap'

const Signup=()=>
{
    const [ email, setEmail ]=useState('');
    const [ password, setPassword ]=useState('');

    const setInfo=(e, setter)=>
    {
        setter(e.target.value);
    }

    const submit=(e)=>
    {
        e.preventDefault();
        let requestBody = {
            query: `
              mutation {
                createUser(userInput: {email: "${email}", password: "${password}"}) {
                  _id
                  email
                }
              }    
            `
        };

        fetch('http://localhost:3002/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>
        {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then((res)=>
        {
            console.log(res);
            if(res.errors){
                alert('Already registered');
            }
            else{
                alert("User registered");
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("Error");
        })
    }

    return(
        <React.Fragment>
            <Form onSubmit={submit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{ setInfo(e, setEmail) }} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{ setInfo(e, setPassword) }} />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
        </React.Fragment>
    )
}

export default Signup;
