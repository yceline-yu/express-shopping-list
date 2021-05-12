const express = require("express");

const {items} = require("../fakeDb");
const router = new express.Router();

/* GET '/items' returns JSON of shopping items  
{ items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 }
]}
*/
router.get('/', function (req, res){
  console.log("DB items =>", items)
  return res.json({"items":items})
})

/*POST '/items' recieve JSON {name, price}, add to db, 
return JSON {added:{name,price}} */
router.post('/', function (req, res){
  console.log("DB items =>", req.body)
  let name = req.body.name;
  let price = +req.body.price;

  items.push({"name":name, "price":price})

  return res.json({added: {"name": name, "price": price}})
})










module.exports = router;
