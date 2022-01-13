import getNullAwareCustomAdapter from '@/json/adapter/nullish/getNullAwareCustomAdapter';

const nullishAwareCustomAdapter = getNullAwareCustomAdapter<number, string>({
	adaptToJson(value) {
		return value.toString();
	},
	recoverFromJson(value) {
		return parseInt(value, 10);
	}
});

const testData: [number | null, string | null][] = [
	[null, null],
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
