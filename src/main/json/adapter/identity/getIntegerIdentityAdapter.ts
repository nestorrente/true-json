import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertIntegerNumber} from '@/json/adapter/assertions';
import getIdentityAdapter from '@/json/adapter/identity/getIdentityAdapter';

export default function getIntegerIdentityAdapter(): JsonAdapter<number, number> {
	return getIdentityAdapter(value => assertIntegerNumber(value));
}
