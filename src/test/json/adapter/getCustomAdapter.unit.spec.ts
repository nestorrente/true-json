import getCustomAdapter from '@/json/adapter/getCustomAdapter';

const customAdapter = getCustomAdapter<boolean, string>({
	adaptToJson(value: boolean): string {
		return value ? 'yes' : 'no';
	},
	recoverFromJson(value: string): boolean {
		return value === 'yes';
	}
});

const testValues: [boolean, string][] = [
	[true, 'yes'],
	[false, 'no'],
];

testValues.forEach(([value, jsonValue]) => {

	test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {

		const result = customAdapter.adaptToJson(value);

		expect(result).toBe(jsonValue);

	});

	test(`Adapt ${JSON.stringify(value)} from JsonValue`, () => {

		const result = customAdapter.recoverFromJson(jsonValue);

		expect(result).toBe(value);

	});

});
