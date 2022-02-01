import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export type InputValueValidator = (value: unknown) => void;

export default function getIdentityAdapter<T extends JsonValue = JsonValue>(
		validator?: InputValueValidator
): JsonAdapter<T, T> {
	if (validator == null) {
		return {
			adaptToJson: v => v,
			recoverFromJson: v => v
		};
	} else {
		return {
			adaptToJson: value => {
				validator(value);
				return value;
			},
			recoverFromJson: value => {
				validator(value);
				return value;
			}
		};
	}
}
