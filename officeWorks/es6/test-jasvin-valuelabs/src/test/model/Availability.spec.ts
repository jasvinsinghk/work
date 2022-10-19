import availabilityModel, { runPrepareAvailabilityDB}  from "../../model/Availability";

let postCode = "3000";
let itemCode = ['1','2','3','4','5','6','7','8','9','10']
describe("Tests suit for Availability Model", () => {

    beforeAll(async () => {
        return await runPrepareAvailabilityDB();
    });
    test('Test 1: getByPostcode() with post code and more than one  part number', async () => {
        await expect(availabilityModel.getByPostcode(postCode, itemCode)).resolves.toBeDefined ();
    });

    test('Test 2: getByPostcode() with post code and with one part number', async () => {
        itemCode = ['1'];
        await expect(availabilityModel.getByPostcode(postCode, itemCode)).resolves.toBeDefined ();
    });

    test('Test 3: getByPostcode() with empty part number', async () => {
        itemCode = [];
        await expect(availabilityModel.getByPostcode(postCode, itemCode)).resolves.toStrictEqual('Invalid Params');
    });

    test('Test 4: getByPostcode() with empty post code', async () => {
        postCode = "";
        itemCode = ['1'];
        await expect(availabilityModel.getByPostcode(postCode, itemCode)).resolves.toStrictEqual('Invalid Params');
    });

    test('Test 5: getByPostcode() with empty post code and part number', async () => {
        postCode = "";
        itemCode = [];
        await expect(availabilityModel.getByPostcode(postCode, itemCode)).resolves.toStrictEqual('Invalid Params');
    });

    test('Test 6: getByPostcode() with invalid part number', async () => {
        itemCode = ['100'];
        postCode = '3000';
        await expect(availabilityModel.getByPostcode(postCode, itemCode)).resolves.toStrictEqual([]);
    });  
});