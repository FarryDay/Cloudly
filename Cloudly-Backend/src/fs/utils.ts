import type { FsClientStats } from './types'

const getFsStatValue = (key: FsClientStats) => (key.freeSize / key.totalSize) * 100;

export const getBetterStatsClient = (stats: FsClientStats[]) => {
	return stats.reduce(function (p, v) {
		return getFsStatValue(p) < getFsStatValue(v) ? p : v;
	});
}