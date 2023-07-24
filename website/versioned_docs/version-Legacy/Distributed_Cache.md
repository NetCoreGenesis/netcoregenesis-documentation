---
id: Distributed_Cache
slug: Distributed_Cache
title: Distributed Cache
sidebar_label: Distributed Cache
---

**Redis Cache** is used for caching as distributed. Besides, .Net Core's **In-Memory Cache** can be used interchangeably with a slight effort.

> Redis is an open source, in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets and so on. For more visit [https://redis.io/](https://redis.io/)

Redis server's IP and port can be changed/overridden in one of`appSettings.json`, `appSettings.Development.json` or `appSettings.Production.json` files for different environments.

```json
"Redis":  {  
	"Url":  "172.17.0.2:6379"  
}
```

## How Redis is benefited in the solution?

Currently, **Session**, **Permissions**, **Parameters**, **Service Definitions** and some **EF Core queries** are stored in Redis.

## Secure Redis Server

### Authentication

Require clients to issue AUTH `}<PASSWORD>{` before processing any other commands.
This might be useful in environments in which you do not trust others with access to the host running redis-server.

1) Open `redis.conf` file and change password to a very long & strong
password. Docker will mount this file on next run. You can restart existing containers to affect changes.

   ```
   requirepass <Your_very_Long_very_Strong_Password>
   ```

2) Open `Base/CoreSvc/coreSettings.json` and each `appsettings.{ENVIRONMENT}.json` files and replace password with the new one.

   ```json
   "Redis": {
     "Url": "127.0.0.1:6379,password=<Your_very_Long_very_Strong_Password>,syncTimeout=10000",
     "DatabaseIndex": 0
   }
   ```

### Network Security

Access to the Redis port (default 6379) should be denied to everybody but trusted clients in the network, so the servers running Redis should be directly accessible only by the computers implementing the application using Redis.

> For comprehensive security instructions, visit https://redis.io/topics/security

## Separating Databases for each multiple unrelated application

Out of the box, every Redis instance supports 16 databases. The database index is the number you see at the end of a Redis URL: redis://localhost:6379/0. The default database is 0 but you can change that to any number from 0-15 (and you can configure Redis to support more databases, look in redis.conf).

Each database provides a distinct keyspace, independent from the others.
Use `SELECT n` to change databases. Use `FLUSHDB` to flush the current database. You can `MOVE` a key from the current database to another database.

In practical terms, Redis databases should be used to separate different keys belonging to the same application (if needed), and not to use a single Redis instance for *multiple unrelated applications*.

So, for unrelated applications those use same Redis server, set and use different **DatabaseIndex** in `appsettings.{ENVIRONMENT}.json`

```
"Redis": {
	"Url": "127.0.0.1:6379,password=<Your_very_Long_very_Strong_Password>,syncTimeout=10000",
	"DatabaseIndex": 0
}
```

> Using separate databases is an easy way to put a “firewall” between datasets without any additional administrative overhead. Now you can FLUSHDB one dataset without affecting another dataset.
> > Protip: configure your test suites to use a different database than your development environment so the test suite can FLUSHDB without destroying development data.
