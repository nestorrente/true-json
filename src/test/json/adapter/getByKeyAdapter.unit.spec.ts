import getByKeyAdapter from '@/json/adapter/getByKeyAdapter';

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

	const knownAnimalsByKeyAdapter = getByKeyAdapter(KnownAnimals);

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

describe('Unknown values', () => {

	const knownAnimalsByKeyAdapter = getByKeyAdapter(KnownAnimals);

	test(`Adapt value to its key`, () => {

		const input: Animal = {
			name: 'Lion',
			sound: 'roar'
		};

		expect(() => knownAnimalsByKeyAdapter.adaptToJson(input)).toThrowError();

	});

	test(`Adapt key to its value`, () => {

		const input = 'UNKNOWN_KEY' as KnownAnimalKey;

		expect(() => knownAnimalsByKeyAdapter.recoverFromJson(input)).toThrowError();

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

	const nullableBooleanByKeyAdapter = getByKeyAdapter(NullableBooleans);

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

describe('Input validations', () => {

	const knownAnimalsByKeyAdapter = getByKeyAdapter(KnownAnimals);

	test('Recovering non-string value', () => {
		expect(() => {
			knownAnimalsByKeyAdapter.recoverFromJson(123 as never);
		}).toThrow('input value is not a string');
	});

});
