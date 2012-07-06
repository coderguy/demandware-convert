var libxml = require("libxmljs"),
  _ = require('underscore');

var Convert = function() {
  this.data = [];
};

Convert.prototype.input = function(data) {
  this.data = data;
};
Convert.prototype.outputXML = function(format, callback) {
  var xml = "",
    doc = new libxml.Document()
      .node('geolocations')
        .attr("xmlns","http://www.demandware.com/xml/impex/geolocation/2007-05-01")
        .attr("country-code","US");

  _.each(this.data, function(row) {
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