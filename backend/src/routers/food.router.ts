import {Router} from 'express';
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.model';

const router = Router();

router.get('/seed',asyncHandler(
    async (req,res) => {
        const foodCount = await FoodModel.countDocuments();
        if(foodCount>0) {
            res.send("Seed already initialized");
            return;
        }

        await FoodModel.create(sample_foods);
        res.send("Seed is Done! ");
    }
));


router.get('/', asyncHandler(
    async (req,res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
));

router.get('/search/:searchFoodTerm',asyncHandler(
    async (req,res) => {
        const searchRegex = new RegExp(req.params.searchFoodTerm,'i');
        const foods = await FoodModel.find({name: {$regex:searchRegex}});
         res.send(foods);
    }
));

router.get('/tags',asyncHandler(
    async (req,res) => {

        const tags = await FoodModel.aggregate([
            {
                $unwind:'$tags'
            },
            {
                $group:{
                    _id:'$tags',
                    count:{$sum:1}
                }
            },
            {
                $project:{
                    _id:0,
                    name:'$_id',
                    count:'$count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags); 
    }
));

router.get('/tags/:tagTerm',asyncHandler(
    async (req,res)=>{
        if(req.params.tagTerm === 'All') {
            const foods = await FoodModel.find();
            res.send(foods);
            return;
        }
    
        const foods = await FoodModel.find({tags:req.params.tagTerm});
         res.send(foods); 
    }
));

router.get('/:foodId',asyncHandler(
    async (req,res) => {
        const food = await FoodModel.findById(req.params.foodId);
        res.send(food);
    }
));


export default router;
