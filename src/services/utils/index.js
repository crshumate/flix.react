export const slice = [].slice;
export const splice = [].splice;
export const push = [].push;
export const toString = Object.prototype.toString;
export const getPrototypeOf = Object.getPrototypeOf;
/**
 * @kind function
 *
 * @description
 * Determines if a reference is an `Array`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Array`.
 */
export const isArray = function isArray(arr) {
  return Array.isArray(arr) || arr instanceof Array;
};

/**
 * @private
 * @param {*} obj
 * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
 *                   String ...)
 */
export const isArrayLike = function isArrayLike(obj) {
  // `null`, `undefined` and `window` are not array-like
  if (obj == null || isWindow(obj)) return false;

  // arrays, strings and jQuery/jqLite objects are array like
  // * jqLite is either the jQuery or jqLite constructor function
  // * we have to check the existence of jqLite first as this method is called
  //   via the forEach method when constructing the jqLite object in the first place
  if (isArray(obj) || isString(obj)) return true;

  // Support: iOS 8.2 (not reproducible in simulator)
  // "length" in obj used to prevent JIT error (gh-11508)
  var length = "length" in Object(obj) && obj.length;

  // NodeList objects (with `item` method) and
  // other objects with suitable length characteristics are array-like
  return (
    isNumber(length) &&
    (length >= 0 && (length - 1 in obj || typeof obj.item === "function"))
  );
};

/**
 * @description
 * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
 * considered to be objects. Note that JavaScript arrays are objects.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Object` but not `null`.
 */
export const isObject = value => {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === "object";
};

/**
Use the Set data structure, which automatically takes an iterable and removes duplicates. 
Then, use the from function of the Array object which will then take an iterable and convert it into an array. 
*/
export const dedupeArr = arr => {
  return Array.from(new Set(arr));
};

/**
 * Determine if a value is an object with a null prototype
 *
 * @returns {boolean} True if `value` is an `Object` with a null prototype
 */
export const isBlankObject = value => {
  return value !== null && typeof value === "object" && !getPrototypeOf(value);
};

/**
 * Checks if `obj` is a window object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a window obj.
 */
export const isWindow = function isWindow(obj) {
  return obj && obj.window === obj;
};

/**
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is undefined.
 */
export const isUndefined = function isUndefined(value) {
  return typeof value === "undefined";
};

/**
 * @description
 * Determines if a reference is defined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is defined.
 */
export const isDefined = function isDefined(value) {
  return typeof value !== "undefined";
};

/* 
 * @description
 * Determines if a reference is a `Number`.
 *
 * This includes the "special" numbers `NaN`, `+Infinity` and `-Infinity`.
 *
 * If you wish to exclude these then you can use the native
 * [`isFinite'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite)
 * method.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Number`.
 */
export const isNumber = function isNumber(value) {
  return typeof value === "number";
};

/* 
 * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
export const isString = value => {
  return typeof value === "string";
};

/* @kind function
 *
 * @description
 * Determines if a value is a date.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Date`.
 */
export const isDate = value => {
  return toString.call(value) === "[object Date]";
};

/**
 * Determines if a value is a regular expression object.
 *
 * @private
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `RegExp`.
 */
export const isRegExp = value => {
  return toString.call(value) === "[object RegExp]";
};

/**
 *
 * @description
 * Determines if a reference is a `Function`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Function`.
 */
export const isFunction = value => {
  return typeof value === "function";
};

/**
*
@description 
* Is your end-user using the BANE of all Browsers?
*@returns {boolean} True if end-user has IE Browser, false for all others
*/
export const isIe = () => {
  var ua = window.navigator.userAgent;
  return Boolean(ua.match(/MSIE|Trident/gi));
};

/**
@description Constrain known string-number to integer
@returns integer version of string
*/
export const toInt = str => {
  return parseInt(str, 10);
};

/**
 * @kind function
 *
 * @description
 * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
 * object or an array. The `iterator` function is invoked with `iterator(value, key, obj)`, where `value`
 * is the value of an object property or an array element, `key` is the object property key or
 * array element index and obj is the `obj` itself. Specifying a `context` for the function is optional.
 *
 * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
 * using the `hasOwnProperty` method.
 *
 * Unlike ES262's
 * [Array.prototype.forEach](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18),
 * providing 'undefined' or 'null' values for `obj` will not throw a TypeError, but rather just
 * return the value provided.
 *
   ```js
     var values = {name: 'misko', gender: 'male'};
     var log = [];
     forEach(values, function(value, key) {
       this.push(key + ': ' + value);
     }, log);
     expect(log).toEqual(['name: misko', 'gender: male']);
   ```
 *
 * @param {Object|Array} obj Object to iterate over.
 * @param {Function} iterator Iterator function.
 * @param {Object=} context Object to become context (`this`) for the iterator function.
 * @returns {Object|Array} Reference to `obj`.
 */

export const forEach = function forEach(obj, iterator, context) {
  var key, length;
  if (obj) {
    if (isFunction(obj)) {
      for (key in obj) {
        if (
          key !== "prototype" &&
          key !== "length" &&
          key !== "name" &&
          obj.hasOwnProperty(key)
        ) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (isArray(obj) || isArrayLike(obj)) {
      var isPrimitive = typeof obj !== "object";
      for (key = 0, length = obj.length; key < length; key++) {
        if (isPrimitive || key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context, obj);
    } else if (isBlankObject(obj)) {
      // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
      for (key in obj) {
        iterator.call(context, obj[key], key, obj);
      }
    } else if (typeof obj.hasOwnProperty === "function") {
      // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else {
      // Slow path for objects which do not have a method `hasOwnProperty`
      for (key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }
  return obj;
};

/**
 *
 * @description Converts the specified string to lowercase.
 * @param {string} string String to be converted to lowercase.
 * @returns {string} Lowercased string.
 */
export const lowercase = function(string) {
  return isString(string) ? string.toLowerCase() : string;
};

/**
 *
 * @description Converts the specified string to uppercase.
 * @param {string} string String to be converted to uppercase.
 * @returns {string} Uppercased string.
 */
export const uppercase = function(string) {
  return isString(string) ? string.toUpperCase() : string;
};

/*
 * @decription 
 * ${key} is a period delimited string used to deep access ${obj} 
 * 
 * @param {object literal} obj
 * @param {string} key
 * @returns {*} value of key specified in ${key}
 * @example
 * ```js
 * let customerData = {
 *    user:{
 *        mainAddress:{
 *            street1:"1234 Hickory St",
 *            street2:"Apt 2"
 *            city:"Orem",
 *            state:"Utah"
 *        }
 *    }
 *    
 * };
 * let stringToDeepAccess = 'user.mainAddress.city';
 * let val = deepAccess(customerData,stringToDeepAccess);
 * //${val} equals "Orem"
 *
 * ``` 
 *
 */

export const deepAccess = (obj, key) => {
  return key.split(".").reduce((nestedObject, key) => {
    if (nestedObject && key in nestedObject) {
      return nestedObject[key];
    }
    return undefined;
  }, obj);
};

/*
 * @kind function
 * @description  
 * Sorts an array of objects by the key-value specified. 
 * sortBy is a string and may represent a child deeply nested in the object.
 * 
 * @param {array} arr is an array containing object literals of indetermined depth
 * @param {string} sortBy points at the key to access within the object. sortBy may represent value deep within object
 * @returns {array} of sorted items based on the key-value specified
 * @example 
 * ```js
 * let arr = [
 *   {user:{address:{city:"Orem"}}}
 *   {user:{address:{city:"Seattle"}}}
 *   {user:{address:{city:"Tacoma"}}}
 *   {user:{address:{city:"Salt Lake City"}}}
 * ];
 * let sortBy = 'user.address.city';
 * let sortedArr = deepSort(arr, sortBy);
 * //sortedArr sorts based on city name alphabetically
 *
 * ```
 *
 */
export const deepSort = (arr, sortBy, direction = "desc") => {
  if (!isArray(arr)) {
    console.error("Value must be array. Value returns as ", typeof arr);
    return false;
  }
  return arr.sort(function(a, b) {
    let aVal = deepAccess(a, sortBy);
    let bVal = deepAccess(b, sortBy);
    bVal+="";
    aVal+="";
    if (direction === "desc") {
      return aVal!=='undefined' ? bVal.localeCompare(aVal,"en-US",{sensitivity:"variant",numeric:true}):-1;
    } else {
      return bVal!=='undefined' ? aVal.localeCompare(bVal, "en-US",{sensitivity:"variant",numeric:true}):1;
    }
  });
};

export const capitalize = word => { 
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
};

export const keyExists = (obj, key) => {
    return key in obj;
};

export const toCssClass = (str) =>{
  return str.replace(/\W/ig,"").toLowerCase();
};
