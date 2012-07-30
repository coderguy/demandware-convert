var assert = require("assert"),
  expect = require('expect.js'),
  cmd = require('../cmd/dw-convert');

describe('Commandline', function () {
  it('should accept an input param', function() {
    cmd.parse('node dw-convert --input input.csv'.split(' '));
    expect(cmd.input).to.be('input.csv');
  });
  it('should accept an output param', function() {
    cmd.parse('node dw-convert --output output.csv'.split(' '));
    expect(cmd.output).to.be('output.csv');
  });
  it('should accept a valid format param', function() {
    cmd.parse('node dw-convert --format geolocation'.split(' '));
    expect(cmd.format).to.be('geolocation');
  });
  it('should accept a delimiter param', function() {
    cmd.parse('node dw-convert --delimiter \t'.split(' '));
    expect(cmd.delimiter).to.be('\t');
  });
});
