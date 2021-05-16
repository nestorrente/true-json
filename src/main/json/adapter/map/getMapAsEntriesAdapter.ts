import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getArrayJsonAdapter from '@/json/adapter/getArrayJsonAdapter';
import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
import {MapAdapterConfig, MapEntry} from '@/json/adapter/map/types';
import getCustomAdapter, {JsonAdapterWithNullishSupport} from '@/json/adapter/getCustomAdapter';

export default function getMapAsEntriesAdapter<K, V, JK extends JsonValue = JsonValue, JV extends JsonValue = JsonValue>(
        config?: Partial<MapAdapterConfig<K, V, JK, JV>>
): JsonAdapterWithNullishSupport<Map<K, V>, JsonArray<MapEntry<JK, JV>>> {

    const keyAdapter: JsonAdapter<K, JK> = config?.keyAdapter ?? getIdentityAdapter<any>();
    const valueAdapter: JsonAdapter<V, JV> = config?.valueAdapter ?? getIdentityAdapter<any>();

    const entryAdapter = getArrayJsonAdapter<MapEntry<K, V>, MapEntry<JK, JV>>({
        adaptToJson(entry) {

            const [key, value] = entry;

            return [
                keyAdapter.adaptToJson(key),
                valueAdapter.adaptToJson(value)
            ];

        },
        recoverFromJson(jsonEntry) {

            const [jsonKey, jsonValue] = jsonEntry;

            return [
                keyAdapter.recoverFromJson(jsonKey),
                valueAdapter.recoverFromJson(jsonValue)
            ];

        }
    });

    return getCustomAdapter({
        adaptToJson(map) {
            return entryAdapter.adaptToJson([...map])!;
        },
        recoverFromJson(jsonArray) {
            return new Map(entryAdapter.recoverFromJson(jsonArray));
        }
    });

}
