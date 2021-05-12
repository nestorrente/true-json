import {JsonValue} from '@/json/types';

export default interface JsonAdapter<T, U extends JsonValue = JsonValue> {

	adaptToJson(value: T): U;

	recoverFromJson(value: U): T;

}
