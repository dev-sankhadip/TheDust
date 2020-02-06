import React, { Component } from 'react';
import './Auth.css';
import { Input, Typography, Button } from 'antd'


class Register extends Component {
  state = {
    isLogin: true,
    image:'',
    fname:'',
    lname:'',
    username:'',
    dpas:'',
    birthDate:'',
    email:'',
    password:''
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  updateInfo=(e)=>{
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]:e.target.value })
  }

  submitHandler = event => {
    event.preventDefault();

    const { fname, lname,username,image, dpas, birthDate, password, email }=this.state;
    if(dpas!==password){
        return;
    }

    let requestBody = {
        query: `
          mutation {
            createUser(userInput: { fname:"${fname}", lname:"${lname}", username:"${username}", email: "${email}", password: "${password}",birthDate:"${birthDate}", image:"${image}"}) {
              fname
            }
          }
        `
    };
    
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
    })
    .then(resData => {
        console.log(resData);
        if(resData.data.createUser){
          alert("Registered");
        }else{
          alert("Error");
        }
      })
      .catch(err => {
        alert("Error");
        console.log(err);
      });
  };

  uploadFile=async (e)=>{
    const convertTobase64=(file)=>{
      return new Promise((resolve, reject)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function()
        {
          resolve(reader.result);
        }
        reader.onerror=function()
        {
          reject("Error");
        }
      })
    }

    convertTobase64(e.target.files[0])
    .then((res)=>{
      this.setState({ image:res })
    })
  }

  render() {
    return (
      <>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <Typography.Title level={3} underline={true} type="secondary">Signup</Typography.Title>
          <div style={{ marginTop:10 }}>
            <Input placeholder="Your first name" required onChange={ this.updateInfo } name="fname" />
          </div>
          <div style={{ marginTop:10 }}>
            <Input placeholder="Your Last name" required onChange={ this.updateInfo } name="lname" />
          </div>
          <div style={{ marginTop:10 }}>
            <Input placeholder="Your Username" required onChange={ this.updateInfo } name="username" />
          </div>
          <div style={{ marginTop:10 }}>
            <Input placeholder="Your Email" required onChange={this.updateInfo} name="email" />
          </div>

          <div style={{ marginTop:10 }}>
            <Input placeholder="Your Password" required onChange={this.updateInfo} name="password" required />
          </div>

          <div style={{ marginTop:10 }}>
            <Input placeholder="Confirm Password" required onChange={ this.updateInfo } name="dpas" />
          </div>
          
          <div className="custom-file" style={{ marginTop:10 }}>
              <input type="file" className="custom-file-input" id="customFile" onChange={ this.uploadFile } required />
              <label className="custom-file-label" htmlFor="customFile">Choose file</label>
          </div>
          <div className="form-control mt-2">
            <label htmlFor="bday"></label>
            <input type="date" id="bday" name="birthDate" required onChange={this.updateInfo} />
          </div>
          <div style={{ marginTop:10 }}>
            <Button type="primary" onClick={ this.submitHandler }>Signup</Button>
          </div>
        </form>
      </>
    );
  }
}

export default Register;