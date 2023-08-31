---
id: Microservice_Architecture
slug: Microservice_Architecture
title: Microservice Architecture
sidebar_label: Microservice Architecture
---

One of the most well-known patterns for distributed transactions is called **Saga**.

A saga is a sequence of local transactions where each transaction updates data within a single service. The first transaction is initiated by an external request corresponding to the system operation, and then each subsequent step is triggered by the completion of the previous one.

There are a couple of different ways to implement a saga transaction, but the two most popular are:

- **Events/Choreography:** When there is no central coordination, each service produces and listen to other service’s events and decides if an action should be taken or not.
- **Command/Orchestration**: when a coordinator service is responsible for centralizing the saga’s decision making and sequencing business logic.

## We prefer Command/Orchestration method

In the orchestration approach, we define a new service (**BFF / Backend For Frontend**) with the sole responsibility of telling each participant what to do and when. The saga orchestrator communicates with each service in a command/reply style telling them what operation should be performed.

Let’s see how it looks like using e-commerce example:
![Saga pattern command orchestration](https://netcoregenesis.com/images/documentation/saga-pattern-command-orchestration.png)

1. _Order Service_  saves a pending order and asks Order Saga Orchestrator (OSO) to start a  _create order transaction_.
2. _OSO_  sends an  _**Execute Payment**_  command to  _Payment Service_, and it replies with a  _**Payment Executed**_  message
3. _OSO_  sends a  _**Prepare Order**_  command to Stock Service, and it replies with an  _**Order Prepared**_  message
4. _OSO_  sends a  _**Deliver Order**_  command to Delivery Service, and it replies with an  _**Order Delivered**_  message

In the case above, Order Saga Orchestrator knows what is the flow needed to execute a “create order” transaction. If anything fails, it is also responsible for coordinating the rollback by sending commands to each participant to undo the previous operation.

A standard way to model a saga orchestrator is a State Machine where each transformation corresponds to a command or message. State machines are an excellent pattern to structure a well-defined behavior as they are easy to implement and particularly great for testing.

## Rolling back in Saga’s Command/Orchestration

Rollbacks are a lot easier when you have an orchestrator to coordinate everything:

![Saga pattern rollback](https://netcoregenesis.com/images/documentation/saga-pattern-rollback.png)

1. _Stock Service_ replies to OSO with an **_Out-Of-Stock_** message;
2. OSO recognizes that the transaction has failed and starts the rollback.
In this case, only a single operation was executed successfully before the failure, so _OSO_ sends a **_Refund Client_** command to _Payment Service_ and set the order state as failed

> Special thanks to [Denis Rosa](https://blog.couchbase.com/saga-pattern-implement-business-transactions-using-microservices-part-2/)

## Net Core Genesis Microservices Solution Structure

| Overall | Expanded |
|--|--|
| ![Microservice Solution Folder](https://netcoregenesis.com/images/documentation/microservice_solution_folder_structure.png) | ![Solution Expanded](https://netcoregenesis.com/images/documentation/microservice_solution_folder_structure_detail.png)  |


| API | Data |
|--|--|
| ![API](https://netcoregenesis.com/images/documentation/microservice_api_structure.png)  |![DataLib](https://netcoregenesis.com/images/documentation/microservice_datalib_structure.png) |

> **BFF (Backend For Frontend)** project is the orchestrator which should coordinate all subsequent calls, help organize microservice architectures and coordinate functionality across a diverse, wide system.

> To run your microservices on Docker instances, check [DevOps & Dockerization](Server%20&%20System/DevOps_Dockerization.md)
