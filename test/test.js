var assert = require("assert"),
  fs = require('fs'),
  expect = require('expect.js'),
  Convert = require('./index');

describe('Geolocation Import Format', function () {
  describe('#save()', function () {
    it('should generate a file that matches the test file', function () {
      var inputData = [{
        'postalCode': '05661',
        'city': 'MORRISVILLE',
        'state': 'VT',
        'longitude': '-72.615346',
        'latitude': '44.560179'
      }],
        mockData = fs.readFileSync('test/mock/xml/geolocation.xml', 'ascii'),
        converter = new Convert();

      converter.input(inputData);
      converter.outputXML('geolocation', function (err, outputData) {
        expect(err).to.be(null);
        expect(outputData).to.eql(mockData);
      });
    });
  });
});
