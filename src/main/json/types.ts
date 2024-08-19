export type JsonValue = JsonPrimitiveValue | JsonArray<any> | JsonRecord<any> | undefined;

export type JsonPrimitiveValue = string | number | boolean | null;

export type JsonArray<T extends JsonValue> = T[];

export type JsonRecord<T extends JsonValue = JsonValue> = {
	[key: string]: T;
};
