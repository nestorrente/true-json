import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
import {JsonValue} from '@/json/types';

const identityAdapter = getIdentityAdapter();

const testValues: JsonValue[] = [
	42,
	'Hello world',
	[1, 1, 2, 3, 5, 8, 13, 21, 34],
	{a: 1, b: 2, c: 3},
	{a: 1, b: [2, 3], c: 'four'}
];

testValues.forEach(value => {

	test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {

		const result = identityAdapter.adaptToJson(value);

		expect(result).toBe(value);

	});

	test(`Adapt ${JSON.stringify(value)} from JsonValue`, () => {

		const result = identityAdapter.recoverFromJson(value);

		expect(result).toBe(value);

	});

});
