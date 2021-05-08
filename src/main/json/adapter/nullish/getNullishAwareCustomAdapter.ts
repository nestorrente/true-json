import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

type NullishValue = null | undefined;
export type Nullable<T> = T | NullishValue;

export default function getNullishAwareCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<Nullable<T>, Nullable<U>> {
	return {
		adaptToJson(value) {
			if (value == null) {
				return value as NullishValue;
			}
			return adapter.adaptToJson(value);
		},
		recoverFromJson(value) {
			if (value == null) {
				return value as NullishValue;
			}
			return adapter.recoverFromJson(value);
		}
	};
}
