import { PaginationParams, PaginationQuery } from '../types/common';

export function extractPaginationParams(query: PaginationQuery): PaginationParams {
	const startDate = query.startDate ? new Date(query.startDate) : undefined;
	const endDate = query.endDate ? new Date(query.endDate) : undefined;
	const page = query.page ? parseInt(query.page, 10) : 1;
	const limit = query.limit ? parseInt(query.limit, 10) : 10;

	return {
		startDate, endDate, page, limit,
	};
}

export function getDateOnly(date: Date): string {
	const isoString = date.toISOString();
	const dateOnly = isoString.split('T')[0];
	return dateOnly;
}

export function identity<T>(value: T): T { return value; }

export function identityPromise<T>(value: T): Promise<T> {
	return Promise.resolve(value);
}

export function nullary<O>(fn: (...args: any[]) => O): () => O {
	return () => fn();
}

export function unary<I, O>(fn: (v: I, ...rest: any[]) => O): (v: I) => O {
	return (v) => fn(v);
}

export function binary<I1, I2, O>(fn: (v1: I1, v2: I2, ...rest: any[]) => O): (v1: I1, v2: I2) => O {
	return (v1, v2) => fn(v1, v2);
}

export function ternary<I1, I2, I3, O>(fn: (v1: I1, v2: I2, v3: I3, ...rest: any[]) => O): (v1: I1, v2: I2, v3: I3) => O {
	return (v1, v2, v3) => fn(v1, v2, v3);
}

export function quaternary<I1, I2, I3, I4, O>(fn: (v1: I1, v2: I2, v3: I3, v4: I4, ...rest: any[]) => O): (v1: I1, v2: I2, v3: I3, v4: I4) => O {
	return (v1, v2, v3, v4) => fn(v1, v2, v3, v4);
}
