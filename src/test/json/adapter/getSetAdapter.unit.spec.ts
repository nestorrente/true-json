import getSetAdapter from '@/json/adapter/getSetAdapter';

describe('Without an element adapter', () => {

	const numericSetAdapter = getSetAdapter<number>();

	test(`Adapt Set to JsonSet`, () => {

		const input = new Set([1, 2, 3, 4, 5]);

		const result = numericSetAdapter.adaptToJson(input);

		expect(result).toStrictEqual([1, 2, 3, 4, 5]);

	});

	test(`Adapt Set from JsonSet`, () => {

		const input = [1, 2, 3, 4, 5];

		const result = numericSetAdapter.recoverFromJson(input);

		expect(result).toStrictEqual(new Set([1, 2, 3, 4, 5]));

	});

});

describe('Using an element adapter', () => {

	const numericSetAdapter = getSetAdapter<number, number>({
		adaptToJson(value: number): number {
			return value * 2;
		},
		recoverFromJson(value: number): number {
			return value / 2;
		}
	});

	test(`Adapt Set to JsonSet`, () => {

		const input = new Set([1, 2, 3, 4, 5]);

		const result = numericSetAdapter.adaptToJson(input);

		expect(result).toStrictEqual([2, 4, 6, 8, 10]);

	});

	test(`Adapt Set from JsonSet`, () => {

		const input = [2, 4, 6, 8, 10];

		const result = numericSetAdapter.recoverFromJson(input);

		expect(result).toStrictEqual(new Set([1, 2, 3, 4, 5]));

	});

});

describe('Input validations', () => {

	const numericSetAdapter = getSetAdapter<number>();

	test('Adapting non-Array value', () => {
		expect(() => {
			numericSetAdapter.adaptToJson([1, 2, 3] as never);
		}).toThrow('input value is not a set');
	});

	test('Recovering non-Array value', () => {
		expect(() => {
			numericSetAdapter.recoverFromJson({an: 'object'} as never);
		}).toThrow('input value is not an array');
	});

});
