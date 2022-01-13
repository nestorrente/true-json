import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertRealNumber, assertValidDate} from '@/json/adapter/assertions';

export default function getDateTimestampAdapter(): JsonAdapter<Date, number> {
	return {
		adaptToJson(date) {
			assertValidDate(date);
			return date.getTime();
		},
		recoverFromJson(timestamp) {
			assertRealNumber(timestamp);
			return new Date(timestamp);
		}
	};
}
