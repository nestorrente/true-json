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

describe('Unknown values without default value', () => {

	const knownAnimalsByKeyAdapter = getByKeyAdapter(KnownAnimals);

	test(`Adapt value to its key`, () => {

		const input: Animal = {
			name: 'Lion',
			sound: 'roar'
		};

		const result = knownAnimalsByKeyAdapter.adaptToJson(input);

		expect(result).toBeUndefined();

	});

	test(`Adapt undefined key to value`, () => {

		const input = undefined;

		const result = knownAnimalsByKeyAdapter.recoverFromJson(input);

		expect(result).toBeUndefined();

	});

});

describe('Unknown values with default value', () => {

	const knownAnimalsByKeyAdapter = getByKeyAdapter(KnownAnimals, 'BIRD');

	test(`Adapt value to its key`, () => {

		const input: Animal = {
			name: 'Lion',
			sound: 'roar'
		};

		const result = knownAnimalsByKeyAdapter.adaptToJson(input);

		expect(result).toBe<KnownAnimalKey>('BIRD');

	});

	test(`Adapt undefined key to value`, () => {

		const input = undefined;

		// @ts-expect-error
		const result = knownAnimalsByKeyAdapter.recoverFromJson(input);

		expect(result).toBe(KnownAnimals.BIRD);

	});

});
