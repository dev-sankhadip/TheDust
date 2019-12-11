module.exports={
    checkAuth: async (args, request)=>{
        if(!request.isAuth){
            throw new Error("Unauthenticated");
        }
        return "Authenticated";
    }
}