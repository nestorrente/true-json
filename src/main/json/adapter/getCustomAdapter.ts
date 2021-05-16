import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export interface JsonAdapterWithNullishSupport<T, U extends JsonValue = JsonValue> extends JsonAdapter<T, U> {

	withNullSupport(): JsonAdapter<T | null, U | null>;

	withUndefinedSupport(): JsonAdapter<T | undefined, U | undefined>;

	withNullishSupport(): JsonAdapter<T | null | undefined, U | null | undefined>;

}

// This method exists only for type inference purposes
export default function getCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapterWithNullishSupport<T, U> {
	return {
		adaptToJson(value) {
			return adapter.adaptToJson(value);
		},
		recoverFromJson(value) {
			return adapter.recoverFromJson(value);
		},
		withNullSupport(): JsonAdapter<T | null, U | null> {
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
		},
		withUndefinedSupport(): JsonAdapter<T | undefined, U | undefined> {
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
		},
		withNullishSupport(): JsonAdapter<T | null | undefined, U | null | undefined> {
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
	};
}
