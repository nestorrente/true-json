import isPlainObject from 'lodash.isplainobject';
import {hasOwnProperty} from '@/json/adapter/utils';
import {MapEntry} from '@/json/adapter/map/types';
import {StringKeyOf} from '@/json/adapter/types';

export type TypeAssertion<T> = (value: unknown) => asserts value is T;

export const assertNonNullish: TypeAssertion<NonNullable<unknown>> = value => {
	if (value === null) {
		throw new TypeError('input value is null');
	}
	if (value === undefined) {
		throw new TypeError('input value is undefined');
	}
};

export const assertBoolean: TypeAssertion<string> = value => {
	if (typeof value !== 'boolean') {
		throw new TypeError('input value is not a boolean');
	}
};

export const assertIntegerNumber: TypeAssertion<number> = value => {
	if (typeof value !== 'number' || !Number.isInteger(value)) {
		throw new TypeError('input value is not an integer');
	}
};

export const assertFiniteNumber: TypeAssertion<number> = value => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		throw new TypeError('input value is not a finite number');
	}
};

export const assertString: TypeAssertion<string> = value => {
	if (typeof value !== 'string') {
		throw new TypeError('input value is not a string');
	}
};

export const assertDateString: TypeAssertion<string> = value => {
	assertString(value);

	if (Number.isNaN(new Date(value).getTime())) {
		throw new TypeError('input value has not a valid date format');
	}
};

export const assertDate: TypeAssertion<Date> = value => {
	if (!(value instanceof Date)) {
		throw new TypeError('input value is not a date');
	}
};

export const assertValidDate: TypeAssertion<Date> = value => {
	assertDate(value);

	if (Number.isNaN(value.getTime())) {
		throw new TypeError('input value is not a valid date');
	}
};

export const assertArray: TypeAssertion<unknown[]> = value => {
	if (!Array.isArray(value)) {
		throw new TypeError('input value is not an array');
	}
};

export const assertSet: TypeAssertion<Set<unknown>> = value => {
	if (!(value instanceof Set)) {
		throw new TypeError('input value is not a set');
	}
};

export const assertMap: TypeAssertion<Map<unknown, unknown>> = value => {
	if (!(value instanceof Map)) {
		throw new TypeError('input value is not a map');
	}
};

export function assertEntryTuple(value: unknown): asserts value is MapEntry<unknown, unknown> {
	if (!Array.isArray(value) || value.length !== 2) {
		throw new TypeError('input value is not a tuple');
	}
}

export const assertPlainObject: TypeAssertion<Record<PropertyKey, unknown>> = value => {
	if (!isPlainObject(value)) {
		throw new TypeError('input value is not a plain object');
	}
};

export function assertStringKeyOf<T>(value: unknown, object: T): asserts value is StringKeyOf<T> {
	assertString(value);

	if (!hasOwnProperty(object, value)) {
		throw new Error('input value is not a valid key');
	}
}
