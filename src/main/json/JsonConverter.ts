import JsonAdapter from '@/json/adapter/JsonAdapter';

interface CustomJSON {
	parse: JSON['parse'];
	stringify: JSON['stringify'];
}

export default class JsonConverter<T> {

	readonly #json: CustomJSON;
	readonly #adapter: JsonAdapter<T, any>;

	constructor(adapter: JsonAdapter<T, any>, json: CustomJSON = JSON) {
		this.#json = json;
		this.#adapter = adapter;
	}

	public stringify(value: T, space?: string | number) {
		return this.#json.stringify(this.#adapter.adaptToJson(value), undefined, space);
	}

	public parse(text: string) {
		return this.#adapter.recoverFromJson(this.#json.parse(text));
	}

}
