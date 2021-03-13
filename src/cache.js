/*
import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
    url: 'redis://127.0.0.1:6379/0',
})

const asyncGet = promisify(client.get).bind(client);
export async function getCache(key) {
    return await asyncGet(key);
}

const asyncSet = promisify(client.set).bind(client);
export async function setCache(key, value) {
    await asyncSet(key, value);
}
*/