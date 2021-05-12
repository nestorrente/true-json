import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {NullishAwareJsonAdapter, NullishValue} from '@/json/adapter/types';

export default function getNullishAwareCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): NullishAwareJsonAdapter<T, U> {
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
