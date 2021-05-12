# TrueJSON

> Respectful JSON serialization & deserialization for JavaScript

[![License](https://img.shields.io/npm/l/make-coverage-badge.svg)](https://opensource.org/licenses/MIT)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)

[comment]: <> ([![npm]&#40;https://img.shields.io/npm/dw/true-json.svg&#41;]&#40;https://www.npmjs.com/package/true-json&#41;)

![Coverage statements](coverage/badge-statements.svg)
![Coverage branches](coverage/badge-branches.svg)
![Coverage functions](coverage/badge-functions.svg)
![Coverage lines](coverage/badge-lines.svg)

## Table of contents

* [What's TrueJSON?](#whats-truejson)
    + [What's wrong with `JSON.stringify()` and `JSON.parse()`?](#whats-wrong-with-jsonstringify-and-jsonparse)
    + [TrueJSON to the rescue](#truejson-to-the-rescue)
* [Installation](#installation)
    + [Using NPM](#using-npm)
    + [Using `<script>` tag](#using-script-tag)
* [Usage](#usage)
    + [Using `import`](#using-import)
    + [Using `TrueJSON` object](#using-truejson-object)
* [Built-in adapters](#built-in-adapters)
    + [identity()](#identity)
    + [isoDate()](#isodate)
    + [dateTimestamp()](#datetimestamp)
    + [array(elementAdapter)](#arrayelementadapter)
    + [set(\[elementAdapter\])](#setelementadapter)
    + [record(valueAdapter)](#recordvalueadapter)
    + [mapAsEntries(\[config\])](#mapasentriesconfig)
    + [mapAsRecord(\[config\])](#mapasrecordconfig)
    + [object(propertyAdapters\[, config\])](#objectpropertyadapters-config)
    + [byKey(keyValuePairs\[, fallbackKey\])](#bykeykeyvaluepairs-fallbackkey)
* [Writing your own adapter](#writing-your-own-adapter)
* [Contributing](#contributing)

## What's TrueJSON?

TrueJSON is a library for serializing and deserializing complex types to JSON in JavaScript and TypeScript. It allows you to
recover your dates, sets, maps, and other data types when deserializing JSON.

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

Now the `date` property is a `string`, and the `set` property is an empty object, which is not probably the wanted behavior.

### TrueJSON to the rescue

Using TrueJSON, you can create a `JsonConverter` that knows how to serialize and deserialize your object without loosing any
information. This can be done by using _JSON adapters_, which are components that know how to adapt some data types to
_jsonable_ values. Let's see an example:

```javascript
import {JsonConverter, JsonAdapters} from 'true-json';

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
    "set": [
        1,
        2,
        3
    ]
}
```

As you can see, now your `Set` has been serialized as a JSON array, preserving its values in the JSON structure. In addition, if
you see the value of the `deserializedObject` variable, you'll see the following object:

![Deserialized object using TrueJSON (Google Chrome console)](docs/img/deserialized-object-truejson.png "Deserialized object using TrueJSON (Google Chrome console)")

As you can see, both the `date` property and the `set` property have been deserialized to `Date` and `Set` objects respectively.

## Installation

### Using NPM

Install the latest stable version:

```bash
npm install --save true-json
```

Then you can import TrueJSON objects in your modules:

```javascript
import {JsonConverter, JsonAdapters} from 'true-json';
```

### Using `<script>` tag

You can [download the latest version from here](dist/true-json.js). Then, you can use it as any other JavaScript file:

```html
<script src="true-json.js"></script>
```

Or, if you prefer, you can use any of the following CDN repositories:

```html
<!-- Unpkg -->
<script src="https://unpkg.com/true-json@1.0.0-alpha.2"></script>

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/true-json@1.0.0-alpha.2"></script>
```

The script will create a global `TrueJSON` object, which contains all the exported objects.

## Usage

### Using `import`

```javascript
import {JsonConverter, JsonAdapters} from 'true-json';

const user = {
    name: 'John Doe',
    birthDate: new Date('1970-01-01'),
    bestScoreByGame: new Map([
        ['Minesweeper', 118],
        ['Donkey Kong', 35500],
        ['Super Mario Bros.', 183250],
    ])
};

const userJsonConverter = new JsonConverter(JsonAdapters.object({
    birthDate: JsonAdapters.isoDate(),
    bestScoreByGame: JsonAdapters.mapAsRecord()
}));

const userAsJson = userJsonConverter.stringify(user);

console.log(userAsJson);
```

### Using `TrueJSON` object

You can access any object just by doing `TrueJSON.[ObjectName]`:

```javascript
const userJsonConverter = new TrueJSON.JsonConverter(TrueJSON.JsonAdapters.object({
    birthDate: TrueJSON.JsonAdapters.isoDate(),
    bestScoreByGame: TrueJSON.JsonAdapters.mapAsRecord()
}));
```

You can also use ES6 _destructuring assignment_ in order to imitate module imports:

```javascript
const {JsonConverter, JsonAdapters} = TrueJSON;

const userJsonConverter = new JsonConverter(JsonAdapters.object({
    birthDate: JsonAdapters.isoDate(),
    bestScoreByGame: JsonAdapters.mapAsRecord()
}));
```

## Built-in adapters

In this section, we will cover the build-in adapters that TrueJSON provides to you.

### identity()

The identity adapter takes its name from the _identity function_ concept. It just returns the same value it receives:

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

You won't normally need to use this adapter, but it could be useful if you want to write your own.

### isoDate()

This adapter converts any `Date` object into his ISO textual representation (see
[`Date.prototype.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
docs) and vice versa:

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

This adapter converts any `Date` object into his number representation in milliseconds (see
[`Date.prototype.getTime()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
docs) and vice versa:

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

Using this adapter you can specify how the elements of the array should be adapted:

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

By default, JavaScript sets are serialized as an empty object. Using this adapter allows you to serialize them in the
same way that arrays are serialized:

```javascript
const adapter = JsonAdapters.set();

console.log(adapter.adaptToJson(new Set([1, 2, 3])));

console.log(adapter.recoverFromJson([1, 2, 3]));
```

Output:

```text
[1, 2, 3]

Set { 1, 2, 3 }
```

You can also specify an adapter to be used for mapping the elements of the set:

```javascript
const adapter = JsonAdapters.set(JsonAdapters.dateTimestamp());

console.log(adapter.adaptToJson(new Set([new Date(0), new Date(1620458583563)])));

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

Notice that calling `JsonAdapters.set()` without any element adapter is equivalent to
`JsonAdapters.set(JsonAdapters.identity())`.

### record(valueAdapter)

A record is a JavaScript plain object consisting of key-value pairs. In that sense, it's a similar to a `Map` (a.k.a.
_hashtable_ or _dictionary_ in other programming languages), but its keys are always strings*.

<small>&ast; JavaScript allows to use the `symbol` type as a key also, but TrueJSON expects records to be in the form
`{ string: any }` (for TypeScript users: `Record<string, any>`).</small>

The record adapter receives an adapter that will be applied to each of the record values, just as the array adapter
does:

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
{
    "start": 0,
    "end": 1620458583563
}

{
    "start": Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) },
    "end": Date { Sat May 08 2021 07:23:03 GMT+0000 (Coordinated Universal Time) }
}
```

### mapAsEntries(\[config])

By default, JavaScript maps are serialized as an empty object. Using this adapter allows you to serialize them as an
array of entries (see
[Map.prototype.entries()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)):

```javascript
const map = new Map();
map.set('number', 42);
map.set('string', 'hello world');
map.set('array', [1, 2, 3]);

const adapter = JsonAdapters.mapAsEntries();

console.log(adapter.adaptToJson(map));

console.log(adapter.recoverFromJson([
    ['number', 42],
    ['string', 'hello world'],
    ['array', [1, 2, 3]]
]));
```

Output:

```text
[
    ["number", 42],
    ["string", "hello world"],
    ["array", [1, 2, 3]]
]

Map {
    "number" => 42,
    "string" => "hello world",
    "array" => [1, 2, 3]
}
```

As map's keys and values can be any type of object, you can also specify a `keyAdapter` and a `valueAdapter`:

```javascript
const map = new Map();
map.set(new Date(0), new Set([1, 2, 3]));
map.set(new Date(1620458583563), new Set([4, 5, 6]));

const adapter = JsonAdapters.mapAsEntries({
    keyAdapter: JsonAdapters.dateTimestamp(),
    valueAdapter: JsonAdapters.set(),
});

console.log(adapter.adaptToJson(map));

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

Notice that calling `JsonAdapters.mapAsEntries()` without key and value adapters is equivalent to:

```javascript
JsonAdapters.mapAsEntries({
    keyAdapter: JsonAdapters.identity(),
    valueAdapter: JsonAdapters.identity()
});
```

### mapAsRecord(\[config])

By default, JavaScript maps are serialized as an empty object. Using this adapter allows you to serialize them as a
plain JS object (a.k.a. record):

```javascript
const map = new Map();
map.set('number', 42);
map.set('string', 'hello world');
map.set('array', [1, 2, 3]);

const adapter = JsonAdapters.mapAsRecord();

console.log(adapter.adaptToJson(map));

console.log(adapter.recoverFromJson({
    number: 42,
    string: 'hello world',
    array: [1, 2, 3]
}));
```

Output:

```text
{
    "number": 42,
    "string": "hello world",
    "array": [1, 2, 3]
}

Map {
    "number" => 42,
    "string" => "hello world",
    "array" => [1, 2, 3]
}
```

As map's keys and values can be any type of object, you can also specify a `keyAdapter` and a `valueAdapter`:

```javascript
const map = new Map();
map.set(new Date(0), new Set([1, 2, 3]));
map.set(new Date(1620458583563), new Set([4, 5, 6]));

const adapter = JsonAdapters.mapAsRecord({
    keyAdapter: JsonAdapters.isoDate(),
    valueAdapter: JsonAdapters.set(),
});

console.log(adapter.adaptToJson(map));

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

Notice that calling `JsonAdapters.mapAsRecord()` without key and value adapters is equivalent to:

```javascript
JsonAdapters.mapAsRecord({
    keyAdapter: JsonAdapters.identity(),
    valueAdapter: JsonAdapters.identity()
});
```

### object(propertyAdapters\[, config])

This adapter allows you to serialize &amp; deserialize any plain JS object, specifying different adapters for each of
its properties:

```javascript
const film = {
    name: 'Harry Potter and the Deathly Hallows - Part 2',
    releaseDate: new Date('2011-07-15'),
    mainCharacters: new Set(['Harry Potter', 'Hermione Granger', 'Ron Weasley'])
};

const adapter = JsonAdapters.object({
    releaseDate: JsonAdapters.isoDate(),
    mainCharacters: JsonAdapters.set()
});

console.log(adapter.adaptToJson(film));

console.log(adapter.recoverFromJson({
    name: 'Harry Potter and the Deathly Hallows - Part 2',
    releaseDate: '2011-07-15T00:00:00.000Z',
    mainCharacters: ['Harry Potter', 'Hermione Granger', 'Ron Weasley']
}));
```

Output:

```text
{
    "name": "Harry Potter and the Deathly Hallows - Part 2",
    "releaseDate": "2011-07-15T00:00:00.000Z",
    "mainCharacters": ["Harry Potter", "Hermione Granger", "Ron Weasley"]
}

{
    "name": "Harry Potter and the Deathly Hallows - Part 2",
    "releaseDate": Date { Fri Jul 15 2011 00:00:00 GMT+0000 (Coordinated Universal Time) },
    "mainCharacters": Set { "Harry Potter", "Hermione Granger", "Ron Weasley" }
}
```

By default, any unmapped property will be adapted using the [identity adapter](#identity).

#### Configuration options

The object adapter allows to modify its default behaviour using the following configuration options:

| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| `omitUnmappedProperties` | `boolean` | `false` | When `true`, all unmapped properties won't be present on the resultant object |
| `omittedProperties` | `string[]` | `[]` | Allows to specify which properties should be omitted manually |

Example using `omittedProperties` option:

```javascript
const adapter = JsonAdapters.object(
    {
        birthDate: JsonAdapters.dateTimestamp()
    },
    {
        omittedProperties: ['age']
    }
);

console.log(adapter.adaptToJson({
  name: 'John Doe',
  birthDate: new Date('1970-01-01'),
  age: 51
}));

console.log(adapter.recoverFromJson({
  name: 'John Doe',
  birthDate: 0,
  age: 51
}));
```

Output:

```text
{
    "name": "John Doe",
    "birthDate": 0
}

{
    "name": "John Doe",
    "birthDate": Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) }
}
```

### byKey(keyValuePairs\[, fallbackKey])

This adapter allows you to serialize a value using its corresponding key of the provided key-value pairs object. This is
specially useful when working with enumerated values:

```javascript
const ScalingStrategies = {
    DEFAULT: new DefaultScalingStrategy(),
    FAST: new FastScalingStrategy(),
    SMOOTH: new SmoothScalingStrategy()
};

const adapter = JsonAdapters.byKey(ScalingStrategies);

console.log(adapter.adaptToJson(ScalingStrategies.FAST));

console.log(adapter.recoverFromJson('SMOOTH'));
```

Output:

```text
"FAST"

SmoothScalingStrategy { }
```

If an unknown value&ast; is passed to any of the methods, `undefined` is returned:

<small>&ast; this includes `null` and `undefined` values if they are not present in the key-value pairs object.</small>

```javascript
const ScalingStrategies = {
    DEFAULT: new DefaultScalingStrategy(),
    FAST: new FastScalingStrategy(),
    SMOOTH: new SmoothScalingStrategy()
};

const adapter = JsonAdapters.byKey(ScalingStrategies);

console.log(adapter.adaptToJson(new UnknownScalingStrategy()));

console.log(adapter.recoverFromJson('UNKNOWN'));
```

Output:

```text
undefined

undefined
```

You can also specify a fallback key to use in those cases:

```javascript
const ScalingStrategies = {
    DEFAULT: new DefaultScalingStrategy(),
    FAST: new FastScalingStrategy(),
    SMOOTH: new SmoothScalingStrategy()
};

const adapter = JsonAdapters.byKey(ScalingStrategies, 'DEFAULT');

console.log(adapter.adaptToJson(new UnknownScalingStrategy()));

console.log(adapter.recoverFromJson('UNKNOWN'));
```

Output:

```text
"DEFAULT"

DefaultScalingStrategy { }
```

## Writing your own adapter

You can write your own adapter using the `JsonAdapters.custom()` method:

```javascript
const dateToArrayAdapter = JsonAdapters.custom({
    adaptToJson(date) {
        return [date.getFullYear(), date.getMonth(), date.getDate()];
    },
    recoverFromJson(array) {
        const [year, month, date] = array;
        return new Date(year, month, date);
    }
});
```

Then, you can use it as any other adapter:

```javascript
const objectAdapter = JsonAdapters.object({
    birthDate: dateToArrayAdapter
});

console.log(objectAdapter.adaptToJson({
    name: 'John Doe',
    birthDate: new Date('1970-01-01')
}));

console.log(objectAdapter.recoverFromJson({
    name: 'John Doe',
    birthDate: [1970, 0, 1]
}));
```

Output:

```text
{
    "name": "John Doe",
    "birthDate": [1970, 0, 1]
}

{
    "name": "John Doe",
    "birthDate": Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) }
}
```

Please, notice that **custom adapters need to manually handle `null` and `undefined` values**. If you want those values
to be automatically handled, you can use `JsonAdapters.nullishAwareCustom()`:

```javascript
const dateToArrayAdapter = JsonAdapters.nullishAwareCustom({
    adaptToJson(date) {
        return [date.getFullYear(), date.getMonth(), date.getDate()];
    },
    recoverFromJson(array) {
        const [year, month, date] = array;
        return new Date(year, month, date);
    }
});

console.log(dateToArrayAdapter.adaptToJson(new Date('1970-01-01')));
console.log(dateToArrayAdapter.adaptToJson(null));
console.log(dateToArrayAdapter.adaptToJson(undefined));

console.log(dateToArrayAdapter.recoverFromJson([1970, 0, 1]));
console.log(dateToArrayAdapter.recoverFromJson(null));
console.log(dateToArrayAdapter.recoverFromJson(undefined));
```

Output:

```text
[1970, 0, 1]
null
undefined

Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) }
null
undefined
```

## Contributing

This is a library maintained by one person, so any bug report, suggestion, pull request, or any other kind of
feedback will be really appreciated :slightly_smiling_face:

Please contribute using [GitHub Flow](https://guides.github.com/introduction/flow). Create a branch from the `develop`
one, add commits, and [open a pull request](https://github.com/nestorrente/true-json/compare).

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

If you want to get in touch with the author, you can contact me through
[LinkedIn](https://www.linkedin.com/in/nestorpglez/) or [email](mailto:nestorpglez@gmail.com).
