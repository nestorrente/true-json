import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getArrayAdapter from '@/json/adapter/getArrayJsonAdapter';
import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
import getCustomAdapter, {JsonAdapterWithNullishSupport} from '@/json/adapter/getCustomAdapter';

export default function getSetAdapter<T extends JsonValue = JsonValue>(): JsonAdapterWithNullishSupport<Set<T>, JsonArray<T>>;
export default function getSetAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): JsonAdapterWithNullishSupport<Set<T>, JsonArray<U>>;
export default function getSetAdapter<T, >(elementAdapter: JsonAdapter<T, any> = getIdentityAdapter()): JsonAdapterWithNullishSupport<Set<T>, JsonArray<any>> {

	const arrayAdapter = getArrayAdapter(elementAdapter);

	return getCustomAdapter({
		adaptToJson(set) {
			return arrayAdapter.adaptToJson([...set])!;
		},
		recoverFromJson(jsonArray) {
			return new Set(arrayAdapter.recoverFromJson(jsonArray));
		}
	});

}
