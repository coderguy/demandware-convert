[![build status](https://secure.travis-ci.org/coderguy/demandware-convert.png)](http://travis-ci.org/coderguy/demandware-convert)
# demandware-convert

Transform CVS/TSV files into Demandware XML files.

## Installation

```
npm install demandware-convert -g
```

The -g flag will install it globally so you can use package as a command line app.

## Usage

```
demandware-convert -i my-input.csv -f geolocation -o my-ouput.xml
```

Currently the only format support is geolocation.

## Pending Features

* Support for different file formats.
* Impletement the -d (delimiter) flag.
* Better test coverage.