import getCustomAdapter, {JsonAdapterWithNullishSupport} from '@/json/adapter/getCustomAdapter';

export default function getISODateAdapter(): JsonAdapterWithNullishSupport<Date, string> {
    return getCustomAdapter({
        adaptToJson(date) {
            return date.toJSON();
        },
        recoverFromJson(isoDateText) {
            return new Date(isoDateText);
        }
    });
}
