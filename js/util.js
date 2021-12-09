import { accuracy } from './config.js';

const diff = Math.pow(0.1, accuracy);

export function isEqual(value1, value2) {
	return Math.abs(value1 - value2) < diff;
}

