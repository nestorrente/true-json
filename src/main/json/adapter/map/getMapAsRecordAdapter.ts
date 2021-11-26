import {JsonObject, JsonValue} from '@/json/types';
import {MapAdapterConfig} from '@/json/adapter/map/types';
import getMapAsEntriesAdapter from '@/json/adapter/map/getMapAsEntriesAdapter';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertPlainObject} from '@/json/adapter/assertions';

export default function getMapAsRecordAdapter<K, V, JV extends JsonValue = JsonValue>(
		config?: Partial<MapAdapterConfig<K, V, string, JV>>
): JsonAdapter<Map<K, V>, JsonObject<JV>> {

	const mapAsEntriesAdapter = getMapAsEntriesAdapter(config);

	return {
		adaptToJson(map) {
			const adaptedEntries = mapAsEntriesAdapter.adaptToJson(map);
			return Object.fromEntries(adaptedEntries);
		},
		recoverFromJson(jsonObject) {
			assertPlainObject(jsonObject);
			const entries = Object.entries(jsonObject);
			return mapAsEntriesAdapter.recoverFromJson(entries);
		}
	};

}
