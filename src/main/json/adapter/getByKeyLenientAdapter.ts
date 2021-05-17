import {StringKeyOf} from '@/json/adapter/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getByKeyLenientAdapter<T, R extends Record<string, T>>(
		keyValuePairs: R,
		fallbackKey?: StringKeyOf<R>
): JsonAdapter<T | undefined, StringKeyOf<R> | undefined> {
	return {
		adaptToJson(value) {

			const entry = Object.entries(keyValuePairs).find(([, entryValue]) => value === entryValue);

			if (!entry) {
				return fallbackKey;
			}

			const [key] = entry;

			return key;

		},
		recoverFromJson(key) {
			if (key != null && keyValuePairs.hasOwnProperty(key)) {
				return keyValuePairs[key];
			} else if (fallbackKey != null) {
				return keyValuePairs[fallbackKey];
			} else {
				return undefined;
			}
		}
	};
}
