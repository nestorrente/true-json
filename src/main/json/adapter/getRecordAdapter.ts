import {JsonObject, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getNullishAwareCustomAdapter from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import {NullishAwareJsonAdapter} from '@/json/adapter/types';

export default function getRecordAdapter<T, U extends JsonValue = JsonValue>(
		valueAdapter: JsonAdapter<T, U>
): NullishAwareJsonAdapter<Record<string, T>, JsonObject<U>> {
	return getNullishAwareCustomAdapter({
		adaptToJson(object) {

			const mappedEntries = Object.entries(object)
					.map(([key, value]) => {
						return [key, valueAdapter.adaptToJson(value)];
					});

			return Object.fromEntries(mappedEntries);

		},
		recoverFromJson(jsonObject) {

			const mappedEntries = Object.entries(jsonObject)
					.map(([key, value]) => {
						return [key, valueAdapter.recoverFromJson(value)];
					});

			return Object.fromEntries(mappedEntries);

		}
	});
}
