import {JsonValue} from '@/json/types';
import {NullishAwareJsonAdapter} from '@/json/adapter/types';

export default function getIdentityAdapter<T extends JsonValue = JsonValue>(): NullishAwareJsonAdapter<T, T> {
	return {
		adaptToJson: v => v,
		recoverFromJson: v => v
	};
}
