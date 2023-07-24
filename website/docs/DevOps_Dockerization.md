---
id: DevOps_Dockerization
slug: DevOps_Dockerization
title: DevOps & Dockerization
sidebar_label: DevOps & Dockerization
---

After [Solution generation](Using_CLI_Solution_Generator.md), `docker-compose.yml` is created in your parent folder to run the Redis, Kafka, Zookeeper, ELK, Generated Microservices, Genesis admin API, Identity Server and UI on Docker instances.

## docker-compose.yml

```json
version: '3.4'

services:

	kafka:
	image: johnnypark/kafka-zookeeper
	ports:
		- "2181:2181"
		- "9092:9092"
	network_mode: bridge
	environment:
	ADVERTISED_HOST: 127.0.0.1
	NUM_PARTITIONS: 1
	volumes:
		- /var/run/docker.sock:/var/run/docker.sock

	redis:
		image: redis:alpine
		command: ["redis-server","--appendonly", "yes"]
		#container_name: redis
		hostname: redis
		ports:
			- "6379:6379"
		network_mode: bridge
		volumes:
			- redis-data:/data

	ui-project:
		#container_name: ui-project
		build:
			context: .
			dockerfile: UI/Dockerfile
		network_mode: bridge
		volumes:
			- './UI/:/usr/src/app'
			- '/usr/src/app/node_modules'
		depends_on:
			- redis
			- kafka
			- adminsvc
			- identitysrv

	identitysrv:
		image: ${DOCKER_REGISTRY-}identitysrv
		build:
			context: .
			dockerfile: IdentityServer/Dockerfile
		network_mode: bridge
		depends_on:
			- kafka

	adminsvc:
		image: ${DOCKER_REGISTRY-}adminsvc
		build:
			context: .
			dockerfile: Admin/Admin.Svc/Dockerfile
		network_mode: bridge
		depends_on:
			- kafka

	microservice.api:
		image: ${DOCKER_REGISTRY-}microservice
		build:
			context: .
			dockerfile: Microservice/Microservice.API/Dockerfile
		network_mode: bridge
		depends_on:
			- kafka

	elk:
		image: sebp/elk
		ports:
			- "5601:5601"
			- "9200:9200"
			- "5044:5044"
		network_mode: bridge
		volumes:
			- ./logstash.conf:/etc/logstash/conf.d/02-beats-input.conf
			- elk-data:/var/lib/elasticsearch
			
volumes:
	redis-data:
	elk-data:
```

> To benefit from our existing [CI & CD Management](CI_CD_Management.md) and automatize your deployment process, check [pricing](https://netcoregenesis.com/pricing_configurator.php) and  please contact us.

## Run your microservices on Docker containers

One of the software patterns containers make easier is microservices, where applications are constituted from many loosely coupled components. By decomposing traditional, “monolithic” applications into separate services, microservices allow the different parts of a line-of-business app to be scaled, modified, and serviced separately—by separate teams and on separate timelines, if that suits the needs of the business.

Containers aren’t required to implement microservices, but they are perfectly suited to the microservices approach and to agile development processes generally.

If you use Docker to create services which have varying demand (such as websites or APIs), it’s incredibly easy to scale your provisioning by simply firing up more Docker containers.

> There are a number of frameworks for orchestrating container clusters, such as [Kubernetes](https://kubernetes.io/), [Docker Swarm](https://docs.docker.com/engine/swarm/), [Nomad](https://www.nomadproject.io/) and for monitoring such as [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/)

### Add Docker metadata

To run with Docker Image you need a `Dockerfile` — a text file that contains instructions for how to build your app as a Docker image. A docker image contains everything needed to run your app as a Docker container.
Return to app directory
Since you opened a new terminal in the previous step, you'll need to return to the directory you created your service in.

```
cd myMicroservice
```

### Add a DockerFile

Create a file called `Dockerfile` with the following content in a text editor:

Dockerfile

```
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY myMicroservice.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "myMicroservice.dll"]
```

> Note: Make sure to name the file as `Dockerfile` and not `Dockerfile.txt` or some other name.

### Optional: Add a .dockerignore file

A .dockerignore file reduces the set of files that are used as part of `docker build`. Fewer files will result in faster builds.

Create a file called `.dockerignore` file (this is similar to a `.gitignore` file if you're familiar with those) with the following content in a text editor:

.dockerignore

```
Dockerfile
[b|B]in
[O|o]bj
```

### Create Docker image

Run the following command:

```
docker build -t mymicroservice .
```

The `docker build` command uses the `Dockerfile` to build a Docker image.
- The `-t mymicroservice` parameter tells it to tag (or name) the image as `mymicroservice`.
- The final parameter tells it which directory to use to find the `Dockerfile` (`.` specifies the current directory).

You can run the following command to see a list of all images available on your machine, including the one you just created.

```
docker images
```

### Run Docker image

You can run your app in a container using the following command :

```
docker run -it --rm -p 5555:80 --name mymicroservicecontainer mymicroservice
```

Optionally, you can view your container running in a separate terminal window using the following command:

```
docker ps
```

You can browse to the following URL to access your application running in a container: http://localhost:5555

**Congratulations!**
You've successfully created an independent service that can be deployed and scaled using Docker containers.

> Check for instructions of Microsoft about microservice dockerization https://dotnet.microsoft.com/learn/aspnet/microservice-tutorial/docker-file
