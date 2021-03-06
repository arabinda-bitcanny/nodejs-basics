const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require("../../index");
const expect = chai.expect;

const sinon = require("sinon");
const jwtLib = require("../../library/jwt");

describe('Integration Testing of /jwt endpoint', () => {
    it('should return an object', done => {
        chai.request(app).post('/jwt')
            .set('content-type', 'application/json')
            .send({
                "firstName": "Arabinda",
                "lastName": "Manna",
                "age": 25
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.all.keys(['status', 'access_token']);
                done();
            });
    });
    it('should return 500 as dependent method throws error', done => {
        const error = new Error("generateJWT throws an error");
        sinon.stub(jwtLib, "generateJWT").throws(error);
        chai.request(app).post('/jwt')
            .set('content-type', 'application/json')
            .send({
                "firstName": "Arabinda",
                "lastName": "Manna",
                "age": 25
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                jwtLib.generateJWT.restore();
                done();
            });
    });
});

describe('Integration Testing of /jwt/validate endpoint', () => {
    it('should return false', done => {
        chai
            .request(app)
            .post('/jwt/validate')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBcmFiaW5kYSIsImxhc3ROYW1lIjoiTWFubmEiLCJhZ2UiOjI1LCJpYXQiOjE1ODM5Mjk2MTIsImV4cCI6MTU4MzkyOTczMiwiYXVkIjoibG9jYWxob3N0IiwiaXNzIjoibG9jYWxob3N0IiwianRpIjoiYWhpQWQifQ.AU8hKXxJbV5qZs_IQwzzDP6jiMVSPlpS2fuVU66IQ38')
            .send({
                "firstName": "Arabinda",
                "lastName": "Manna",
                "age": 25
            })
            .end((err, res) => {
                // console.log(res);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys("status");
                expect(res.body.status).to.be.equal("False");
                done();
            });
    });
    it('should return true', done => {
        chai.request(app).post('/jwt')
            .set('content-type', 'application/json')
            .send({
                "firstName": "Arabinda",
                "lastName": "Manna",
                "age": 25
            })
            .end((err, res) => {
                const token = res.body.access_token;
                chai
                    .request(app)
                    .post('/jwt/validate')
                    .set('content-type', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": "Arabinda",
                        "lastName": "Manna",
                        "age": 25
                    })
                    .end((err, res) => {
                        // console.log(res);
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.keys("status");
                        expect(res.body.status).to.be.equal("True");
                        done();
                    });
            });
    });
    it('Negetive test without any authorization header', done => { 
        chai
            .request(app)
            .post('/jwt/validate')
            .set('content-type', 'application/json')
            .send({
                "firstName": "Arabinda",
                "lastName": "Manna",
                "age": 25
            })
            .end((err, res) => {
                // console.log(res);
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                done();
            });
    });
    it('should return 500 as dependent method throws error', done => {
        const error = new Error("validateJWT throws an error");
        sinon.stub(jwtLib, "validateJWT").throws(error);
        chai
            .request(app)
            .post('/jwt/validate')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBcmFiaW5kYSIsImxhc3ROYW1lIjoiTWFubmEiLCJhZ2UiOjI1LCJpYXQiOjE1ODM5Mjk2MTIsImV4cCI6MTU4MzkyOTczMiwiYXVkIjoibG9jYWxob3N0IiwiaXNzIjoibG9jYWxob3N0IiwianRpIjoiYWhpQWQifQ.AU8hKXxJbV5qZs_IQwzzDP6jiMVSPlpS2fuVU66IQ38')
            .send({
                "firstName": "Arabinda",
                "lastName": "Manna",
                "age": 25
            })
            .end((err, res) => {
                // console.log(res);
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                jwtLib.validateJWT.restore();
                done();
            });
    });
});