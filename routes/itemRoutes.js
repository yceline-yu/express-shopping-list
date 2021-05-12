const express = require("express");

const { items } = require("../fakeDb");
const router = new express.Router();

/* GET '/items' returns JSON of shopping items  
{ items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 }
]}
*/
router.get('/', function (req, res) {
  console.log("DB items =>", items)
  return res.json({ "items": items })
})

/*POST '/items' recieve JSON {name, price}, add to db, 
return JSON {added:{name,price}} */
router.post('/', function (req, res) {
  console.log("DB items =>", req.body)
  let name = req.body.name;
  let price = +req.body.price;

  items.push({ "name": name, "price": price })

  return res.json({ added: { "name": name, "price": price } })
})


/* GET 'items/:name' return single item 
   JSON  {name: "popsicle", "price": 1.45} */

router.get('/:name', function (req, res) {
  let selectedItem = items.filter(item => {
    item.name === name
  })
  console.log("selectedItem returns ==>", selectedItem[0])
  return res.json(selectedItem[0])
})


/* PATCH 'items/:name'  accepts JSON body, modifies the existing item
   returns json of modified item 
   {name: "new popsicle", price: 2.45} =>
      {updated: {name: "new popsicle", price: 2.45}} */

router.patch('/:name', function (req, res) {
  let newName = req.body.name;
  let newPrice = req.body.price;

  for (let item of items) {
    if (item.name === name) {
      items[item].name = newName;
      items[item].price = newPrice;
    }
    // think about errors here 
  }
  return res.json({ "updated": { "name": newName, "price": newPrice } });
})

/* DELETE '/items/:name' delete item passed in query string
   return JSON {message: "Deleted"} */
router.delete('/:name', function (req, res) {
  let itemIdx;
  for (let item of items) {
    if (item.name === name) {
      itemIdx = items.indexOf(item)
    }
  }
  items.splice(itemIdx, 1)
  return res.json({message: "Deleted"})
})




module.exports = router;
