const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let product = { "name": "milk", "price": 19.95 }

beforeEach(function () {
  items.items.push(product);
  // console.log("items.items =>", items.items)
  // console.log("items =>", items)
});

afterEach(function () {
  items.items = [];
})

/* GET /items - return JSON of all items on list*/
describe("GET /items", function () {
  // console.log("items=>", items)
  it("Gets list of all items", async function () {
    const resp = await request(app).get('/items');
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      items: [
        { name: "milk", price: 19.95 }
      ]
    });
  });
});

/* POST /items - accept JSON body, add item, return JSON of item*/
describe("POST /items", function () {
  it("adds item to list of items", async function () {
    const resp = await (await request(app)
                  .post('/items')
                  .send({name: "bread", price: "17.75"}));
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
       added: { name: "bread", price: 17.75 } 
    });
  });
});

