import { handleSubmit } from "../src/client/js/formHandler"
describe("Testing sumbit functionality",function () {
    test("Testing the handleSubmit() funciton",function() {
        expect(handleSubmit).toBeDefined();
    })
})