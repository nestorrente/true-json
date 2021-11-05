import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getCustomAdapter<T, U extends JsonValue = JsonValue>(
		adaptToJsonCallback: JsonAdapter<T, U>['adaptToJson'],
		recoverFromJsonCallback: JsonAdapter<T, U>['recoverFromJson']
): JsonAdapter<T, U> {
	return {
		adaptToJson(value) {
			return adaptToJsonCallback(value);
		},
		recoverFromJson(value) {
			return recoverFromJsonCallback(value);
		}
	};
}
