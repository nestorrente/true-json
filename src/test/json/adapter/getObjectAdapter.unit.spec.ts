import getObjectAdapter from '@/json/adapter/getObjectAdapter';
import addNullishAwareDecorator from '../../../main/json/adapter/addNullishAwareDecorator';
import {JsonObject} from '@/json/types';

describe('With default config', () => {

	interface TestObject {
		date: number[];
		probability: number;
		text: string;
	}

	interface SerializableTestObject extends JsonObject {
		date: string;
		probability: string;
		text: string;
	}

	const objectAdapter = getObjectAdapter<TestObject>({
		date: addNullishAwareDecorator<number[], string>({
			adaptToJson(value) {
				return value.map(e => String(e).padStart(2, '0')).join('-');
			},
			recoverFromJson(value) {
				return value.split('-').map(e => parseInt(e, 10));
			}
		}),
		probability: addNullishAwareDecorator<number, string>({
			adaptToJson(value) {
				return `${value * 100}%`;
			},
			recoverFromJson(value) {
				return parseFloat(value) / 100;
			}
		})
	});

	test(`Adapt Object to JsonObject`, () => {

		const input: TestObject = {
			date: [1970, 1, 1],
			probability: 0.42,
			text: 'hello world'
		};

		const result = objectAdapter.adaptToJson(input);

		expect(result).toStrictEqual<SerializableTestObject>({
			date: '1970-01-01',
			probability: '42%',
			text: 'hello world'
		});

	});

	test(`Adapt Object from JsonObject`, () => {

		const input: SerializableTestObject = {
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

describe('Ignoring unmapped properties', () => {

	interface TestObject {
		number: number;
		text?: string;
	}

	type SerializableTestObject = TestObject & JsonObject;

	const objectAdapter = getObjectAdapter<TestObject>({
		number: addNullishAwareDecorator<number, number>({
			adaptToJson(value) {
				return Math.pow(value, 2);
			},
			recoverFromJson(value) {
				return Math.sqrt(value);
			}
		})
	}, {
		ignoreUnmappedProperties: true
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
		ignoredProperties: ['text']
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
