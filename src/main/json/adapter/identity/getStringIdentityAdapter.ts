import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertString} from '@/json/adapter/assertions';
import getIdentityAdapter from '@/json/adapter/identity/getIdentityAdapter';

export default function getStringIdentityAdapter(): JsonAdapter<string, string> {
	return getIdentityAdapter(value => assertString(value));
}
