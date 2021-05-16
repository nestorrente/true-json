import {JsonArray, JsonValue} from '@/json/types';
import JsonAdapter from '@/json/adapter/JsonAdapter';
import getCustomAdapter, {JsonAdapterWithNullishSupport} from '@/json/adapter/getCustomAdapter';

export default function getArrayJsonAdapter<T, U extends JsonValue = JsonValue>(
        elementAdapter: JsonAdapter<T, U>
): JsonAdapterWithNullishSupport<T[], JsonArray<U>> {
    return getCustomAdapter({
        adaptToJson(array) {
            return array.map(e => elementAdapter.adaptToJson(e));
        },
        recoverFromJson(jsonArray) {
            return jsonArray.map(e => elementAdapter.recoverFromJson(e as U));
        }
    });
}
