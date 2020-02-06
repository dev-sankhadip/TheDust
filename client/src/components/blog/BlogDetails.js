import React from 'react'
import { Avatar, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

class Blog extends React.Component
{

    state={
        title:'',
        blogimage:'',
        body:'',
        creator:'',
        created:'',
        userimage:'',
        username:'',
        userid:''
    }

    componentDidMount()
    {
        console.log(this.props.match.params.blogid);
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
            const { title, blogimage, body, creator, created, userimage, username, userid }=res.data.getBlogs;
            this.setState({ title, blogimage, body, creator, created, userimage, username, userid });
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
                <div class="ui main text container segment">
                    <div class="ui header" style={{ }}>
                        {/* <Avatar src={this.state.userimage} size="large" /> */}
                        <Row>
                            <Col span={2}>
                                <img src={ this.state.userimage } style={{ width:40, height:40, borderRadius:50 }} />
                            </Col>
                            <Col span={22}>
                                <Link style={{ fontSize:15, fontWeight:'lighter', marginLeft:0, marginTop:0 }}>{ username.charAt(0).toUpperCase()+username.substring(1,username.length) }</Link>
                                <p style={{ fontSize:10, fontWeight:'lighter',marginLeft:0 }}>Posted on { this.state.created }</p>
                            </Col>
                        </Row>
                    </div>
                    <div class="ui top attached">
                        <div class="item">
                            <img class="ui centered rounded image showIm" src={ this.state.blogimage } />
                            <div class="description" style={{ marginTop:5 }}>
                                <p>{ this.state.body }</p>
                            </div>
                        </div>
                        <a class="ui orange basic button" href="" style={{ marginTop:5 }}>Edit</a>
                        <form class="delete" method="POST" style={{ marginTop:5 }}>
                            <button class="ui red inverted button">DELETE</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default Blog;