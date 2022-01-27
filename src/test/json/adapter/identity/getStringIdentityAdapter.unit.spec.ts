import getStringIdentityAdapter from '@/json/adapter/identity/getStringIdentityAdapter';

const stringIdentityAdapter = getStringIdentityAdapter();

describe('Valid values', () => {

	[
		'',
		' ',
		'hello world'
	].forEach(value => {

		test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {

			const result = stringIdentityAdapter.adaptToJson(value);

			expect(result).toBe(value);

		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {

			const result = stringIdentityAdapter.recoverFromJson(value);

			expect(result).toBe(value);

		});

	});

});

describe('Invalid values', () => {

	[
		0,
		1,
		-3.2,
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
	].forEach(value => {

		test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {
			expect(() => stringIdentityAdapter.adaptToJson(value as never)).toThrow(TypeError);
		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {
			expect(() => stringIdentityAdapter.recoverFromJson(value as never)).toThrow(TypeError);
		});

	});

});
