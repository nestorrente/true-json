import getCustomAdapter, {JsonAdapterWithNullishSupport} from '@/json/adapter/getCustomAdapter';

export default function getDateTimestampAdapter(): JsonAdapterWithNullishSupport<Date, number> {
    return getCustomAdapter({
        adaptToJson(date) {
            return date.getTime();
        },
        recoverFromJson(timestamp) {
            return new Date(timestamp);
        }
    });
}
