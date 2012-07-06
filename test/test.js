var assert = require("assert"),
  fs = require('fs'),
  expect = require('expect.js'),
  Convert = require('../');

var inputData = [{
  'postalCode': '05661',
  'city': 'MORRISVILLE',
  'state': 'VT',
  'longitude': '-72.615346',
  'latitude': '44.560179'
}];

describe('Convert', function () {
  describe('#inputCSV()', function () {
    it('should load a CSV file', function (done) {
      var converter = new Convert();
      converter.inputCSV('test/mock/csv/geolocation.csv', function (err) {
        expect(err).to.be(null);
        expect(converter.data).to.eql(inputData);
        done();
      });
    });
    it('should throw an error if input file is not found', function (done) {
      var converter = new Convert();
      converter.inputCSV('missing-filename.csv', function (err) {
        expect(err).to.be(true);
        done();
      });
    });
  });
  describe('#outputXML()', function () {
    it('should generate a file that matches the test file', function (done) {
      var mockData = fs.readFileSync('test/mock/xml/geolocation.xml', 'ascii'),
        converter = new Convert();

      converter.input(inputData);
      converter.outputXML('geolocation', function (err, outputData) {
        expect(err).to.be(null);
        expect(outputData).to.eql(mockData);
        done();
      });
    });
  });
});
