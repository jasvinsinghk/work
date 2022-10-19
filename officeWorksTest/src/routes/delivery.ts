import express from 'express';
const router = express.Router();
import logger from '../services/logger';
import deliveryService from  "../services/delivery";


const ERRS = (type:string) => {
   if(type === "Invalid Part" ) return 404;
   if(type === "Invalid Store" ) return 404;
   if(type === "Invalid Params" ) return 400;
};

const respondError = (res:any, desc:string = undefined) => {
  const code = ERRS(desc);
  return res.status(code == undefined ? 500 : code).send({ errors: [desc] });
}

const postCodeData = async (req, res) => {
    const postcode = req.params.postcode;
    const partNumber: any = req.query.partNumber;
    if (partNumber === undefined || partNumber === "")
        return respondError(res, "Invalid Part");

    if (postcode !== '3000')
        return respondError(res, "Invalid Store");

    try {
        const data = await deliveryService.getByPostcode(postcode, partNumber);
        res.json(data);
    }
    catch(error) {
        logger.error(error);
        return respondError(res);
    }
}

router.get("/:postcode", postCodeData);

export default router;

export { postCodeData, ERRS, respondError }; 