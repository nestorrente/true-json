// tslint:disable:max-classes-per-file
import getObjectAdapter from '@/json/adapter/getObjectAdapter';
import {JsonObject} from '@/json/types';

describe('With default config', () => {

	interface TestObject {
		date: number[];
		probability: number;
		text: string;
	}

	class TestObjectClass implements TestObject {
		constructor(
				public date: number[],
				public probability: number,
				public text: string,
		) {
		}
	}

	interface AdaptedTestObject extends JsonObject {
		date: string;
		probability: string;
		text: string;
	}

	const objectAdapter = getObjectAdapter<TestObject>({
		date: {
			adaptToJson(value: number[]): string {
				return value.map(e => String(e).padStart(2, '0')).join('-');
			},
			recoverFromJson(value: string): number[] {
				return value.split('-').map(e => parseInt(e, 10));
			}
		},
		probability: {
			adaptToJson(value: number): string {
				return `${value * 100}%`;
			},
			recoverFromJson(value: string): number {
				return parseFloat(value) / 100;
			}
		}
	});

	test(`Adapt plain object to JsonObject`, () => {

		const input: TestObject = {
			date: [1970, 1, 1],
			probability: 0.42,
			text: 'hello world'
		};

		const result = objectAdapter.adaptToJson(input);

		expect(result).toStrictEqual<AdaptedTestObject>({
			date: '1970-01-01',
			probability: '42%',
			text: 'hello world'
		});

	});

	test(`Adapt class instance to JsonObject`, () => {

		const input: TestObject = new TestObjectClass([1970, 1, 1], 0.42, 'hello world');

		const result = objectAdapter.adaptToJson(input);

		expect(result).toStrictEqual<AdaptedTestObject>({
			date: '1970-01-01',
			probability: '42%',
			text: 'hello world'
		});

	});

	test(`Recover plain object from JsonObject`, () => {

		const input: AdaptedTestObject = {
			date: '1970-01-01',
			probability: '42%',
			text: 'hello world'
		};

		const result = objectAdapter.recoverFromJson(input);

		expect(result).toStrictEqual<TestObject>({
			date: [1970, 1, 1],
			probability: 0.42,
			text: 'hello world'
		});

	});

});

describe('With strict plain object check', () => {

	interface TestObject {
		date: number[];
		probability: number;
		text: string;
	}

	class TestObjectClass implements TestObject {
		constructor(
				public date: number[],
				public probability: number,
				public text: string,
		) {
		}
	}

	const objectAdapter = getObjectAdapter<TestObject>({}, {strictPlainObjectCheck: true});

	test(`Adapt plain object to JsonObject`, () => {

		const input: TestObject = {
			date: [1970, 1, 1],
			probability: 0.42,
			text: 'hello world'
		};

		expect(() => objectAdapter.adaptToJson(input)).not.toThrow();

	});

	test(`Adapt class instance to JsonObject`, () => {

		const input: TestObject = new TestObjectClass([1970, 1, 1], 0.42, 'hello world');

		expect(() => objectAdapter.adaptToJson(input)).toThrow('input value is not a plain object');

	});

});

describe('Ignoring unmapped properties', () => {

	interface TestObject {
		number: number;
		text?: string;
	}

	type SerializableTestObject = TestObject & JsonObject;

	const objectAdapter = getObjectAdapter<TestObject>({
		number: {
			adaptToJson(value: number): number {
				return Math.pow(value, 2);
			},
			recoverFromJson(value: number): number {
				return Math.sqrt(value);
			}
		}
	}, {
		omitUnmappedProperties: true
	});

	test(`Adapt Object to JsonObject`, () => {

		const input: TestObject = {
			number: 42,
			text: 'hello world'
		};

		const result = objectAdapter.adaptToJson(input);

		expect(result).toStrictEqual<SerializableTestObject>({
			number: 1764
		});

	});

	test(`Adapt Object from JsonObject`, () => {

		const input: SerializableTestObject = {
			number: 1764,
			text: 'hello world'
		};

		const result = objectAdapter.recoverFromJson(input);

		expect(result).toStrictEqual<TestObject>({
			number: 42
		});

	});

});

describe('Ignoring properties explicitly', () => {

	interface TestObject {
		number: number;
		text?: string;
	}

	type SerializableTestObject = TestObject & JsonObject;

	const objectAdapter = getObjectAdapter<TestObject>({}, {
		omittedProperties: ['text']
	});

	test(`Adapt Object to JsonObject`, () => {

		const input: TestObject = {
			number: 42,
			text: 'hello world'
		};

		const result = objectAdapter.adaptToJson(input);

		expect(result).toStrictEqual<SerializableTestObject>({
			number: 42
		});

	});

	test(`Adapt Object from JsonObject`, () => {

		const input: SerializableTestObject = {
			number: 42,
			text: 'hello world'
		};

		const result = objectAdapter.recoverFromJson(input);

		expect(result).toStrictEqual<TestObject>({
			number: 42
		});

	});

});
