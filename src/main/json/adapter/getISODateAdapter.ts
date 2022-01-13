import JsonAdapter from '@/json/adapter/JsonAdapter';
import {assertDateString, assertValidDate} from '@/json/adapter/assertions';

export default function getISODateAdapter(): JsonAdapter<Date, string> {
	return {
		adaptToJson(date) {
			assertValidDate(date);
			return date.toJSON();
		},
		recoverFromJson(isoDateText) {
			assertDateString(isoDateText);
			return new Date(isoDateText);
		}
	};
}
