// Generated by dts-bundle-generator v5.9.0

export declare type JsonValue = JsonPrimitiveValue | JsonArray<any> | JsonObject<any> | undefined;
export declare type JsonPrimitiveValue = string | number | boolean | null;
export declare type JsonArray<T extends JsonValue> = T[];
export declare type JsonObject<T extends JsonValue = JsonValue> = {
	[key: string]: T;
};
export interface JsonAdapter<T, U extends JsonValue = JsonValue> {
	adaptToJson(value: T): U;
	recoverFromJson(value: U): T;
}
export interface CustomJSON {
	parse: JSON["parse"];
	stringify: JSON["stringify"];
}
export declare class JsonConverter<T> {
	#private;
	constructor(adapter: JsonAdapter<T, any>, json?: CustomJSON);
	stringify(value: T, space?: string | number): string;
	parse(text: string): T;
}
export declare type MapEntry<K, V> = [
	K,
	V
];
export interface MapAdapterConfig<K, V, JK extends JsonValue = JsonValue, JV extends JsonValue = JsonValue> {
	keyAdapter: JsonAdapter<K, JK>;
	valueAdapter: JsonAdapter<V, JV>;
}
export declare type StringKeyOf<T> = string & keyof T;
export declare type TypeAssertion<T> = (value: unknown) => asserts value is T;
declare function getIdentityAdapter<T extends JsonValue = JsonValue>(typeChecksCallback?: TypeAssertion<T>): JsonAdapter<T, T>;
declare function getISODateAdapter(): JsonAdapter<Date, string>;
declare function getDateTimestampAdapter(): JsonAdapter<Date, number>;
declare function getArrayJsonAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): JsonAdapter<T[], JsonArray<U>>;
declare function getSetAdapter<T extends JsonValue = JsonValue>(): JsonAdapter<Set<T>, JsonArray<T>>;
declare function getSetAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): JsonAdapter<Set<T>, JsonArray<U>>;
export interface RecordAdapterConfig {
	strictPlainObjectCheck: boolean;
}
declare function getRecordAdapter<T, U extends JsonValue = JsonValue>(valueAdapter: JsonAdapter<T, U>, config?: RecordAdapterConfig): JsonAdapter<Record<string, T>, JsonObject<U>>;
declare function getMapAsEntriesAdapter<K, V, JK extends JsonValue = JsonValue, JV extends JsonValue = JsonValue>(config?: Partial<MapAdapterConfig<K, V, JK, JV>>): JsonAdapter<Map<K, V>, JsonArray<MapEntry<JK, JV>>>;
declare function getMapAsRecordAdapter<K, V, JV extends JsonValue = JsonValue>(config?: Partial<MapAdapterConfig<K, V, string, JV>>): JsonAdapter<Map<K, V>, JsonObject<JV>>;
export declare type PropertyAdapters<T> = {
	[K in keyof T]?: JsonAdapter<T[K], JsonValueFor<T[K]>>;
};
export declare type JsonValueFor<T, U extends JsonValue = JsonValue> = U | (T extends null ? null : never) | (T extends undefined ? undefined : never);
export interface ObjectAdapterConfig<T = unknown> {
	strictPlainObjectCheck: boolean;
	omitUnmappedProperties: boolean;
	omittedProperties: (keyof T)[];
}
declare function getObjectAdapter<T>(propertyAdapters: PropertyAdapters<T>, config?: Partial<ObjectAdapterConfig<T>>): JsonAdapter<T, JsonObject>;
declare function getByKeyAdapter<T, R extends Record<string, T>>(keyValuePairs: R): JsonAdapter<T, StringKeyOf<R>>;
declare function getByKeyLenientAdapter<T, R extends Record<string, T> = Record<string, T>>(keyValuePairs: R): JsonAdapter<T | undefined, StringKeyOf<R> | undefined>;
declare function getByKeyLenientAdapter<T, R extends Record<string, T> = Record<string, T>>(keyValuePairs: R, fallbackKey: StringKeyOf<R>): JsonAdapter<T, StringKeyOf<R>>;
declare function getCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T, U>;
declare function getNullishAwareCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | null | undefined, U | null | undefined>;
declare function getUndefinedAwareCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | undefined, U | undefined>;
declare function getNullAwareCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | null, U | null>;
export declare const JsonAdapters: {
	identity: typeof getIdentityAdapter;
	isoDate: typeof getISODateAdapter;
	dateTimestamp: typeof getDateTimestampAdapter;
	array: typeof getArrayJsonAdapter;
	set: typeof getSetAdapter;
	record: typeof getRecordAdapter;
	mapAsEntries: typeof getMapAsEntriesAdapter;
	mapAsRecord: typeof getMapAsRecordAdapter;
	object: typeof getObjectAdapter;
	byKey: typeof getByKeyAdapter;
	byKeyLenient: typeof getByKeyLenientAdapter;
	custom: typeof getCustomAdapter;
	nullAware: typeof getNullAwareCustomAdapter;
	undefinedAware: typeof getUndefinedAwareCustomAdapter;
	nullishAware: typeof getNullishAwareCustomAdapter;
};

export {};
