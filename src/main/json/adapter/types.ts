import {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';

export type StringKeyOf<T> = string & keyof T;

export type RecursiveNullable<T> = Nullable<{
	[P in keyof T]: Nullable<T[P] extends (infer U)[]
			? RecursiveNullable<U>[]
			: T[P] extends object
					? RecursiveNullable<T[P]>
					: T[P]>;
}>;
