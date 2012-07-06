var libxml = require("libxmljs"),
  _ = require('underscore'),
  path = require('path'),
  csv = require('ya-csv');

var Convert = function() {
  this.data = [];
};
Convert.prototype.input = function (data, countryCode) {
  this.data = data || [];
  this.countryCode = countryCode || 'US';
  this.fields = false;
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
        self.fields = row;
      } else {
        var item = {};
        _.each(self.fields, function (key, index) {
          item[key] = row[index];
        });
        self.data.push(item);
      }
    });
    reader.addListener('end', function () {
      callback(null);
    });
  });
};
Convert.prototype.outputXML = function (format, callback) {
  var xml = "",
    doc = new libxml.Document()
      .node('geolocations')
        .attr("xmlns", "http://www.demandware.com/xml/impex/geolocation/2007-05-01")
        .attr("country-code", this.countryCode);

  _.each(this.data, function (row) {
    doc.node('geolocation').attr('postal-code', row.postalCode)
      .node('city', row.city).attr("xml:lang", "x-default").parent()
      .node('state', row.state).attr("xml:lang", "x-default").parent()
      .node('longitude', row.longitude).parent()
      .node('latitude', row.latitude).parent();
  });
  xml = '<?xml version="1.0" encoding="UTF-8"?>' + "\n" + doc.toString();
  callback(null, xml);
};

module.exports = Convert;