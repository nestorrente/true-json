import JsonAdapter from '@/json/adapter/JsonAdapter';
import getIdentityAdapter from '@/json/adapter/identity/getIdentityAdapter';
import {assertBoolean} from '@/json/adapter/assertions';

export default function getStringIdentityAdapter(): JsonAdapter<boolean, boolean> {
	return getIdentityAdapter(value => assertBoolean(value));
}
