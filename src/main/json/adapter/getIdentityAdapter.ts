import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getIdentityAdapter<T extends JsonValue = JsonValue>(): JsonAdapter<T, T> {
	return {
		adaptToJson: v => v,
		recoverFromJson: v => v
	};
}
