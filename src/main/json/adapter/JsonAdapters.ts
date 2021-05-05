import getIdentityAdapter from '@/json/adapter/getIdentityAdapter';
import getISODateAdapter from '@/json/adapter/getISODateAdapter';
import getArrayJsonAdapter from '@/json/adapter/getArrayJsonAdapter';
import getSetAdapter from '@/json/adapter/getSetAdapter';
import getRecordAdapter from '@/json/adapter/getRecordAdapter';
import getObjectAdapter from '@/json/adapter/getObjectAdapter';
import getMapAsEntriesAdapter from '@/json/adapter/map/getMapAsEntriesAdapter';
import getMapAsRecordAdapter from '@/json/adapter/map/getMapAsRecordAdapter';
import getByKeyAdapter from '@/json/adapter/getByKeyAdapter';
import getCustomTypeAdapter from '@/json/adapter/getCustomTypeAdapter';

const JsonAdapters = {
	identity: getIdentityAdapter,
	isoDate: getISODateAdapter,
	array: getArrayJsonAdapter,
	set: getSetAdapter,
	record: getRecordAdapter,
	object: getObjectAdapter,
	mapAsEntries: getMapAsEntriesAdapter,
	mapAsRecord: getMapAsRecordAdapter,
	byKey: getByKeyAdapter,
	custom: getCustomTypeAdapter
};

export default JsonAdapters;
