import React,{ useEffect, useState } from 'react';
// import AuthContext from '../context/auth-context'
import NavbarComponent from './navbar/navbar';
import Blog from './blog/blog';

const Homepage=(props)=>
{
  const [blogs, setBlogs]=useState([]);
  const getData=()=>{
    const token=localStorage.getItem("token");
    const requestBody={
      query:`
      query {
        blogs {
          _id
          title
          image
          body
          creator
          created
        }
      }
      `
    }

    fetch("http://localhost:8000/graphql",{
      method:'POST',
      body:JSON.stringify(requestBody),
      headers:{
        'Content-Type':'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      return res.json();
    }).then((res)=>{
      if(res.errors && res.errors[0].message==="Unauthenticated"){
        props.history.push("/");
        // throw new Error("Unauthenticated user");
      }
      console.log(res);
      setBlogs(res.data.blogs);
    }).catch((err)=>{
      console.log(err);
    })

  }
  
  useEffect(()=>{
    getData();
  },[])
  return(
    <>
    <NavbarComponent props={ props } />
    <Blog blogs={ blogs } />
    </>
  )
}

export default Homepage;