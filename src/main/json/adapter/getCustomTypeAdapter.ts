import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

// This method exists only for type inference purposes
export default function getCustomTypeAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T, U> {
	return adapter;
}
