import NodeCache from 'node-cache'

// Create a new cache instance
const cache = new NodeCache()

export function setCache<T>(key: string, value: T, ttl: number) {
	// Set a key-value pair in the cache with a specified time-to-live (ttl) in seconds
	cache.set(key, value, ttl)
}

export function getCache<T>(key: string) {
	// Get the value associated with a key from the cache
	return cache.get(key) as T
}
