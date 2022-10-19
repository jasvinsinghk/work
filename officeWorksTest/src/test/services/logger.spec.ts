import logger  from "../../services/logger";


describe("Tests suit for Logger Service ", () => {
    test('Test 1:  Logger Service is defined', () => {
        expect(logger).toBeDefined ();
    });
});