import addNullishAwareDecorator, {Nullable} from '../../../main/json/adapter/addNullishAwareDecorator';

const isoDateAdapter = addNullishAwareDecorator<number, string>({
	adaptToJson(value) {
		return value.toString();
	},
	recoverFromJson(value) {
		return parseInt(value, 10);
	}
});

const testData: [Nullable<number>, Nullable<string>][] = [
	[null, null],
	[undefined, undefined],
	[7, '7'],
	[42, '42'],
	[1024, '1024'],
];

testData.forEach(([value, jsonValue]) => {

	test(`Adapt ${value} to JsonValue`, () => {

		const result = isoDateAdapter.adaptToJson(value);

		expect(result).toBe(jsonValue);

	});

	test(`Adapt ${value} from JsonValue`, () => {

		const result = isoDateAdapter.recoverFromJson(jsonValue);

		expect(result).toEqual(value);

	});

});
