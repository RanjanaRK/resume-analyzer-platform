import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({});

const ResumeModel = mongoose.model("Resume", resumeSchema);

export default resumeSchema;
