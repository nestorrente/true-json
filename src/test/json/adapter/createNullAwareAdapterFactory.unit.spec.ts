import createNullishAwareAdapterFactory from '../../../main/json/adapter/createNullishAwareAdapterFactory';
import JsonAdapter from '../../../main/json/adapter/JsonAdapter';
import {Nullable} from '../../../main/json/adapter/addNullishAwareDecorator';

const nullishAwareMultiplierAdapterFactory = createNullishAwareAdapterFactory((factor: number): JsonAdapter<number, number> => ({
	adaptToJson(value) {
		return value * factor;
	},
	recoverFromJson(value) {
		return value / factor;
	}
}));

const testData: [number, Nullable<number>, Nullable<number>][] = [
	[8, null, null],
	[5, undefined, undefined],
	[10, 7, 70],
	[2, 1024, 2048],
	[7, 3, 21],
];

testData.forEach(([factor, value, jsonValue]) => {

	const nullishAwareMultiplierAdapter = nullishAwareMultiplierAdapterFactory(factor);

	test(`Adapt ${value} to JsonValue with a factor of ${factor}`, () => {

		const result = nullishAwareMultiplierAdapter.adaptToJson(value);

		expect(result).toBe(jsonValue);

	});

	test(`Adapt ${value} from JsonValue with a factor of ${factor}`, () => {

		const result = nullishAwareMultiplierAdapter.recoverFromJson(jsonValue);

		expect(result).toEqual(value);

	});

});
