// Generated by dts-bundle-generator v8.1.1

export type JsonValue = JsonPrimitiveValue | JsonArray<any> | JsonObject<any> | undefined;
export type JsonPrimitiveValue = string | number | boolean | null;
export type JsonArray<T extends JsonValue> = T[];
export type JsonObject<T extends JsonValue = JsonValue> = {
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
export type InputValueValidator = (value: unknown) => void;
declare function getIdentityAdapter<T extends JsonValue = JsonValue>(validator?: InputValueValidator): JsonAdapter<T, T>;
declare function getISODateAdapter(): JsonAdapter<Date, string>;
declare function getDateTimestampAdapter(): JsonAdapter<Date, number>;
declare function getArrayJsonAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): JsonAdapter<T[], JsonArray<U>>;
declare function getSetAdapter<T extends JsonValue = JsonValue>(): JsonAdapter<Set<T>, JsonArray<T>>;
declare function getSetAdapter<T, U extends JsonValue = JsonValue>(elementAdapter: JsonAdapter<T, U>): JsonAdapter<Set<T>, JsonArray<U>>;
export interface RecordAdapterConfig {
	strictPlainObjectCheck: boolean;
}
declare function getRecordAdapter<T, U extends JsonValue = JsonValue>(valueAdapter: JsonAdapter<T, U>, config?: RecordAdapterConfig): JsonAdapter<Record<string, T>, JsonObject<U>>;
export type MapEntry<K, V> = [
	K,
	V
];
export interface MapAdapterConfig<K, V, JK extends JsonValue = JsonValue, JV extends JsonValue = JsonValue> {
	keyAdapter: JsonAdapter<K, JK>;
	valueAdapter: JsonAdapter<V, JV>;
}
declare function getMapAsEntriesAdapter<K, V, JK extends JsonValue = JsonValue, JV extends JsonValue = JsonValue>(config?: Partial<MapAdapterConfig<K, V, JK, JV>>): JsonAdapter<Map<K, V>, JsonArray<MapEntry<JK, JV>>>;
declare function getMapAsRecordAdapter<K, V, JV extends JsonValue = JsonValue>(config?: Partial<MapAdapterConfig<K, V, string, JV>>): JsonAdapter<Map<K, V>, JsonObject<JV>>;
export type PropertyAdapters<T> = {
	[K in keyof T]?: JsonAdapter<T[K], JsonValueFor<T[K]>>;
};
export type JsonValueFor<T, U extends JsonValue = JsonValue> = U | (T extends null ? null : never) | (T extends undefined ? undefined : never);
export interface ObjectAdapterConfig<T extends object = object> {
	strictPlainObjectCheck: boolean;
	omitUnmappedProperties: boolean;
	omittedProperties: (keyof T)[];
}
declare function getObjectAdapter<T extends object>(propertyAdapters: PropertyAdapters<T>, config?: Partial<ObjectAdapterConfig<T>>): JsonAdapter<T, JsonObject>;
export type StringKeyOf<T> = string & keyof T;
declare function getByKeyAdapter<T, R extends Record<string, T>>(keyValuePairs: R): JsonAdapter<T, StringKeyOf<R>>;
declare function getByKeyLenientAdapter<T, R extends Record<string, T> = Record<string, T>>(keyValuePairs: R): JsonAdapter<T | undefined, StringKeyOf<R> | undefined>;
declare function getByKeyLenientAdapter<T, R extends Record<string, T> = Record<string, T>>(keyValuePairs: R, fallbackKey: StringKeyOf<R>): JsonAdapter<T, StringKeyOf<R>>;
declare function getCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T, U>;
declare function getNullishAwareCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | null | undefined, U | null | undefined>;
declare function getUndefinedAwareCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | undefined, U | undefined>;
declare function getNullAwareCustomAdapter<T, U extends JsonValue = JsonValue>(adapter: JsonAdapter<T, U>): JsonAdapter<T | null, U | null>;
declare function getStringIdentityAdapter(): JsonAdapter<string, string>;
declare function getNumberIdentityAdapter(): JsonAdapter<number, number>;
declare function getIntegerIdentityAdapter(): JsonAdapter<number, number>;
declare function getBooleanIdentityAdapter(): JsonAdapter<boolean, boolean>;
export declare const JsonAdapters: {
	identity: typeof getIdentityAdapter;
	stringIdentity: typeof getStringIdentityAdapter;
	numberIdentity: typeof getNumberIdentityAdapter;
	integerIdentity: typeof getIntegerIdentityAdapter;
	booleanIdentity: typeof getBooleanIdentityAdapter;
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
