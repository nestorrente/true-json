import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export type StringKeyOf<T> = string & keyof T;

export type NullishValue = null | undefined;
export type Nullable<T> = T | NullishValue;

export type NullishAwareJsonAdapter<T, U extends JsonValue = JsonValue> = JsonAdapter<Nullable<T>, Nullable<U>>;

export type RecursiveNullable<T> = Nullable<{
	[P in keyof T]: Nullable<T[P] extends (infer U)[]
			? RecursiveNullable<U>[]
			: T[P] extends object
					? RecursiveNullable<T[P]>
					: T[P]>;
}>;
