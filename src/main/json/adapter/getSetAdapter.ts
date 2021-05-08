import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getArrayAdapter from '@/json/adapter/getArrayJsonAdapter';
import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
import getNullishAwareCustomAdapter, {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';

export default function getSetAdapter<T extends JsonValue = JsonValue>(): JsonAdapter<Nullable<Set<T>>, Nullable<JsonArray<T>>>;
export default function getSetAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): JsonAdapter<Nullable<Set<T>>, Nullable<JsonArray<U>>>;
export default function getSetAdapter<T, >(elementAdapter: JsonAdapter<T, any> = getIdentityAdapter()): JsonAdapter<Nullable<Set<T>>, Nullable<JsonArray<any>>> {

	const arrayAdapter = getArrayAdapter(elementAdapter);

	return getNullishAwareCustomAdapter({
		adaptToJson(set) {
			return arrayAdapter.adaptToJson([...set])!;
		},
		recoverFromJson(jsonArray) {
			return new Set(arrayAdapter.recoverFromJson(jsonArray));
		}
	});

}
