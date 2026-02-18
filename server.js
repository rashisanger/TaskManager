import express from "express"
import cors from "cors"
const app=express();

app.use(express.json());
app.use(cors());
const tasks = [];
let currId=1;
app.get("/tasks",(req,res)=>{
    const {completed}=req.query;
    if(completed!==undefined){
        const filtered=tasks.filter(task=>task.completed===(completed==="true"));
        return res.json(filtered);
    }
    res.json(tasks);
});

app.get("/tasks/:id",(req,res)=>{
    const Id=req.params.id;
    const task=tasks.find(t=>t.id==Id);
    if(!task){
        return res.status(404).json({message:"Task not found"});
    }
    return res.json(task);
});

app.post('/tasks',(req,res)=>{
    const {title}=req.body;

    if(!title){
        return res.status(400).json({message:"Task title required"});
    }

    const newTask={
        id:currId++,
        title,
        completed:false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);

});

app.put('/tasks/:id',(req,res)=>{
    const Id=req.params.id;

    const task=tasks.find(t=>t.id==Id);
    if(!task){
        return res.status(404).json({message:"Task not found"});
    }
    const {title,completed}=req.body;
    if(title) task.title=title;
    if(completed!==undefined) task.completed=completed;

    res.json(task);
});

app.delete('/tasks/:id',(req,res)=>{
    const Id=req.params.id;
    const index=tasks.findIndex(t=>t.id==Id);

    if(index==-1){
        return res.status(404).json({message:"Task not found"});
    }
    tasks.splice(index,1);
    res.status(204).send();
});
app.listen(3000);


