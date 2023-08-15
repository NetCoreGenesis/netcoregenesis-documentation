---
id: Queuing_and_Message_Broker
slug: Queuing_and_Message_Broker
title: Queuing & Message Broker
sidebar_label: Queuing & Message Broker
---

## Why Kafka?

**Kafka** is a fast, scalable, durable, and fault-tolerant **publish-subscribe messaging system**.
It  is used in use cases where JMS, RabbitMQ and AMQP may not even be considered due to volume and responsiveness.

Kafka has higher throughput, reliability and replication characteristics which make it applicable for jobs like tracking service calls or  IoT sensors data where a traditional MOM might not be considered.

Kafka  can work with Flume/Flafka,  Spark Streaming, Storm, HBase, Flink and Spark for real-time ingesting, analysis and processing of streaming data.

It is a data stream used to feed Hadoop BigData lakes. Kafka brokers support massive message streams for low-latency follow-up analysis in Hadoop or Spark.
Also,  Kafka Streaming (a subproject) can be used for real-time analytics.

> For more detail, visit [Apache Kafka official web site](https://kafka.apache.org/).

## When to Use it?

Let’s consider a scenario:

Suppose an e-commerce company has multiple servers for different workloads, and all these servers want to communicate with the database server, so we have multiple data pipelines connecting all of them to the db server as shown below :
![](https://qph.fs.quoracdn.net/main-qimg-7f48b86642b4f30728c4a023dcb0154f)

As you can see in the above image that data pipelines are getting  **complex**  with the increase in the number of system thus makes the whole  **system flow very complicated.**

This is the problem due to which messaging system such as  **Kafka**  comes into the picture.

So, lets see how  **Kafka**  provides a  **solution**  to such  **problems**.

What Kafka does is, it  **decouples**  the  **data pipelines** between the systems and thus makes the communication between systems  **simpler and manageable**.

![](https://qph.fs.quoracdn.net/main-qimg-d7f5f1dd94a5bdc8e946b37d47a58267)

> Thanks to [Nitin Rawat](https://www.quora.com/What-is-Apache-Kafka?share=1)

## How Genesis use Kafka actively?

### As data pipeline between Microservice communication

> TODO: will be elaborated with examples.

### Asynchronous jobs like logging or emailing

> TODO: will be elaborated with examples.
