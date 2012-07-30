var Convert = require('../index'),
  optimist = require('optimist');

var program = optimist
  .usage('Converts from value separated (csv/tsv) files to demandware xml files.')
  .demand('i').alias('i', 'input').describe('i', 'Input file')
  .default('d', ',').alias('d', 'delimiter').describe('d', 'Defaults to ,')
  .demand('o').alias('o', 'output').describe('o', 'Output file')
  .default('f', Convert.formats()[0]).alias('f', 'format').describe('f', 'Valid formats: ' + Convert.formats().join(','))
  .argv;

this.run = function () {
  var converter = new Convert(program.input, program.format, program.output);
  converter.transform(function (err, report) {
    console.log(report);
  });
};