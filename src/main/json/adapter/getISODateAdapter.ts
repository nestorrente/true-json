import getNullishAwareCustomAdapter from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import {NullishAwareJsonAdapter} from '@/json/adapter/types';

export default function getISODateAdapter(): NullishAwareJsonAdapter<Date, string> {
	return getNullishAwareCustomAdapter({
		adaptToJson(date) {
			return date.toJSON();
		},
		recoverFromJson(isoDateText) {
			return new Date(isoDateText);
		}
	});
}
