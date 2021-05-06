import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export type Nullable<T> = T | null | undefined;

// This method exists only for type inference purposes
export default function addNullishAwareDecorator<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<Nullable<T>, Nullable<U>> {
	return {
		adaptToJson(value) {
			if (value === null) return null;
			if (value === undefined) return undefined;
			return adapter.adaptToJson(value);
		},
		recoverFromJson(value) {
			if (value === null) return null;
			if (value === undefined) return undefined;
			return adapter.recoverFromJson(value);
		}
	};
}
