import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getNullishAwareCustomAdapter, {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';

export default function getArrayJsonAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): JsonAdapter<Nullable<T[]>, Nullable<JsonArray<U>>> {
	return getNullishAwareCustomAdapter({
		adaptToJson(array) {
			return array.map(e => elementAdapter.adaptToJson(e));
		},
		recoverFromJson(jsonArray) {
			return jsonArray.map(e => elementAdapter.recoverFromJson(e as U));
		}
	});
}
