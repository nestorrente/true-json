import getRecordAdapter from '@/json/adapter/getRecordAdapter';
import {JsonObject} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

class TestRecordClass {
	constructor(
			private hello: 'world',
			private apple: 'computer',
			private microsoft: 'word'
	) {
	}
}

const valueAdapter: JsonAdapter<string, string> = {
	adaptToJson(value: string): string {
		return value.toUpperCase();
	},
	recoverFromJson(value: string): string {
		return value.toLowerCase();
	}
};

const testRecordClassInstance = new TestRecordClass('world', 'computer', 'word');

describe('With default config', () => {

	const textRecordAdapter = getRecordAdapter<string, string>(valueAdapter);

	test(`Adapt Record to JsonArray`, () => {

		const input: Record<string, string> = {
			hello: 'world',
			apple: 'computer',
			microsoft: 'word'
		};

		const result = textRecordAdapter.adaptToJson(input);

		expect(result).toStrictEqual({
			hello: 'WORLD',
			apple: 'COMPUTER',
			microsoft: 'WORD'
		});

	});

	test(`Adapt class instance Record to JsonArray`, () => {

		const input = testRecordClassInstance as unknown as Record<string, string>;

		const result = textRecordAdapter.adaptToJson(input);

		expect(result).toStrictEqual({
			hello: 'WORLD',
			apple: 'COMPUTER',
			microsoft: 'WORD'
		});

	});

	test(`Recover Record from JsonObject`, () => {

		const input: JsonObject<string> = {
			hello: 'WORLD',
			apple: 'COMPUTER',
			microsoft: 'WORD'
		};

		const result = textRecordAdapter.recoverFromJson(input);

		expect(result).toStrictEqual({
			hello: 'world',
			apple: 'computer',
			microsoft: 'word'
		});

	});

});

describe('With strict plain object check', () => {

	const textRecordAdapter = getRecordAdapter<string, string>(valueAdapter, {strictPlainObjectCheck: true});

	test(`Adapt Record to JsonArray`, () => {

		const input: Record<string, string> = {
			hello: 'world',
			apple: 'computer',
			microsoft: 'word'
		};

		expect(() => textRecordAdapter.adaptToJson(input)).not.toThrow();

	});

	test(`Adapt class instance Record to JsonArray`, () => {

		const input = testRecordClassInstance as unknown as Record<string, string>;

		expect(() => textRecordAdapter.adaptToJson(input)).toThrow('input value is not a plain object');

	});

});

describe('Input validations', () => {

	const textRecordAdapter = getRecordAdapter<string, string>(valueAdapter);

	test('Recovering non-plain object', () => {

		const input = testRecordClassInstance as unknown as Record<string, string>;

		expect(() => {
			textRecordAdapter.recoverFromJson(input);
		}).toThrow('input value is not a plain object');

	});

});
