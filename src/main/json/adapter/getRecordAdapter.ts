import {JsonObject, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getNullishAwareCustomAdapter, {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';

export default function getRecordAdapter<T, U extends JsonValue = JsonValue>(valueAdapter: JsonAdapter<T, U>): JsonAdapter<Nullable<Record<string, T>>, Nullable<JsonObject<U>>> {
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
