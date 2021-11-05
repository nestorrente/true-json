import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getArrayJsonAdapter<T, U extends JsonValue = JsonValue>(
		elementAdapter: JsonAdapter<T, U>
): JsonAdapter<T[], JsonArray<U>> {
	return {
		adaptToJson(array) {
			return array.map(e => elementAdapter.adaptToJson(e));
		},
		recoverFromJson(jsonArray) {
			return jsonArray.map(e => elementAdapter.recoverFromJson(e as U));
		}
	};
}
