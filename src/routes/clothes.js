'use strict';
//here we will create all the crud requests 
//-----------------------------------------


const express = require('express');
const {clothes} = require('../models/index.js');// get the model from the export in index.js
const router = express.Router(); //get method router 


// Routes
router.get('/clothes',getclothes);
router.post('/clothes',createclothes);
router.get('/clothes/:id',getOneclothes);
router.delete('/clothes/:id',deleteClothe);
router.put('/clothes/:id',updatedClothe)


// localhost:3000/clothes
async function getclothes(req,res) {
    let allclothes = await clothes.findAll();//get model that we impot it from index.js
    res.status(200).json(allclothes);
}

// localhost:3000/clothes (body:{firstName:'razan',lastName:'quran'})
async function createclothes(req,res) {
    let newclothes = req.body;//that we will add it from postman
    let postClothes = await clothes.create(newclothes);//let new inside this var(imagin it like new row)
    res.status(201).json(postClothes);
}

// localhost:3000/clothes/2 
async function getOneclothes(req,res) {
    let id = parseInt(req.params.id);
    let specificClothes = await clothes.findOne({where:{id:id}})//finde specific clothes using id 
    res.json(specificClothes);
}

async function deleteClothe(req,res){
  let deleteId = parseInt(req.params.id);
  let deletedClothe = await clothes.destroy({where:{id:deleteId}});
  res.status(204).json(deletedClothe);
}

async function updatedClothe(req,res){
  let id = req.params.id; 
  let body =req.body;
  let clotheWanted = await clothes.findOne({where:{id:id}});
     const UpdatedClothe = await clotheWanted.update(body);
     res.status(201).json(UpdatedClothe);
 }
 

module.exports = router;