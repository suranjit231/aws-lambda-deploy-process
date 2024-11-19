
//==================  this code is working correctly =============================//

// module.exports.hello = async (event) => {
//     const response = {
//         statusCode: 200, 
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//             message: "Hello, Serverless!",
//             input: event,
//         }),
//     };

//     return response;
// };

//===================== testing parts 1 The above code is woring correctly ===========================//







// =============== testing parts 2 the following code is working correctly ==========================//

// module.exports.hello = async (event) => {
//     // Extract name and age from the query string parameters
//     const { name, age } = event.queryStringParameters;

//     // Create a response message based on the extracted parameters
//     const responseMessage = name && age 
//         ? `Hello, ${name}! You are ${age} years old.` 
//         : "Hello, Serverless!";

//     // Build the response object
//     const response = {
//         statusCode: 200,
//         headers: {
//             "Access-Control-Allow-Origin": "*", // Allow CORS
//         },
//         body: JSON.stringify({
//             message: responseMessage,
//             input: event, // Include the full event for debugging purposes
//         }),
//     };

//     return response;
// };





// =============== testing parts 3 start here and avove code is working correctly ==============//



// const mongoose = require("mongoose");
// const ContentCalendarWeekly = require("./models/ContentCalendarWeekly");

import mongoose from "mongoose";
import ContentCalendarWeekly from "./models/ContentCalendarWeekly.js";
import dotenv from "dotenv";
dotenv.config();

//const uri = "used directly mongodb url if dotenv not working";

let isConnected = false;

// Connect to MongoDB Atlas
async function connectToDatabase() {

    const uri = process.env.DB_URL;
    
    if (isConnected) return;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
}

export const addContentCalendarWeeklyDocument = async (event) => {
    await connectToDatabase();
    try {
        const data = JSON.parse(event.body);
        const document = new ContentCalendarWeekly(data);
        await document.save();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Document added successfully", data: document }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export const editContentCalendarWeeklyDocument = async (event) => {
    await connectToDatabase();
    try {
        const { _id, ...updateData } = JSON.parse(event.body);
        const updatedDocument = await ContentCalendarWeekly.findByIdAndUpdate(_id, updateData, { new: true });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Document updated successfully", data: updatedDocument }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export const deleteContentCalendarWeeklyDocument = async (event) => {
    await connectToDatabase();
    try {
        const { id } = event.pathParameters; // Extract ID from path

        const trimmedId = id.trim();  // Ensure no extra spaces or newline characters
        
        console.log("id to delete the document: ", trimmedId);

        const deletedDoc = await ContentCalendarWeekly.deleteOne({_id:trimmedId});

        console.log("deleted docs: ", deletedDoc);
        if (!deletedDoc) {
            return { statusCode: 404, body: JSON.stringify({ message: "Document not found" }) };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Document deleted successfully" }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export const fetchContentCalendarWeeklyDocument = async (event) => {
    await connectToDatabase();
    try {
        const { theme, primary_archetype, secondary_archetype } = event.queryStringParameters;
        const documents = await ContentCalendarWeekly.find({ theme, primary_archetype, secondary_archetype });
        return {
            statusCode: 200,
            body: JSON.stringify({ data: documents }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export const fetchAllContentCalendarWeeklyDocuments = async () => {
    await connectToDatabase();
    try {
        const documents = await ContentCalendarWeekly.find();
        return {
            statusCode: 200,
            body: JSON.stringify({ data: documents }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
