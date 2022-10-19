import logger from '../services/logger';
let loki = require("lokijs");
let db = new loki("Officeworks");

let deliveryCost = db.addCollection("delivery");

const prepareDB =async () => {
  for (let i = 1; i < 5; i++) {
    await deliveryCost.insert({
      weight: i * 10,
      cost: i * 2,
      postcode: "3000"
    });
  }
};

prepareDB();
let Delivery = {};

const getByWeight = async (postcode: string, wt: number) =>{
  try {
    if(postcode && wt){
      const data = await deliveryCost.find({ weight: { $gt: wt },  postcode })[0];
      const dataKeys = data == undefined ? [] : Object.keys(data);
      if(dataKeys.length && dataKeys.includes('postcode') && dataKeys.includes('cost')) {
        return data;
      } else {
         return {};
      }
    } else {
      throw 'Invalid query fields'
    }
  }
  catch(error) {
    logger.error("Error During fetching data from Delivery Collection", error);     
    return 'Invalid Params';
  }  
} 

export default Delivery = { getByWeight };
export const runPrepareDeliveryDB = prepareDB;
