const { assert, expect } = require("chai");
const sinon = require("sinon");

const { processFirst10Multiples, processStringCharacterCalc, processAmstrong } = require("../../controllers/operations");
const operations = require("../../library/operations");

describe("processFirst10Multiples Controller Function Unit Testing", () => {
    it("next should be called", () => {
        sinon.stub(operations, "first10Multiples").throws(new Error("first10Multiples throws wanted error"));
        const sinonNext = sinon.spy();
        processFirst10Multiples({}, {}, sinonNext);
        expect(sinonNext.calledOnce).to.be.true;
        operations.first10Multiples.restore();
    });

    it("res.send should be called",  () => {
        const req = {"params":{
            "num":1
        }};
        const sendFake = sinon.spy();
        const resSpy = {
            "send": sendFake
        };
        processFirst10Multiples(req, resSpy, () => { });
        expect(sendFake.calledOnce).to.be.true;
    });
});

describe("processStringCharacterCalc Controller Function Unit Testing", () => {
    it("next should be called", () => {
        sinon.stub(operations, "stringCharacterCalc").throws(new Error("stringCharacterCalc throws wanted error"));
        const sinonNext = sinon.spy();
        processStringCharacterCalc({}, {}, sinonNext);
        expect(sinonNext.calledOnce).to.be.true;
        operations.stringCharacterCalc.restore();
    });

    it("res.send should be called", () => {
        const req = {"body":{
            "string":"NodeJs"
        }};
        const sendFake = sinon.spy();
        const resSpy = {
            "send": sendFake
        };
        processStringCharacterCalc(req, resSpy, () => { });
        expect(sendFake.calledOnce).to.be.true;
    });
});

describe("processAmstrong Controller Function Unit Testing", () => {
    it("next should be called", () => {
        sinon.stub(operations, "isAmstrong").throws(new Error("isAmstrong throws wanted error"));
        const sinonNext = sinon.spy();
        processAmstrong({}, {}, sinonNext);
        expect(sinonNext.calledOnce).to.be.true;
        operations.isAmstrong.restore();
    });

    it("res.send should be called", () => {
        const req = {
            "params": {
                "num": 153
            }
        };
        const sendFake = sinon.spy();
        const resSpy = {
            "send": sendFake
        };
        processAmstrong(req, resSpy, () => { });
        expect(sendFake.calledOnce).to.be.true;
    });
});