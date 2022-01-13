import {JsonObject, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertPlainObject} from '@/json/adapter/assertions';

export interface RecordAdapterConfig {
	strictPlainObjectCheck: boolean;
}

export default function getRecordAdapter<T, U extends JsonValue = JsonValue>(
		valueAdapter: JsonAdapter<T, U>,
		config?: RecordAdapterConfig
): JsonAdapter<Record<string, T>, JsonObject<U>> {

	const fullConfig = completeConfigWithDefaultValues(config);

	return {
		adaptToJson(object) {

			if (fullConfig.strictPlainObjectCheck) {
				assertPlainObject(object);
			}

			const mappedEntries = Object.entries(object)
					.map(([key, value]) => {
						return [key, valueAdapter.adaptToJson(value)];
					});

			return Object.fromEntries(mappedEntries);

		},
		recoverFromJson(jsonObject) {

			assertPlainObject(jsonObject);

			const mappedEntries = Object.entries(jsonObject)
					.map(([key, value]) => {
						return [key, valueAdapter.recoverFromJson(value)];
					});

			return Object.fromEntries(mappedEntries);

		}
	};

}

function completeConfigWithDefaultValues(partialConfig?: Partial<RecordAdapterConfig>): RecordAdapterConfig {
	return {
		strictPlainObjectCheck: false,
		...partialConfig
	};
}
