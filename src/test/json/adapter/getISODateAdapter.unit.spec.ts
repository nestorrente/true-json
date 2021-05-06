import getISODateAdapter from '@/json/adapter/getISODateAdapter';

const isoDateAdapter = getISODateAdapter();

const testData: [Date, string][] = [
	[new Date(0), '1970-01-01T00:00:00.000Z'],
	[new Date(1620091425678), '2021-05-04T01:23:45.678Z'],
];

testData.forEach(([date, text]) => {

	test(`Adapt ${date} to JsonValue`, () => {

		const result = isoDateAdapter.adaptToJson(date);

		expect(result).toBe(text);

	});

	test(`Adapt ${text} from JsonValue`, () => {

		const result = isoDateAdapter.recoverFromJson(text);

		expect(result).toEqual(date);

	});

});
