import logger from '../services/logger';
let faker = require("faker");
let loki = require("lokijs");
let db = new loki("Officeworks");

let availabilityDb = db.addCollection("availability", { indices: ["id"] });

const prepareDB =async () => {
  for (let i = 0; i < 10; i++) {
    await availabilityDb.insert({
      // incremented by 1 before inserting as to get the partNumber for 1 to 10 instead of 0-9
      id: (i+1).toString(),
      name: faker.commerce.productName(),
      description: faker.company.catchPhrase(),
      weight: faker.random.number({
        min: 10,
        max: 50
      }),
      available: faker.random.boolean(),
      postcode: "3000"
    });
  }
};

prepareDB();
let Availability = {};

const getByPostcode = async (postcode: string, itemCode: any) => {
  let foundItems:any = [];
  try{
    if(postcode && itemCode.length){
      await itemCode.forEach( async (item:string) => {
        // Adding one more key in query as we are showing ally those items where available is true.
        let foundItem = await availabilityDb.find({ id: item, postcode, available:true })[0];
        if(foundItem) foundItems.push(foundItem);
      });
      if(foundItems.length) {
        return foundItems;
      } else {
        return [];
      }
    } else {
      throw 'Invalid query fields';
    }   
  }
  catch(error) {
    logger.error("Error During fetching data from Availability Collection", error)     
    return "Invalid Params";
  }  
};


export default Availability = { getByPostcode };
export const runPrepareAvailabilityDB = prepareDB;