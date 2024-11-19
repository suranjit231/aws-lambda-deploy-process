// //const mongoose = require("mongoose");

// import mongoose from "mongoose";

// const weekSchema = new mongoose.Schema({
//     day: String,
//     theme: String,
//     post: {
//         idea: String,
//         canva_instructions: [String],
//         prompts: [
//             {
//                 type: { type: String },
//                 prompt: String,
//             },
//         ],
//     },
// });

// const contentCalendarWeeklySchema = new mongoose.Schema({
//     theme: { type: String, required: true },
//     primary_archetype: { type: String, required: true },
//     secondary_archetype: { type: String, required: true },
//     week_number: { type: Number, required: true },
//     category: String,
//     subcategory: String,
//     week: [weekSchema], // Array of week objects
// });


// const ContentCalendarWeekly = mongoose.model("ContentCalendarWeekly", contentCalendarWeeklySchema);

// export default ContentCalendarWeekly;

// //module.exports = mongoose.model("ContentCalendarWeekly", contentCalendarWeeklySchema);




























import mongoose from "mongoose";

const contentCalendarWeeklySchema = new mongoose.Schema({
    theme: { type: String, required: true },
    primary_archetype: { type: String, required: true },
    secondary_archetype: { type: String, required: true },
    week_number: { type: Number, required: true },
    category: String,
    subcategory: String,
    week: [
        {
            _id: false,
            day: String,
            theme: String,
            post: {
                _id: false,
                idea: String,
                canva_instructions: [String],
                prompts: [
                    {
                        _id: false,
                        type: { type: String },
                        prompt: String,
                    },
                ],
            },
        },
    ], // Direct array of objects
});

const ContentCalendarWeekly = mongoose.model(
    "ContentCalendarWeekly",
    contentCalendarWeeklySchema
);

export default ContentCalendarWeekly;






