import getDateTimestampAdapter from '@/json/adapter/getDateTimestampAdapter';

const isoDateAdapter = getDateTimestampAdapter();

const testData: number[] = [
	0,
	443750400000,
	1620091425678,
];

testData.forEach(timestamp => {

	const date = new Date(timestamp);

	test(`Adapt ${date} to JsonValue`, () => {

		const result = isoDateAdapter.adaptToJson(date);

		expect(result).toBe(timestamp);

	});

	test(`Adapt ${date} from JsonValue`, () => {

		const result = isoDateAdapter.recoverFromJson(timestamp);

		expect(result).toEqual(date);

	});

});
