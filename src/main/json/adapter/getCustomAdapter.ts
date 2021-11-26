import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

// This method exists for type inference purposes only
export default function getCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T, U> {
	return adapter;
}
