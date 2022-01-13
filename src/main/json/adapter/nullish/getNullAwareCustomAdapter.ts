import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getNullAwareCustomAdapter<T, U extends JsonValue = JsonValue>(
		adapter: JsonAdapter<T, U>): JsonAdapter<T | null, U | null> {
	return {
		adaptToJson(value) {
			if (value === null) {
				return null;
			}
			return adapter.adaptToJson(value);
		},
		recoverFromJson(value) {
			if (value === null) {
				return null;
			}
			return adapter.recoverFromJson(value);
		}
	};
}
