import JsonAdapter from '@/json/adapter/JsonAdapter';

export type StringKeyOf<T> = string & keyof T;

export default function getByKeyAdapter<T, R extends Record<string, T>>(keyValuePairs: R): JsonAdapter<T | undefined, StringKeyOf<R> | undefined>;
export default function getByKeyAdapter<T, R extends Record<string, T>>(keyValuePairs: R, defaultKey: StringKeyOf<R>): JsonAdapter<T, StringKeyOf<R>>;
export default function getByKeyAdapter<T, R extends Record<string, T>>(keyValuePairs: R, defaultKey?: StringKeyOf<R>): JsonAdapter<T | undefined, StringKeyOf<R> | undefined> {
	return {
		adaptToJson(value) {

			const entry = Object.entries(keyValuePairs).find(([, entryValue]) => value === entryValue);

			if (!entry) {
				return defaultKey;
			}

			return entry[0];

		},
		recoverFromJson(key) {
			if (key != null) {
				return keyValuePairs[key];
			} else if (defaultKey != null) {
				return keyValuePairs[defaultKey];
			} else {
				return undefined;
			}
		}
	}
}
