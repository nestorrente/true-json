import {JsonValue} from '@/json/types';
import {JsonAdapter, Nullable} from '@/json/adapter/exports';
import addNullishAwareDecorator from '@/json/adapter/addNullishAwareDecorator';

export type JsonAdapterFactory<A extends any[], T, U extends JsonValue> = (...args: A) => JsonAdapter<T, U>;

export default function createNullishAwareAdapterFactory<A extends any[], T, U extends JsonValue>(
		originalAdapterFactory: JsonAdapterFactory<A, T, U>
): JsonAdapterFactory<A, Nullable<T>, Nullable<U>> {
	return (...args) => addNullishAwareDecorator(originalAdapterFactory(...args));
}
