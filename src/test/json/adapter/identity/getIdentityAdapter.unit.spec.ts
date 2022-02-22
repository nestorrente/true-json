import getIdentityAdapter from '@/json/adapter/identity/getIdentityAdapter';
import {JsonValue} from '@/json/types';

const testValues: JsonValue[] = [
	42,
	'Hello world',
	[1, 1, 2, 3, 5, 8, 13, 21, 34],
	{a: 1, b: 2, c: 3},
	{a: 1, b: [2, 3], c: 'four'}
];

describe('Without validator', () => {

	const identityAdapter = getIdentityAdapter();

	testValues.forEach(value => {

		test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {

			const result = identityAdapter.adaptToJson(value);

			expect(result).toBe(value);

		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {

			const result = identityAdapter.recoverFromJson(value);

			expect(result).toBe(value);

		});

	});

});

describe('With validator', () => {

	const positiveNumberIdentityAdapter = getIdentityAdapter<number>((value) => {
		if (typeof value !== 'number' || value <= 0) {
			throw new TypeError('input value is not a positive number');
		}
	});

	it.each`
		value
		${1}
		${2}
		${5}
		${10}
		${Number.MAX_SAFE_INTEGER}
		${Number.MAX_VALUE}
	`(`Adapt $value to JsonValue`, ({value}) => {

		const result = positiveNumberIdentityAdapter.adaptToJson(value);

		expect(result).toBe(value);

	});

	it.each`
		value
		${1}
		${2}
		${5}
		${10}
		${Number.MAX_SAFE_INTEGER}
		${Number.MAX_VALUE}
	`(`Recover $value from JsonValue`, ({value}) => {

		const result = positiveNumberIdentityAdapter.recoverFromJson(value);

		expect(result).toBe(value);

	});

	it.each`
		value
		${0}
		${-1}
		${'5'}
		${[]}
		${{}}
		${new Date()}
	`(`Adapt $value to JsonValue should throw error`, ({value}) => {
		expect(() => positiveNumberIdentityAdapter.adaptToJson(value)).toThrow(TypeError);
	});

	it.each`
		value
		${0}
		${-1}
		${'5'}
		${[]}
		${{}}
		${new Date()}
	`(`Recover $value from JsonValue should throw error`, ({value}) => {
		expect(() => positiveNumberIdentityAdapter.recoverFromJson(value)).toThrow(TypeError);
	});

});
