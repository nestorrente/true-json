import getUndefinedAwareAdapter from '@/json/adapter/nullish/getUndefinedAwareAdapter';

const undefinedAwareAdapter = getUndefinedAwareAdapter<any>({
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

const testData: [any, boolean][] = [
	[null, true],
	[undefined, false],
	['Hello world', false],
	[42, false],
	[new Date(), false],
];

testData.forEach(([value, expectError]) => {

	if (expectError) {

		test(`Adapt ${value} to JsonValue should throw error`, () => {
			expect(() => undefinedAwareAdapter.adaptToJson(value)).toThrowError();
		});

		test(`Adapt ${value} from JsonValue should throw error`, () => {
			expect(() => undefinedAwareAdapter.recoverFromJson(value)).toThrowError();
		});

	} else {

		test(`Adapt ${value} to JsonValue should return same value`, () => {
			const result = undefinedAwareAdapter.adaptToJson(value);
			expect(result).toBe(value);
		});

		test(`Adapt ${value} from JsonValue should return same value`, () => {
			const result = undefinedAwareAdapter.recoverFromJson(value);
			expect(result).toEqual(value);
		});

	}

});
