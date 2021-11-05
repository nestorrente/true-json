import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getNullishAwareAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | null | undefined, U | null | undefined> {
	return {
		adaptToJson(value) {
			if (value === null) {
				return null;
			} else if (value === undefined) {
				return undefined;
			} else {
				return adapter.adaptToJson(value);
			}
		},
		recoverFromJson(value) {
			if (value === null) {
				return null;
			} else if (value === undefined) {
				return undefined;
			} else {
				return adapter.recoverFromJson(value);
			}
		}
	};
}
