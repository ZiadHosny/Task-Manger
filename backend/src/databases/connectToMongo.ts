import mongoose from "mongoose";
import { getFromEnv } from "../utils/getFromEnv.js";

export const connectToMongoDb = async () => {

    const { mongoDBUrl } = getFromEnv()

    try {
        await mongoose.connect(mongoDBUrl)
        console.log(`Connect To Mongo DB Successfully`)
    } catch (err) {
        console.log('Error when connect to Mongo DB')
        console.log(err)
    }
}