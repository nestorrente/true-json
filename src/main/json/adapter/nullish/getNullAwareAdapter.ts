import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getNullAwareAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | null, U | null> {
	return {
		adaptToJson(value) {
			if (value === null) {
				return null;
			} else {
				return adapter.adaptToJson(value);
			}
		},
		recoverFromJson(value) {
			if (value === null) {
				return null;
			} else {
				return adapter.recoverFromJson(value);
			}
		}
	};
}
