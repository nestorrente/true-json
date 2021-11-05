import getNullAwareAdapter from '@/json/adapter/nullish/getNullAwareAdapter';

const nullAwareAdapter = getNullAwareAdapter<any>({
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
	[null, false],
	[undefined, true],
	['Hello world', false],
	[42, false],
	[new Date(), false],
];

testData.forEach(([value, expectError]) => {

	if (expectError) {

		test(`Adapt ${value} to JsonValue should throw error`, () => {
			expect(() => nullAwareAdapter.adaptToJson(value)).toThrowError();
		});

		test(`Adapt ${value} from JsonValue should throw error`, () => {
			expect(() => nullAwareAdapter.recoverFromJson(value)).toThrowError();
		});

	} else {

		test(`Adapt ${value} to JsonValue should return same value`, () => {
			const result = nullAwareAdapter.adaptToJson(value);
			expect(result).toBe(value);
		});

		test(`Adapt ${value} from JsonValue should return same value`, () => {
			const result = nullAwareAdapter.recoverFromJson(value);
			expect(result).toEqual(value);
		});

	}

});
