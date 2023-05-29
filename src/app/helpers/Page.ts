export class Page<T> {
	constructor(public page: number,
		public totalPages: number,
		public count: number,
		public data: T[]
	) {}
}