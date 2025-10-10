'use strict';

/**
 * @file storageManager.js
 * @description Centralized LocalStorage manager with compression, quota handling, and auto-cleanup
 * @version 1.0.0 - Production Ready
 * @dependencies LZ-String (https://pieroxy.net/blog/pages/lz-string/index.html)
 */

const StorageManager = (function () {

    // ===================================================================
    //  SMART STORAGE ENGINE
    // ===================================================================

    const storageEngine = (function () {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            console.info("LocalStorage is available. Using persistent storage.");
            return localStorage;
        } catch (e) {
            console.warn("LocalStorage is unavailable. Switching to a temporary, in-memory store. Data will NOT be saved between sessions.");

            // In-memory store that mimics the localStorage API
            const inMemoryStore = new Map();
            return {
                setItem: (key, value) => inMemoryStore.set(key, String(value)),
                getItem: (key) => inMemoryStore.has(key) ? inMemoryStore.get(key) : null,
                removeItem: (key) => inMemoryStore.delete(key),
                // Add properties needed for other functions like getStorageSize
                get length() { return inMemoryStore.size; },
                key: (index) => Array.from(inMemoryStore.keys())[index] || null
            };
        }
    })();

    // ===================================================================
    //  CONFIGURATION
    // ===================================================================

    const CONFIG = {
        // Storage limits (LocalStorage is typically 5-10MB)
        QUOTA_WARNING_THRESHOLD: 0.75,  // Warn at 75%
        QUOTA_CRITICAL_THRESHOLD: 0.90, // Critical at 90%
        ESTIMATED_QUOTA: 5 * 1024 * 1024, // 5MB estimate

        // Cleanup settings
        MAX_PROJECTS: 50,
        MAX_CACHED_ANALYSES: 20,
        CLEANUP_BATCH_SIZE: 10,

        // Compression
        COMPRESSION_ENABLED: true,
        MIN_SIZE_FOR_COMPRESSION: 500, // bytes

        // Storage keys
        KEYS: {
            PROJECTS: 'schemaArchitect_projects',
            EMP: 'schemaArchitect_emp',
            CACHE: 'schemaArchitect_cache',
            METADATA: 'schemaArchitect_metadata'
        }
    };

    // ===================================================================
    //  LZ-STRING COMPRESSION LIBRARY (Inline for zero dependencies)
    // ===================================================================

    const LZString = (function () {
        const keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        function compress(uncompressed) {
            return _compress(uncompressed, 6, function (a) { return keyStrBase64.charAt(a); });
        }

        function decompress(compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return _decompress(compressed.length, 32, function (index) {
                return keyStrBase64.indexOf(compressed.charAt(index));
            });
        }

        function _compress(uncompressed, bitsPerChar, getCharFromInt) {
            if (uncompressed == null) return "";
            let i, value, context_dictionary = {}, context_dictionaryToCreate = {},
                context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2,
                context_dictSize = 3, context_numBits = 2, context_data = [],
                context_data_val = 0, context_data_position = 0;

            for (let ii = 0; ii < uncompressed.length; ii += 1) {
                context_c = uncompressed.charAt(ii);
                if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                    context_dictionary[context_c] = context_dictSize++;
                    context_dictionaryToCreate[context_c] = true;
                }
                context_wc = context_w + context_c;
                if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                    context_w = context_wc;
                } else {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 8; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1) | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 16; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    context_dictionary[context_wc] = context_dictSize++;
                    context_w = String(context_c);
                }
            }
            if (context_w !== "") {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                    if (context_w.charCodeAt(0) < 256) {
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                        }
                        value = context_w.charCodeAt(0);
                        for (i = 0; i < 8; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    } else {
                        value = 1;
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1) | value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for (i = 0; i < 16; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                } else {
                    value = context_dictionary[context_w];
                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1);
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
            }
            value = 2;
            for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                } else {
                    context_data_position++;
                }
                value = value >> 1;
            }
            while (true) {
                context_data_val = (context_data_val << 1);
                if (context_data_position == bitsPerChar - 1) {
                    context_data.push(getCharFromInt(context_data_val));
                    break;
                } else context_data_position++;
            }
            return context_data.join('');
        }

        function _decompress(length, resetValue, getNextValue) {
            let dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3,
                entry = "", result = [], i, w, bits, resb, maxpower, power,
                c, data = { val: getNextValue(0), position: resetValue, index: 1 };

            for (i = 0; i < 3; i += 1) {
                dictionary[i] = i;
            }
            bits = 0; maxpower = Math.pow(2, 2); power = 1;
            while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
            }
            switch (next = bits) {
                case 0:
                    bits = 0; maxpower = Math.pow(2, 8); power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = String.fromCharCode(bits);
                    break;
                case 1:
                    bits = 0; maxpower = Math.pow(2, 16); power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = String.fromCharCode(bits);
                    break;
                case 2:
                    return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            while (true) {
                if (data.index > length) {
                    return "";
                }
                bits = 0; maxpower = Math.pow(2, numBits); power = 1;
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                switch (c = bits) {
                    case 0:
                        bits = 0; maxpower = Math.pow(2, 8); power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = String.fromCharCode(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 1:
                        bits = 0; maxpower = Math.pow(2, 16); power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = String.fromCharCode(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 2:
                        return result.join('');
                }
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
                if (dictionary[c]) {
                    entry = dictionary[c];
                } else {
                    if (c === dictSize) {
                        entry = w + w.charAt(0);
                    } else {
                        return null;
                    }
                }
                result.push(entry);
                dictionary[dictSize++] = w + entry.charAt(0);
                enlargeIn--;
                w = entry;
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
            }
        }

        return { compress, decompress };
    })();

    // ===================================================================
    //  STORAGE MEASUREMENT
    // ===================================================================

    /**
     * Calculates current storage usage in bytes
     */
    function getStorageSize() {
        let totalSize = 0;
        // The loop now works for both localStorage and the in-memory fallback
        for (let i = 0; i < storageEngine.length; i++) {
            const key = storageEngine.key(i);
            if (key) {
                const value = storageEngine.getItem(key);
                totalSize += key.length + (value ? value.length : 0);
            }
        }
        return totalSize * 2; // UTF-16 = 2 bytes per character
    }

    /**
     * Gets storage usage percentage
     */
    function getStorageUsagePercent() {
        return getStorageSize() / CONFIG.ESTIMATED_QUOTA;
    }

    /**
     * Checks if storage is near quota
     */
    function getStorageUsagePercent() { return getStorageSize() / CONFIG.ESTIMATED_QUOTA; }
    function getStorageStatus() {
        const percent = getStorageUsagePercent();
        if (percent >= CONFIG.QUOTA_CRITICAL_THRESHOLD) return { status: 'critical', percent, needsCleanup: true };
        if (percent >= CONFIG.QUOTA_WARNING_THRESHOLD) return { status: 'warning', percent, needsCleanup: false };
        return { status: 'ok', percent, needsCleanup: false };
    }

    // ===================================================================
    //  COMPRESSION UTILITIES
    // ===================================================================

    /**
     * Determines if data should be compressed
     */
    function shouldCompress(data) {
        if (!CONFIG.COMPRESSION_ENABLED) return false;
        return JSON.stringify(data).length >= CONFIG.MIN_SIZE_FOR_COMPRESSION;
    }

    /**
     * Compresses data if beneficial
     */
    function compressData(data) {
        const jsonString = JSON.stringify(data);
        if (!shouldCompress(data)) return { compressed: false, data: jsonString };
        const compressed = LZString.compress(jsonString);
        if (compressed.length < jsonString.length * 0.9) return { compressed: true, data: compressed };
        return { compressed: false, data: jsonString };
    }

    /**
     * Decompresses data if needed
     */
    function decompressData(stored) {
        if (!stored) return null;
        try {
            if (stored.compressed) {
                const decompressed = LZString.decompress(stored.data);
                return JSON.parse(decompressed);
            }
            return JSON.parse(stored.data);
        } catch (error) {
            console.error('Decompression failed:', error);
            return null;
        }
    }

    // ===================================================================
    //  METADATA MANAGEMENT
    // ===================================================================

    /**
     * Gets or initializes metadata
     */
    function getMetadata() {
        try {
            const meta = storageEngine.getItem(CONFIG.KEYS.METADATA);
            return meta ? JSON.parse(meta) : { projects: {}, cache: {} };
        } catch (error) {
            return { projects: {}, cache: {} };
        }
    }

    /**
     * Updates metadata for a key
     */
    function updateMetadata(key, type) {
        const meta = getMetadata();
        const timestamp = Date.now();
        if (type === 'project') {
            meta.projects[key] = { lastAccessed: timestamp, created: meta.projects[key]?.created || timestamp };
        } else if (type === 'cache') {
            meta.cache[key] = { lastAccessed: timestamp, created: timestamp };
        }
        storageEngine.setItem(CONFIG.KEYS.METADATA, JSON.stringify(meta));
    }

    // ===================================================================
    //  CLEANUP STRATEGIES
    // ===================================================================

    /**
     * Cleans old cache entries (LRU - Least Recently Used)
     */
    function cleanupCache() {
        const meta = getMetadata();
        const cacheEntries = Object.entries(meta.cache).sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
        let cleaned = 0;
        const toRemove = cacheEntries.slice(0, CONFIG.CLEANUP_BATCH_SIZE);
        for (const [key] of toRemove) {
            storageEngine.removeItem(key);
            delete meta.cache[key];
            cleaned++;
        }
        if (cleaned > 0) {
            storageEngine.setItem(CONFIG.KEYS.METADATA, JSON.stringify(meta));
        }
        return cleaned;
    }

    /**
     * Cleans old projects (keeps most recent MAX_PROJECTS)
     */
    function cleanupProjects() {
        try {
            const projectsRaw = storageEngine.getItem(CONFIG.KEYS.PROJECTS);
            const projectsData = projectsRaw ? JSON.parse(projectsRaw) : {};
            const meta = getMetadata();

            const projectEntries = Object.entries(projectsData)
                .map(([name, data]) => ({ name, data, lastAccessed: meta.projects[name]?.lastAccessed || 0 }))
                .sort((a, b) => b.lastAccessed - a.lastAccessed);

            if (projectEntries.length <= CONFIG.MAX_PROJECTS) return 0;

            const toKeep = new Set(projectEntries.slice(0, CONFIG.MAX_PROJECTS).map(p => p.name));
            const newProjectsData = {};
            const newMetaProjects = {};
            let cleanedCount = 0;

            for (const name in projectsData) {
                if (toKeep.has(name)) {
                    newProjectsData[name] = projectsData[name];
                    if (meta.projects[name]) {
                        newMetaProjects[name] = meta.projects[name];
                    }
                } else {
                    cleanedCount++;
                }
            }

            storageEngine.setItem(CONFIG.KEYS.PROJECTS, JSON.stringify(newProjectsData));
            meta.projects = newMetaProjects;
            storageEngine.setItem(CONFIG.KEYS.METADATA, JSON.stringify(meta));

            return cleanedCount;
        } catch (error) {
            console.error('Project cleanup failed:', error);
            return 0;
        }
    }

    /**
     * Performs full cleanup when quota exceeded
     */
    function performEmergencyCleanup() {
        const cleanedCache = cleanupCache();
        const cleanedProjects = cleanupProjects();
        return {
            success: true,
            didCleanAnything: cleanedCache > 0 || cleanedProjects > 0,
            cache: cleanedCache,
            projects: cleanedProjects
        };
    }

    // ===================================================================
    //  PUBLIC API
    // ===================================================================

    /**
     * Saves data with compression and quota handling
     */
    function set(key, data, type = 'other') {
        try {
            const { compressed, data: processedData } = compressData(data);
            const storagePayload = JSON.stringify({ compressed, data: processedData });
            storageEngine.setItem(key, storagePayload);

            if (type !== 'other') updateMetadata(key, type);

            const status = getStorageStatus();
            if (status.status === 'warning') {
                console.warn(`Storage usage at ${Math.round(status.percent * 100)}%`);
            }
            return { success: true, compressed };

        } catch (error) {
            if (error.name === 'QuotaExceededError' || (error.toString && error.toString().includes('quota'))) {
                const cleanup = performEmergencyCleanup();
                if (cleanup.didCleanAnything) {
                    try {
                        const { compressed, data: processedData } = compressData(data);
                        storageEngine.setItem(key, JSON.stringify({ compressed, data: processedData }));
                        if (typeof showToast === 'function') {
                            showToast(`Storage cleaned: ${cleanup.cache} cache + ${cleanup.projects} old projects removed`, 'info');
                        }
                        return { success: true, compressed, cleaned: cleanup };
                    } catch (retryError) {
                        console.error('Storage quota exceeded even after cleanup', retryError);
                        throw new Error('Storage quota exceeded even after cleanup');
                    }
                }
                console.error('Storage quota exceeded and cleanup failed', error);
                throw new Error('Storage quota exceeded and cleanup failed');
            }
            throw error;
        }
    }

    /**
     * Retrieves and decompresses data
     */
    function get(key, type = 'other') {
        try {
            const stored = storageEngine.getItem(key);
            if (!stored) return null;
            const parsed = JSON.parse(stored);
            const data = decompressData(parsed);
            if (type !== 'other' && data) updateMetadata(key, type);
            return data;
        } catch (error) {
            console.error(`Failed to get ${key}:`, error);
            return null;
        }
    }

    /**
     * Removes item from storage
     */
    function remove(key) {
        storageEngine.removeItem(key);
        const meta = getMetadata();
        let changed = false;
        if (meta.projects[key]) { delete meta.projects[key]; changed = true; }
        if (meta.cache[key]) { delete meta.cache[key]; changed = true; }
        if (changed) storageEngine.setItem(CONFIG.KEYS.METADATA, JSON.stringify(meta));
    }

    /**
     * Gets current storage statistics
     */
    function getStats() {
        const status = getStorageStatus();
        const size = getStorageSize();
        return {
            ...status,
            size,
            sizeKB: (size / 1024).toFixed(2),
            sizeMB: (size / (1024 * 1024)).toFixed(2),
            percentFormatted: `${Math.round(status.percent * 100)}%`
        };
    }

    /**
     * Manually triggers cleanup
     */
    function cleanup() {
        return performEmergencyCleanup();
    }

    return {
        set,
        get,
        remove,
        getStats,
        cleanup,
        KEYS: CONFIG.KEYS
    };

})();

// Make globally available
window.StorageManager = StorageManager;