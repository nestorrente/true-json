import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export type MapEntry<K, V> = [K, V];

export interface MapAdapterConfig<K, V, JK extends JsonValue = JsonValue, JV extends JsonValue = JsonValue> {
	keyAdapter: JsonAdapter<K, JK>;
	valueAdapter: JsonAdapter<V, JV>;
}
