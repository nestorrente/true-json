import getDateTimestampAdapter from '@/json/adapter/getDateTimestampAdapter';

const dateTimestampAdapter = getDateTimestampAdapter();

const testData: number[] = [
	0,
	443750400000,
	1620091425678,
];

testData.forEach(timestamp => {

	const date = new Date(timestamp);

	test(`Adapt ${date} to JsonValue`, () => {

		const result = dateTimestampAdapter.adaptToJson(date);

		expect(result).toBe(timestamp);

	});

	test(`Adapt ${date} from JsonValue`, () => {

		const result = dateTimestampAdapter.recoverFromJson(timestamp);

		expect(result).toEqual(date);

	});

});

describe('Type checks', () => {

	test('Adapting non-Date value', () => {
		expect(() => {
			dateTimestampAdapter.adaptToJson(1234 as never);
		}).toThrow('input value is not a date');
	});

	test('Adapting invalid Date value', () => {
		expect(() => {
			dateTimestampAdapter.adaptToJson(new Date('a'));
		}).toThrow('input value is not a valid date');
	});

	test('Recovering non-number value', () => {
		expect(() => {
			dateTimestampAdapter.recoverFromJson('1234' as never);
		}).toThrow('input value is not a finite number');
	});

	test('Recovering invalid number value', () => {
		expect(() => {
			dateTimestampAdapter.recoverFromJson(Infinity);
		}).toThrow('input value is not a finite number');
	});

});
