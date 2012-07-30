var libxml = require("libxmljs"),
  _ = require('underscore'),
  path = require('path'),
  fs = require('fs'),
  dustfs = require('dustfs'),
  csv = require('ya-csv');

dustfs.dirs(__dirname + '/../templates');

var Convert = function (inputFile, format, outputFile) {
  this.data = [];
  this.lines = 0;
  this.inputComplete = false;
  this.linesWritten = 0;
  this.inputFile = inputFile;
  this.format = format;
  this.outputFile = outputFile;
  this.out = false;
};
Convert.prototype.transform = function (callback) {
  var self = this;
  self.outputXML(function () {
    self.inputCSV(self.inputFile, callback);
  });
};
Convert.prototype.inputCSV = function (filename, callback) {
  var self = this;

  path.exists(filename, function (exists) {
    if (!exists) {
      callback(true);
      return false;
    }
    var reader = csv.createCsvFileReader(filename);
    reader.addListener('data', function (row) {
      if (!self.fields) {
        self.fields = _.map(row, function (value) { return value.toLowerCase(); });
      } else {
        var item = {};
        _.each(self.fields, function (key, index) {
          item[key.toLowerCase()] = row[index];
        });
        self.lines += 1;
        self.outputRow(item, function () {
          self.linesWritten += 1;
        });
      }
    });
    reader.addListener('end', function () {
      self.outputFooter(function () {
        var results = "Transformed " + self.lines + " lines.\n";
        self.out.end(function () {
          callback(null, results);
        });
      });
    });
  });
};
Convert.prototype.outputXML = function (callback) {
  var self = this;
  console.log("Writing file: " + this.outputFile);
  this.out = fs.createWriteStream(this.outputFile, { flags: 'w', encoding: 'utf8' });
  this.out.on('open', function () {
    self.outputHeader(callback);
  });
};
Convert.prototype.outputTemplate = function (template, data, callback) {
  var self = this;
  dustfs.render(template, data, function (err, output) {
    if (err) {
      throw err;
    }
    self.out.write(output + "\n");
    if (typeof callback === 'function') {
      callback();
    }
  });
};
Convert.prototype.outputHeader = function (callback) {
  return this.outputTemplate(this.format + '-header.dust', {}, callback);
};
Convert.prototype.outputRow = function (data, callback) {
  return this.outputTemplate(this.format + '-row.dust', data, callback);
};
Convert.prototype.outputFooter = function (callback) {
  return this.outputTemplate(this.format + '-footer.dust', {}, callback);
};

Convert.formats = function () {
  return ['geolocation'];
};

module.exports = Convert;