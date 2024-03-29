# TrueJSON

Respectful JSON serialization & deserialization for JavaScript

[![License](https://img.shields.io/npm/l/make-coverage-badge.svg)](https://opensource.org/licenses/MIT)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)

[comment]: <> ([![npm]&#40;https://img.shields.io/npm/dw/true-json.svg&#41;]&#40;https://www.npmjs.com/package/true-json&#41;)

## Table of contents

* [What's TrueJSON?](#whats-truejson)
    + [What's wrong with `JSON.stringify()` and `JSON.parse()`?](#whats-wrong-with-jsonstringify-and-jsonparse)
    + [TrueJSON to the rescue](#truejson-to-the-rescue)
    + [Features](#features)
* [Installation](#installation)
    + [Using NPM (module)](#using-npm-module)
    + [Using `<script>` tag (standalone)](#using-script-tag-standalone)
* [Basic usage](#basic-usage)
    + [Using `import` (module)](#using-import-module)
    + [Using `TrueJSON` object (standalone)](#using-truejson-object-standalone)
* [Using JSON5 and other JSON alternatives](#using-json5-or-other-json-alternatives)
* [Built-in adapters](#built-in-adapters)
    + [isoDate()](#isodate)
    + [dateTimestamp()](#datetimestamp)
    + [array(elementAdapter)](#arrayelementadapter)
    + [set(\[elementAdapter\])](#setelementadapter)
    + [record(valueAdapter)](#recordvalueadapter)
    + [mapAsEntries(\[config\])](#mapasentriesconfig)
    + [mapAsRecord(\[config\])](#mapasrecordconfig)
    + [object(propertyAdapters\[, config\])](#objectpropertyadapters-config)
    + [byKey(keyValuePairs)](#bykeykeyvaluepairs)
    + [byKeyLenient(keyValuePairs\[, fallbackKey\])](#bykeylenientkeyvaluepairs-fallbackkey)
    + [Identity adapters](#identity-adapters)
        + [identity(\[validator\])](#identityvalidator)
        + [stringIdentity()](#stringidentity)
        + [numberIdentity()](#numberidentity)
        + [integerIdentity()](#integeridentity)
        + [booleanIdentity()](#booleanidentity)
    + [Handling nullish values](#handling-nullish-values)
        + [nullishAware(adapter)](#nullishawareadapter)
        + [nullAware(adapter)](#nullawareadapter)
        + [undefinedAware(adapter)](#undefinedawareadapter)
* [Writing your own adapter](#writing-your-own-adapter)
* [Contributing](#contributing)

## What's TrueJSON?

TrueJSON is a JSON serialization and deserialization library for JavaScript and TypeScript. It helps with the serialization and
deserialization of complex types such as `Date`, `Set`, `Map`, and many others.

### What's wrong with `JSON.stringify()` and `JSON.parse()`?

Imagine the following JavaScript object:

```javascript
const originalObject = {
    date: new Date(),
    set: new Set([1, 2, 3])
};

const serializedObject = JSON.stringify(originalObject);

const deserializedObject = JSON.parse(serializedObject);
```

If you check the value of the `serializedObject` variable, you'll see the following JSON structure:

```json
{
    "date": "2021-05-08T06:39:29.215Z",
    "set": {}
}
```

As you can see, your set elements haven't been serialized as you would expect. Moreover, if you check the value of the
`deserializedObject` variable, you'll see the following object:

![Deserialized object using native JSON (Google Chrome console)](docs/img/deserialized-object-native.png "Deserialized object using native JSON (Google Chrome console)")

Now the `date` property is a `string`, and the `set` property is an empty object, which probably isn't the desired behaviour.

### TrueJSON to the rescue

Using TrueJSON, you can create a `JsonConverter` that knows how to serialize and deserialize your object without loosing any
information. This can be done by using _JSON adapters_, which are components that know how to adapt some data types to
_jsonable_ values. Let's see an example:

```javascript
import { JsonConverter, JsonAdapters } from 'true-json';

// Create a converter using adapters to describe your object's type
const customJsonConverter = new JsonConverter(JsonAdapters.object({
    date: JsonAdapters.isoDate(),
    set: JsonAdapters.set()
}));

const originalObject = {
    date: new Date(),
    set: new Set([1, 2, 3])
};

const serializedObject = customJsonConverter.stringify(originalObject);

const deserializedObject = customJsonConverter.parse(serializedObject);
```

If you check the value of the `serializedObject` variable, now you'll see the following JSON structure:

```json
{
    "date": "2021-05-08T06:45:45.000Z",
    "set": [
        1,
        2,
        3
    ]
}
```

As you can see, now your `Set` has been serialized as a JSON array, preserving its values in the JSON structure. In addition, if
you check the value of the `deserializedObject` variable, you'll see the following object:

![Deserialized object using TrueJSON (Google Chrome console)](docs/img/deserialized-object-truejson.png "Deserialized object using TrueJSON (Google Chrome console)")

As you can see, both the `date` property and the `set` property have been deserialized to `Date` and `Set` objects respectively.

In addition, TrueJSON will perform some validations (i.e. type checks) before serializing or deserializing, throwing errors if
the received input doesn't match the expected structure.

### Features

* Serialization and deserialization of complex data types - see [Built-in adapters](#built-in-adapters) section.
* Serialization and deserialization of custom data types - see [Writing your own adapter](#writing-your-own-adapter) section.
* Input validation on serialization and deserialization.
* Configurable JSON serializer - see [Using JSON5 and other JSON alternatives](#using-json5-or-other-json-alternatives) section.

## Installation

### Using NPM \(module\)

Install the latest stable version:

```bash
npm install --save true-json
```

Then you can import TrueJSON objects in your modules:

```javascript
import { JsonConverter, JsonAdapters } from 'true-json';
```

### Using `<script>` tag \(standalone\)

You can [download the latest version from here](dist/true-json.js). Then, you can use it as any other JavaScript file:

```html

<script src="true-json.js"></script>
```

Or, if you prefer, you can use any of the following CDN repositories:

```html
<!-- Unpkg -->
<script src="https://unpkg.com/true-json@1.0.1"></script>

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/true-json@1.0.1"></script>
```

The script will create a global `TrueJSON` object, which contains all the exported objects.

## Basic usage

### Using `import` \(module\)

```javascript
import { JsonConverter, JsonAdapters } from 'true-json';

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

### Using `TrueJSON` object \(standalone\)

You can access any object just by doing `TrueJSON.[ObjectName]`. We strongly recommend
using ES6 _destructuring assignment_ to get a similar result to module imports:

```javascript
const { JsonConverter, JsonAdapters } = TrueJSON;

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

## Using JSON5 or other JSON alternatives

You can configure TrueJSON's `JsonConverter` to use any custom JSON implementation, such as JSON5. The only requirement is that
the custom JSON implementation should have the same `parse()` and `stringify()` methods as the standard one.

Let's see an example using [`json5`'s NPM package](https://www.npmjs.com/package/json5):

```javascript
import json5 from 'json5';
import { JsonConverter, JsonAdapters } from 'true-json';

const user = {
    name: 'John Doe',
    birthDate: new Date('1970-01-01'),
    bestScoreByGame: new Map([
        ['Minesweeper', 118],
        ['Donkey Kong', 35500],
        ['Super Mario Bros.', 183250],
    ])
};

const userJsonAdapter = JsonAdapters.object({
    birthDate: JsonAdapters.isoDate(),
    bestScoreByGame: JsonAdapters.mapAsRecord()
});

// The second argument of JsonConverter's constructor
// allows you to pass a custom JSON implementation.
// When no value is passed, the standard JSON object is used.
const userJsonConverter = new JsonConverter(userJsonAdapter, json5);

const userAsJson = userJsonConverter.stringify(user);

console.log(userAsJson);
```

## Built-in adapters

In this section, we will cover the build-in adapters that TrueJSON provides to you.

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

By default, JavaScript sets are serialized as an empty object. Using this adapter allows you to serialize them in the same way
that arrays are serialized:

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

The record adapter receives an adapter that will be applied to each of the record values, just as the array adapter does:

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

#### Configuration options

The record adapter allows to modify its default behaviour using the following configuration options:

| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| `strictPlainObjectCheck` | `boolean` | `false` | When `true`, it will throw an error if the input value of the `adaptToJson()` method is not a plain object. |

### mapAsEntries(\[config])

By default, JavaScript maps are serialized as an empty object. Using this adapter allows you to serialize them as an array of
entries (see
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

By default, JavaScript maps are serialized as an empty object. Using this adapter allows you to serialize them as a plain JS
object (a.k.a. record):

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

This adapter allows you to serialize &amp; deserialize any plain JS object, specifying different adapters for each of its
properties:

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

By default, any unmapped property will be adapted using the [identity adapter](#identityvalidator).

#### Configuration options

The object adapter allows to modify its default behaviour using the following configuration options:

| Property | Type | Default value | Description |
|----------|------|---------------|-------------|
| `omitUnmappedProperties` | `boolean` | `false` | When `true`, all unmapped properties won't be present on the resultant object. |
| `omittedProperties` | `string[]` | `[]` | Allows to specify which properties should be omitted manually. |
| `strictPlainObjectCheck` | `boolean` | `false` | When `true`, it will throw an error if the input value of the `adaptToJson()` method is not a plain object. |

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

### byKey(keyValuePairs)

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

If any unknown value is passed to `adaptToJson()` or `recoverFromJson()` methods, an error is thrown.
If you want to prevent this, you can use the
[`byKeyLenient(keyValuePairs\[, fallbackKey\])`](#bykeylenientkeyvaluepairs-fallbackkey) method.

### byKeyLenient(keyValuePairs\[, fallbackKey])

This is very similar to [`byKey(keyValuePairs)`](#bykeykeyvaluepairs)'s adapter. The main difference is the case where the
passed value is not present in the `keyValuePairs` object. While the [`byKey(keyValuePairs)`](#bykeykeyvaluepairs) adapter will
throw an error, this adapter will return `undefined`:

```javascript
const ScalingStrategies = {
    DEFAULT: new DefaultScalingStrategy(),
    FAST: new FastScalingStrategy(),
    SMOOTH: new SmoothScalingStrategy()
};

const adapter = JsonAdapters.byKeyLenient(ScalingStrategies);

console.log(adapter.adaptToJson(new UnknownScalingStrategy()));

console.log(adapter.recoverFromJson('UNKNOWN'));
```

Output:

```text
undefined

undefined
```

Due to this, `undefined` value is also a valid input for both `adaptToJson()` and `recoverFromJson()` methods:

```javascript
const ScalingStrategies = {
    DEFAULT: new DefaultScalingStrategy(),
    FAST: new FastScalingStrategy(),
    SMOOTH: new SmoothScalingStrategy()
};

const adapter = JsonAdapters.byKeyLenient(ScalingStrategies);

console.log(adapter.adaptToJson(undefined));

console.log(adapter.recoverFromJson(undefined));
```

Output:

```text
undefined

undefined
```

Alternatively, you can pass a fallback key to use when an unknown object or key is passed to the adapter:

```javascript
const ScalingStrategies = {
    DEFAULT: new DefaultScalingStrategy(),
    FAST: new FastScalingStrategy(),
    SMOOTH: new SmoothScalingStrategy()
};

const adapter = JsonAdapters.byKeyLenient(ScalingStrategies, 'DEFAULT');

console.log(adapter.adaptToJson(new UnknownScalingStrategy()));

console.log(adapter.recoverFromJson('UNKNOWN'));
```

Output:

```text
"DEFAULT"

DefaultScalingStrategy { }
```

### Identity adapters

Identity adapters take their name from the concept of _identity function_. Those adapters doesn't really adapt its input
value, but they're still able to perform some validations that will ensure the received JSON has the expected format.
The following sections will cover the different identity adapters provided by TrueJSON out-of-the-box.

#### identity(\[validator])

The identity adapter takes its name from the concept of _identity function_. It just returns the same value it receives:

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

By default, it doesn't perform any validations, but it accepts to pass a validator function, allowing you to implement
any validation logic that you may need:

```javascript
const probabilityAdapter = JsonAdapters.identity(input => {

    if (typeof input !== 'number' || !Number.isFinite()) {
        throw new TypeError('input value is not a finite number');
    }

    if(input < 0 || input > 1) {
        throw new RangeError('input value is out of [0, 1] range');
    }

});

console.log(probabilityAdapter.adaptToJson('A text'));
console.log(probabilityAdapter.adaptToJson(3));
console.log(probabilityAdapter.adaptToJson(0.3));

console.log(probabilityAdapter.recoverFromJson(Infinity));
console.log(probabilityAdapter.recoverFromJson(-1));
console.log(probabilityAdapter.recoverFromJson(0.95));
```

Output:

```text
TypeError: input value is not a finite number
RangeError: input value is out of [0, 1] range
0.3

TypeError: input value is not a finite number
RangeError: input value is out of [0, 1] range
0.95
```

Additionally, in the following sections you'll find some other identity adapters that perform some of the most-common
type validations.

#### stringIdentity()

The string identity adapter simply returns the same value it receives, throwing an error if the value is not a string:

```javascript
const stringIdentityAdapter = JsonAdapters.stringIdentity();

console.log(stringIdentityAdapter.adaptToJson('A text'));
console.log(stringIdentityAdapter.adaptToJson(3));

console.log(stringIdentityAdapter.recoverFromJson('Another text'));
console.log(stringIdentityAdapter.recoverFromJson(['an', 'array']));
```

Output:

```text
"A text"
TypeError: input value is not a string

"Another text"
TypeError: input value is not a string
```

#### numberIdentity()

The number identity adapter simply returns the same value it receives, throwing an error if the value is not a finite
number (this means that non-finite values like `Infinite`, `-Infinite` or `NaN` are not valid):

```javascript
const numberIdentityAdapter = JsonAdapters.numberIdentity();

console.log(numberIdentityAdapter.adaptToJson(1234));
console.log(numberIdentityAdapter.adaptToJson(Infinity));

console.log(numberIdentityAdapter.recoverFromJson(-5.7));
console.log(numberIdentityAdapter.recoverFromJson({an: 'object'}));
```

Output:

```text
1234
TypeError: input value is not a finite number

-5.7
TypeError: input value is not a finite number
```

#### integerIdentity()

The integer identity adapter simply returns the same value it receives, throwing an error if the value is not an integer
number (this means that decimal numbers and non-finite values like `12.34`, `Infinite`, `-Infinite` or `NaN` are not
valid):

```javascript
const integerIdentityAdapter = JsonAdapters.integerIdentity();

console.log(integerIdentityAdapter.adaptToJson(1234));
console.log(integerIdentityAdapter.adaptToJson(12.34));

console.log(integerIdentityAdapter.recoverFromJson(-5));
console.log(integerIdentityAdapter.recoverFromJson(NaN));
```

Output:

```text
1234
TypeError: input value is not an integer

-5
TypeError: input value is not an integer
```

#### booleanIdentity()

The boolean identity adapter simply returns the same value it receives, throwing an error if the value is not a boolean:

```javascript
const booleanIdentityAdapter = JsonAdapters.booleanIdentity();

console.log(booleanIdentityAdapter.adaptToJson(true));
console.log(booleanIdentityAdapter.adaptToJson('true'));

console.log(booleanIdentityAdapter.recoverFromJson(false));
console.log(booleanIdentityAdapter.recoverFromJson(0));
```

Output:

```text
true
TypeError: input value is not a boolean

false
TypeError: input value is not a boolean
```

### Handling nullish values

According to [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Nullish):

> In JavaScript, a nullish value is the value which is either `null` or `undefined`.

Adapters discussed in previous sections are not designed taking _nullish values_ into account. If you try to use them
for serializing or deserializing `null` or `undefined` values, they could throw an error or return an unexpected value.
Let's take a look to the behaviour of the set adapter:

```javascript
const standardSetAdapter = JsonAdapters.set();

console.log(standardSetAdapter.adaptToJson(new Set([1, 2, 3])));
console.log(standardSetAdapter.adaptToJson(null));
console.log(standardSetAdapter.adaptToJson(undefined));

console.log(standardSetAdapter.recoverFromJson([1, 2, 3]));
console.log(standardSetAdapter.recoverFromJson(null));
console.log(standardSetAdapter.recoverFromJson(undefined));
```

Output:

```text
[1, 2, 3]
TypeError: o is not iterable
TypeError: o is not iterable

Set { 1, 2, 3 }
TypeError: Cannot read properties of null (reading 'map')
TypeError: Cannot read properties of undefined (reading 'map')
```

The same applies when you [write your own adapters](#writing-your-own-adapter). If you don't write your adapter having
_nullish values_ in mind, it may not work as expected when receiving one.

Fortunately, TrueJSON allows to wrap any existing adapter using a _proxy adapter_ that handles `null` and `undefined`
values:

#### nullishAware(adapter)

Wraps an existing adapter using a proxy that handles both `null` and `undefined` values. This proxy will return the
received value when it's a _nullish value_; otherwise it will call the real adapter:

```javascript
const nullishAwareSetAdapter = JsonAdapters.set();

console.log(nullishAwareSetAdapter.adaptToJson(new Set([1, 2, 3])));
console.log(nullishAwareSetAdapter.adaptToJson(null));
console.log(nullishAwareSetAdapter.adaptToJson(undefined));

console.log(nullishAwareSetAdapter.recoverFromJson([1, 2, 3]));
console.log(nullishAwareSetAdapter.recoverFromJson(null));
console.log(nullishAwareSetAdapter.recoverFromJson(undefined));
```

Output:

```text
[1, 2, 3]
null
undefined

Set { 1, 2, 3 }
null
undefined
```

#### nullAware(adapter)

Wraps an existing adapter using a proxy that handles only `null` values. This proxy will return `null` when receiving
the `null` value; otherwise it will call the real adapter:

```javascript
const nullAwareSetAdapter = JsonAdapters.nullAware(JsonAdapters.set());

console.log(nullAwareSetAdapter.adaptToJson(new Set([1, 2, 3])));
console.log(nullAwareSetAdapter.adaptToJson(null));
console.log(nullAwareSetAdapter.adaptToJson(undefined));

console.log(nullAwareSetAdapter.recoverFromJson([1, 2, 3]));
console.log(nullAwareSetAdapter.recoverFromJson(null));
console.log(nullAwareSetAdapter.recoverFromJson(undefined));
```

Output:

```text
[1, 2, 3]
null
TypeError: o is not iterable

Set { 1, 2, 3 }
null
TypeError: Cannot read properties of undefined (reading 'map')
```

Notice an error is thrown when using the `undefined` value.

#### undefinedAware(adapter)

Wraps an existing adapter using a proxy that handles only `undefined` values. This proxy will return `undefined` when
receiving the `undefined` value; otherwise it will call the real adapter:

```javascript
const undefinedAwareSetAdapter = JsonAdapters.undefinedAware(JsonAdapters.set());

console.log(undefinedAwareSetAdapter.adaptToJson(new Set([1, 2, 3])));
console.log(undefinedAwareSetAdapter.adaptToJson(null));
console.log(undefinedAwareSetAdapter.adaptToJson(undefined));

console.log(undefinedAwareSetAdapter.recoverFromJson([1, 2, 3]));
console.log(undefinedAwareSetAdapter.recoverFromJson(null));
console.log(undefinedAwareSetAdapter.recoverFromJson(undefined));
```

Output:

```text
[1, 2, 3]
TypeError: o is not iterable
undefined

Set { 1, 2, 3 }
TypeError: Cannot read properties of null (reading 'map')
undefined
```

Notice an error is thrown when using the `null` value.

## Writing your own adapter

You can write your own adapter using the `JsonAdapters.custom()` method:

```javascript
const dateToArrayAdapter = JsonAdapters.custom({
    adaptToJson(date) {

        // Perform some validations

        if (!(date instanceof Date)) {
            throw new TypeError('input value is not a date');
        }

        // Adapt the Date object to array

        return [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ];

    },
    recoverFromJson(array) {

        // Perform some validations

        if (!Array.isArray(array)) {
            throw new TypeError('input value is not an array');
        }

        if (array.length !== 3) {
            throw new TypeError('input value has not the expected length');
        }

        // Recover the Date object from the deserialized array

        const [
            year,
            month,
            date
        ] = array;

        return new Date(year, month - 1, date);

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
    birthDate: [1970, 1, 1]
}));
```

Output:

```text
{
    "name": "John Doe",
    "birthDate": [1970, 1, 1]
}

{
    "name": "John Doe",
    "birthDate": Date { Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time) }
}
```

## Contributing

This is a library maintained by one person, so any bug report, suggestion, pull request, or any other kind of feedback will be
really appreciated :slightly_smiling_face:

Please contribute using [GitHub Flow](https://guides.github.com/introduction/flow). Create a branch from the `develop`
one, add commits, and [open a pull request](https://github.com/nestorrente/true-json/compare).

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

If you want to get in touch with the author, you can contact me through
[LinkedIn](https://www.linkedin.com/in/nestorpglez/) or [email](mailto:nestorpglez@gmail.com).
