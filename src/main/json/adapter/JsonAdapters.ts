import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
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
import getNullAwareAdapter from '@/json/adapter/nullish/getNullAwareAdapter';
import getNullishAwareAdapter from '@/json/adapter/nullish/getNullishAwareAdapter';
import getUndefinedAwareAdapter from '@/json/adapter/nullish/getUndefinedAwareAdapter';

const JsonAdapters = {
	identity: getIdentityAdapter,
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
	nullAware: getNullAwareAdapter,
	undefinedAware: getUndefinedAwareAdapter,
	nullishAware: getNullishAwareAdapter
};


export default JsonAdapters;
