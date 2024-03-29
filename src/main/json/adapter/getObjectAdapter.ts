import {JsonObject, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import {StringKeyOf} from '@/json/adapter/types';
import {hasOwnProperty} from '@/json/adapter/utils';
import {assertPlainObject} from '@/json/adapter/assertions';

export type PropertyAdapters<T> = {
	[K in keyof T]?: JsonAdapter<T[K], JsonValueFor<T[K]>>;
}

type JsonValueFor<T, U extends JsonValue = JsonValue> =
		U
		| (T extends null ? null : never)
		| (T extends undefined ? undefined : never);

export interface ObjectAdapterConfig<T extends object = object> {
	strictPlainObjectCheck: boolean;
	omitUnmappedProperties: boolean;
	omittedProperties: (keyof T)[];
}

export default function getObjectAdapter<T extends object>(
		propertyAdapters: PropertyAdapters<T>,
		config?: Partial<ObjectAdapterConfig<T>>
): JsonAdapter<T, JsonObject> {

	const fullConfig = completeConfigWithDefaultValues(config);

	return {
		adaptToJson(object) {

			if (fullConfig.strictPlainObjectCheck) {
				assertPlainObject(object);
			}

			const mappedEntries = getObjectEntries(object, propertyAdapters, fullConfig)
					.map(([key, value]) => {
						const adapter = propertyAdapters[key];
						return [key, adapter ? adapter.adaptToJson(value) : value];
					});

			return Object.fromEntries(mappedEntries);

		},
		recoverFromJson(jsonObject) {

			assertPlainObject(jsonObject);

			const mappedEntries = getObjectEntries(jsonObject, propertyAdapters, fullConfig)
					.map(([key, value]) => {
						const adapter: JsonAdapter<unknown, JsonValue> | undefined = propertyAdapters[key as keyof T];
						return [key, adapter ? adapter.recoverFromJson(value) : value];
					});

			return Object.fromEntries(mappedEntries);

		}
	};

}

function completeConfigWithDefaultValues<T extends object>(
	partialConfig?: Partial<ObjectAdapterConfig<T>>
): ObjectAdapterConfig<T> {
	return {
		strictPlainObjectCheck: false,
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
	return !hasOwnProperty(propertyAdapters, propertyName);
}
