import getArrayJsonAdapter from '@/json/adapter/getArrayJsonAdapter';

const numericArrayAdapter = getArrayJsonAdapter<number, number>({
	adaptToJson(value: number): number {
		return value * 2;
	},
	recoverFromJson(value: number): number {
		return value / 2;
	}
});

test(`Adapt Array to JsonArray`, () => {

	const input = [1, 2, 3, 4, 5];

	const result = numericArrayAdapter.adaptToJson(input);

	expect(result).toStrictEqual([2, 4, 6, 8, 10]);

});

test(`Adapt Array from JsonArray`, () => {

	const input = [2, 4, 6, 8, 10];

	const result = numericArrayAdapter.recoverFromJson(input);

	expect(result).toStrictEqual([1, 2, 3, 4, 5]);

});
