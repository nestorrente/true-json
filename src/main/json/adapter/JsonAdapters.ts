import getIdentityAdapter from '@/json/adapter/identity/getIdentityAdapter';
import getISODateAdapter from '@/json/adapter/getISODateAdapter';
import getDateTimestampAdapter from '@/json/adapter/getDateTimestampAdapter';
import getArrayJsonAdapter from '@/json/adapter/getArrayJsonAdapter';
import getSetAdapter from '@/json/adapter/getSetAdapter';
import getRecordAdapter from '@/json/adapter/getRecordAdapter';
import getMapAsEntriesAdapter from '@/json/adapter/map/getMapAsEntriesAdapter';
import getMapAsRecordAdapter from '@/json/adapter/map/getMapAsRecordAdapter';
import getObjectAdapter from '@/json/adapter/getObjectAdapter';
import getByKeyAdapter from '@/json/adapter/getByKeyAdapter';
import getByKeyLenientAdapter from '@/json/adapter/getByKeyLenientAdapter';
import getCustomAdapter from '@/json/adapter/getCustomAdapter';
import getNullishAwareCustomAdapter from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import getUndefinedAwareCustomAdapter from '@/json/adapter/nullish/getUndefinedAwareCustomAdapter';
import getNullAwareCustomAdapter from '@/json/adapter/nullish/getNullAwareCustomAdapter';
import getStringIdentityAdapter from '@/json/adapter/identity/getStringIdentityAdapter';
import getNumberIdentityAdapter from '@/json/adapter/identity/getNumberIdentityAdapter';
import getIntegerIdentityAdapter from '@/json/adapter/identity/getIntegerIdentityAdapter';
import getBooleanIdentityAdapter from '@/json/adapter/identity/getBooleanIdentityAdapter';

const JsonAdapters = {
	identity: getIdentityAdapter,
	stringIdentity: getStringIdentityAdapter,
	numberIdentity: getNumberIdentityAdapter,
	integerIdentity: getIntegerIdentityAdapter,
	booleanIdentity: getBooleanIdentityAdapter,
	isoDate: getISODateAdapter,
	dateTimestamp: getDateTimestampAdapter,
	array: getArrayJsonAdapter,
	set: getSetAdapter,
	record: getRecordAdapter,
	mapAsEntries: getMapAsEntriesAdapter,
	mapAsRecord: getMapAsRecordAdapter,
	object: getObjectAdapter,
	byKey: getByKeyAdapter,
	byKeyLenient: getByKeyLenientAdapter,
	custom: getCustomAdapter,
	nullAware: getNullAwareCustomAdapter,
	undefinedAware: getUndefinedAwareCustomAdapter,
	nullishAware: getNullishAwareCustomAdapter
};

export default JsonAdapters;
