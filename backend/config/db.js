import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();


export const connectDB = async() => {
    try{

        await mongoose.connect(process.env.DATABASE_URL).then(() => console.log("data base connected"))

    }catch(error){
        console.log(error)
        process.exit


        
    }
}

    
