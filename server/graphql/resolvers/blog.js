const BlogModel=require('../../models/blog');

module.exports={
    blogs:async (args, request)=>{
        if(!request.isAuth){
            console.log("Error");
            throw new Error("Unauthenticated");
        }
        const uid=request.userId;
        return BlogModel.find({ creator:uid })
        .then((blogs)=>{
            console.log(blogs);
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
    }
}