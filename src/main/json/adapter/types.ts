import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export type StringKeyOf<T> = string & keyof T;

export type NullishValue = null | undefined;
export type Nullable<T> = T | NullishValue;

export type NullishAwareJsonAdapter<T, U extends JsonValue = JsonValue> = JsonAdapter<Nullable<T>, Nullable<U>>;
