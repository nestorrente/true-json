import {JsonObject, JsonValue} from '@/json/types';
import {MapAdapterConfig} from '@/json/adapter/map/types';
import getMapAsEntriesAdapter from '@/json/adapter/map/getMapAsEntriesAdapter';
import getCustomAdapter, {JsonAdapterWithNullishSupport} from '@/json/adapter/getCustomAdapter';

export default function getMapAsRecordAdapter<K, V, JV extends JsonValue = JsonValue>(
		config?: Partial<MapAdapterConfig<K, V, string, JV>>
): JsonAdapterWithNullishSupport<Map<K, V>, JsonObject<JV>> {

	const mapAsEntriesAdapter = getMapAsEntriesAdapter(config);

	return getCustomAdapter({
		adaptToJson(map) {
			const adaptedEntries = mapAsEntriesAdapter.adaptToJson(map)!;
			return Object.fromEntries(adaptedEntries);
		},
		recoverFromJson(jsonObject) {
			const entries = Object.entries(jsonObject);
			return mapAsEntriesAdapter.recoverFromJson(entries)!;
		}
	});

}
