const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: { type: String, required: true, text: true },
  description: { type: String },
  languages: { type: String },
  link: { type: String, required: true },
  image: { type: String, default: "" },
  authorId: { type: Schema.ObjectId, ref: "User" } // Pode ser trocado para um array de ObjectId (+ de 1 colaborador)
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
