import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
import getISODateAdapter from '@/json/adapter/getISODateAdapter';
import getArrayJsonAdapter from '@/json/adapter/getArrayJsonAdapter';
import getSetAdapter from '@/json/adapter/getSetAdapter';
import getRecordAdapter from '@/json/adapter/getRecordAdapter';
import getObjectAdapter from '@/json/adapter/getObjectAdapter';
import getMapAsEntriesAdapter from '@/json/adapter/map/getMapAsEntriesAdapter';
import getMapAsRecordAdapter from '@/json/adapter/map/getMapAsRecordAdapter';
import getByKeyAdapter from '@/json/adapter/getByKeyAdapter';
import getCustomAdapter from '@/json/adapter/getCustomAdapter';
import getDateTimestampAdapter from '@/json/adapter/getDateTimestampAdapter';
import createNullishAwareAdapterFactory from '@/json/adapter/nullish/createNullishAwareAdapterFactory';
import getNullishAwareCustomAdapter from '@/json/adapter/nullish/getNullishAwareCustomAdapter';

const JsonAdapters = {
	identity: getIdentityAdapter,
	isoDate: getISODateAdapter,
	dateTimestamp: getDateTimestampAdapter,
	array: getArrayJsonAdapter,
	set: getSetAdapter,
	record: getRecordAdapter,
	object: getObjectAdapter,
	mapAsEntries: getMapAsEntriesAdapter,
	mapAsRecord: getMapAsRecordAdapter,
	byKey: getByKeyAdapter,
	custom: getCustomAdapter,
	nullishAware: {
		identity: createNullishAwareAdapterFactory(getIdentityAdapter),
		isoDate: createNullishAwareAdapterFactory(getISODateAdapter),
		dateTimestamp: createNullishAwareAdapterFactory(getDateTimestampAdapter),
		array: createNullishAwareAdapterFactory(getArrayJsonAdapter),
		set: createNullishAwareAdapterFactory(getSetAdapter),
		record: createNullishAwareAdapterFactory(getRecordAdapter),
		object: createNullishAwareAdapterFactory(getObjectAdapter),
		mapAsEntries: createNullishAwareAdapterFactory(getMapAsEntriesAdapter),
		mapAsRecord: createNullishAwareAdapterFactory(getMapAsRecordAdapter),
		byKey: createNullishAwareAdapterFactory(getByKeyAdapter),
		custom: getNullishAwareCustomAdapter
	}
};

export default JsonAdapters;
