import getNullishAwareAdapter from '@/json/adapter/nullish/getNullishAwareAdapter';

const nullishAwareAdapter = getNullishAwareAdapter<any>({
	adaptToJson(value) {
		if (value == null) {
			throw new Error('Null or undefined are not supported');
		}
		return value;
	},
	recoverFromJson(value) {
		if (value == null) {
			throw new Error('Null or undefined are not supported');
		}
		return value;
	}
});

const testData: any[] = [
	null,
	undefined,
	'Hello world',
	42,
	new Date(),
];

testData.forEach(value => {

	test(`Adapt ${value} to JsonValue should return same value`, () => {
		const result = nullishAwareAdapter.adaptToJson(value);
		expect(result).toBe(value);
	});

	test(`Adapt ${value} from JsonValue should return same value`, () => {
		const result = nullishAwareAdapter.recoverFromJson(value);
		expect(result).toEqual(value);
	});

});
