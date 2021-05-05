import getMapAsRecordAdapter from '@/json/adapter/map/getMapAsRecordAdapter';

describe('Without key and value adapters', () => {

	const mapAsRecordAdapter = getMapAsRecordAdapter<string, number>();

	test(`Adapt Map to JsonArray`, () => {

		const input = new Map([
			['a', 1],
			['b', 2],
			['c', 3]
		]);

		const result = mapAsRecordAdapter.adaptToJson(input);

		expect(result).toStrictEqual({
			a: 1,
			b: 2,
			c: 3
		});

	});

	test(`Adapt Map from JsonArray`, () => {

		const input = {
			a: 1,
			b: 2,
			c: 3
		};

		const result = mapAsRecordAdapter.recoverFromJson(input);

		expect(result).toStrictEqual(new Map([
			['a', 1],
			['b', 2],
			['c', 3]
		]));

	});

});

describe('Using key and value adapters', () => {

	const mapAdapter = getMapAsRecordAdapter<string, number, number>({
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
			['c', 3]
		]);

		const result = mapAdapter.adaptToJson(input);

		expect(result).toStrictEqual({
			A: 2,
			B: 4,
			C: 6
		});

	});

	test(`Adapt Map from JsonArray`, () => {

		const input = {
			A: 2,
			B: 4,
			C: 6
		};

		const result = mapAdapter.recoverFromJson(input);

		expect(result).toStrictEqual(new Map([
			['a', 1],
			['b', 2],
			['c', 3]
		]));

	});

});
