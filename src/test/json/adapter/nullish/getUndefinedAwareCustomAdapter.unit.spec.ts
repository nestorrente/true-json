import getUndefinedAwareCustomAdapter from '@/json/adapter/nullish/getUndefinedAwareCustomAdapter';

const nullishAwareCustomAdapter = getUndefinedAwareCustomAdapter<number, string>({
	adaptToJson(value) {
		return value.toString();
	},
	recoverFromJson(value) {
		return parseInt(value, 10);
	}
});

const testData: [number | undefined, string | undefined][] = [
	[undefined, undefined],
	[7, '7'],
	[42, '42'],
	[1024, '1024'],
];

testData.forEach(([value, jsonValue]) => {

	test(`Adapt ${value} to JsonValue`, () => {

		const result = nullishAwareCustomAdapter.adaptToJson(value);

		expect(result).toBe(jsonValue);

	});

	test(`Adapt ${value} from JsonValue`, () => {

		const result = nullishAwareCustomAdapter.recoverFromJson(jsonValue);

		expect(result).toEqual(value);

	});

});
