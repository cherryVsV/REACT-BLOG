const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res)=>{
    const newCat = new Category(req.body);
    try{
        const category = await Category.findOne({
            name: req.body.name
        });
        if(category){
            return res.status(200);
        }
        const savedCat = await newCat.save();
        return res.status(200).json(savedCat);
    }catch(err){
        res.status(500),json(err);
    }
})
router.get("/", async (req, res)=>{
    try{
        const categories= await Category.find();
        return res.status(200).json(categories);
    }catch(err){
        res.status(500),json(err);
    }
})

module.exports = router