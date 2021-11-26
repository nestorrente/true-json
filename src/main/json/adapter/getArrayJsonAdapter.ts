import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertArray} from '@/json/adapter/assertions';

export default function getArrayJsonAdapter<T, U extends JsonValue = JsonValue>(
		elementAdapter: JsonAdapter<T, U>
): JsonAdapter<T[], JsonArray<U>> {
	return {
		adaptToJson(array) {
			assertArray(array);
			return array.map(e => elementAdapter.adaptToJson(e));
		},
		recoverFromJson(jsonArray) {
			assertArray(jsonArray);
			return jsonArray.map(e => elementAdapter.recoverFromJson(e as U));
		}
	};
}
