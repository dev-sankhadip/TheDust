const blogResolver=require('./blog');
const indexResolver=require('./index');
const checkAuth=require('./checkAuth');

const rootResolver={
    ...blogResolver,
    ...indexResolver,
    ...checkAuth
}
module.exports=rootResolver;