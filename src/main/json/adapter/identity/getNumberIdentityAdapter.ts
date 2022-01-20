import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertFiniteNumber} from '@/json/adapter/assertions';
import getIdentityAdapter from '@/json/adapter/identity/getIdentityAdapter';

export default function getNumberIdentityAdapter(): JsonAdapter<number, number> {
	return getIdentityAdapter(value => assertFiniteNumber(value));
}
