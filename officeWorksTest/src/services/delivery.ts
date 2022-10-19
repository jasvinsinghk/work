import _, { any } from "underscore";
import logger from "./logger";
import availabilityModel  from "../model/Availability";
import deliveryModel from "../model/Delivery";

let deliverService = {}
const getByPostcode = async (postcode: string, items: string) => {
  try{ 
    let checkItems = items? items.split(","): [];
    let final = {
      items : [],
      cost: 0
    };

    if(!postcode) {
      throw 'paramenter error';
    }
    if(!checkItems.length) {
      throw 'paramenter error';
    }   
    const availibility = await availabilityModel.getByPostcode(postcode, checkItems);
    if(typeof availibility === 'object' && availibility?.length && availibility.length){
      await availibility.map( async av => {
        const delCosts = await deliveryModel.getByWeight(av.postcode, av.weight);
        if(delCosts?.cost) final.cost += delCosts.cost;
        final.items.push(av);
      });
      return final;
    } else {
      return final;
    }
  }
  catch(error) {
    logger.error("Error in Delivery Service", error);
    return "Invalid Params";
  }
};


export default deliverService = { getByPostcode }
