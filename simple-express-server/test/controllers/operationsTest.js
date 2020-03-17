const { assert, expect } = require("chai");
const { first10MultiplesInputValidate, first10Multiples, stringCharacterCalcInputValidate, stringCharacterCalc, isAmstrongInputValidate, isAmstrong } = require("../../controllers/operations");

describe("first10MultiplesInputValidate method Unit Testing", () => {
    it("Negetive test num greater than upper limit", async () => {
        try{
            const status = await first10MultiplesInputValidate({"num":30});
            expect(status.status).to.be.false;
        }catch(e){
            assert.fail("first10MultiplesInputValidate throws error");
        }
    });
    it("Negetive test num less than lower limit", async () => {
        try{
            const status = await first10MultiplesInputValidate({"num":-10});
            expect(status.status).to.be.false;
        }catch(e){
            assert.fail("first10MultiplesInputValidate throws error");
        }
    });
    it("Negetive test num is blank", async () => {
        //though router will not accept this input
        try{
            const status = await first10MultiplesInputValidate({"num":""});
            expect(status.status).to.be.false;
        }catch(e){
            assert.fail("first10MultiplesInputValidate throws error");
        }
    });
    it("Positive test num is given as rule defined", async () => {
        //though router will not accept this input
        try{
            const status = await first10MultiplesInputValidate({"num":10});
            expect(status.status).to.be.true;
        }catch(e){
            assert.fail("first10MultiplesInputValidate throws error");
        }
    });
});

describe("first10Multiples method Unit Testing", () => {
    it("Positive Tests", () =>{
        assert.equal(first10Multiples(1), "1 1 1 1 1 1 1 1 1 1"); //1's power series upto 10 power
        assert.equal(first10Multiples(2), "2 4 8 16 32 64 128 256 512 1024");
        assert.equal(first10Multiples(10), "10 100 1000 10000 100000 1000000 10000000 100000000 1000000000 10000000000");
    })
});