export const truncateString = (input: string, length = 10): string =>
	input.length > length ? `${input.substring(0, length)}...` : input;
