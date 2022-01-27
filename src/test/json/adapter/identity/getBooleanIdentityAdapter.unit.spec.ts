import getBooleanIdentityAdapter from '@/json/adapter/identity/getBooleanIdentityAdapter';

const booleanIdentityAdapter = getBooleanIdentityAdapter();

describe('Valid values', () => {

	[
		false,
		true
	].forEach(value => {

		test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {

			const result = booleanIdentityAdapter.adaptToJson(value);

			expect(result).toBe(value);

		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {

			const result = booleanIdentityAdapter.recoverFromJson(value);

			expect(result).toBe(value);

		});

	});

});

describe('Invalid values', () => {

	[
		0,
		1234,
		-4.65,
		new Date(),
		{},
		[],
		undefined,
		null,
		'hello world'
	].forEach(value => {

		test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {
			expect(() => booleanIdentityAdapter.adaptToJson(value as never)).toThrow(TypeError);
		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {
			expect(() => booleanIdentityAdapter.recoverFromJson(value as never)).toThrow(TypeError);
		});

	});

});
