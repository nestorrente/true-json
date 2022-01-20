import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertFiniteNumber, assertValidDate} from '@/json/adapter/assertions';

export default function getDateTimestampAdapter(): JsonAdapter<Date, number> {
	return {
		adaptToJson(date) {
			assertValidDate(date);
			return date.getTime();
		},
		recoverFromJson(timestamp) {
			assertFiniteNumber(timestamp);
			return new Date(timestamp);
		}
	};
}
