import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getNullishAwareCustomAdapter from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import {NullishAwareJsonAdapter} from '@/json/adapter/types';

export default function getArrayJsonAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): NullishAwareJsonAdapter<T[], JsonArray<U>> {
	return getNullishAwareCustomAdapter({
		adaptToJson(array) {
			return array.map(e => elementAdapter.adaptToJson(e));
		},
		recoverFromJson(jsonArray) {
			return jsonArray.map(e => elementAdapter.recoverFromJson(e as U));
		}
	});
}
