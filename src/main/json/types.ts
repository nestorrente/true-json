export type JsonValue = JsonPrimitiveValue | JsonArray<any> | JsonObject<any> | undefined;

export type JsonPrimitiveValue = string | number | boolean | null;

export type JsonArray<T extends JsonValue> = T[];

export type JsonObject<T extends JsonValue = JsonValue> = {
	[key: string]: T;
};
