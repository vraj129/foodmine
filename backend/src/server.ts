import express from 'express';
import cors from 'cors';
import { sample_foods, sample_tags } from './data';

const PORT = 5000;

const app = express();

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get('/api/foods',(req,res) => {
    res.send(sample_foods);
});

app.get('/api/foods/search/:searchFoodTerm',(req,res) => {
    const foods = sample_foods.filter((food) => {
        return food.name.toLowerCase().includes(req.params.searchFoodTerm.toLowerCase());
    });
    return res.send(foods);
});

app.get('/api/tags',(req,res) => {
    res.send(sample_tags);
});

app.get('/api/tags/:tagTerm',(req,res)=>{

    if(req.params.tagTerm === 'All') {
        return res.send(sample_tags);
    }

    const foods = sample_foods.filter((food) => {
        return food.tags.includes(req.params.tagTerm);
    });

    return res.send(foods);
});

app.get('/api/foods/:foodId',(req,res) => {
    const food = sample_foods.find((food) => {
        return food.id === req.params.foodId;
    });
    if(!food) return res.sendStatus(404);
    return res.send(food);
});

app.listen(PORT,() => {
    console.log(`Server listening on ${PORT}`);
});