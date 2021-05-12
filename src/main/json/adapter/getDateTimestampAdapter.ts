import getNullishAwareCustomAdapter from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import {NullishAwareJsonAdapter} from '@/json/adapter/types';

export default function getDateTimestampAdapter(): NullishAwareJsonAdapter<Date, number> {
	return getNullishAwareCustomAdapter({
		adaptToJson(date) {
			return date.getTime();
		},
		recoverFromJson(timestamp) {
			return new Date(timestamp);
		}
	});
}
