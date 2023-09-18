class IndexOutOfBoundsError extends Error {}
class NoSuchElementError extends Error {}
class IllegalArgumentError extends Error {}

class List<T> extends Array<T> {
  /**
   * Size of the list
   */
  get size() {
    return this.length;
  }

  /**
   * Returns the valid indices of the list
   */
  get indices() {
    return toList(Object.keys(this).map((n) => parseInt(n)));
  }

  /**
   * Returns the last valid index of the list
   */
  get lastIndex() {
    return this.length - 1;
  }

  /**
   * Returns the depth of the list
   */
  get depth() {
    function getDepth(list: List<any>, depth = 0) {
      for (const item of list) {
        if (Array.isArray(item) || List.isList(item)) {
          return getDepth(item, depth + 1);
        }
      }
      return depth;
    }
    return getDepth(this);
  }

  /**
   * Returns the element at a particular index, or returns the optional parameter if no element is found
   * @param {Number} index
   * @returns {*}
   */
  get(index: number, optional: any): any {
    const adjustedIndex = index < 0 ? this.length + index : index;
    return Object.keys(this).includes(String(adjustedIndex))
      ? this[adjustedIndex]
      : optional;
  }

  /**
   * Checks if the list contains any of the given elements
   * @param {*} elements
   * @returns {Boolean}
   */
  contains(...elements: any[]): boolean {
    return this.some((item) => elements.includes(item));
  }

  /**
   * Checks if a list contains all given elements
   * @param  {...any} elements
   * @returns {Boolean}
   */
  containsAll(...elements: any[]): boolean {
    return this.includesAll(...elements);
  }

  /**
   * Creates a sub list based on the fromIndex and toIndex
   * @param {Number} fromIndex
   * @param {Number} toIndex
   * @returns {List}
   */
  subList(
    fromIndex: number | undefined,
    toIndex: number | undefined
  ): List<any> {
    return this.slice(fromIndex, toIndex) as List<any>;
  }

  /**
   * Returns the first element in the list or the first element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  first(predicate?: () => any): any {
    return this.match(predicate, 1);
  }

  /**
   * Returns the first element in the list or the first element that matches the predicate or null
   * @param {Function} predicate
   * @returns {* | null}
   */
  firstOrNull(predicate?: () => any): any | null {
    return this.matchOrNull(predicate, 1);
  }

  /**
   * Returns the second element in the list or the first element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  second(predicate?: () => any): any {
    return this.match(predicate, 2);
  }

  /**
   * Returns the second element in the list or the second element that matches the predicate or null
   * @param {Function} predicate
   * @returns {*}
   */
  secondOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 2);
  }

  /**
   * Returns the third element in the list or the third element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  third(predicate?: () => any): any {
    return this.match(predicate, 3);
  }

  /**
   * Returns the third element in the list or the third element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  thirdOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 3);
  }

  /**
   * Returns the fourth element in the list or the fourth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  fourth(predicate?: () => any): any {
    return this.match(predicate, 4);
  }

  /**
   * Returns the fourth element in the list or the fourth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  fourthOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 4);
  }

  /**
   * Returns the fifth element in the list or the fifth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  fifth(predicate?: () => any): any {
    return this.match(predicate, 5);
  }

  /**
   * Returns the fifth element in the list or the fifth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  fifthOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 5);
  }

  /**
   * Returns the sixth element in the list or the sixth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  sixth(predicate?: () => any): any {
    return this.match(predicate, 6);
  }

  /**
   * Returns the sixth element in the list or the sixth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  sixthOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 6);
  }

  /**
   * Returns the seventh element in the list or the seventh element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  seventh(predicate?: () => any): any {
    return this.match(predicate, 7);
  }

  /**
   * Returns the seventh element in the list or the seventh element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  seventhOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 7);
  }

  /**
   * Returns the eighth element in the list or the eighth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  eighth(predicate?: () => any): any {
    return this.match(predicate, 8);
  }

  /**
   * Returns the eighth element in the list or the eighth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  eighthOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 8);
  }

  /**
   * Returns the ninth element in the list or the ninth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  ninth(predicate?: () => any): any {
    return this.match(predicate, 9);
  }

  /**
   * Returns the ninth element in the list or the ninth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  ninthOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 9);
  }

  /**
   * Returns the tenth element in the list or the tenth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  tenth(predicate?: () => any): any {
    return this.match(predicate, 10);
  }

  /**
   * Returns the tenth element in the list or the tenth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  tenthOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 10);
  }

  /**
   * Returns the hundredth element in the list or the hundredth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  hundredth(predicate?: () => any): any {
    return this.match(predicate, 100);
  }

  /**
   * Returns the hundredth element in the list or the hundredth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  hundredthOrNull(predicate?: () => any): any {
    return this.matchOrNull(predicate, 100);
  }

  /**
   * Returns the last element in the list or the last element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementError}
   */
  last(predicate?: () => any): any {
    return this.reversed().first(predicate);
  }

  /**
   * Returns the last element in the list or the last element that matches the predicate
   * @returns {*}
   */
  lastOrNull(predicate?: () => any): any {
    return this.reversed().firstOrNull(predicate);
  }

  /**
   * Returns the nth element in the list or the nth element that matches the predicate
   * @param {Function} predicate
   * @param {Number} nth
   * @returns {*}
   */
  match(predicate?: () => any, nth: number = 1): any {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (isMatch(predicate, item)) {
          if (count === nth - 1) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementError(`No such element`);
    } else {
      return this[nth - 1];
    }
  }

  /**
   * Returns the nth element in the list or the nth element that matches the predicate
   * @param {Function} predicate
   * @param {Number} nth
   * @returns {*}
   */
  matchOrNull(predicate?: () => any, nth: number = 1): any {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (isMatch(predicate, item)) {
          if (count === nth - 1) {
            return item;
          } else {
            count++;
          }
        }
      }
      return null;
    } else {
      return this[nth - 1];
    }
  }

  /**
   * Given a list of lists, returns the first element of each list as a list
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).firstOfEach() ==> ['a','d','x']
   */
  firstOfEach(): List<any> {
    return this.nthOfEach(0);
  }

  /**
   * Given a list of lists, returns the last element of each list as a list
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).lastOfEach() ==> ['c','f','z']
   */
  lastOfEach(): List<any> {
    return this.map(
      (list) => list[(list as string | List<any>).length - 1]
    ) as List<any>;
  }

  /**
   * Given a list of lists, returns the nth element of each list as a list
   * @param {Number} n
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).nthOfEach(1) ==> ['b','e','y']
   */
  nthOfEach(n: number): List<any> {
    return this.map((list) => list[n]) as List<any>;
  }

  /**
   * Given a list of strings, joins each string with the given separator, prefix and postfix
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {String}
   */
  joinWith(
    separator: string | undefined,
    prefix: string = "",
    postfix: string = ""
  ): string {
    return `${prefix}${this.join(separator)}${postfix}`;
  }

  /**
   * Given a list of list of strings, joins each string with the given separator, prefix and postfix
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {List}
   * @example listOf(['a','b','c'], ['d','e','f'], ['x','y','z']).joinEach("-", "<", ">") ==> ['<a-b-c>','<d-e-f>','<x-y-z>']
   */
  joinEach(
    separator: any,
    prefix: string = "",
    postfix: string = ""
  ): List<string> {
    return this.map((list) =>
      toList(list as List<List<string>>).joinWith(separator, prefix, postfix)
    ) as List<any>;
  }

  /**
   * Given a list of strings, splits each element with the given separator
   * @param {String} separator
   * @returns {List}
   * @example listOf("Foo:Bar", "Baz:Test").splitEach(":") ==> [['Foo','Bar'],['Baz','Test']]
   */
  splitEach(...separators: string[]): List<string> {
    const pattern = separators.join("|");
    const regex = new RegExp(pattern, "gi");
    return this.map((list) =>
      toList((list as string).split(regex))
    ) as List<any>;
  }

  /**
   * Trims whitespace from each element in the list
   * @returns {List}
   * @example listOf("   foo", "  bar   ").trimEach() ==> ['foo','bar']
   */
  trimEach(): List<string> {
    return this.map((element) => (element as string).trim()) as List<string>;
  }

  /**
   * Returns the first non-null value produced by transform function being applied to elements of this
   * collection in iteration order, or throws NoSuchElementException if no non-null value was produced.
   * @param {Function} transform
   * @returns {List}
   */
  firstNotNullOf(transform: (argument: any) => any): List<any> {
    for (const it of this) {
      if (it && transform(it)) {
        return transform(it);
      }
    }
    const error = `No such element`;
    throw new NoSuchElementError(error);
  }

  /**
   * Returns the first non-null value produced by transform function being applied to elements of
   * this collection in iteration order, or null if no non-null value was produced.
   * @param {Function} transform
   * @returns {List}
   */
  firstNotNullOfOrNull(transform: (arg0: any) => any): List<any> | null {
    for (const it of this) {
      if (it && transform(it)) {
        return transform(it);
      }
    }
    return null;
  }

  /**
   * Halves the list into two and returns the two parts.
   * If the list contains an odd number of elements, the middle element is added to the second list.
   * To control this behaviour, set param keepMiddle to false
   * @param {Boolean} keepMiddle
   * @returns {List}
   * @example listOf("foo", "bar", "baz").halve() ==> [['foo'], ['bar','baz']]
   * @example listOf("foo", "bar", "baz").halve(false) ==> [['foo','bar'], ['baz']]
   */
  halve(keepMiddle: boolean = true): List<List<any>> {
    const middleIndex = keepMiddle
      ? Math.floor(this.length / 2)
      : Math.ceil(this.length / 2);
    const firstHalf = toList(this.slice(0, middleIndex));
    const secondHalf = toList(this.slice(middleIndex, this.length));
    return listOf(firstHalf, secondHalf);
  }

  /**
   * Returns the first half of the list
   * @param {Boolean} keepMiddle - controls whether the middle element of the list should be included in this list
   * @returns {List}
   * @example listOf("foo", "bar", "baz").firstHalf() ==> ['foo']
   * @example listOf("foo", "bar", "baz").firstHalf(false) ==> ['foo','bar']
   */
  firstHalf(keepMiddle: boolean = true): List<List<any>> {
    return this.halve(!keepMiddle).first();
  }

  /**
   * Returns the second half of the list
   * @param {Boolean} keepMiddle - controls whether the middle element of the list should be included in this list
   * @returns {List}
   * @example listOf("foo", "bar", "baz").secondHalf() ==> ['baz']
   * @example listOf("foo", "bar", "baz").secondHalf(false) ==> ['bar','baz']
   */
  secondHalf(keepMiddle: boolean = false): List<any> {
    return this.halve(keepMiddle).last();
  }

  /**
   * Returns the second half of the list
   * @param {Boolean} keepMiddle - controls whether the middle element of the list should be included in this list
   * @returns {List}
   */
  lastHalf(keepMiddle: boolean = false): List<any> {
    return this.secondHalf(keepMiddle);
  }

  /**
   * Returns a list containing all elements except first n elements
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,5,6,7).drop(3) ==> [6,7]
   */
  drop(n: number | undefined): List<any> {
    return this.slice(n) as List<any>;
  }

  /**
   * Returns a list containing all elements except last n elements
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,5,6,7).drop(3) ==> [3,4,5]
   */
  dropLast(n: number): List<any> {
    return this.slice(0, this.length - n) as List<any>;
  }

  /**
   * Returns a list containing first n elements.
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,5,6,7).take(3) ==> [3,4,5]
   */
  take(n: number): List<any> {
    return this.head(n);
  }

  /**
   * Returns a list containing last n elements.
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,5,6,7).takeLast(3) ==> [5,6,7]
   */
  takeLast(n: number): List<any> {
    return this.tail(n);
  }

  /**
   * Returns a list containing first elements satisfying the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  takeWhile(predicate: (arg0: any) => any): List<any> {
    const filtered = listOf();
    let found = false;
    for (const item of this) {
      if (predicate(item)) {
        filtered.push(item);
        found = true;
      } else {
        if (!found) {
          continue;
        } else {
          break;
        }
      }
    }
    return filtered;
  }

  /**
   * Returns a list containing last elements satisfying the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  takeLastWhile(predicate: (arg0: any) => any): List<any> {
    const filtered = listOf();
    let found = false;
    for (const item of this.reversed()) {
      if (predicate(item)) {
        filtered.push(item);
        found = true;
      } else {
        if (!found) {
          continue;
        } else {
          break;
        }
      }
    }
    return filtered.reversed();
  }

  /**
   * Returns a list containing all elements except first elements
   * that satisfy the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  dropWhile(predicate: (arg0: any) => any): List<any> {
    let dropped = false;
    const droppedList = listOf();
    for (const it of this) {
      if (predicate(it) && !dropped) {
        continue;
      }
      dropped = true;
      droppedList.push(it);
    }
    return droppedList;
  }

  /**
   * Returns a list containing all elements except last
   * elements that satisfy the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  dropLastWhile(predicate: (arg0: any) => any): List<any> {
    let dropped = false;
    const droppedList = listOf();
    for (const it of this.reversed()) {
      if (predicate(it) && !dropped) {
        dropped = true;
      } else {
        droppedList.push(it);
      }
    }
    return droppedList.reversed();
  }

  /**
   * Returns an element at the given index or throws an IndexOutOfBoundsException if the index is out of bounds of this list.
   * @param {Number} index
   * @returns {*}
   */
  elementAt(index: number): any {
    const adjustedIndex = index < 0 ? this.length + index : index;
    if (this[adjustedIndex] !== undefined) {
      return this[adjustedIndex];
    }
    const error = `Index out of bounds: ${index}`;
    throw new IndexOutOfBoundsError(error);
  }

  /**
   * Returns an element at the given index or the result of calling the defaultValue function if the index is out of bounds of this list.
   * @param {Number} index
   * @param {Function} defaultValue
   * @returns {*}
   */
  elementAtOrElse(index: number, defaultValue: () => any): any {
    const adjustedIndex = index < 0 ? this.length + index : index;
    return this[adjustedIndex] !== undefined
      ? this[adjustedIndex]
      : isFn(defaultValue)
      ? defaultValue()
      : defaultValue;
  }

  /**
   * Returns an element at the given index or null if the index is out of bounds of this list.
   * @param {Number} index
   * @returns {*}
   */
  elementAtOrNull(index: number): any {
    const adjustedIndex = index < 0 ? this.length + index : index;
    return this[adjustedIndex] !== undefined ? this[adjustedIndex] : null;
  }

  /**
   * If the list is empty, return the defaultValue. Or else return the list.
   * @param {*} value
   */
  ifEmpty(value: any): any {
    return this.isEmpty() ? value : this;
  }

  /**
   * If the list is not empty, return the defaultValue. Or else return the list.
   * @param {*} value
   */
  ifNotEmpty(value: any): any {
    return this.isNotEmpty() ? value : this;
  }

  /**
   * Returns a list containing all elements that are instances of specified type parameter .
   * @param {Class} clazz
   * @returns {List}
   */
  filterIsInstance(clazz: any): List<any> {
    if (!clazz.name) return this;
    return this.filter(
      (item) =>
        item instanceof clazz || typeof item === clazz.name.toLowerCase()
    ) as List<any>;
  }

  /**
   * Appends all elements that are instances of specified type parameter to the given destination.
   * @param {List} destination
   * @param {Class} clazz
   * @returns {List}
   */
  filterIsInstanceTo(destination: any[], clazz: any): List<any> {
    const filtered = this.filter((item) => item instanceof clazz);
    return new List(...destination.concat(filtered));
  }

  /**
   * Returns a list containing all elements not matching the given predicate.
   * @param {Function} predicate
   * @returns {List}
   * @example listOf(3,4,5,6,7).filterNot(x => x > 5) ==> [3,4,5]
   */
  filterNot(predicate: (arg0: any) => any): List<any> {
    return this.filter((it) => !isMatch(predicate, it)) as List<any>;
  }

  /**
   * Filters out all the elements in the list that are not null. Keeps undefined values.
   * @returns {List}
   * @example listOf(3,4,5,null,7,undefined).filterNotNull() ==> [3,4,5,7,undefined]
   */
  filterNotNull(): List<any> {
    return this.filter((value) => value !== null) as List<any>;
  }

  /**
   * Filters out all the elements in the list that are not null or undefined.
   * @returns {List}
   * @example listOf(3,4,5,null,7,undefined).filterNotNull() ==> [3,4,5,7,undefined]
   */
  filterNotNullish(): List<any> {
    return this.filter((value) => value != null) as List<any>;
  }

  /**
   * Filters out the first null element, but keeps the rest
   * @returns {List}
   */
  filterFirstNotNull(): List<any> {
    let filtered = false;
    let filteredList = listOf();
    for (const it of this) {
      if (it == null && !filtered) {
        filtered = true;
        continue;
      }
      filteredList.push(it);
    }
    return filteredList;
  }

  /**
   * Filters out all values that are truthy. Value of '0' is truthy be default
   * @param {Boolean} zeroTruthy - controls whether the value '0' should be treated as truthy or not
   * @returns {List}
   * @example listOf(3,4,null,7,undefined,0,8).filterTruthy() ==> [3,4,7,0,8]
   * @example listOf(3,4,null,7,undefined,0,8).filterTruthy(false) ==> [3,4,7,8]
   */
  filterTruthy(zeroTruthy: boolean = true): List<any> {
    return this.filter((it) =>
      zeroTruthy ? it === 0 || Boolean(it) : Boolean(it)
    ) as List<any>;
  }

  /**
   * Only returns values that are falsy
   * @param {Boolean} zeroTruthy - controls whether the value '0' should be treated as truthy or not
   * @returns {List}
   * @example listOf(3,4,null,7,undefined,0,8).filterFalsy() ==> [null, undefined]
   * @example listOf(3,4,null,7,undefined,0,8).filterFalsy(false) ==> [null, undefined,0]
   */
  filterFalsy(zeroTruthy: boolean = false): List<any> {
    return this.filter((it) =>
      zeroTruthy ? it !== 0 && !Boolean(it) : !Boolean(it)
    ) as List<any>;
  }

  /**
   * Appends all elements that are not null to the given destination.
   * @param {List} destination
   * @returns {List}
   */
  filterNotNullTo(destination: any[]): List<any> {
    const filtered = this.filterNotNull();
    return destination.concat(filtered) as List<any>;
  }

  /**
   * Filters out all the elements in the list that are not undefined. Keeps null values.
   * @returns {List}
   * @example listOf(3,4,5,null,7,undefined).filterNotUndefined() ==> [3,4,5,null,7]
   */
  filterNotUndefined(): List<any> {
    return this.filter((value) => value !== undefined) as List<any>;
  }

  /**
   * Appends all elements matching the given predicate to the given destination.
   * @param {List} destination
   * @param {Function} predicate
   * @returns {List}
   */
  filterTo(
    destination: any[],
    predicate: (value: any, index: number, array: any[]) => value is any
  ): List<any> {
    const filtered = this.filter(predicate);
    return new List(...destination.concat(filtered));
  }

  /**
   * Appends all elements not matching the given predicate to the given destination.
   * @param {List} destination
   * @param {Function} predicate
   * @returns {List}
   */
  filterNotTo(destination: any[], predicate: () => any): List<any> {
    const filtered = this.filterNot(predicate);
    return new List(...destination.concat(filtered));
  }

  /**
   * Flattens the list by a given depth
   * @param {Number} depth
   * @returns {List}
   */
  flatten(depth: any): List<any> {
    return this.flat(depth) as List<any>;
  }

  /**
   * Removes the list from all falsy values, including 0, undefined, null and empty strings
   * @returns {List}
   * @example listOf(1,4,null,undefined,0,8, "", "test", "foo", false, true).compact() ==> [1,4,8,'test','foo',true]
   */
  compact(): List<any> {
    return this.filter(Boolean).filter((it) => it !== "") as List<any>;
  }

  /**
   * Same as reduce, but throws an error if an initial value is not specified
   * @param {Function} callback
   * @param {*} initialValue
   * @returns {*}
   */
  fold(
    callback: (
      previousValue: any,
      currentValue: any,
      currentIndex: number,
      array: any[]
    ) => any,
    initialValue: number
  ): any {
    if (!initialValue && initialValue !== 0) {
      throw new IllegalArgumentError(`Initial value must be specified`);
    }
    return this.reduce(callback, initialValue);
  }

  /**
   * Same as a string join, but with a prefix and a postfix
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {String}
   * @example listOf('a','b','c').joinTo("-", "<", ">") ==> '<a-b-c>'
   */
  joinTo(
    list: any[],
    separator: string | undefined,
    prefix: string = "",
    postfix: string = ""
  ): List<string> {
    if (!Array.isArray(list)) {
      const message = `Argument 'list' must be a type of Array or List. Found: ${typeof list}`;
      throw new IllegalArgumentError(message);
    }
    return (toList(list) as List<string>).add(
      `${prefix}${this.join(separator)}${postfix}`
    );
  }

  /**
   * Performs an async await operation on a list and returns the resultant list.
   * Note: The result must be awaited, i.e. The 'await' keyword must be used before it
   * @param {Function} callback
   * @returns {List}
   */
  async mapAsync(
    callback: (arg0: number, arg1: any) => any
  ): Promise<List<any>> {
    let result = listOf();
    for (let [it, idx] of this.entries()) {
      const promise = await callback(it, idx);
      result.push(promise);
    }
    return result;
  }

  /**
   * Performs an async await operation on a list
   * @param {Function} callback
   */
  async forEachAsync(callback: (arg0: number, arg1: any) => any) {
    for (let [it, idx] of this.entries()) {
      await callback(it, idx);
    }
  }

  /**
   * Performs the given action on each element and returns the list itself afterwards.
   * @param {Function} callback
   * @returns {List}
   */
  onEach(
    callback: (value: any, index: number, array: any[]) => void
  ): List<any> {
    this.forEach(callback);
    return this;
  }

  /**
   * Takes in a number of arguments and excludes them from the list. Does not modify original list.
   * @returns {List}
   * @example listOf('z','a','d','b','e','c','f').exclude('a','b','c') ==> ['z','d','e','f']
   */
  exclude(...elements: any[]): List<any> {
    return this.filter((item) => !elements.includes(item)) as List<any>;
  }

  /**
   * Returns the distinct elements in a list
   * @returns {List}
   * @example listOf('a','a','b','b','e','e','f').distinct() ==> ['a','b','e','f']
   */
  distinct(): List<any> {
    return this.unique();
  }

  /**
   * Clamps all numerical values in the list between the min and max
   * @param min {Number}
   * @param max {Number}
   * @returns {List<number>}
   */
  clamp(min: number, max: number): List<number> {
    return this.map((it: T) =>
      (it as number) < min ? min : (it as number) > max ? max : (it as number)
    ) as List<number>;
  }

  /**
   * Returns a list containing only elements from the given collection having distinct keys returned by the given selector function.
   * @param {Function} keySelector
   * @returns {List}
   */
  distinctBy(keySelector: (arg0: any) => any): List<any> {
    const distinctList = listOf();
    for (const it of this) {
      const notInList = !distinctList.find(
        // eslint-disable-next-line eqeqeq
        (item) => keySelector(it) == keySelector(item)
      );
      if (notInList) {
        distinctList.push(it);
      }
    }
    return distinctList;
  }

  /**
   * Returns the unique elements in a list as a Set object
   * @returns {List}
   * @example listOf('a','a','b','b','e','e','f').distinct() ==> Set {'a','b','e','f'}
   */
  unique(): List<any> {
    return List.from(new Set(this)) as List<any>;
  }

  /**
   * Converts all elements in the list to upper case
   * @returns {List<String>}
   * @example listOf('apple','banana','carrot').toUpperCase() ==> ['APPLE','BANANA','CARROT']
   */
  toUpperCase(): List<string> {
    return this.map((arg) => (arg as string).toUpperCase()) as List<string>;
  }

  /**
   * Capitalizes the first letter of each word in the list
   * @returns {List<String>}
   */
  capitalize(): List<string> {
    return this.map((arg) => capitalize(arg as string)) as List<string>;
  }

  /**
   * Converts all elements in the list to lower case
   * @returns {List<String>}
   * @example listOf('Apple','Banana','CARROT').toLowerCase() ==> ['apple','banana','carrot']
   */
  toLowerCase(): List<string> {
    return this.map((arg) => (arg as string).toLowerCase()) as List<string>;
  }

  /**
   * Returns the sum of all elements in a list
   * @returns {Number}
   * @example listOf(1,2,3,4).sum() ==> 10
   */
  sum(initialValue = 0): number {
    return this.reduce(
      (acc, cur) => +(acc as number) + (cur as number),
      initialValue
    );
  }

  /**
   * Returns the sum of all elements in a list given a selector function
   * @returns {Number}
   * @example listOf({ item: 'apple', price: 2 }, { item: 'banana', price: 5 }).sumOf(it => it.price) ==> 7
   */
  sumOf(selector: any, initialValue = 0): any {
    if (isFn(selector))
      return (this.map(selector) as List<number>).sum(initialValue);
    if (isString(selector))
      return this.reduce((a, c) => +a + c[selector], initialValue);
  }

  /**
   * Returns the multiplication product of all elements in a list
   * @returns {Number}
   */
  product(initialValue = 1): number {
    return this.reduce(
      (acc, cur) => (acc as number) * (cur as number),
      initialValue
    );
  }

  /**
   * Returns the multiplication product of all elements in a list given a selector function
   * @returns {Number}
   */
  productOf(
    selector: (value: any, index: number, array: any[]) => unknown,
    initialValue = 1
  ): number {
    return (this.map(selector) as List<number>).product(initialValue);
  }

  /**
   * Checks whether a list is empty
   * @returns {Boolean}
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Checks whether a list is empty
   * @returns {Boolean}
   */
  isNotEmpty(): boolean {
    return this.length > 0;
  }

  /**
   * Splits a list down into smaller chunks specified by the size
   * @param {Number} size
   * @returns {List<List>}
   */
  chunked(size: number): List<List<any>> {
    if (size < 1) return this as List<any>;
    const chunkedList = listOf<any>();
    for (let i = 0; i < this.length; i += Math.abs(size)) {
      chunkedList.push(this.slice(i, i + Math.abs(size)));
    }
    return chunkedList;
  }

  /**
   * Splits a list down into a number of smaller lists all of equal size, as specified by parts
   * @param {Number} parts
   * @returns {List<List>}
   */
  segment(parts: number): List<List<any>> {
    if (parts < 1 || parts > this.length) return this as List<any>;
    const size = Math.ceil(this.length / parts);
    return this.chunked(size);
  }

  /**
   * Returns true if the list includes all the specified elements, else returns false
   * @param  {...any} elements
   * @returns {Boolean}
   */
  includesAll(...elements: any[]): boolean {
    const values = elements.flat();
    for (const value of values) {
      if (!this.includes(value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Finds all the elements that exist in both lists
   * @param {List} list
   * @returns {List}
   */
  intersect(list: any): List<any> {
    return this.intersection(list);
  }

  /**
   * Finds all the elements that exist in all lists
   * @param {List} list
   * @returns {List}
   */
  intersection(list: string | any[]): List<any> {
    return List.from(
      new Set(this.filter((item) => (list as List<any>).includes(item)))
    ) as List<any>;
  }

  /**
   * Returns the ordered difference between two lists
   * @param {List} list
   * @returns {List<{ index: Number, this: any, other: any }>}
   */
  orderedDifference(
    list: any[]
  ): List<{ index: number; this: any; other: any }> | null {
    if (!list || !(list instanceof Array)) return null;

    const diff = listOf<{ index: number; this: any; other: any }>();
    const maxLength = List.longestFirst(this, toList(list)).length;

    for (let index = 0; index < maxLength; index++) {
      if (this[index] !== list[index]) {
        diff.push({ index, this: this[index], other: list[index] });
      }
    }
    return diff;
  }

  /**
   * Finds all the elements that do not exist in both lists
   * @param {List} list
   * @returns {List}
   */
  difference(list: string | ConcatArray<any>): List<any> | null {
    if (!list || !(list instanceof Array)) return null;

    return List.from(
      new Set(
        this.concat(list).filter(
          (item) => !(this.includes(item) && list.includes(item))
        )
      )
    ) as List<any>;
  }

  /**
   * Returns a set containing all distinct elements from both collections.
   * @param {List} list
   * @returns {List}
   */
  union(list: List<any>): List<any> {
    return List.from(new Set([...this, ...list])) as List<any>;
  }

  // static from(any: any): List<any> {
  //   return toList(Array.from(any));
  // }

  /**
   * Returns the number of elements matching a given predicate.
   * If the predicate is a function, runs the function.
   * If the predicate is a value, counts the number of values.
   * If no predicate is provided, returns the length of the list.
   * @param {Function | *} predicate
   * @returns {Number}
   */
  count(predicate: (arg0: any, arg1: number) => any): number {
    if (predicate) {
      let count = 0;
      this.forEach((item, index) => {
        const match = isFn(predicate)
          ? predicate(item, index)
          : item === predicate;
        if (match) {
          count++;
        }
      });
      return count;
    } else {
      return this.length;
    }
  }

  /**
   * Returns the largest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @returns {Number}
   */
  maxOf(selector: any): any {
    if (isFn(selector)) return (this.map(selector) as List<number>).max();
    if (isString(selector))
      return (this.map((it) => it[selector]) as List<number>).max();
  }

  /**
   * Returns the first element yielding the largest value of the given function.
   * @param {Function} selector
   * @param {Boolean} findAll
   * @returns {*}
   */
  maxBy(
    selector: (value: any, index: number, array: any[]) => any,
    findAll: boolean = false
  ): any {
    const max = (this.map(selector) as List<number>).max();
    return findAll
      ? this.filter((it, i, l) => selector(it, i, l) === max)
      : this.find((it, i, l) => selector(it, i, l) === max);
  }

  /**
   * Returns the smallest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @returns {Number}
   */
  minOf(selector: any): number | undefined {
    if (isFn(selector)) return (this.map(selector) as List<number>).min();
    if (isString(selector))
      return (this.map((it) => it[selector]) as List<number>).min();
  }

  /**
   * Returns the smallest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @param {Boolean} findAll
   * @returns {Number}
   */
  minBy(
    selector:
      | ((value: any, index: number, array: any[]) => any)
      | ((arg0: any) => any),
    findAll: boolean = false
  ): number | List<number> {
    const min = (this.map(selector) as List<number>).min();
    return findAll
      ? (this.filter((it, i, l) => selector(it, i, l) === min) as any)
      : (this.find((it, i, l) => selector(it, i, l) === min) as number);
  }

  /**
   * Finds the max number in the arguments provided
   * @this {List<Number>}
   * @returns {Number}
   */
  max(): number {
    return Math.max(...(this as List<number>));
  }

  /**
   * Finds the min number in the arguments provided
   * @this {List<Number>}
   * @returns {Number}
   */
  min(): number {
    return Math.min(...(this as number[]));
  }

  /**
   * Returns a list containing the min and the max value of the numbers in the list
   * @returns {List}
   */
  minmax(): { min: number; max: number } {
    return { min: this.min(), max: this.max() };
  }

  /**
   * Returns an `Object` containing the smallest and largest values among all values produced by `selector` function applied to each element in the collection.
   * @param {Function} selector
   * @returns {Object}
   */
  minmaxOf(selector: any): object {
    return { min: this.minOf(selector), max: this.maxOf(selector) };
  }

  /**
   * Returns the first element yielding the smallest value of the given function.
   * If `findAll` is set `true`, returns all the elements that yield the smallest value.
   * @param {Function} selector
   * @param {Boolean} findAll
   * @returns {Object}
   */
  minmaxBy(selector: any, findAll: boolean = false): object {
    return {
      min: this.minBy(selector, findAll),
      max: this.maxBy(selector, findAll),
    };
  }

  /**
   * Returns the nth largest element in the list.
   * @param {Number} n
   * @returns {Number}
   */
  nthLargest(n: number): number {
    return this.sortNumbersDescending().distinct()[n - 1];
  }

  /**
   * Returns the nth largest element in the list created by applying the selector function.
   * @param {Number} n
   * @returns {Number}
   */
  nthLargestOf(selector: any, n: number): number | undefined {
    if (isFn(selector))
      return (this.map(selector) as List<number>)
        .sortNumbersDescending()
        .distinct()[n - 1];
    if (isString(selector))
      return (this.map((it) => it[selector]) as List<number>)
        .sortNumbersDescending()
        .distinct()[n - 1];
  }

  /**
   * Returns the nth smallest element in the list.
   * @param {Number} n
   * @returns {Number}
   */
  nthSmallest(n: number): number {
    return this.sortNumbers().distinct()[n - 1];
  }

  /**
   * Returns the nth smallest element in the list created by applying the selector function.
   * @param {Number} n
   * @returns {Number}
   */
  nthSmallestOf(selector: any, n: number): number | undefined {
    if (isFn(selector))
      return (this.map((it, i, l) => selector(it, i, l)) as List<number>)
        .sortNumbers()
        .distinct()[n - 1];
    if (isString(selector))
      return (this.map((it) => it[selector as string]) as List<number>)
        .sortNumbers()
        .distinct()[n - 1];
  }

  /**
   * Adds all the elements to the list
   * @param  {...any} elements
   * @returns {List}
   */
  plus(...elements: any[]): List<any> {
    return this.concat(elements) as List<any>;
  }

  /**
   * Returns a list with all the specified elements excluded
   * @param  {...any} elements
   * @returns {List}
   */
  minus(...elements: any[]): List<any> {
    return this.exclude(...elements);
  }

  /**
   * Returns a list containing successive accumulation values generated by applying
   * operation from left to right to each element and current accumulator value that
   * starts with initial value.
   * @param {*} initialValue
   * @param {Function} operation
   * @returns {List}
   */
  scan(
    operation: (arg0: any, arg1: any) => any,
    initialValue: any = 0
  ): List<any> {
    const accumulated = listOf();
    const finalValue = this.reduce((acc, cur) => {
      const operated = operation(acc, cur);
      accumulated.push(acc);
      return operated;
    }, initialValue);
    return accumulated.add(finalValue);
  }

  /**
   * Returns the single element matching the given predicate, or
   * throws exception if there is no or more than one matching element.
   * @param {Function} predicate
   * @returns {*}
   */
  single(
    predicate: (value: any, index: number, array: any[]) => value is any
  ): any {
    const found = listOf(...this.filter(predicate));
    if (found.length !== 1) {
      const error = `No single element matches the given predicate Found: (${found.length})`;
      throw new NoSuchElementError(error);
    }
    return found.first();
  }

  /**
   * Returns the single element matching the given predicate, or
   * null if element was not found or more than one element was found.
   * @param {Function} predicate
   * @returns {List}
   */
  singleOrNull(
    predicate: (value: any, index: number, array: any[]) => value is any
  ): List<any> | null {
    const found = (this as List<any>).filter(predicate) as List<any>;
    if (found.length !== 1) {
      return null;
    }
    return found.first();
  }

  /**
   * Rounds all the numbers in the list to the nearest integer
   * @param {Number} nearest
   * @this {List<Number>}
   * @returns {List<Number>}
   */
  round(nearest: number = 1): List<number> {
    return (this as List<number>).map(
      (number) => Math.round(number / nearest) * nearest
    ) as List<number>;
  }

  /**
   * Rounds all the numbers up in the arguments provided
   * @this {List<Number>}
   * @returns {List<Number>}
   */
  ceil(nearest = 1): List<number> {
    return (this as List<number>).map(
      (number) => Math.ceil(number / nearest) * nearest
    ) as List<number>;
  }

  /**
   * Rounds all the numbers down in the arguments provided
   * @this {List<Number>}
   * @returns {List<Number>}
   */
  floor(nearest = 1): List<number> {
    return this.map(
      (number) => Math.floor((number as number) / nearest) * nearest
    ) as List<number>;
  }

  /**
   * Returns whether none of the items match the given predicate
   * @param {Function} predicate
   * @returns {Boolean}
   */
  none(predicate?: () => any): boolean {
    if (predicate) {
      for (const item of this) {
        if (isMatch(predicate, item)) {
          return false;
        }
      }
      return true;
    } else {
      return this.length === 0;
    }
  }

  findDuplicates() {
    return List.from(
      Object.entries(this.counts())
        .filter(([_, value]) => value > 1)
        .map((it) => it[0])
    );
  }

  /**
   * Returns every index of the occurence of the element
   * @param {*} element
   * @returns {List}
   */
  indicesOf(element: any): List<any> {
    const indices = listOf();
    for (let i = 0; i < this.length; i++) {
      if (this[i] === element) {
        indices.push(i);
      }
    }
    return indices;
  }

  /**
   * Deletes any given number of elements from a list. Mutates the original list.
   * @param {*} elements
   * @returns {List}
   */
  delete(...elements: any[]): List<any> {
    for (const element of elements) {
      for (let i = this.length; i >= 0; i--) {
        if (this[i] === element) {
          this.splice(i, 1);
        }
      }
    }
    return this;
  }

  /**
   * Returns a randomly chosen element within the list
   * @returns {*}
   */
  random(): any {
    const index = Math.floor(Math.random() * this.length);
    return this[index];
  }

  /**
   * Returns a randomly chosen sample of elements within the list
   * @param {Number} sampleSize
   * @param {Boolean} allowRepeats
   * @returns {List}
   */
  sample(sampleSize: number, allowRepeats: boolean = true): List<any> {
    const sample = listOf();

    if (allowRepeats) {
      while (sample.length < sampleSize) {
        const index = Math.floor(Math.random() * this.length);
        sample.push(this[index]);
      }
    } else {
      const duplicateList = this.slice();
      if (sampleSize > this.length) {
        const error = `Sample size '${sampleSize}' cannot be greater than list length '${this.length}'`;
        throw new IllegalArgumentError(error);
      }
      while (sample.length < sampleSize) {
        const index = Math.floor(Math.random() * duplicateList.length);
        const elem = duplicateList[index];
        duplicateList.splice(index, 1);
        sample.push(elem);
      }
    }
    return sample;
  }

  /**
   * Returns a new list with its original elements randomly shuffled
   * @returns {List}
   */
  shuffled(): List<any> {
    return this.sort(() => Math.random() - 0.5);
  }

  /**
   * Casts each item in the list to its boolean value
   * @returns {List<Boolean>}
   */
  toBoolean(): List<boolean> {
    return (this as List<any>).map(Boolean) as List<boolean>;
  }

  /**
   * Checks whether all the elements in the list matches a given element
   * @param {Function} predicate
   * @param {*} thisArg
   * @returns {Boolean}
   */
  all(
    predicate: (value: any, index: number, array: any[]) => value is any,
    thisArg: any = undefined
  ): boolean {
    return this.every(predicate, thisArg);
  }

  /**
   * Checks whether any of the elements in the list matches a given element
   * @param {Function} predicate
   * @param {*} thisArg
   * @returns {Boolean}
   */
  any(
    predicate: (value: any, index: number, array: any[]) => unknown,
    thisArg: any = undefined
  ): boolean {
    return this.some(predicate, thisArg);
  }

  /**
   * Groups the items in a unique key-value pair based on the key selector
   * @param {Function} keySelector
   * @returns {Object}
   * @example
   */
  groupBy(keySelector: (arg0: any) => any): { [key: string]: any } {
    const grouped = {};
    const distinctProperties: List<string> = List.from(
      new Set(this.map(keySelector))
    ) as List<string>;
    distinctProperties.forEach((property) => {
      grouped[property] = this.filter((item) => keySelector(item) === property);
    });
    return grouped;
  }

  /**
   * Groups the items in a unique key-value pair based on the key selector
   * @param {Object} destination
   * @param {Function} keySelector
   * @returns {Object}
   * @example
   */
  groupByTo(
    destination: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
    keySelector: any
  ): object {
    const grouped = this.groupBy(keySelector);
    for (const key of Object.keys(grouped)) {
      if (destination.hasOwnProperty(key)) {
        destination[key] = [...destination[key], ...grouped[key]];
      } else {
        destination[key] = grouped[key];
      }
    }
    return destination;
  }

  /**
   * Performs a binary search on a sorted list of elements
   *
   * @param {*} element
   * @param {Number} fromIndex
   * @param {Number} toIndex
   * @returns {*}
   */
  binarySearch(
    element: number,
    fromIndex: number = 0,
    toIndex: number = this.length
  ): any {
    const halfIndex = Math.floor((toIndex - fromIndex) / 2 + fromIndex);
    if (element === this[halfIndex]) return halfIndex;
    if (Math.abs(fromIndex - toIndex) === 1) return null;
    return element < (this as List<number>)[halfIndex]
      ? this.binarySearch(element, fromIndex, halfIndex)
      : this.binarySearch(element, halfIndex, toIndex);
  }

  /**
   * Performs a binary search on a sorted list of elements based on the keySelector
   *
   * @param {*} element
   * @param {Function} keySelector
   * @param {Number} fromIndex
   * @param {Number} toIndex
   * @returns {*}
   */
  binarySearchBy(
    element: number,
    keySelector: (arg0: any) => any,
    fromIndex: number = 0,
    toIndex: number = this.length
  ): any {
    const halfIndex = Math.floor((toIndex - fromIndex) / 2 + fromIndex);
    const keySelect = keySelector(this[halfIndex]);
    if (element === keySelect) return halfIndex;
    if (Math.abs(fromIndex - toIndex) === 1) return null;
    return element < keySelect
      ? this.binarySearchBy(element, keySelector, fromIndex, halfIndex)
      : this.binarySearchBy(element, keySelector, halfIndex, toIndex);
  }

  /**
   * Performs a map on the list and appends the result to a destination list
   * @param {List} destination
   * @param {Function} transform
   */
  mapTo(
    destination: any[],
    transform: (value: any, index: number, array: any[]) => unknown
  ) {
    const mapped = this.map(transform);
    return new List(...destination.concat(mapped));
  }

  /**
   * Performs a map on all elements in the list that are not null or undefined
   * @param {Function} transform
   * @returns {List}
   */
  mapNotNull(transform: (arg0: any, arg1: number) => any): List<any> {
    let results = listOf();
    for (let it = 0; it < this.length; it++) {
      if (this[it] !== null && this[it] !== undefined) {
        const result = transform(this[it], it);
        results.push(result);
      }
    }
    return results;
  }

  /**
   * Performs a map on all elements in the list that are not null or undefined and appends it to the destination
   * @param {List} destination
   * @param {Function} transform
   * @returns {List}
   */
  mapNotNullTo(
    destination: any[],
    transform: (arg0: any, arg1: number) => any
  ): List<any> {
    if (!Array.isArray(destination)) {
      const error = `Parameter 'destination' must be an Array or a List`;
      throw new IllegalArgumentError(error);
    }
    let results = listOf();
    for (let it = 0; it < this.length; it++) {
      if (this[it] !== null && this[it] !== undefined) {
        const promise = transform(this[it], it);
        results.push(promise);
      }
    }
    return new List(...destination.concat(results));
  }

  /**
   * Given two lists, merges them into a map
   * @param {List} other
   * @returns {Map}
   */
  mapWith(other: string | any[]): Map<any, any> {
    const map = new Map();
    for (let i = 0; i < Math.min(this.length, other.length); i++) {
      map.set(this[i], other[i]);
    }
    return map;
  }

  /**
   * Converts a list of lists to an object
   * @returns {Object}
   */
  toObject(): object {
    return Object.fromEntries(this as List<List<any>>);
  }

  /**
   * Converts a list of lists to a map
   * @returns {Map}
   * @example [['a',1], ['b',2], ['c',3]].toMap()
   */
  toMap(): Map<any, any> {
    const map = new Map();
    for (let i = 0; i < this.length; i++) {
      map.set(this[i][0], this[i][1]);
    }
    return map;
  }

  /**
   * Returns a list of snapshots of the window of the given size sliding along
   * this collection with the given step, where each snapshot is a list.
   * @param {Number} size
   * @param {Number} step
   * @param {Boolean} partialWindows
   * @returns {List<List<Number>>}
   */
  windowed(
    size: number,
    step: number = 1,
    partialWindows: boolean = false
  ): List<List<number>> {
    if (size < 1 || step < 1) {
      throw new IllegalArgumentError(
        `Both 'size' and 'step' must be greater than zero. Found: size ${size} step ${step}`
      );
    }
    const output = listOf<any>();
    let [start, end] = [0, size];

    do {
      output.push(this.slice(start, end));
      start += step;
      end += step;
    } while (partialWindows ? start < this.length : end <= this.length);

    return output;
  }

  /**
   *
   * @returns {List}
   */
  unzip(): List<any> {
    const maxLength = Math.max(...this.map((arr) => (arr as List<any>).length));
    const result = listOf<any>(...List.from({ length: maxLength }, () => []));
    this.forEach((arr) => {
      for (let i = 0; i < maxLength; i++) {
        result[i].push(arr[i]);
      }
    });
    return result;
  }

  /**
   * Given two or more lists, returns pairs of one element in one list with
   * another element in the other list
   * @param {...List} lists
   * @returns {List}
   */
  zip(...lists: any[]): List<any> {
    return toList(
      this.map((item, index) => [
        item,
        ...toList(lists.map((list) => list[index])),
      ])
    );
  }

  /**
   * Given two lists, merges them into an object
   * @param {List} other
   * @returns {Object}
   */
  pairWith(other: string | any[]): { [key: string]: any } {
    const obj = {};
    for (let i = 0; i < Math.min(this.length, other.length); i++) {
      obj[this[i] as string] = other[i];
    }
    return obj;
  }

  /**
   * Splits the original collection into pair of lists, where first list
   * contains elements for which predicate yielded true, while second list
   * contains elements for which predicate yielded false.
   * @param {Function} predicate
   * @returns {List<List<any>>}
   */
  partition(predicate: (arg0: any) => any): List<List<any>> {
    const listTrue = listOf();
    const listFalse = listOf();
    for (const item of this) {
      if (isMatch(predicate, item)) {
        listTrue.push(item);
      } else {
        listFalse.push(item);
      }
    }
    return listOf(listTrue, listFalse);
  }

  /**
   * Repeats the list n times and returns the result
   * @param {Number} n
   * @returns {List}
   * @example listOf(3,4,8,7).repeat(3) ==> [3,4,8,7,3,4,8,7,3,4,8,7]
   */
  repeat(n: number = 1): List<any> {
    const repeatedList = listOf();
    for (const _ of List.range(0, n - 1)) {
      repeatedList.push(...this);
    }
    return repeatedList;
  }

  /**
   * Returns the reverse of the list without modifying the original
   * @returns {List}
   */
  reversed(): List<any> {
    return toList(listOf(...this).reverse());
  }

  /**
   * Searches for a string in an array and returns the search results as a list
   * @param {String} query
   * @returns {List}
   */
  search(query: string, caseSensitive = false): List<string> {
    if (caseSensitive)
      return (this as List<string>).filter((element) =>
        String(element).includes(query)
      ) as List<string>;
    return (this as List<string>).filter((element) =>
      (element as string).toLowerCase().includes(query.toLowerCase())
    ) as List<string>;
  }

  /**
   * Returns a list of all elements sorted according to natural sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortBy(selector: (arg0: this[number]) => string | number): List<any> {
    return [...this].sort((a, b) =>
      selector(a) > selector(b) ? 1 : -1
    ) as List<any>;
  }

  /**
   * Returns a list of all elements sorted according to natural sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortedBy(selector: any): List<any> {
    return this.sortBy(selector);
  }

  /**
   * Returns a list of all elements sorted by descending order according to natural
   * sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortByDescending(selector: (arg0: this[number]) => number): List<any> {
    return [...(this as List<any>)].sort((a, b) =>
      selector(a) > selector(b) ? -1 : 1
    ) as List<any>;
  }

  /**
   * Returns a list of all elements sorted by descending order according to natural
   * sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortedByDescending(selector: (arg0: any) => any): List<T> {
    return this.sortByDescending(selector);
  }

  /**
   * Sorts numbers in ascending order
   * @returns {List}
   * @example listOf(3,4,8,7).sortNumbers() ==> [3,4,7,8]
   */
  sortNumbers(): List<number> {
    return this.sort((a, b) => (a as number) - (b as number)) as List<number>;
  }

  /**
   * Sorts numbers in descending order
   * @returns {List}
   * @example listOf(3,4,8,7).sortNumbersDescending() ==> [8,7,4,3]
   */
  sortNumbersDescending(): List<number> {
    return this.sort((a, b) => (b as number) - (a as number)) as List<number>;
  }

  /**
   * Adds the element to the list and returns the list
   * @param {any} elements
   * @returns {List}
   * @example listOf(3,4,8,7).add(6,7) ==> [3,4,8,7,6,7]
   */
  add(...elements: any[]): List<any> {
    for (const element of elements) {
      this.push(element);
    }
    return this;
  }

  /**
   * Returns the average of the supplied list
   * @returns {Number}
   * @example listOf(1,3,5,7,9).average() ==> 5
   */
  average(): number {
    return this.mean();
  }

  /**
   * Returns the average of the supplied list
   * @returns {Number}
   * @example listOf(1,3,5,7,9).mean() ==> 5
   */
  mean(): number {
    return (
      this.reduce((acc, cur) => +(acc as number) + (cur as number), 0) /
      this.length
    );
  }

  /**
   * Returns the median of the supplied list
   * @returns {Number}
   * @example listOf(3,4,8,7,6).median() ==> 6
   */
  median(): any {
    const sorted = this.sort((a, b) => (a as number) - (b as number));
    const idx = Math.floor(sorted.length / 2);
    return sorted[idx];
  }

  /**
   * Returns the mode (most frequently occurring element) of the list
   * @returns {*}
   * @example listOf(3,4,8,8,7,6).mode() ==> 8
   */
  mode(): any {
    const counts = this.counts();
    const max = Math.max(...Object.values(counts));
    for (const [key, value] of Object.entries(counts)) {
      if (value === max) {
        return key;
      }
    }
  }

  /**
   * Calculate the variance of a list of numbers
   * @returns {Number}
   * @example listOf(3,4,8,7,6).variance() ==> 3.44
   */
  variance(): number {
    const mean = this.mean();
    return (
      this.map((n) => ((n as number) - mean) ** 2).reduce((a, b) => +a + b) /
      this.length
    );
  }

  /**
   * Calculate the standard deviation of a list of numbers
   * @returns {Number}
   * @example listOf(3,4,8,7,6).stdev() ==> 1.8547236990991407
   */
  stdev(): number {
    return Math.sqrt(this.variance());
  }

  /**
   * Returns all the odd numbers in the list
   * @returns {List}
   * @example listOf(1,2,4,7,9).filterOddNumbers() ==> [1,7,9]
   */
  filterOddNumbers(): List<number> {
    return (this as List<number>).filter(
      (it) => (it as number) % 2 === 1
    ) as List<number>;
  }

  /**
   * Returns all the even numbers in the list
   * @returns {List}
   * @example listOf(1,2,4,7,9).filterEvenNumbers() ==> [2,4]
   */
  filterEvenNumbers(): List<number> {
    return (this as List<number>).filter((it) => it % 2 === 0) as List<number>;
  }

  /**
   * Returns all the prime numbers in the list
   * @returns {List}
   * @example listOf(1,3,5,7,9).filterPrimeNumbers() ==> [3,5,7]
   */
  filterPrimeNumbers(): List<number> {
    return (this as List<number>).filter((num) => {
      for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    }) as List<number>;
  }

  /**
   * Counts all unique occurences in the list and returns them as an object along with the count
   * @returns {Object}
   * @example listOf('apple', 'apple', 'orange', 'banana', 'banana', 'banana').counts() ==> { apple: 2, orange: 1, banana: 3 }
   */
  counts(): { [key: string]: any } {
    const cts = {};
    for (let i = 0; i < this.length; i++) {
      cts[this[i] as string] =
        (this as List<string>)[i] in cts
          ? +Number(cts[(this as List<string>)[i]]) + 1
          : 1;
    }
    return cts;
  }

  /**
   * Returns an object containing key-value pairs provided by transform function applied to each elements of the list
   * @param {Function} transform
   * @returns {Object}
   * @example listOf('apple','banana','orange').associate(fruit => fruit.toUpperCase()) ==> { apple: 'APPLE', banana: 'BANANA', orange: 'ORANGE' }
   */
  associate(transform: (arg0: any, arg1: number) => any): object {
    const obj = {};
    for (const [idx, item] of this.entries()) {
      obj[item as string] = transform(item, idx);
    }
    return obj;
  }

  associateBy(keySelector: (arg0: any) => string | number) {
    const obj = {};
    for (const item of this) {
      obj[keySelector(item)] = item;
    }
    return obj;
  }

  /**
   * Returns a Map where keys are elements from the given collection and values are produced by the
   * valueSelector function applied to each element.
   * @param {Function} valueSelector
   * @returns {Map}
   */
  associateWith(valueSelector: (arg0: any) => any): Map<any, any> {
    const map = new Map();
    for (const it of this) {
      map.set(it, valueSelector(it));
    }
    return map;
  }

  /**
   * Prefixes each element in the list with a specified string
   * @param {String} string
   * @returns {List<String>}
   */
  prefix(string: any): List<string> {
    return this.map((item) => `${string}${item}`) as List<string>;
  }

  /**
   * Postfixes each element in the list with a specified string
   * @param {String} string
   * @returns {List<String>}
   */
  postfix(string: any): List<string> {
    return this.map((item) => `${item}${string}`) as List<string>;
  }

  /**
   * Multiplies each element in the list with a given number
   * @param {Number} num
   * @returns {List}
   * @example listOf(3,2,1).multiplicationBy(2) ==> [6,4,2]
   */
  multiplyBy(num: number | any[]): List<number> {
    if (Array.isArray(num)) {
      return this.map(
        (element, index) => (element as number) * (num[index] || 1)
      ) as List<number>;
    }
    return this.map((n) => (n as number) * num) as List<number>;
  }

  /**
   * Divides each element in the list with a given number
   * @param {Number} num
   * @returns {List}
   * @example listOf(4,8,10).divisionBy(2) ==> [2,4,5]
   */
  divideBy(num: number | any[]): List<any> {
    if (Array.isArray(num)) {
      return this.map(
        (element, index) => (element as number) / (num[index] || 1)
      ) as List<any>;
    }
    return this.map((n) => (n as number) / num) as List<any>;
  }

  /**
   * Raises each element in the list to the power of a given number
   * @param {Number} number
   * @returns {List}
   * @example listOf(1,2,3).power(2) ==> [1,4,9]
   */
  power(number: number): List<number> {
    return this.map((n) => (n as number) ** number) as List<number>;
  }

  /**
   * Sets the decimal places of each number in the list
   * @param {Number} digits
   * @returns {List}
   * @example listOf(1,2,3).toFixed(2) ==> ['1.00', '2.00', '3.00']
   */
  toFixed(digits: number): List<string> {
    return (this as List<number>).map((n) => n.toFixed(digits)) as List<string>;
  }

  /**
   * Converts a list of numbers into english
   * @returns {List}
   */
  toEnglish(): List<string> {
    return this.map((num) =>
      !isNaN(num as any) ? numToEnglish(num as number) : (num as any)
    ) as List<string>;
    function numToEnglish(num: number) {
      const dictionary = {
        1: "One",
        2: "Two",
        3: "Three",
        4: "Four",
        5: "Five",
        6: "Six",
        7: "Seven",
        8: "Eight",
        9: "Nine",
        10: "Ten",
        11: "Eleven",
        12: "Twelve",
        13: "Thirteen",
        14: "Fourteen",
        15: "Fifteen",
        16: "Sixteen",
        17: "Seventeen",
        18: "Eighteen",
        19: "Nineteen",
        20: "Twenty",
        30: "Thirty",
        40: "Forty",
        50: "Fifty",
        60: "Sixty",
        70: "Seventy",
        80: "Eighty",
        90: "Ninety",
        100: "Hundred",
      };
      const bigNums = listOf(
        "Thousand",
        "Million",
        "Billion",
        "Trillion",
        "Quadrillion",
        "Quintrillion",
        "Sextillion",
        "Septillion",
        "Octillion",
        "Nonillion",
        "Decillion"
      );
      const sign = Math.sign(num);
      const number = Math.abs(num);
      if (number === 0) {
        return "Zero";
      }
      const [integer, decimal] = number.toString().split(".");
      const chunks = toList(integer.split("")).reversed().chunked(3);

      const lastDigits = (num: number, n: number): string =>
        num.toString().slice(num.toString().length - n);

      function parseThreeDigits(num: number) {
        if (num < 10) {
          return dictionary[parseInt(String(num))];
        }
        const twoPlaces = lastDigits(num, 2);
        let twoPlacesEnglish = dictionary[twoPlaces];
        if (!twoPlacesEnglish) {
          const [tens, ones] = twoPlaces.split("");
          const tensEnglish = dictionary[parseFloat(tens) * 10] || "";
          const onesEnglish = dictionary[ones] || "";
          twoPlacesEnglish =
            parseInt(twoPlaces) > 0 ? `${tensEnglish} ${onesEnglish}` : "";
        }
        let hundredth = 0,
          hundredthEnglish: string;
        if (num >= 100) {
          hundredth = Math.floor(num / 100);
          hundredthEnglish = `${dictionary[hundredth]} ${
            dictionary[String((hundredth * 100) / hundredth)]
          }${parseFloat(twoPlaces) > 0 ? " and " : ""}`;
          return `${hundredthEnglish}${twoPlacesEnglish}`;
        }
        return twoPlacesEnglish;
      }

      const thousandthChunks = chunks.map((chunk) =>
        parseThreeDigits(Number(chunk.reverse().join("")))
      );

      const integerEnglish =
        (sign < 0 ? "Minus " : "") +
        thousandthChunks
          .map((numberEnglish, index) => {
            if (index === 0) return numberEnglish;
            if (numberEnglish) return `${numberEnglish} ${bigNums[index - 1]}`;
          })
          .filter(Boolean)
          .reverse()
          .join(", ");

      const decimalEnglish =
        decimal &&
        decimal
          .split("")
          .map((digit) => {
            if (digit === "0") return "Zero";
            return dictionary[digit];
          })
          .join(" ");

      if (decimal) {
        return `${integerEnglish} Point ${decimalEnglish}`;
      }
      return integerEnglish;
    }
  }

  /**
   * Replaces every occurence of an element in a list with a new value
   * @param {any} element - the element to replace
   * @param {any} replaced - the replacer
   * @param {any} count - indicates how many elements to replace, default is -1 which indicates replace all
   * @returns {List}
   * @example  listOf(1,2,3,4,2).replace(2,7) ==> [1,7,3,4,7]
   * @example  listOf(1,2,3,4,2).replace(2,7,1) ==> [1,7,3,4,2]
   */
  replace(element: any, replaced: any, count: any = -1): List<any> {
    let replaceCount = 0;
    return this.map((item) => {
      if (item === element) {
        if (replaceCount < count || count < 0) {
          replaceCount++;
          return replaced;
        }
      }
      return item;
    }) as List<any>;
  }

  /**
   * Checks if an item exists in the list that matches the given predicate
   * @param {Function} predicate
   * @returns {Boolean}
   */
  exists(predicate?: any): boolean {
    for (const item of this) {
      if (isMatch(predicate, item)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the first 'n' elements in a list
   * @param {Number} n
   * @returns {List}
   */
  head(n: number = 1): List<any> {
    return n > this.length ? this : (this.slice(0, n) as List<any>);
  }

  /**
   * Returns the last 'n' elements in a list
   * @param {Number} n
   * @returns {List}
   */
  tail(n: number = 1): List<number> {
    return n > this.length
      ? this
      : (this.slice(this.length - n, this.length) as List<any>);
  }

  /**
   * Clears all elements from the list
   * @returns {List}
   */
  clear(): List<any> {
    while (this.length) {
      this.pop();
    }
    return this;
  }

  /**
   * Returns a list containing the "types" of each element in the list
   * @param {Boolean} primitives - Controls whether the function should return primitive types or class names if they exist
   * @returns {List}
   */
  instanceTypes(primitives: boolean = false): List<string> {
    return this.map((item) =>
      typeof item === "object" && item !== null && !primitives
        ? item.constructor.name
        : typeof item
    ) as List<string>;
  }

  /**
   * Returns whether the list is a list of numbers
   * @returns {Boolean}
   */
  isNumberList(): boolean {
    return this.every((item) => !isNaN(item as number));
  }

  /**
   * Checks if the given object is a List
   * @param {*} object
   * @returns {Boolean}
   */
  static isList(object: any): boolean {
    return object instanceof List;
  }

  /**
   * Generates a list of random floating point numbers between 0 and 1
   * @param {Number} size - The size of the list
   * @returns {List}
   */
  static generateRandomNumbers(size: number = 1): List<number> {
    return List.from(Array(size).fill(null).map(Math.random)) as List<number>;
  }

  /**
   * Generates a list of random integers between min and max
   * @param {Number} size - The size of the list
   * @param {Number} min - Min value
   * @param {Number} max - Max value
   * @returns {List}
   */
  static generateRandomIntegers(
    size: number = 1,
    min: number = Number.MIN_SAFE_INTEGER,
    max: number = Number.MAX_SAFE_INTEGER
  ): List<number> {
    return List.from(
      Array(size)
        .fill(null)
        .map(() => Math.floor(Math.random() * (max - min + 1) + min))
    ) as List<number>;
  }

  /**
   * Returns a list of the longest lists provided in the arguments
   * @param  {...List} lists
   * @returns {List<List>}
   */
  static longest(...lists: any[]): List<List<any>> {
    let longestLength = 0;
    const longestLists = listOf<any>();

    for (const list of lists) {
      if (list.length > longestLength) {
        longestLength = list.length;
        longestLists.length = 0; // Clear the array
        longestLists.push(list);
      } else if (list.length === longestLength) {
        longestLists.push(list);
      }
    }

    return longestLists;
  }

  /**
   * Returns longest first list in the provided arguments
   * @param  {...List} lists
   * @returns {List}
   */
  static longestFirst(...lists: any[]): List<List<any>> {
    let longestList = lists[0];
    for (const list of lists) {
      if (list.length > longestList.length) {
        longestList = list;
      }
    }
    return longestList;
  }

  longest() {
    let longestElement = String(this[0]);
    for (const item of this) {
      if (String(item).length > longestElement.length) {
        longestElement = item as string;
      }
    }
    return longestElement;
  }

  longestFirst() {
    return List.longestFirst(...this);
  }

  longestLast() {
    return List.longestLast(...this);
  }

  get maxLength() {
    return this.longestFirst().length;
  }

  get minLength() {
    return List.shortestFirst(...this).length;
  }

  /**
   * Returns a list of the longest lists provided in the arguments
   * @param  {...List} lists
   * @returns {List}
   */
  static longestLast(...lists: any[]): List<List<any>> {
    let longestList = lists[0];
    for (const list of lists) {
      if (list.length >= longestList.length) {
        longestList = list;
      }
    }
    return longestList;
  }

  /**
   * Returns a list of the longest lists provided in the arguments
   * @param  {...List} lists
   * @returns {List<List>}
   */
  static shortest(...lists: (string | any[])[]): List<List<any>> {
    let shortestLength = lists[0].length;
    const shortestLists = listOf<any>();

    for (const list of lists) {
      if (list.length < shortestLength) {
        shortestLength = list.length;
        shortestLists.length = 0; // Clear the array
        shortestLists.push(list);
      } else if (list.length === shortestLength) {
        shortestLists.push(list);
      }
    }

    return shortestLists;
  }

  /**
   * Returns longest first list in the provided arguments
   * @param  {...List} lists
   * @returns {List}
   */
  static shortestFirst(...lists: any[]): List<any> {
    let longestList = lists[0];
    for (const list of lists) {
      if (list.length > longestList.length) {
        longestList = list;
      }
    }
    return longestList;
  }

  /**
   * Returns a list of the longest lists provided in the arguments
   * @param  {...List} lists
   * @returns {List}
   */
  static shortestLast(...lists: any[]): List<any> {
    let longestList = lists[0];
    for (const list of lists) {
      if (list.length >= longestList.length) {
        longestList = list;
      }
    }
    return longestList;
  }

  /**
   * Generates a range of numbers incrementing or decrementing by step
   * @param {Number} start
   * @param {Number} end
   * @param {Number} step
   * @returns {List}
   */
  static range(start: number, end: number, step: number = 1): List<number> {
    if (isNaN(start) || isNaN(end) || isNaN(step)) {
      const message = `Invalid range parameters`;
      throw new IllegalArgumentError(message);
    }
    const arr = listOf<number>();
    for (
      let i = start;
      start < end ? i < end : i > end;
      start < end ? (i += step) : (i -= step)
    ) {
      arr.push(i);
    }
    return arr;
  }

  /**
   * Repeats the list a given number of times and returns the resultant list
   * @param {Function} callback
   * @param {Number} times
   * @returns {List}
   */
  static repeat(callback: () => any, times: number = 1): List<any> {
    return listOf(
      ...Array(times)
        .fill(null)
        .map(() => (isFn(callback) ? callback() : callback))
    );
  }

  static emptyList() {
    return listOf();
  }

  /**
   * Converts a list to an array
   * @returns {Array}
   */
  toArray(): Array<any> {
    return Array.from(this);
  }

  /**
   * Converts the list to a Set
   * @returns {Set}
   */
  toSet(): Set<any> {
    return new Set(this);
  }

  /**
   * Checks whether the list is longer than a given list
   * @param {List} list
   * @returns {Boolean}
   */
  isLongerThan(list: string | any[]): boolean {
    return this.length > list.length;
  }

  /**
   * Checks whether the list is shorter than a given list
   * @param {List} list
   * @returns {Boolean}
   */
  isShorterThan(list: string | any[]): boolean {
    return this.length < list.length;
  }

  /**
   * Returns true if all the specified lists are of equal lengths, else returns false
   * @param {List} lists
   * @returns {Boolean}
   */
  isEqualLengthTo(...lists: any[]): boolean {
    return (
      toList(lists.map((it) => it.length))
        .add(this.length)
        .distinct().length === 1
    );
  }
}

class SortedSet extends Set {
  constructor(arrayLikeObject: any[]) {
    const list = listOf(...arrayLikeObject);
    super(list.isNumberList() ? list.sortNumbers() : list.sort());
  }
}

class OrderedDifference {
  list: any[];

  constructor(list: any[]) {
    this.list = list.map(
      (item: { index: any; this: any; other: any }) =>
        new OrderedDifference.Diff(item.index, item.this, item.other)
    );
  }

  static Diff = class {
    index: number;
    this: any;
    other: any;
    constructor(index: number, thisValue: any, otherValue: any) {
      this.index = index;
      this.this = thisValue;
      this.other = otherValue;
    }
  };
}

class ImmutableList<T> extends List<T> {
  constructor(...args: any) {
    Object.freeze(super(...args));
  }
}

class Triple extends Array {
  constructor(first: any, second: any, third: any) {
    super();
    this[0] = first;
    this[1] = second;
    this[2] = third;
    Object.freeze(this);
  }

  get first() {
    return this[0];
  }

  get second() {
    return this[1];
  }

  get third() {
    return this[2];
  }

  toList() {
    return listOf(this[0], this[1], this[2]);
  }
}

class Pair extends Array {
  constructor(key: string | number | undefined, value: any) {
    super();
    this[0] = key;
    this[1] = value;
  }

  get first() {
    return this[0];
  }

  get second() {
    return this[1];
  }

  toList() {
    return listOf(this[0], this[1]);
  }
}

/**
 * If the predicate argument is a function, invokes the function with the given element.
 * If it's not a function, checks whether the predicate is equal to element.
 * @param {Function} predicate
 * @param {*} element
 * @returns {Boolean}
 */
function isMatch(predicate: (arg0: any) => any, element: any): boolean {
  return isFn(predicate) ? predicate(element) : predicate === element;
}

/**
 * Checks if the argument is a function
 * @param {*} argument
 * @returns {Boolean}
 */
function isFn(argument: any): boolean {
  return typeof argument === "function";
}

/**
 *
 * @param {Array} argumentsArray
 * @returns {Boolean}
 */
function isObjectArg(argumentsArray: string | any[]): boolean {
  return (
    argumentsArray.length === 1 &&
    !Array.isArray(argumentsArray[0]) &&
    typeof argumentsArray[0] === "object"
  );
}

/**
 * Checks if the argument is a string
 * @param {*} argument
 * @returns {Boolean}
 */
function isString(argument: any): boolean {
  return typeof argument === "string" || argument instanceof String;
}

function listOf<T>(...args: any[]): List<T> {
  if (args.length === 1) {
    return new List<T>().fill(args[0]);
  }
  return new List<T>(...args);
}

function emptyList() {
  return List.emptyList();
}

function setOf(...args: any[]) {
  return new Set([...args]);
}

function sortedSetOf(...args: any[]) {
  return new SortedSet([...args]);
}

function listOfType(clazz: any) {
  return (...items: any[]) => {
    items.forEach((item, idx) => {
      const isInstance =
        item instanceof clazz || typeof item === clazz.name.toLowerCase();
      if (!isInstance) {
        const error = `Item at index '${idx}' of type '${typeof item}' is not assignable to type: '${
          clazz.name
        }'`;
        throw new IllegalArgumentError(error);
      }
    });
    return listOf(...items);
  };
}

function pairOf(arg1: any, arg2: any) {
  if (arguments.length !== 2) {
    const error = `Argument length of two expected`;
    throw new IllegalArgumentError(error);
  }
  return new Pair(arg1, arg2);
}

function tripleOf(first: any, second: any, third: any) {
  if (arguments.length !== 3) {
    const error = `Argument length of three expected`;
    throw new IllegalArgumentError(error);
  }
  return new Triple(first, second, third);
}

function mapOf(...pairs: any[]) {
  const map = new Map();
  const isPairs = pairs.every((pair) => pair instanceof Pair);
  if (!isPairs) {
    const foundTypes = pairs
      .filter((pair) => !(pair instanceof Pair))
      .map((it, idx) => `${it.constructor.name} at ${idx}`);
    throw new IllegalArgumentError(
      `Arguments must be of type 'Pair'. Found:\n\t- ${foundTypes.join(
        "\n\t- "
      )}`
    );
  }
  pairs.forEach((pair) => {
    map.set(pair.first, pair.second);
  });
  return map;
}

class Utils {
  static uuid() {
    const chars = toList("0123456789abcdef".split(""));
    const lengths = [8, 4, 4, 4, 12];
    return lengths
      .map((len) =>
        Array(len)
          .fill(null)
          .map(() => chars.random())
          .join("")
      )
      .join("-");
  }
}

function toList(any: any[]): List<any> {
  return new List(...any);
}

function capitalize(string: string, joiner: string = " "): string {
  const separators = [" ", "-", ":", "_"];
  const pattern = separators.join("|");
  const regex = new RegExp(pattern, "gi");
  return string
    .split(regex)
    .map(
      (part) =>
        (part[0] ? part[0].toUpperCase() : "") + part.slice(1).toLowerCase()
    )
    .join(joiner);
}

export {
  listOf,
  toList,
  listOfType,
  emptyList,
  setOf,
  sortedSetOf,
  pairOf,
  tripleOf,
  mapOf,
  ImmutableList,
  Pair,
  Triple,
  List,
  SortedSet,
  Utils,
};
