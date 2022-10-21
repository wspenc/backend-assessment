const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getGoals, deleteGoals, createGoals, updateGoals } = require('./controller')

app.get("/api/compliment", getCompliment);

app.get("/api/fortune", getFortune);


app.get('/api/goals', getGoals)
app.delete('/api/goals/:id', deleteGoals)
app.post('/api/goals', createGoals)
app.put('/api/goals/:id', updateGoals)
app.listen(4000, () => console.log("Server running on 4000"));
