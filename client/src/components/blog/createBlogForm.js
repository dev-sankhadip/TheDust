import React,{ useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'


const CreateBlogForm=(props)=>
{
    const [ title, setTitle ]=useState('');
    const [ imageUrl, setImageUrl ]=useState('');
    const [ blogBody, setBlogBody ]=useState('');
    const [ isUpdate, setIsUpdate ]=useState(false);
    const [ blogId, setBlogId ]=useState('');

    //set all the current value
    const handleChange=(e, setter)=>{
        setter(e.target.value);
    }

    useEffect(()=>
    {
        if(props.match.path.search("/edit/blog/")>-1)
        {
            const { blogid }=props.match.params;
            setIsUpdate(true);
            setBlogId(blogid);
            let requestBody = {
                query: `
                  query {
                    getBlogs(blogid: "${blogid}") {
                        blogid
                        title
                        blogimage
                        body
                        creator
                        created
                        userimage
                        username
                        userid
                    }
                  }
                `
            };
            fetch('http://localhost:8000/graphql',{
                method:"POST",
                body:JSON.stringify(requestBody),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then((res)=>{ return res.json(); })
            .then((res)=>{
                const { title, blogimage, body }=res.data.getBlogs;
                setTitle(title);
                setImageUrl(blogimage);
                setBlogBody(body);
            })
            .catch((err)=>{ console.log(err); })
        }
    },[])


    const updateBlog=()=>
    {
        
    }

    //upload blog details to server
    const upload=(e)=>{
        e.preventDefault();
        const token=localStorage.getItem("token");
        const requestBody={
            query:`
            mutation {
                createBlog(blogInput:{ title: "${title}", image:"${imageUrl}", body:"${blogBody}" }) {
                    title
                }
            }
            `
        }

        fetch('http://localhost:8000/graphql',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=>{ return res.json(); })
        .then((res)=>{
            console.log(res);
            if(res.errors && res.errors[0].message==="Unauthenticated"){
                //if unauthenticated then redirect to login page
                props.history.push("/");
            }

            //else redirect user to home route to see created blogs
            props.history.push("/home");
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
        <div className="ui main text container segment mt-5">
            <div className="ui huge header">NEW BLOG</div>
            <form className="ui form" onSubmit={ upload }>
                <div className="field">
                    <label>Title</label>
                    <input type="text" value={title} placeholder="title" onChange={(e)=>{handleChange(e, setTitle)}} required/>
                </div>
                <div className="field">
                    <label>Image</label>
                    <input type="text" value={imageUrl} placeholder="image" onChange={(e)=>{ handleChange(e, setImageUrl) }} />
                </div>
                <div className="field">
                        <label>Blog Content</label>
                        <textarea required value={blogBody} onChange={(e)=>{ handleChange(e, setBlogBody) }}></textarea>
                </div>
                {/* <input className="ui violet inverted button" type="submit"/> */}
                { isUpdate ? <Button type="primary" onClick={ updateBlog }>Update</Button> : <Button type="primary">Submit</Button> }
            </form>
        </div>
        </>
    )
}

export default withRouter(CreateBlogForm);