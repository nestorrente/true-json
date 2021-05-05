import JsonAdapter from '@/json/adapter/JsonAdapter';

export default class JsonConverter<T> {

	readonly #adapter: JsonAdapter<T, any>;

	constructor(adapter: JsonAdapter<T, any>) {
		this.#adapter = adapter;
	}

	public stringify(value: T, space?: string | number) {
		return JSON.stringify(this.#adapter.adaptToJson(value), undefined, space);
	}

	public parse(text: string) {
		return this.#adapter.recoverFromJson(JSON.parse(text));
	}

}
