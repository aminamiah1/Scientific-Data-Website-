import LZString from "lz-string";

type CacheWriteMode = "update" | "insert";

/**
 * 5.2Mb limit per domain from https://arty.name/localstorage.html
 *
 * If write mode is "update", will overwrite existing cache item.
 * If write mode is "insert", will not overwrite existing cache item.
 * @param itemName
 * @param itemToCache
 * @param writeMode "insert" or "update" - defaults to "insert"
 * @returns
 */
export const cacheItem = async (
    itemName: string,
    itemToCache: string,
    writeMode: CacheWriteMode = "insert"
) => {
    const existingData = window.localStorage.getItem(itemName);

    // Can compress items up to 90% smaller than original size
    itemToCache = LZString.compressToUTF16(itemToCache);

    switch (true) {
        case writeMode === "update" || !existingData:
            console.info("📝 Caching.");
            break;
        default:
            console.warn(
                `⚠ Entry '${itemName}' already exists.\nChange write mode to "update" to forcefully cache.`
            );
            return;
    }

    window.localStorage.setItem(itemName, itemToCache);
    console.info(`📁 Cached '${itemName}'`);

    const usedSize = Object.entries(window.localStorage).reduce(
        (acc, [key, value]) => acc + key.length + value.length,
        0
    );

    console.info(
        `🧰 ${(usedSize / 1000).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        })}kB/5,200kB (${((usedSize / 5_200_000) * 100).toFixed(2)}%) used`
    );
};

export const getCacheItem = (itemName: string): string | null => {
    const item = window.localStorage.getItem(itemName);

    if (!item) {
        console.warn(`⚠ No cache item found for '${itemName}'`);
        return null;
    }

    console.info(`📂 Retrieved '${itemName}' from cache`);
    return LZString.decompressFromUTF16(item);
};

/**
 * Dangerous!  Clears all cached data.  Preferred to use `clearCacheItem` instead.
 */
export const clearCache = () => {
    window.localStorage.clear();
    console.info("🗑 Cache cleared");
};

export const clearCacheItem = (accessor: string) => {
    window.localStorage.removeItem(accessor);
    console.info(`🗑 Cache item ${accessor} cleared`);
};
