import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getDateTimestampAdapter(): JsonAdapter<Date, number> {
	return {
		adaptToJson(date) {
			return date.getTime();
		},
		recoverFromJson(timestamp) {
			return new Date(timestamp);
		}
	};
}
