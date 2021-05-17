import {JsonObject, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {StringKeyOf} from '@/json/adapter/types';

export type PropertyAdapters<T> = {
	[K in keyof T]?: JsonAdapter<T[K], JsonValue | (T[K] extends null ? null : never) | (T[K] extends undefined ? undefined : never)>;
}

export interface ObjectAdapterConfig<T> {
	omitUnmappedProperties: boolean;
	omittedProperties: (keyof T)[];
}

export default function getObjectAdapter<T>(
		propertyAdapters: PropertyAdapters<T>,
		config?: Partial<ObjectAdapterConfig<T>>
): JsonAdapter<T, JsonObject> {

	const fullConfig = getFullConfig(config);

	return {
		adaptToJson(object) {

			const mappedEntries = getObjectEntries(object, propertyAdapters, fullConfig)
					.map(([key, value]) => {
						const adapter = propertyAdapters[key];
						return [key, adapter ? adapter.adaptToJson(value) : value];
					});

			return Object.fromEntries(mappedEntries);

		},
		recoverFromJson(jsonObject) {

			const mappedEntries = getObjectEntries(jsonObject, propertyAdapters, fullConfig)
					.map(([key, value]) => {
						const adapter: JsonAdapter<any, any> | undefined = propertyAdapters[key as keyof T];
						return [key, adapter ? adapter.recoverFromJson(value) : value];
					});

			return Object.fromEntries(mappedEntries);

		}
	};
}

function getFullConfig<T>(partialConfig?: Partial<ObjectAdapterConfig<T>>): ObjectAdapterConfig<T> {
	return {
		omitUnmappedProperties: false,
		omittedProperties: [],
		...partialConfig
	};
}

function getObjectEntries<T extends Record<string, any>>(object: T, propertyAdapters: PropertyAdapters<any>, config: ObjectAdapterConfig<any>) {

	const {
		omitUnmappedProperties,
		omittedProperties
	} = config;

	const entries: [StringKeyOf<T>, any][] = Object.entries(object);

	if (!omitUnmappedProperties && omittedProperties.length === 0) {
		return entries;
	}

	return entries.filter(([key]) => !shouldPropertyBeIgnored(key, propertyAdapters, config));

}

function shouldPropertyBeIgnored(propertyName: string, propertyAdapters: PropertyAdapters<any>, config: ObjectAdapterConfig<any>) {
	return isIgnoredProperty(propertyName, config)
			|| config.omitUnmappedProperties && isUnmappedProperty(propertyName, propertyAdapters);
}

function isIgnoredProperty(propertyName: string, config: ObjectAdapterConfig<any>) {
	const {omittedProperties} = config;
	return omittedProperties.includes(propertyName);
}

function isUnmappedProperty(propertyName: string, propertyAdapters: PropertyAdapters<any>) {
	return !propertyAdapters.hasOwnProperty(propertyName);
}
