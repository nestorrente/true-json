import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getUndefinedAwareAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | undefined, U | undefined> {
	return {
		adaptToJson(value) {
			if (value === undefined) {
				return undefined;
			} else {
				return adapter.adaptToJson(value);
			}
		},
		recoverFromJson(value) {
			if (value === undefined) {
				return undefined;
			} else {
				return adapter.recoverFromJson(value);
			}
		}
	};
}
