const chai = require('chai');
const expect = chai.expect;
// import sinon
const sinon = require('sinon');
const server = require('../server');

describe('paramsToServiceObject', function () {
  it('should send Object', function () {
    let req = {};
    let res = {
      // response can be tracked
      send: sinon.spy(),
    };
    server.paramsToServiceObject(req);

    // expect to get argument of Object
    expect(res.send.firstCall.args[0]).to.equal({});
  });
});
