import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getArrayJsonAdapter from '@/json/adapter/getArrayJsonAdapter';
import getIdentityAdapter from '@/json/adapter/identity/getIdentityAdapter';
import {MapAdapterConfig, MapEntry} from '@/json/adapter/map/types';
import {assertEntryTuple, assertMap} from '@/json/adapter/assertions';

export default function getMapAsEntriesAdapter<K, V, JK extends JsonValue = JsonValue, JV extends JsonValue = JsonValue>(
		config?: Partial<MapAdapterConfig<K, V, JK, JV>>
): JsonAdapter<Map<K, V>, JsonArray<MapEntry<JK, JV>>> {

	const keyAdapter: JsonAdapter<K, JK> = config?.keyAdapter ?? getIdentityAdapter<any>();
	const valueAdapter: JsonAdapter<V, JV> = config?.valueAdapter ?? getIdentityAdapter<any>();

	const entriesAdapter = getArrayJsonAdapter<MapEntry<K, V>, MapEntry<JK, JV>>({
		adaptToJson(entry) {

			assertEntryTuple(entry);

			const [key, value] = entry;

			return [
				keyAdapter.adaptToJson(key),
				valueAdapter.adaptToJson(value)
			];

		},
		recoverFromJson(jsonEntry) {

			assertEntryTuple(jsonEntry);

			const [jsonKey, jsonValue] = jsonEntry;

			return [
				keyAdapter.recoverFromJson(jsonKey),
				valueAdapter.recoverFromJson(jsonValue)
			];

		}
	});

	return {
		adaptToJson(map) {
			assertMap(map);
			return entriesAdapter.adaptToJson([...map]);
		},
		recoverFromJson(jsonArray) {
			return new Map(entriesAdapter.recoverFromJson(jsonArray));
		}
	};

}
