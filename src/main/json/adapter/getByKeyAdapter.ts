import {NullishAwareJsonAdapter, StringKeyOf} from '@/json/adapter/types';

export default function getByKeyAdapter<T, R extends Record<string, T>>(keyValuePairs: R, fallbackKey?: StringKeyOf<R>): NullishAwareJsonAdapter<T, StringKeyOf<R>> {
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
