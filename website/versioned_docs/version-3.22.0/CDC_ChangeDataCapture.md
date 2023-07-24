---
id: CDC_ChangeDataCapture
slug: CDC_ChangeDataCapture
title: Change Data Capture with Debezium
sidebar_label: Change Data Capture
---

Net Core Genesis does NOT provide a CDC-Change Data Capture tool by default but recommends [Debezium](https://debezium.io/).


## What is Debezium?

Debezium is an open source distributed platform for change data capture. 

Start it up, point it at your databases, and your apps can start responding to all of the inserts, updates, and deletes that other apps commit to your databases.


## Debezium Features

Debezium is a set of source connectors for Apache Kafka Connect. Each connector ingests changes from a different database by using that database’s features for change data capture (CDC). 

Unlike other approaches, such as polling or dual writes, log-based CDC as implemented by Debezium:

- Ensures that all data changes are captured.
- Produces change events with a very low delay while avoiding increased CPU usage required for frequent polling. For example, for MySQL or PostgreSQL, the delay is in the millisecond range.
- Requires no changes to your data model, such as a "Last Updated" column.
- Can capture deletes.
- Can capture old record state and additional metadata such as transaction ID and causing query, depending on the database’s capabilities and configuration.



## DB Connectors

Debezium’s goal is to build up a library of connectors that capture changes from a variety of database management systems and produce events with very similar structures, making it far easier for your applications to consume and respond to the events regardless of where the changes originated.

[Current connectors](https://debezium.io/documentation/reference/connectors/index.html):
- SQL Server
- PostgreSQL
- Oracle
- MySQL
- MongoDB
- Db2
- Cassandra
- Vitess

## Architecture
The following image shows the architecture of a change data capture pipeline based on Debezium:
[![Debezium Architecture](https://netcoregenesis.com/images/documentation/debezium-architecture.png)](https://netcoregenesis.com/images/documentation/debezium-architecture.png)

> For more, visit https://debezium.io/documentation/reference/architecture.html

## Services
Debezium is built on top of **Apache Kafka** and provides **Kafka Connect** compatible connectors that monitor specific database management systems. 
Debezium records the history of data changes in Kafka logs, from where your application consumes them. This makes it possible for your application to easily consume all of the events correctly and completely. 

Even if your application stops unexpectedly, it will not miss anything: when the application restarts, it will resume consuming the events where it left off.

> To run Debezium with Docker, visit https://debezium.io/documentation/reference/tutorial.html#considerations-running-debezium-docker

