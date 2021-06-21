const express = require('express');
const app = express();

const Joi = require('joi');
const { schema } = require('joi/lib/types/object');


app.use(express.json());
app.use(express.static(__dirname+'/html-css/Strona 2/'))


// GET

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/html-css/Strona 2/index.html');
});

const courses = [
    { id:1, name:"course1" },
    { id:2, name:"course2" },
    { id:3, name:"course3" }
];

app.get('/api/courses', (req,res)=>{
    res.send(courses);
})

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)
       return res.status(404).send("Course with the given ID was not found.");
    res.send(course);
})

// POST

app.post('/api/courses',(req,res)=>{
    const { error } = validateCourse(req.body);
    if(error)
        return res.status(400).send(error);
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

// PUT

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)
        return res.status(404).send("Course with the given ID doesn't exist");
    const { error } = validateCourse(req.body);
    if(error)
       return res.status(400).send(error);
    course.name = req.body.name;
    res.send(course);
})

// DELETE

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)
        return res.status(404).send("Course with the given ID doesn't exist");
    const index = courses.indexOf(course);
    res.send(courses.splice(index,1));
})

// FUNCTIONS

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port,"localhost",()=>{
    console.log(`Listening on port ${port}...`);
});