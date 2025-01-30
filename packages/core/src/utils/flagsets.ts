const SAFE_FLAG_CHUNK_SIZE = Number.MAX_SAFE_INTEGER.toString(2).length;

export class FlagSets {
	private flags: number[] = [];

	add(flag: number) {
		const chunkIndex = (flag / SAFE_FLAG_CHUNK_SIZE) | 0;
		const chunkOffset = flag % SAFE_FLAG_CHUNK_SIZE;
		this.flags[chunkIndex] |= 1 << chunkOffset;
	}

	delete(flag: number) {
		const chunkIndex = (flag / SAFE_FLAG_CHUNK_SIZE) | 0;
		const chunkOffset = flag % SAFE_FLAG_CHUNK_SIZE;
		this.flags[chunkIndex] &= ~(1 << chunkOffset);
	}

	has(flag: number) {
		const chunkIndex = (flag / SAFE_FLAG_CHUNK_SIZE) | 0;
		const chunkOffset = flag % SAFE_FLAG_CHUNK_SIZE;
		return (this.flags[chunkIndex] & (1 << chunkOffset)) !== 0;
	}
}
