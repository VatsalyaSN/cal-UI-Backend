# time-number
[![npm version](https://img.shields.io/npm/v/time-number.svg?style=flat)](https://www.npmjs.com/package/time-number)
[![Build Status](https://img.shields.io/travis/yury-dymov/time-number/master.svg?style=flat)](https://travis-ci.org/yury-dymov/time-number)
[![Coverage Status](https://coveralls.io/repos/github/yury-dymov/time-number/badge.svg?branch=master)](https://coveralls.io/github/yury-dymov/time-number?branch=master)

Converts time representation from string to number or from number to string.

*Note:* It was extracted from [react-bootstrap-time-picker](https://github.com/yury-dymov/react-bootstrap-time-picker) and has very limited functionality.

# Installation
```
npm install time-number
```

# Functions

## timeFromInt(timeNumber: number, validate: boolean)
`validate` is `true` by default. Fill free to disable validations for performance gains if you are *that* sure in your data.

*Note:* Number should be provided in *seconds*

*Note:* function returns time in either "HH:mm" or "HH:mm:ss" format. No localization is supported yet.

### Usage example
```
import { timeFromInt } from 'time-number';

console.log(timeFromInt(64800));     // -> '18:00'
console.log(timeFromInt(64805));     // -> '18:00:05'
```

## timeToInt(timeString: string, validate: boolean)
`validate` is `true` by default

*Note:* function expects to receive 24-hour format. "18", "18:00" and "18:00:05" are acceptable but "6:00 PM" is not.

### Usage example
```
import { timeToInt } from 'time-number';

console.log(timeToInt('18'));        // -> 64800
console.log(timeToInt('18:00'));     // -> 64800
console.log(timeToInt('18:00:05'));  // -> 64805
```

# License
MIT (c) Yury Dymov
