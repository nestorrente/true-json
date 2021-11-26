export function hasOwnProperty(object: unknown, propertyName: PropertyKey): boolean {
	return Object.prototype.hasOwnProperty.call(object, propertyName);
}
