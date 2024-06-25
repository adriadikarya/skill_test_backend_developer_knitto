const toCamelCase = (e) => {
    return e
    .replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
          .replace('-', '')
          .replace('_', '');
      });
  };
  
const toSnakeCase = (e) => {
return e
.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
.map(x => x.toLowerCase())
.join('_');
};

const padWithZero = (number, length) => {
    
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    
    return my_string;
    
}

const titleCase = (string) => {
    // console.log(s)
    // string = string.replaceAll("_"," ")
    string = string.replace(/_/g," ")
    let sentence = string.toLowerCase().split(" ");
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    
    return sentence.join(" ");

}

const numberFormat = (x) => {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const getRandomString = (length) => {
    var randomChars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

const toCamel = (o) => {
  var newO, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function(value) {
        if (typeof value === "object") {
          value = toCamel(value)
        }
        return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}

module.exports = {
    toCamelCase,
    toSnakeCase,
    padWithZero,
    titleCase,
    numberFormat,
    getRandomString,
    toCamel,
};