const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes

app.get('/',(req, res)=>{
    res.render('addTask.ejs');
})

app.get("/specifictask", (req, res) => {
    const data = loadData();
    res.render('task.ejs');
    const searchId = req.query.id;
    let foundTask = null;
    if (searchId) {
        foundTask = tasks.find(task => task.id == searchId);
    }

    res.render("task", { foundTask, searchId });

    console.log(searchId);
});

app.get('/alltasks',(req, res)=>{
    const data = loadData(); // Read data from file
    res.render("tasks.ejs", { records: data });
})

app.post('/success', (req,res)=>{

    const { title, content} = req.body;
    const newData = { title, content };

    const existingData = loadData();
    existingData.push(newData);
    saveData(existingData);

    res.render('Success.ejs')
})

//retrive data from file:
const loadData = () => {
    try {
      return JSON.parse(fs.readFileSync("tasks.json"));
    } catch (error) {
      return [];
    }
};

const saveData = (data) => {
    fs.writeFileSync("tasks.json", JSON.stringify(data, null, 2));
};

app.listen(4000, ()=>{
    console.log("server is running on 4000");
})