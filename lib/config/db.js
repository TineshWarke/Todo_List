import mongoose from "mongoose"

export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://tineshwarke2000:DynaMight@cluster0.dh7sl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB Connected');
    } catch (error) {
        console.log('Error:', error);
    }
}