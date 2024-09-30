import CatchAsync from "../utils/CatchAsync.js"
export const authorizeAdmin = CatchAsync(async (req, res, next) => {
try{
    if (req.user && req.user){
        next()
    }else{
        res.status(404).send("you are not authorized as an admin")
    }

    
}catch (error){
    console.log(error)

}

})