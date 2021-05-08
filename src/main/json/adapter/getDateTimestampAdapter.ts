import getNullishAwareCustomAdapter, {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getDateTimestampAdapter(): JsonAdapter<Nullable<Date>, Nullable<number>> {
	return getNullishAwareCustomAdapter({
		adaptToJson(date) {
			return date.getTime();
		},
		recoverFromJson(timestamp) {
			return new Date(timestamp);
		}
	});
}
