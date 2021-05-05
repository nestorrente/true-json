import {JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getISODateAdapter(): JsonAdapter<Date, string> {
	return {
		adaptToJson(date) {
			return date.toJSON();
		},
		recoverFromJson(isoDateText) {
			return new Date(isoDateText);
		}
	};
}
