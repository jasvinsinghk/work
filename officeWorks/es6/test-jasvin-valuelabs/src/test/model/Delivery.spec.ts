import deliveryModel, { runPrepareDeliveryDB}  from "../../model/Delivery";
let faker = require("faker");
let weight = 0;
let postCode ='3000';

describe("Tests suit for Delivery Model", () => {
    beforeEach(()=> {
        weight = faker.random.number({
            min: 10,
            max: 50
        }).toString();
    })
    beforeAll(async () => {
        return await runPrepareDeliveryDB();
    });
    test('Test 1: getByWeight() with post code and weight', async () => {
        await expect(deliveryModel.getByWeight(postCode, weight)).resolves.toBeDefined ();
    });

    test('Test 2: getByWeight() with empty post code', async () => {
        postCode = "";
        await expect(deliveryModel.getByWeight(postCode, weight)).resolves.toStrictEqual('Invalid Params');
    });
});