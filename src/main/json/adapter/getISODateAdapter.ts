import getNullishAwareCustomAdapter, {Nullable} from '@/json/adapter/nullish/getNullishAwareCustomAdapter';
import JsonAdapter from '@/json/adapter/JsonAdapter';

export default function getISODateAdapter(): JsonAdapter<Nullable<Date>, Nullable<string>> {
	return getNullishAwareCustomAdapter({
		adaptToJson(date) {
			return date.toJSON();
		},
		recoverFromJson(isoDateText) {
			return new Date(isoDateText);
		}
	});
}
