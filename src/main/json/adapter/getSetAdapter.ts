import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getArrayAdapter from '@/json/adapter/getArrayJsonAdapter';
import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
import getNullishAwareCustomAdapter from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import {NullishAwareJsonAdapter} from '@/json/adapter/types';

export default function getSetAdapter<T extends JsonValue = JsonValue>(): NullishAwareJsonAdapter<Set<T>, JsonArray<T>>;
export default function getSetAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): NullishAwareJsonAdapter<Set<T>, JsonArray<U>>;
export default function getSetAdapter<T, >(elementAdapter: JsonAdapter<T, any> = getIdentityAdapter()): NullishAwareJsonAdapter<Set<T>, JsonArray<any>> {

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
