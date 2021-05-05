import {JsonArray, JsonObject, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getArrayJsonAdapter from '@/json/adapter/getArrayJsonAdapter';
import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
import {MapAdapterConfig, MapEntry} from '@/json/adapter/map/types';
import getMapAsEntriesAdapter from '@/json/adapter/map/getMapAsEntriesAdapter';

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
			const entries = Object.entries(jsonObject);
			return mapAsEntriesAdapter.recoverFromJson(entries);
		}
	};

}
