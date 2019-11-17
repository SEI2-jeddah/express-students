const express = require('express')
const router = express.Router()
let students = require('../../studentsData')
const uuid = require('uuid')
const Students = require("../../models/Student").Student
// get all students 
router.get('/' , (req , res) =>{
   
    Students.find()
    .then(data =>{
        res.render('index' , {students : data})
    })
})

// get singale student
router.get("/:id" ,(req , res) =>{
    let flag = students.some(student => student.id == req.params.id)
 
    if (flag){
        let student = students.filter(student =>{
       
            return student.id == req.params.id
    })
        res.render("show" ,{student :student })
    }else{
        res.status(400).json({msg : "id not found"})
    }
       

})
// create student
router.post('/' , (req , res) =>{

    newStudent = {
        // id : uuid.v4(),
        name : req.body.name,
        email:req.body.email
    }
    if (req.body.name && req.body.email ){
      

        var student = new Students(newStudent)
        student.save()
        .then(data =>{
            res.send({msg : "added "})
        }).catch(err => console.log(err))
    }
    else {
        res.status(400).json({msg : "enter your email or name"})
    }
   
})

// update student 
router.put('/:id' , (req , res) =>{
    let flag = students.some(student => student.id == req.params.id)

    if (flag){
       let studentUpdate = {
            name : req.body.name, 
            email : req.body.email
       }
       students.forEach(student => {

        if (student.id == req.params.id){
            student.name = studentUpdate.name ?  studentUpdate.name : student.name
            student.email = studentUpdate.email ? studentUpdate.email :student.email

            res.send({msg: "student updated" , student})
        }

           
       });

   
    }else{
        res.status(400).json({msg : "your id not exist" })

    }
})
// delete 
router.delete('/:id' ,(req , res)=>{

    let flag = students.some(student => student.id == req.params.id)
 
    if (flag){
         students = students.filter(student =>{
       
            return student.id != req.params.id
    })
        res.json({ msg: "studen deletef" , students})
    }else{
        res.status(400).json({msg : "id not found"})
    }
       
})

module.exports = router