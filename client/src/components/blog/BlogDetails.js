import React from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'

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
        isUser:null,
        isReaction:false,
        reactIcon:[
            'like.jpeg',
            'love.png',
            'wow.png',
            'angry.png',
            'sad.png'
        ],
        likeIconURL:'like.png'
    }


    checkAuthentication=()=>
    {
        const uid=localStorage.getItem('uid');
        if(uid===this.state.creator)
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
            return res.json();
        })
        .then(res=>{
            const { blogid, title, blogimage, body, creator, created, userimage, username, userid }=res.data.getBlogs;
            this.setState({blogid, title, blogimage, body, creator, created, userimage, username, userid });
            this.checkAuthentication()
        })
        .catch(err=>{
            console.log(err);
        })
    }

    deleteBlog=()=>
    {
        const { blogid }=this.props.match.params;
        console.log(blogid);
        let requestBody = {
            query: `
              query {
                deleteBlog(blogid: "${blogid}")
              }
            `
        };
        fetch('http://localhost:8000/graphql',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        })
        .then((res)=>{ return res.json() })
        .then((res)=>{
            console.log(res);
            this.props.history.push('/');
        })
        .catch((err)=>
        {
            console.log(err);
            alert("Internal server error");
        })
    }

    showReaction=(e)=>
    {
        e.stopPropagation();
        const audio=document.createElement("audio");
        audio.src="http://localhost:8000/popup.MP3";
        audio.play();
        this.setState({ isReaction:!this.state.isReaction });
    }

    setReaction=(iconURL)=>
    {
        this.setState({ 
            likeIconURL:iconURL 
        },()=>
        {
            this.setState({ isReaction:false })
        })
    }

    render()
    {
        const { username }=this.state;
        const reactIconView=this.state.reactIcon.map((icon)=>
        {
            return(
                <img 
                src={'http://localhost:8000/'+icon} 
                style={{ float:'left', marginTop:5, width:30, height:30, marginLeft:5 }}
                onClick={()=>{ this.setReaction(icon) }}
                />
            )
        })
        return(
            <React.Fragment>
                <div className="ui main text container segment">
                    <div className="ui header" style={{ }}>
                        <Row>
                            <Col span={2}>
                                <Link to={'/'+username}>
                                    <img src={ this.state.userimage } style={{ width:40, height:40, borderRadius:50 }} alt="User" />
                                </Link>
                            </Col>
                            <Col span={22}>
                                <Link to={'/'+username} style={{ fontSize:15, fontWeight:'lighter', marginLeft:0, marginTop:0 }}>{ username.charAt(0).toUpperCase()+username.substring(1,username.length) }</Link>
                                <p style={{ fontSize:10, fontWeight:'lighter',marginLeft:0 }}>Posted on { this.state.created }</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="ui top attached">
                        <div className="item">
                            <img className="ui centered rounded image showIm" src={ this.state.blogimage } alt="Blog" />
                            <div className="description" style={{ marginTop:15 }}>
                                <p>{ this.state.body }</p>
                            </div>
                        </div>
                        <Row>
                            <Col span={16}>
                                <div style={{ display:this.state.isUser ? 'inline' : 'none' }}>
                                    <Button type="primary" style={{ marginTop:5, }}><Link to={'/edit/blog/'+this.state.blogid}>Edit</Link></Button>
                                    <Button type="danger" style={{ marginTop:5, marginLeft:5 }} onClick={ this.deleteBlog }>Delete</Button>
                                </div>
                            </Col>
                            <Col span={8} style={{ display:this.state.isUser ? 'inline' : 'none' }}>
                                <div style={{ display:this.state.isReaction ? 'inline' : 'none' }}>
                                    { reactIconView }
                                    {/* <img src="http://localhost:8000/like.jpeg" style={{ float:'left', marginTop:5, width:30, height:30, marginLeft:5 }} />
                                    <img src="http://localhost:8000/love.png" style={{ float:'left', marginTop:5, width:30, height:30,marginLeft:5 }} />
                                    <img src="http://localhost:8000/angry.png" style={{ float:'left', marginTop:5, width:30, height:30, marginLeft:5 }} />
                                    <img src="http://localhost:8000/wow.png" style={{ float:'left', marginTop:5, width:30, height:30, marginLeft:5 }} />
                                    <img src="http://localhost:8000/sad.png" style={{ float:'left', marginTop:5, width:30, height:30, marginLeft:5 }} /> */}
                                </div>
                                <div style={{ marginLeft:10 }} onClick={ this.showReaction }>
                                    <img style={{ float:'right', marginTop:5, width:30, height:30 }} 
                                    src={"http://localhost:8000/"+this.state.likeIconURL}
                                    id="reaction"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default Blog;