import getIntegerIdentityAdapter from '@/json/adapter/identity/getIntegerIdentityAdapter';

const integerIdentityAdapter = getIntegerIdentityAdapter();

describe('Valid values', () => {

	[
		0,
		-1,
		1,
		100,
		Number.MAX_SAFE_INTEGER,
		Number.MAX_VALUE,
		Number.MIN_SAFE_INTEGER
	].forEach(value => {

		test(`Adapt ${JSON.stringify(value)} to JsonValue`, () => {

			const result = integerIdentityAdapter.adaptToJson(value);

			expect(result).toBe(value);

		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {

			const result = integerIdentityAdapter.recoverFromJson(value);

			expect(result).toBe(value);

		});

	});

});

describe('Invalid values', () => {

	[
		-4.65,
		13.4,
		Number.MIN_VALUE,
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
			expect(() => integerIdentityAdapter.adaptToJson(value as never)).toThrow(TypeError);
		});

		test(`Recover ${JSON.stringify(value)} from JsonValue`, () => {
			expect(() => integerIdentityAdapter.recoverFromJson(value as never)).toThrow(TypeError);
		});

	});

});
