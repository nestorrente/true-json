import {JsonObject, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getNullishAwareCustomAdapter, {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';

export type MappedProperties<T, P> = Partial<Record<keyof T, P>>;
export type PropertyAdapters<T, P = JsonValue> = MappedProperties<T, JsonAdapter<any, P>>

export interface ObjectAdapterConfig<T, U> {
	ignoreUnmappedProperties: boolean;
	ignoredProperties: (keyof T)[];
}

export default function getObjectAdapter<T, U extends JsonValue = JsonValue>(
		propertyAdapters: PropertyAdapters<T, U>,
		config?: Partial<ObjectAdapterConfig<T, U>>
): JsonAdapter<Nullable<T>, Nullable<JsonObject<U>>> {

	const fullConfig = getFullConfig(config);

	return getNullishAwareCustomAdapter({
		adaptToJson(object) {

			const mappedEntries = getObjectEntries(object, propertyAdapters, fullConfig)
					.map(([key, value]) => {
						const adapter: JsonAdapter<any, JsonValue> | undefined = propertyAdapters[key as keyof T];
						return [key, adapter ? adapter.adaptToJson(value) : value];
					});

			return Object.fromEntries(mappedEntries);

		},
		recoverFromJson(jsonObject) {

			const mappedEntries = getObjectEntries(jsonObject, propertyAdapters, fullConfig)
					.map(([key, value]) => {
						const adapter: JsonAdapter<any, U> | undefined = propertyAdapters[key as keyof T];
						return [key, adapter ? adapter.recoverFromJson(value) : value];
					});

			return Object.fromEntries(mappedEntries);

		}
	});
}

function getFullConfig<T, U extends JsonValue>(partialConfig?: Partial<ObjectAdapterConfig<T, U>>): ObjectAdapterConfig<T, U> {
	return {
		ignoreUnmappedProperties: false,
		ignoredProperties: [],
		...partialConfig
	};
}

function getObjectEntries(object: Record<string, any>, propertyAdapters: PropertyAdapters<any, any>, config: ObjectAdapterConfig<any, any>) {

	const {
		ignoreUnmappedProperties,
		ignoredProperties
	} = config;

	const entries = Object.entries(object);

	if (!ignoreUnmappedProperties && ignoredProperties.length === 0) {
		return entries;
	}

	return entries.filter(([key]) => !shouldPropertyBeIgnored(key, propertyAdapters, config));

}

function shouldPropertyBeIgnored(propertyName: string, propertyAdapters: PropertyAdapters<any, any>, config: ObjectAdapterConfig<any, any>) {
	return isIgnoredProperty(propertyName, config)
			|| config.ignoreUnmappedProperties && isUnmappedProperty(propertyName, propertyAdapters);
}

function isIgnoredProperty(propertyName: string, config: ObjectAdapterConfig<any, any>) {
	const {ignoredProperties} = config;
	return ignoredProperties.includes(propertyName);
}

function isUnmappedProperty(propertyName: string, propertyAdapters: PropertyAdapters<any, any>) {
	return !propertyAdapters.hasOwnProperty(propertyName);
}
