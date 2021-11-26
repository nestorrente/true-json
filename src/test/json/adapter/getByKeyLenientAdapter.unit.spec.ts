import getByKeyLenientAdapter from '@/json/adapter/getByKeyLenientAdapter';

interface Animal {
	name: string;
	sound: string;
}

type KnownAnimalKey = 'CAT' | 'DOG' | 'BIRD';

const KnownAnimals: Record<KnownAnimalKey, Animal> = {
	BIRD: {name: 'bird', sound: 'tweet'},
	CAT: {name: 'cat', sound: 'meow'},
	DOG: {name: 'dog', sound: 'woof'},
};

describe('Known values', () => {

	const knownAnimalsByKeyAdapter = getByKeyLenientAdapter(KnownAnimals);

	test(`Adapt value to its key`, () => {

		const input: Animal = KnownAnimals.CAT;

		const result = knownAnimalsByKeyAdapter.adaptToJson(input);

		expect(result).toBe<KnownAnimalKey>('CAT');

	});

	test(`Adapt key to its value`, () => {

		const input: KnownAnimalKey = 'DOG';

		const result = knownAnimalsByKeyAdapter.recoverFromJson(input);

		expect(result).toBe(KnownAnimals.DOG);

	});

});

describe('Unknown values without default value', () => {

	const knownAnimalsByKeyAdapter = getByKeyLenientAdapter(KnownAnimals);

	test(`Adapt an unknown value to its key should return undefined`, () => {

		const input: Animal = {
			name: 'Lion',
			sound: 'roar'
		};

		const result = knownAnimalsByKeyAdapter.adaptToJson(input);

		expect(result).toBeUndefined();

	});

	test(`Adapt an undefined value should be allowed`, () => {

		const result = knownAnimalsByKeyAdapter.adaptToJson(undefined);

		expect(result).toBeUndefined();

	});

	test(`Recover an unknown key to its value should return undefined`, () => {

		const input = 'UNKNOWN';

		const result = knownAnimalsByKeyAdapter.recoverFromJson(input as KnownAnimalKey);

		expect(result).toBeUndefined();

	});

	test(`Recover an undefined key should be allowed`, () => {

		const result = knownAnimalsByKeyAdapter.recoverFromJson(undefined);

		expect(result).toBeUndefined();

	});

});

describe('Unknown values with default value', () => {

	const knownAnimalsByKeyAdapter = getByKeyLenientAdapter<Animal>(KnownAnimals, 'BIRD');

	test(`Adapt an unknown value to its key should return the default key`, () => {

		const input: Animal = {
			name: 'Lion',
			sound: 'roar'
		};

		const result = knownAnimalsByKeyAdapter.adaptToJson(input);

		expect(result).toBe<KnownAnimalKey>('BIRD');

	});

	// An undefined value should be treated like any other unknown value
	test(`Adapt an undefined value to its key should return the default key`, () => {

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const result = knownAnimalsByKeyAdapter.adaptToJson(undefined!);

		expect(result).toBe<KnownAnimalKey>('BIRD');

	});

	test(`Adapt an unknown key to its value should return the corresponding value to the default key`, () => {

		const input = 'LION' as KnownAnimalKey;

		const result = knownAnimalsByKeyAdapter.recoverFromJson(input);

		expect(result).toBe<Animal>(KnownAnimals.BIRD);

	});

	// An undefined key is not a key per-se, as it's not an string, so it should be considered an error
	test(`Adapt an undefined key to its value should throw an error`, () => {
		expect(() => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			knownAnimalsByKeyAdapter.recoverFromJson(undefined!);
		}).toThrow('input value is not a string');
	});

});

describe('Admit undefined and null as valid values', () => {

	type NullableBoolean = boolean | null | undefined;

	type NullableBooleanKey = 'TRUE' | 'FALSE' | 'NULL' | 'UNDEFINED';

	const NullableBooleans: Record<NullableBooleanKey, NullableBoolean> = {
		TRUE: true,
		FALSE: false,
		NULL: null,
		UNDEFINED: undefined
	};

	const nullableBooleanByKeyAdapter = getByKeyLenientAdapter(NullableBooleans);

	const testData: [NullableBooleanKey, NullableBoolean][] = [
		['TRUE', true],
		['FALSE', false],
		['NULL', null],
		['UNDEFINED', undefined],
	];

	testData.forEach(([key, value]) => {

		test(`Adapt value to its key`, () => {

			const result = nullableBooleanByKeyAdapter.adaptToJson(value);

			expect(result).toBe(key);

		});

		test(`Adapt undefined key to value`, () => {

			const result = nullableBooleanByKeyAdapter.recoverFromJson(key);

			expect(result).toBe(value);

		});

	});

});
