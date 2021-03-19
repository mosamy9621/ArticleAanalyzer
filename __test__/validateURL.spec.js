import { validateURL } from "../src/client/js/urlValdator"
describe("Testing validation functionality",function () {
    test("Testing the validateURL() funciton",function() {
        expect(validateURL).toBeDefined();
    });
    test("Testing a valid URL",function(){
        expect(validateURL("https://example.com")).toEqual(true);
    });
    test("Testing an invalid URL",function(){
        expect(validateURL("https://example")).toEqual(false);
    });
    test("Testing an invalid URL",function(){
        expect(validateURL("")).toEqual(false);
    });
    test("Testing an invalid URL",function(){
        expect(validateURL("aaaddd123")).toEqual(false);
    });
});