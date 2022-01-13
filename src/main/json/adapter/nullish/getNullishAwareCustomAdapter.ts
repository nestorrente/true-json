import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getNullishAwareCustomAdapter<T, U extends JsonValue = JsonValue>(
		adapter: JsonAdapter<T, U>): JsonAdapter<T | null | undefined, U | null | undefined> {
	return {
		adaptToJson(value) {
			if (isNullish(value)) {
				return value;
			}
			return adapter.adaptToJson(value);
		},
		recoverFromJson(value) {
			if (isNullish(value)) {
				return value;
			}
			return adapter.recoverFromJson(value);
		}
	};
}

function isNullish(value: unknown): value is null | undefined {
	return value == null;
}
