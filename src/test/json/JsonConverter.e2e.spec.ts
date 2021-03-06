import JsonAdapters from '@/json/adapter/JsonAdapters';
import JsonConverter from '@/json/JsonConverter';
import json5 from 'json5';

// TODO add cases for other adapters
interface TestObject {
	roundScoreByPlayer: Map<Player, number[]>;
	bestScoreByPlayerName: Map<string, number>;
	aggregateFunction: AggregateFunction;
	championshipStartDate: Date;
	championshipEndDate: Date | null;
	undefinedField: undefined;
	active: boolean;
	nullableBoolean: boolean | null;
}

interface Player {
	name: string;
	birthdate: Date;
}

type AggregateFunction = (values: number[]) => number;

const sumFunction: AggregateFunction = values => values.reduce((accumulator, current) => accumulator + current, 0);
const minFunction: AggregateFunction = values => Math.min(...values);
const maxFunction: AggregateFunction = values => Math.max(...values);
const avgFunction: AggregateFunction = values => values.length === 0 ? NaN : sumFunction(values) / values.length;

const StandardAggregateFunctions = {
	SUM: sumFunction,
	MIN: minFunction,
	MAX: maxFunction,
	AVG: avgFunction,
};

const testObject: TestObject = {
	roundScoreByPlayer: new Map([
		[
			{name: 'Alice', birthdate: new Date(1002499200000)},
			[1, 2, 3]
		],
		[
			{name: 'Bob', birthdate: new Date(686880000000)},
			[3, 2, 1]
		],
	]),
	bestScoreByPlayerName: new Map([
		['Alice', 3],
		['Bob', 3],
	]),
	championshipStartDate: new Date(0),
	championshipEndDate: null,
	aggregateFunction: StandardAggregateFunctions.AVG,
	undefinedField: undefined,
	active: true,
	nullableBoolean: null
};

const testObjectJson = `{
    "roundScoreByPlayer": [
        [
            {
                "name": "Alice",
                "birthdate": "2001-10-08T00:00:00.000Z"
            },
            [
                1,
                2,
                3
            ]
        ],
        [
            {
                "name": "Bob",
                "birthdate": "1991-10-08T00:00:00.000Z"
            },
            [
                3,
                2,
                1
            ]
        ]
    ],
    "bestScoreByPlayerName": {
        "Alice": 3,
        "Bob": 3
    },
    "championshipStartDate": 0,
    "championshipEndDate": null,
    "aggregateFunction": "AVG",
    "active": "yes",
    "nullableBoolean": null
}`;

const testObjectJsonWithInvalidChampionshipStartDate = `{
    "roundScoreByPlayer": [
        [
            {
                "name": "Alice",
                "birthdate": "2001-10-08T00:00:00.000Z"
            },
            [
                1,
                2,
                3
            ]
        ],
        [
            {
                "name": "Bob",
                "birthdate": "1991-10-08T00:00:00.000Z"
            },
            [
                3,
                2,
                1
            ]
        ]
    ],
    "bestScoreByPlayerName": {
        "Alice": 3,
        "Bob": 3
    },
    "championshipStartDate": null,
    "championshipEndDate": null,
    "aggregateFunction": "AVG",
    "active": "yes",
    "nullableBoolean": null
}`;

const booleanToStringAdapter = JsonAdapters.custom<boolean, string>({
	adaptToJson(value: boolean): string {
		return value ? 'yes' : 'no';
	},
	recoverFromJson(value: string): boolean {
		return value === 'yes';
	}
});

const converter = new JsonConverter(JsonAdapters.object<TestObject>({
	roundScoreByPlayer: JsonAdapters.mapAsEntries({
		keyAdapter: JsonAdapters.object<Player>({
			birthdate: JsonAdapters.isoDate()
		})
	}),
	bestScoreByPlayerName: JsonAdapters.mapAsRecord(),
	aggregateFunction: JsonAdapters.byKey(StandardAggregateFunctions),
	championshipStartDate: JsonAdapters.dateTimestamp(),
	championshipEndDate: JsonAdapters.nullAware(JsonAdapters.dateTimestamp()),
	active: booleanToStringAdapter,
	nullableBoolean: JsonAdapters.nullAware(booleanToStringAdapter)
}));

describe('Complex object', () => {

	test('Convert object to JSON', () => {

		const result = converter.stringify(testObject, 4);

		expect(result).toBe(testObjectJson);

	});

	test('Convert JSON back to object', () => {

		const result = converter.parse(testObjectJson);

		expect(result).toStrictEqual(getTestObjectWithoutUndefinedField());

	});

	function getTestObjectWithoutUndefinedField(): Omit<TestObject, 'undefinedField'> {
		const testObjectWithoutUndefinedField = {...testObject};
		delete testObjectWithoutUndefinedField.undefinedField;
		return testObjectWithoutUndefinedField;
	}

});

describe('Invalid data', () => {

	test('Convert object with invalid data to JSON', () => {

		const testObjectWithInvalidData: TestObject = {
			...testObject,
			championshipStartDate: null as unknown as Date
		};

		expect(() => {
			converter.stringify(testObjectWithInvalidData, 4);
		}).toThrow('input value is not a date');

	});

	test('Convert JSON with invalid data back to object', () => {
		expect(() => {
			converter.parse(testObjectJsonWithInvalidChampionshipStartDate);
		}).toThrow('input value is not a finite number');
	});

});

describe('JSON5 converter', () => {

	const map = new Map([
		['one', 1],
		['two', 2]
	]);

	const json5Text = '{one:1,two:2}';

	const json5Converter = new JsonConverter(JsonAdapters.mapAsRecord(), json5);

	test('Stringify', () => {

		const result = json5Converter.stringify(map);

		expect(result).toBe(json5Text);

	});

	test('Parse', () => {

		const result = json5Converter.parse(json5Text);

		expect(result).toStrictEqual(map);

	});

});
