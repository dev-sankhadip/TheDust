const BlogModel=require('../../models/blog');
const UserModel=require('../../models/user');


module.exports={
    blogs:async (args, request)=>{
        if(!request.isAuth){
            console.log("Error");
            throw new Error("Unauthenticated");
        }
        const uid=request.userId;
        return BlogModel.find({ creator:uid })
        .then((blogs)=>{
            return blogs.map(blog=>{
                return {...blog._doc, _id:blog.id};
            })
        }).catch((err)=>{
            console.log(err);
        })
    },
    createBlog: async (args, request)=>{
        if(!request.isAuth){
            console.log("Authentication Error!");
            throw new Error("Unauthenticated");
        }
        const uid=request.userId;
        const blog=new BlogModel({
            title:args.blogInput.title,
            image:args.blogInput.image,
            body:args.blogInput.body,
            creator:uid,
            created:new Date().toDateString()
        })
        const result=await blog.save();
        console.log(result);
        return {...result._doc};
    },
    getAllBlogs: async (args, request)=>{
        return BlogModel.find()
        .then((blogs)=>{
            console.log(blogs);
            return blogs.map(blog=>{
                return {...blog._doc, _id:blog.id};
            })
        }).catch((err)=>{
            console.log(err);
        })
    },
    getBlogs: async (args, request)=>{
        console.log(args);
        return BlogModel.findById(args.blogid)
        .then((blog)=>
        {
            console.log(blog);
            return UserModel.findById(blog.creator)
            .then((user)=>
            {
                const { _id:blogid, title, image:blogimage, body, creator, created }=blog;
                const { _id:userid, username, image:userimage }=user;
                let data={};
                data.blogid=blogid;
                data.title=title;
                data.blogimage=blogimage;
                data.body=body;
                data.creator=creator;
                data.created=created;
                data.username=username;
                data.userimage=userimage;
                data.userid=userid;
                return {...data};
            })
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
}