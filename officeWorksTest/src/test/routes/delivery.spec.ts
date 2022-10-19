import { postCodeData, ERRS, respondError   } from "../../routes/delivery";
import { runPrepareAvailabilityDB}  from "../../model/Availability";
import { runPrepareDeliveryDB}  from "../../model/Delivery";

const res = { body: '',
    send: function(input) { this.body = input },
    status: () => res,
    json: () => res,
};

let req = { 
    params: { 
        postcode: '3000' 
    },
    query: {
        partNumber:'1,2,3,4,5,6,7,8,9,,10'
    }
};

describe('Tests suit for Delivery Router Controller', () => {
    beforeAll(async () => {
        await runPrepareAvailabilityDB();
        await runPrepareDeliveryDB();
    });
    test('Test 1: Test for postCodeData Controller', async () => {
        req = { 
            params: { 
                postcode: '3000' 
            },
            query: {
                partNumber:'1,2,3,4,5,6,7,8,9,,10'
            }
        };

        await expect(postCodeData(req, res)).toBeDefined();
    });

    test('Test 2: Test for postCodeData Controller for Invalid Store', async () => {
        req = { 
            params: { 
                postcode: '30000' 
            },
            query: {
                partNumber:'1,2,3,4,5,6,7,8,9,,10'
            }
        };

        await postCodeData(req, res); 
        expect(JSON.stringify(res.body)).toContain("Invalid Store");
    });

    test('Test 3: Test for postCodeData Controller for Invalid Part', async () => {
        req = { 
            params: { 
                postcode: '3000' 
            },
            query: {
                partNumber:''
            }
        };
        await postCodeData(req, res);
        expect(res.body).toStrictEqual({"errors": ["Invalid Part"]});
    });
})