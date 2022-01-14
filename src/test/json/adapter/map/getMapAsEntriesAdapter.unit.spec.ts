import getMapAsEntriesAdapter from '@/json/adapter/map/getMapAsEntriesAdapter';

describe('Without key and value adapters', () => {

	const mapAsEntriesAdapter = getMapAsEntriesAdapter<string, number>();

	test(`Adapt Map to JsonArray`, () => {

		const input = new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]);

		const result = mapAsEntriesAdapter.adaptToJson(input);

		expect(result).toStrictEqual([
			['a', 1],
			['b', 2],
			['c', 3],
		]);

	});

	test(`Adapt Map from JsonArray`, () => {

		const input: [string, number][] = [
			['a', 1],
			['b', 2],
			['c', 3],
		];

		const result = mapAsEntriesAdapter.recoverFromJson(input);

		expect(result).toStrictEqual(new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]));

	});

});

describe('Using key and value adapters', () => {

	const mapAdapter = getMapAsEntriesAdapter<string, number, string, number>({
		keyAdapter: {
			adaptToJson(value: string): string {
				return value.toUpperCase();
			},
			recoverFromJson(value: string): string {
				return value.toLowerCase();
			}
		},
		valueAdapter: {
			adaptToJson(value: number): number {
				return value * 2;
			},
			recoverFromJson(value: number): number {
				return value / 2;
			}
		}
	});

	test(`Adapt Map to JsonArray`, () => {

		const input = new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]);

		const result = mapAdapter.adaptToJson(input);

		expect(result).toStrictEqual([
			['A', 2],
			['B', 4],
			['C', 6],
		]);

	});

	test(`Adapt Map from JsonArray`, () => {

		const input: [string, number][] = [
			['A', 2],
			['B', 4],
			['C', 6],
		];

		const result = mapAdapter.recoverFromJson(input);

		expect(result).toStrictEqual(new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]));

	});

});

describe('Type checks', () => {

	const mapAsEntriesAdapter = getMapAsEntriesAdapter<string, number>();

	test('Adapting non-Map value', () => {
		expect(() => {
			mapAsEntriesAdapter.adaptToJson('a text' as never);
		}).toThrow('input value is not a map');
	});

	test('Recovering non-entries array', () => {
		expect(() => {
			mapAsEntriesAdapter.recoverFromJson([
				['missing-value tuple'] as never
			]);
		}).toThrow('input value is not a tuple');
	});

});
