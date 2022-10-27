const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, createExercise, deleteExercise, addRep } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.post("/api/create", createExercise);
app.delete("/api/delete/:id", deleteExercise);
app.put("/api/add/", addRep)
app.listen(4000, () => console.log("Server running on 4000"));

