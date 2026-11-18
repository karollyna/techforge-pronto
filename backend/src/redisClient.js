const Redis = require('ioredis');

// Conexão com o container Redis configurado no docker-compose
const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

const publisher = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

const subscriber = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

// 1. Padrão Cache-Aside com TTL (Expiração em segundos)
async function getOrSetCache(key, cb, ttlInSeconds = 3600) {
  const cachedData = await redis.get(key);
  if (cachedData != null) {
    console.log(`[REDIS CACHE HIT] Chave: ${key}`);
    return JSON.parse(cachedData);
  }

  console.log(`[REDIS CACHE MISS] Chave: ${key}`);
  const freshData = await cb();
  await redis.setex(key, ttlInSeconds, JSON.stringify(freshData));
  return freshData;
}

// 2. Invalidação de Cache ao atualizar/deletar dados
async function invalidateCache(key) {
  console.log(`[REDIS CACHE INVALIDATE] Chave: ${key}`);
  await redis.del(key);
}

// 3. Pub/Sub - Mensageria e Assinatura de Eventos
function initPubSub() {
  subscriber.subscribe('techforge_events', (err, count) => {
    if (err) {
      console.error('[REDIS PUBSUB ERROR]', err);
    } else {
      console.log(`[REDIS PUBSUB] Inscrito em ${count} canal(is).`);
    }
  });

  subscriber.on('message', (channel, message) => {
    console.log(`[REDIS EVENT RECEIVED] Canal: ${channel} | Mensagem: ${message}`);
  });
}

async function publishEvent(event, data) {
  const payload = JSON.stringify({ event, data, timestamp: new Date() });
  await publisher.publish('techforge_events', payload);
  console.log(`[REDIS EVENT PUBLISHED] Evento: ${event}`);
}

module.exports = {
  redis,
  getOrSetCache,
  invalidateCache,
  initPubSub,
  publishEvent,
};