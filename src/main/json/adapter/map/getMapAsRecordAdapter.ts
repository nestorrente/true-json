import {JsonObject, JsonValue} from '@/json/types';
import {MapAdapterConfig} from '@/json/adapter/map/types';
import getMapAsEntriesAdapter from '@/json/adapter/map/getMapAsEntriesAdapter';
import getNullishAwareCustomAdapter, {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getMapAsRecordAdapter<K, V, JV extends JsonValue = JsonValue>(
		config?: Partial<MapAdapterConfig<K, V, string, JV>>
): JsonAdapter<Nullable<Map<K, V>>, Nullable<JsonObject<JV>>> {

	const mapAsEntriesAdapter = getMapAsEntriesAdapter(config);

	return getNullishAwareCustomAdapter({
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
