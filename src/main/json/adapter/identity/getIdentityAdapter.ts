import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {TypeAssertion} from '@/json/adapter/assertions';

export default function getIdentityAdapter<T extends JsonValue = JsonValue>(
		typeChecksCallback?: TypeAssertion<T>
): JsonAdapter<T, T> {
	if (typeChecksCallback == null) {
		return {
			adaptToJson: v => v,
			recoverFromJson: v => v
		};
	} else {
		return {
			adaptToJson: value => {
				// @ts-expect-error false positive
				typeChecksCallback(value);
				return value;
			},
			recoverFromJson: value => {
				// @ts-expect-error false positive
				typeChecksCallback(value);
				return value;
			}
		};
	}
}
