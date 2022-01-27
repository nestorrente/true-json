import getNumberIdentityAdapter from '@/json/adapter/identity/getNumberIdentityAdapter';

const numberIdentityAdapter = getNumberIdentityAdapter();

describe('Valid values', () => {

	[
		0,
		-4.65,
		-1,
		1,
		1.2,
		100,
		Number.MAX_SAFE_INTEGER,
		Number.MAX_VALUE,
		Number.MIN_SAFE_INTEGER,
		Number.MIN_VALUE
	].forEach(value => {

		test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {

			const result = numberIdentityAdapter.adaptToJson(value);

			expect(result).toBe(value);

		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {

			const result = numberIdentityAdapter.recoverFromJson(value);

			expect(result).toBe(value);

		});

	});

});

describe('Invalid values', () => {

	[
		Infinity,
		-Infinity,
		NaN,
		false,
		true,
		new Date(),
		{},
		[],
		undefined,
		null,
		'hello world'
	].forEach(value => {

		test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {
			expect(() => numberIdentityAdapter.adaptToJson(value as never)).toThrow(TypeError);
		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {
			expect(() => numberIdentityAdapter.recoverFromJson(value as never)).toThrow(TypeError);
		});

	});

});
