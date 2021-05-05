import getRecordAdapter from '@/json/adapter/getRecordAdapter';

const textRecordAdapter = getRecordAdapter<string, string>({
	adaptToJson(value: string): string {
		return value.toUpperCase();
	},
	recoverFromJson(value: string): string {
		return value.toLowerCase();
	}
});

test(`Adapt Record to JsonArray`, () => {

	const input = {
		hello: 'world',
		apple: 'computer',
		microsoft: 'word'
	};

	const result = textRecordAdapter.adaptToJson(input);

	expect(result).toStrictEqual({
		hello: 'WORLD',
		apple: 'COMPUTER',
		microsoft: 'WORD'
	});

});

test(`Adapt Record from JsonArray`, () => {

	const input = {
		hello: 'WORLD',
		apple: 'COMPUTER',
		microsoft: 'WORD'
	};

	const result = textRecordAdapter.recoverFromJson(input);

	expect(result).toStrictEqual({
		hello: 'world',
		apple: 'computer',
		microsoft: 'word'
	});

});
