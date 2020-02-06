import React from 'react';
import { Link } from 'react-router-dom'
import { Spin, Icon } from 'antd';

const Blog=(props)=>
{
    console.log(props);
    const { blogs }=props;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const blogsView=blogs.length>0 ? blogs.map((item, i)=>{
        return(
            <div className="ui main text container mt-4" key={ i }>
                <div className="ui top attached segment">
                    <div className="ui divided items">
                            <div className="item">
                                <div className="image">
                                    <img className="ui rounded image" src={ item.image } alt="pic" />
                                </div>
                                <div className="content">
                                    <Link className="header" to={ '/blog/'+item._id } >{ item.title }</Link>
                                    <div className="meta">
                                        <span>{ item.created.toString() }</span>
                                    </div>
                                    <div className="description">
                                        <p>{ item.body.substring(0,150) }...</p>
                                    </div>
                                    <div className="extra">
                                        <Link className="ui violet basic button readm" to={ '/blog/'+item._id }>
                                            Read More
                                            <i className="right chevron icon iconRead"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }) : <div className="ui main text container mt-4">
            <div className="ui top attached segment">
                <Spin indicator={antIcon} />
            </div>
        </div>
    return(
        <React.Fragment>
            { blogsView }
        </React.Fragment>
    )
}

export default React.memo(Blog);