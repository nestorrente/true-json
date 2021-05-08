import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';

export default function getIdentityAdapter<T extends JsonValue = JsonValue>(): JsonAdapter<Nullable<T>, Nullable<T>> {
	return {
		adaptToJson: v => v,
		recoverFromJson: v => v
	};
}
