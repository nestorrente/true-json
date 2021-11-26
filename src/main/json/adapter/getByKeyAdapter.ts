import {StringKeyOf} from '@/json/adapter/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertStringKeyOf} from '@/json/adapter/assertions';

// TODO improve types so unknown values are not accepted
export default function getByKeyAdapter<T, R extends Record<string, T>>(
		keyValuePairs: R
): JsonAdapter<T, StringKeyOf<R>> {
	return {
		adaptToJson(value) {

			const entry = Object.entries(keyValuePairs).find(([, entryValue]) => value === entryValue);

			if (entry) {
				const [key] = entry;
				return key;
			}

			throw new Error('input value is not associated with any key');

		},
		recoverFromJson(key) {
			assertStringKeyOf(key, keyValuePairs);
			return keyValuePairs[key];
		}
	};
}
