import {StringKeyOf} from '@/json/adapter/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

// TODO improve types so unknown values are not accepted
export default function getByKeyAdapter<T, R extends Record<string, T>>(
		keyValuePairs: R
): JsonAdapter<T, StringKeyOf<R>> {
	return {
		adaptToJson(value) {

			const entry = Object.entries(keyValuePairs).find(([, entryValue]) => value === entryValue);

			if (!entry) {
				throw new Error('Provided value is not associated with any key');
			}

			const [key] = entry;

			return key;

		},
		recoverFromJson(key) {

			if (key == null || !(key in keyValuePairs)) {
				throw new Error('Provided key is not associated with any value');
			}

			return keyValuePairs[key];

		}
	};
}
