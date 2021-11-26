import {StringKeyOf} from '@/json/adapter/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {hasOwnProperty} from '@/json/adapter/utils';
import {assertString} from '@/json/adapter/assertions';

export default function getByKeyLenientAdapter<T, R extends Record<string, T> = Record<string, T>>(keyValuePairs: R): JsonAdapter<T | undefined, StringKeyOf<R> | undefined>;
export default function getByKeyLenientAdapter<T, R extends Record<string, T> = Record<string, T>>(keyValuePairs: R, fallbackKey: StringKeyOf<R>): JsonAdapter<T, StringKeyOf<R>>;
export default function getByKeyLenientAdapter<T, R extends Record<string, T> = Record<string, T>>(keyValuePairs: R, fallbackKey?: StringKeyOf<R>): JsonAdapter<T | undefined, StringKeyOf<R> | undefined> {
	return {
		adaptToJson(value) {

			const entry = Object.entries(keyValuePairs).find(([, entryValue]) => value === entryValue);

			if (entry) {
				const [key] = entry;
				return key;
			}

			return fallbackKey;

		},
		recoverFromJson(key) {

			if (fallbackKey === undefined && key === undefined) {
				return undefined;
			}

			assertString(key);

			if (hasOwnProperty(keyValuePairs, key)) {
				return keyValuePairs[key];
			}

			return fallbackKey != null ? keyValuePairs[fallbackKey] : undefined;

		}
	};
}
