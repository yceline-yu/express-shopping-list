const express = require("express");

const { items } = require("../fakeDb");
const router = new express.Router();

/* GET '/items' returns JSON of shopping items  
{ items: [{ name: "popsicle", price: 1.45 },{ name: "cheerios", price: 3.40 }]} */

router.get('/', function (req, res) {
  // console.log("DB items =>", items)
  return res.json({ items })
})

/* POST '/items' accept JSON, add to db, return JSON
{name: "popsicle", price: 1.45} => {added: {name: "popsicle", price: 1.45}} */

router.post('/', function (req, res) {
  // console.log("DB items =>", req.body)
  const name = req.body.name;
  const price = parseFloat(req.body.price);
  // console.log("items in POST", items)
  items.push({ name, price })

  return res.json({ added: { name, price } })
})


/* GET 'items/:name' return single item JSON
{name: "popsicle", "price": 1.45} */

router.get('/:name', function (req, res) {
  let selectedItem = items.find(item => item.name === req.params.name);
  console.log("selectedItem returns ==>", selectedItem);
  return res.json(selectedItem);
})


/* PATCH 'items/:name'  accepts JSON body, modifies the existing item
returns json of modified item 
{name: "new popsicle", price: 2.45} 
=> {updated: {name: "new popsicle", price: 2.45}} */

router.patch('/:name', function (req, res) {
  let newName = req.body.name;
  let newPrice = req.body.price;

  let selectedItem = items.find(item => item.name === req.params.name);
      selectedItem.name = newName;
      selectedItem.price = newPrice;
    // think about errors here 
  return res.json({ updated: { name : newName, price: newPrice } });
})

/* DELETE '/items/:name' delete item passed in query string
   return JSON {message: "Deleted"} */

router.delete('/:name', function (req, res) {
  const itemIdx = items.findIndex(item => item.name === req.params.name);
  items.splice(itemIdx, 1);
  return res.json({message: "Deleted"});
})




module.exports = router;
