import deliveryService from  "../../services/delivery";
import { runPrepareAvailabilityDB}  from "../../model/Availability";
import { runPrepareDeliveryDB}  from "../../model/Delivery";
let postCode = '3000';
let items = '1,2,3,4,5,6,7,8,9,10';

describe("Tests suit for Delivery Service ", () => {

    beforeAll(async () => {
        await runPrepareAvailabilityDB();
        await runPrepareDeliveryDB();
    });
    afterEach(async () => {
        postCode = '3000';
        items = '1,2,3,4,5,6,7,8,9,10';
    });
    test('Test 1: Delivery service getByPostcode() with post code and all items with comma seperated', async () => {
        await expect(deliveryService.getByPostcode(postCode, items )).resolves.toBeDefined ();
    });

    test('Test 2: Delivery service getByPostcode() with post code and single item', async () => {
        items = '1'
        await expect(deliveryService.getByPostcode(postCode, items )).resolves.toBeDefined ();
    });

    test('Test 3: Delivery service getByPostcode() with post code and more than one items with comma seperated ', async () => {
        items = '1,5,6'
        await expect(deliveryService.getByPostcode(postCode, items )).resolves.toBeDefined ();
    });

    test('Test 4: Delivery service getByPostcode() with post code other than 3000 and all items comma seperated ', async () => {
        postCode = '30000';
        const mockResult = {
            items: [],
            cost: 0

        }
        await expect(deliveryService.getByPostcode(postCode, items )).resolves.toStrictEqual(mockResult);
    });

    test('Test 5: Delivery service getByPostcode() with post code and invalid items as 100  ', async () => {
        items = '100';
        const mockResult = {
            items: [],
            cost: 0

        }
        await expect(deliveryService.getByPostcode(postCode, items )).resolves.toStrictEqual(mockResult);
    });

    test('Test 6: Delivery service getByPostcode() with post code as empty string and all items with comma seperated  ', async () => {
        postCode = '';
        await expect(deliveryService.getByPostcode(postCode, items )).resolves.toStrictEqual('Invalid Params');
    });

    test('Test 7: Delivery service getByPostcode() with post code and items as empty string ', async () => {
        postCode = '';
        items = '';
        await expect(deliveryService.getByPostcode(postCode, items )).resolves.toStrictEqual('Invalid Params');
    });
});