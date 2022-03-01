'use strict';
//here we will create all the crud requests 
//-----------------------------------------


const express = require('express');
const {food} = require('../models/index.js');// get the model from the export in index.js
const router = express.Router(); //get method router 


// Routes
router.get('/food',getfood);
router.post('/food',createfood);
router.get('/food/:id',getOnefood);
router.delete('/food/:id',deletefood);
router.put('/food/:id',updatedfood);
// localhost:3000/food
async function getfood(req,res) {
    let allfood = await food.findAll();//get model that we impot it from index.js
    res.status(200).json(allfood);
}

// localhost:3000/food (body:{firstName:'razan',lastName:'quran'})
async function createfood(req,res) {
    let newfood = req.body;//that we will add it from postman
    let postfood = await food.create(newfood);//let new inside this var(imagin it like new row)
    res.status(201).json(postfood);
}

// localhost:3000/food/2 
async function getOnefood(req,res) {
    let id = parseInt(req.params.id);
    let specificfood = await food.findOne({where:{id:id}})//finde specific food using id 
    res.json(specificfood);
}

async function deletefood(req,res){
  let deleteId = parseInt(req.params.id);
  let deletedfood = await food.destroy({where:{id:deleteId}});
  res.status(204).json(deletedfood);
}

async function updatedfood(req,res){
  let id = req.params.id; 
  let body =req.body;
  let foodWanted = await food.findOne({where:{id:id}});
     const Updatedfood = await foodWanted.update(body);
     res.status(201).json(Updatedfood);
 }
module.exports = router;