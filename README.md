# TrueJSON

> Respectful JSON serialization & deserialization for JavaScript

[![License](https://img.shields.io/npm/l/make-coverage-badge.svg)](https://opensource.org/licenses/MIT)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)

[comment]: <> ([![npm]&#40;https://img.shields.io/npm/dw/@nestorrente/true-json.svg&#41;]&#40;https://www.npmjs.com/package/@nestorrente/true-json&#41;)

![Coverage statements](coverage/badge-statements.svg)
![Coverage branches](coverage/badge-branches.svg)
![Coverage functions](coverage/badge-functions.svg)
![Coverage lines](coverage/badge-lines.svg)

[comment]: <> (## Table of contents)

## What's TrueJSON?

TrueJSON is a library for serializing and deserializing complex types to JSON in JavaScript and TypeScript.
It allows you to recover your dates, sets, maps, and other data types when deserializing JSON.

### What's wrong with `JSON.stringify()` and `JSON.parse()`?

Imagine the following JavaScript object:

```javascript
const originalObject = {
    date: new Date(),
    set: new Set([1, 2, 3])
};

const jsonText = JSON.stringify(originalObject);

const deserializedObject = JSON.parse(jsonText);
```

If you see the value of the `jsonText` variable, you'll get the following JSON structure:

```json
{
    "date": "1970-01-01T00:00:00.000Z",
    "set": {}
}
```

As you can see, your set elements haven't been serialized as you would expect. Moreover, if you see the value of the
`deserializedObject` variable, you'll see the following object:

![Deserialized object using native JSON (Google Chrome console)](docs/img/deserialized-object-native.png "Deserialized object using native JSON (Google Chrome console)")

Now the `date` property is a `string`, and the `set` property is an empty object, which is not probably the wanted
behavior.

### TrueJSON to the rescue

Using TrueJSON, you can create a `JsonConverter` that knows how to serialize and deserialize your object without loosing
any information. This can be done by using _JSON adapters_, which are components that know how to adapt some data types
to _jsonable_ values. Let's see an example:

```javascript
import {JsonConverter, JsonAdapters} from '@nestorrente/true-json';

// Create a converter using adapters to describe your object's type
const customJsonConverter = new JsonConverter(JsonAdapters.object({
    date: JsonAdapters.isoDate(),
    set: JsonAdapters.set()
}));

const originalObject = {
    date: new Date(),
    set: new Set([1, 2, 3])
};

const jsonText = customJsonConverter.stringify(originalObject);

const deserializedObject = customJsonConverter.parse(jsonText);
```

If you see the value of the `jsonText` variable, now you'll get the following JSON structure:

```json
{
    "date": "1970-01-01T00:00:00.000Z",
    "set": [1, 2, 3]
}
```

As you can see, now your `Set` has been serialized as a JSON array, preserving its values in the JSON structure. In addition, if
you see the value of the `deserializedObject` variable, you'll see the following object:

![Deserialized object using TrueJSON (Google Chrome console)](docs/img/deserialized-object-truejson.png "Deserialized object using TrueJSON (Google Chrome console)")

As you can see, both the `date` property and the `set` property have been deserialized to `Date` and `Set` objects
respectively.

## Built-in adapters

### identity()

```javascript
const adapter = JsonAdapters.identity();

console.log(adapter.adaptToJson(3));

console.log(adapter.recoverFromJson(3));
```

Output:

```text
3

3
```

### isoDate()

```javascript
const adapter = JsonAdapters.isoDate();

console.log(adapter.adaptToJson(new Date(0)));

console.log(adapter.recoverFromJson('1970-01-01T00:00:00.000Z'));
```

Output:

```text
"1970-01-01T00:00:00.000Z"

Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) }
```

### dateTimestamp()

```javascript
const adapter = JsonAdapters.dateTimestamp();

console.log(adapter.adaptToJson(new Date(0)));

console.log(adapter.recoverFromJson(0));
```

```text
0

Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) }
```

### array(elementAdapter)

```javascript
const adapter = JsonAdapters.array(JsonAdapters.dateTimestamp());

console.log(adapter.adaptToJson([
    new Date(0),
    new Date(1620458583563)
]));

console.log(adapter.recoverFromJson([
    0,
    1620458583563
]));
```

Output:

```text
[0, 1620458583563]

[
    Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) },
    Date { Sat May 08 2021 07:23:03 GMT+0000 (Coordinated Universal Time) }
]
```

### set(\[elementAdapter])

```javascript
const adapter = JsonAdapters.set(JsonAdapters.dateTimestamp());

console.log(adapter.adaptToJson([new Date(0), new Date(1620458583563)]));

console.log(adapter.recoverFromJson([0, 1620458583563]));
```

Output:

```text
[0, 1620458583563]

Set {
    Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) },
    Date { Sat May 08 2021 07:23:03 GMT+0000 (Coordinated Universal Time) }
}
```

TODO comment that if you don't pass any elementAdapter, `identity()` will be used.

### record(valueAdapter)

TODO write about what a Record is (for non-TS users).

```javascript
const adapter = JsonAdapters.record(JsonAdapters.dateTimestamp());

console.log(adapter.adaptToJson({
    start: new Date(0),
    end: new Date(1620458583563)
}));

console.log(adapter.recoverFromJson({
    start: 0,
    end: 1620458583563
}));
```

Output:

```text
[0, 1620458583563]

Set {
    Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) },
    Date { Sat May 08 2021 07:23:03 GMT+0000 (Coordinated Universal Time) }
}
```

### mapAsEntries

```javascript
const adapter = JsonAdapters.mapAsEntries({
    keyAdapter: JsonAdapters.dateTimestamp(),
    valueAdapter: JsonAdapters.set(),
});

console.log(adapter.adaptToJson(new Map([
    [new Date(0), new Set([1, 2, 3])],
    [new Date(1620458583563), new Set([4, 5, 6])]
])));

console.log(adapter.recoverFromJson([
    [0, [1, 2, 3]],
    [1620458583563, [4, 5, 6]]
]));
```

Output:

```text
[
    [0, [1, 2, 3]],
    [1620458583563, [4, 5, 6]]
]

Map {
    Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) } => Set { 1, 2, 3 },
    Date { Sat May 08 2021 07:23:03 GMT+0000 (Coordinated Universal Time) } => Set { 4, 5, 6 }
}
```

TODO comment that if you don't pass any keyAdapter or valueAdapter, `identity()` will be used.

### mapAsRecord(\[config])

```javascript
const adapter = JsonAdapters.mapAsRecord({
    keyAdapter: JsonAdapters.isoDate(),
    valueAdapter: JsonAdapters.set(),
});

console.log(adapter.adaptToJson(new Map([
    [new Date(0), new Set([1, 2, 3])],
    [new Date(1620458583563), new Set([4, 5, 6])]
])));

console.log(adapter.recoverFromJson({
    "1970-01-01T00:00:00.000Z": [1, 2, 3],
    "2021-05-08T07:23:03.563Z": [4, 5, 6]
}));
```

Output:

```text
{
    "1970-01-01T00:00:00.000Z": [1, 2, 3],
    "2021-05-08T07:23:03.563Z": [4, 5, 6]
}

Map {
    Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) } => Set { 1, 2, 3 },
    Date { Sat May 08 2021 07:23:03 GMT+0000 (Coordinated Universal Time) } => Set { 4, 5, 6 }
}
```

TODO comment that if you don't pass any keyAdapter or valueAdapter, `identity()` will be used.

### object(propertyAdapters\[, config])

TODO comment that `identity()` adapter will be use for all unmapped properties.

```javascript
const adapter = JsonAdapters.object({
    releaseDate: JsonAdapters.isoDate()
});

console.log(adapter.adaptToJson({
    name: 'Harry Potter and the Deathly Hallows - Part 2',
    releaseDate: new Date('2011-07-15')
}));

console.log(adapter.recoverFromJson({
    name: 'Harry Potter and the Deathly Hallows - Part 2',
    releaseDate: '2011-07-15T00:00:00.000Z'
}));
```

Output:

```text
{
    "name": "Harry Potter and the Deathly Hallows - Part 2",
    "releaseDate": "2011-07-15T00:00:00.000Z"
}

{
    "name": "Harry Potter and the Deathly Hallows - Part 2",
    "releaseDate": Date { Fri Jul 15 2011 00:00:00 GMT+0000 (Coordinated Universal Time) }
}
```

### byKey(keyValuePairs\[, fallbackKey])

TODO

## Writing your own adapter

TODO write about `custom()` and `nullishAwareCustom()`.
