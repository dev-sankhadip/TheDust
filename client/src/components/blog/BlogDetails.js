import React from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
// import CheckAuth from '../auth/checkAuth'

class Blog extends React.Component
{

    state={
        blogid:'',
        title:'',
        blogimage:'',
        body:'',
        creator:'',
        created:'',
        userimage:'',
        username:'',
        userid:'',
        isUser:null
    }


    checkAuthentication=()=>
    {
        const uid=localStorage.getItem('uid');
        if(uid==this.state.creator)
        {
            this.setState({ isUser:true })
        }
        else
        {
            this.setState({ isUser:false })
        }
    }

    componentDidMount()
    {
        const { blogid }=this.props.match.params;
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
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(res=>{
            console.log(res);
            const { blogid, title, blogimage, body, creator, created, userimage, username, userid }=res.data.getBlogs;
            this.setState({blogid, title, blogimage, body, creator, created, userimage, username, userid });
            this.checkAuthentication()
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render()
    {
        const { username }=this.state;
        return(
            <React.Fragment>
                <div className="ui main text container segment">
                    <div className="ui header" style={{ }}>
                        {/* <Avatar src={this.state.userimage} size="large" /> */}
                        <Row>
                            <Col span={2}>
                                <img src={ this.state.userimage } style={{ width:40, height:40, borderRadius:50 }} />
                            </Col>
                            <Col span={22}>
                                <Link to={'/'+username} style={{ fontSize:15, fontWeight:'lighter', marginLeft:0, marginTop:0 }}>{ username.charAt(0).toUpperCase()+username.substring(1,username.length) }</Link>
                                <p style={{ fontSize:10, fontWeight:'lighter',marginLeft:0 }}>Posted on { this.state.created }</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="ui top attached">
                        <div className="item">
                            <img className="ui centered rounded image showIm" src={ this.state.blogimage } />
                            <div className="description" style={{ marginTop:15 }}>
                                <p>{ this.state.body }</p>
                            </div>
                        </div>
                        <div style={{ display:this.state.isUser ? 'inline' : 'none' }}>
                            <Button type="primary" style={{ marginTop:5 }}><Link to={'/edit/blog/'+this.state.blogid}>Edit</Link></Button>
                            <Button type="danger" style={{ marginTop:5, marginLeft:5 }}>Delete</Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default Blog;