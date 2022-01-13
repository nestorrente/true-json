import {
	assertArray,
	assertDate,
	assertDateString,
	assertEntryTuple,
	assertMap,
	assertNonNullish,
	assertPlainObject,
	assertRealNumber,
	assertSet,
	assertString,
	assertStringKeyOf,
	assertValidDate
} from '@/json/adapter/assertions';

const TEST_OBJECT = {
	'': undefined,
	'hello world': undefined
};

type ExampleValuesGroup =
		'nullish'
		| 'null'
		| 'undefined'
		| 'strings'
		| 'date strings'
		| 'numbers'
		| 'ints'
		| 'floats'
		| 'real numbers'
		| 'not-a-number'
		| 'non-finite numbers'
		| 'arrays'
		| 'sets'
		| 'maps'
		| 'entry tuple'
		| 'plain objects'
		| 'dates'
		| 'valid dates'
		| 'invalid dates'
		| 'keys of test object';

interface ExampleValue {
	value: unknown;
	groups: ExampleValuesGroup[];
}

const objectWithoutPrototype = Object.create(null);
objectWithoutPrototype.toString = () => '[object without prototype]';

const EXAMPLE_VALUES: ExampleValue[] = [
	{value: null, groups: ['null', 'nullish']},
	{value: undefined, groups: ['undefined', 'nullish']},
	{value: '', groups: ['strings', 'keys of test object']},
	{value: ' ', groups: ['strings']},
	{value: 'hello world', groups: ['strings', 'keys of test object']},
	{value: 'another string', groups: ['strings']},
	{value: '2021-11-24T18:51:43.000Z', groups: ['strings', 'date strings']},
	{value: 0, groups: ['ints', 'real numbers', 'numbers']},
	{value: 1, groups: ['ints', 'real numbers', 'numbers']},
	{value: 1.5, groups: ['floats', 'real numbers', 'numbers']},
	{value: NaN, groups: ['not-a-number', 'numbers']},
	{value: Infinity, groups: ['non-finite numbers', 'numbers']},
	{value: -Infinity, groups: ['non-finite numbers', 'numbers']},
	{value: new Date(), groups: ['dates', 'valid dates']},
	{value: new Date('invalid'), groups: ['dates', 'invalid dates']},
	{value: [], groups: ['arrays']},
	{value: [null], groups: ['arrays']},
	{value: [undefined], groups: ['arrays']},
	{value: [1, 2], groups: ['arrays', 'entry tuple']},
	{value: [1, 2, 3], groups: ['arrays']},
	{value: ['hello', 'world'], groups: ['arrays', 'entry tuple']},
	{value: [new Date()], groups: ['arrays']},
	{value: [{anObject: 'as a key'}, {anotherObject: 'as a value'}], groups: ['arrays', 'entry tuple']},
	{value: new Set(), groups: ['sets']},
	{value: new Set([null]), groups: ['sets']},
	{value: new Set([undefined]), groups: ['sets']},
	{value: new Set([1, 2, 3]), groups: ['sets']},
	{value: new Set(['hello', 'world']), groups: ['sets']},
	{value: new Set([new Date()]), groups: ['sets']},
	{value: new Map(), groups: ['maps']},
	{value: new Map([[new Date(), 'now'], [new Date(0), 'origin']]), groups: ['maps']},
	{value: new Map([['now', new Date()], ['origin', new Date(0)]]), groups: ['maps']},
	{value: {}, groups: ['plain objects']},
	{value: {a: 1, b: 2, c: 3}, groups: ['plain objects']},
	{value: {date: new Date()}, groups: ['plain objects']},
	{value: {hello: 'world'}, groups: ['plain objects']},
	{value: objectWithoutPrototype, groups: ['plain objects']},
];

function getExampleValuesFrom(...includingGroupNames: ExampleValuesGroup[]): unknown[] {
	return EXAMPLE_VALUES
			.filter(exampleValue => exampleValue.groups.some(groupName => includingGroupNames.includes(groupName)))
			.map(exampleValue => exampleValue.value);
}

function getExampleValuesBut(...excludingGroupNames: ExampleValuesGroup[]): unknown[] {
	return EXAMPLE_VALUES
			.filter(exampleValue => exampleValue.groups.every(groupName => !excludingGroupNames.includes(groupName)))
			.map(exampleValue => exampleValue.value);
}

function getExampleValuesFromBut(includingGroupNames: ExampleValuesGroup[], excludingGroupNames: ExampleValuesGroup[]): unknown[] {
	return EXAMPLE_VALUES
			.filter(exampleValue => {
				return exampleValue.groups.some(groupName => includingGroupNames.includes(groupName))
						&& exampleValue.groups.every(groupName => !excludingGroupNames.includes(groupName));
			})
			.map(exampleValue => exampleValue.value);
}

describe('Not nullish', () => {

	test('Using null', () => {
		expect(() => assertNonNullish(null)).toThrow('input value is null');
	});

	test('Using undefined', () => {
		expect(() => assertNonNullish(undefined)).toThrow('input value is undefined');
	});

	getExampleValuesBut('nullish').forEach(value => {
		test(`Using non-nullish value ${value}`, () => {
			expect(() => assertNonNullish(value)).not.toThrow();
		});
	});

});

describe('Real number', () => {

	getExampleValuesBut('real numbers').forEach(value => {
		test(`Using non-number ${value}`, () => {
			expect(() => assertRealNumber(value)).toThrow('input value is not a number');
		});
	});

	getExampleValuesFrom('real numbers').forEach(value => {
		test(`Using number ${value}`, () => {
			expect(() => assertRealNumber(value)).not.toThrow();
		});
	});

});

describe('String', () => {

	getExampleValuesBut('strings').forEach(value => {
		test(`Using non-string ${value}`, () => {
			expect(() => assertString(value)).toThrow('input value is not a string');
		});
	});

	getExampleValuesFrom('strings').forEach(value => {
		test(`Using string ${value}`, () => {
			expect(() => assertString(value)).not.toThrow();
		});
	});

});

describe('Date string', () => {

	getExampleValuesBut('strings').forEach(value => {
		test(`Using non-string ${value}`, () => {
			expect(() => assertDateString(value)).toThrow('input value is not a string');
		});
	});

	getExampleValuesFromBut(['strings'], ['date strings']).forEach(value => {
		test(`Using non-string ${value}`, () => {
			expect(() => assertDateString(value)).toThrow('input value has not a valid date format');
		});
	});

	getExampleValuesFrom('date strings').forEach(value => {
		test(`Using string ${value}`, () => {
			expect(() => assertDateString(value)).not.toThrow();
		});
	});

});

describe('Date', () => {

	getExampleValuesBut('dates').forEach(value => {
		test(`Using non-date ${value}`, () => {
			expect(() => assertDate(value)).toThrow('input value is not a date');
		});
	});

	getExampleValuesFrom('dates').forEach(value => {
		test(`Using date ${value}`, () => {
			expect(() => assertDate(value)).not.toThrow();
		});
	});

});

describe('Valid date', () => {

	getExampleValuesBut('dates').forEach(value => {
		test(`Using non-date ${value}`, () => {
			expect(() => assertValidDate(value)).toThrow('input value is not a date');
		});
	});

	getExampleValuesFrom('invalid dates').forEach(value => {
		test(`Using non-date ${value}`, () => {
			expect(() => assertValidDate(value)).toThrow('input value is not a valid date');
		});
	});

	getExampleValuesFrom('valid dates').forEach(value => {
		test(`Using date ${value}`, () => {
			expect(() => assertValidDate(value)).not.toThrow();
		});
	});

});

describe('Array', () => {

	getExampleValuesBut('arrays').forEach(value => {
		test(`Using non-array ${value}`, () => {
			expect(() => assertArray(value)).toThrow('input value is not an array');
		});
	});

	getExampleValuesFrom('arrays').forEach(value => {
		test(`Using array ${value}`, () => {
			expect(() => assertArray(value)).not.toThrow();
		});
	});

});

describe('Set', () => {

	getExampleValuesBut('sets').forEach(value => {
		test(`Using non-set ${value}`, () => {
			expect(() => assertSet(value)).toThrow('input value is not a set');
		});
	});

	getExampleValuesFrom('sets').forEach(value => {
		test(`Using set ${value}`, () => {
			expect(() => assertSet(value)).not.toThrow();
		});
	});

});

describe('Map', () => {

	getExampleValuesBut('maps').forEach(value => {
		test(`Using non-map ${value}`, () => {
			expect(() => assertMap(value)).toThrow('input value is not a map');
		});
	});

	getExampleValuesFrom('maps').forEach(value => {
		test(`Using map ${value}`, () => {
			expect(() => assertMap(value)).not.toThrow();
		});
	});

});

describe('Entry tuple', () => {

	getExampleValuesBut('entry tuple').forEach(value => {
		test(`Using non-tuple ${value}`, () => {
			expect(() => assertEntryTuple(value)).toThrow('input value is not a tuple');
		});
	});

	getExampleValuesFrom('entry tuple').forEach(value => {
		test(`Using tuple ${value}`, () => {
			expect(() => assertEntryTuple(value)).not.toThrow();
		});
	});

});

describe('Plain object', () => {

	getExampleValuesBut('plain objects').forEach(value => {
		test(`Using non-object ${value}`, () => {
			expect(() => assertPlainObject(value)).toThrow('input value is not a plain object');
		});
	});

	getExampleValuesFrom('plain objects').forEach(value => {
		test(`Using object ${value}`, () => {
			expect(() => assertPlainObject(value)).not.toThrow();
		});
	});

});

describe('Key of', () => {

	getExampleValuesBut('strings').forEach(value => {
		const anyObject = {};

		test(`Using non-string ${value}`, () => {
			expect(() => assertStringKeyOf(value, anyObject)).toThrow('input value is not a string');
		});
	});

	getExampleValuesFromBut(['strings'], ['keys of test object']).forEach(value => {
		test(`Using non-string ${value}`, () => {
			expect(() => assertStringKeyOf(value, TEST_OBJECT)).toThrow('input value is not a valid key');
		});
	});

	getExampleValuesFrom('keys of test object').forEach(value => {
		test(`Using non-string ${value}`, () => {
			expect(() => assertStringKeyOf(value, TEST_OBJECT)).not.toThrow();
		});
	});

});
