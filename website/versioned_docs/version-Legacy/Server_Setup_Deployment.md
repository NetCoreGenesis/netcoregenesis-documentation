---
id: Server_Setup_Deployment
slug: Server_Setup_Deployment
title: Server Setup & Deployment
sidebar_label: Server Setup & Deployment
---

This document provides necessary installations and configurations for **Linux** server. The steps assume Genesis architecture components reside on a single VM instance.

> Please check recommended [Server Requirements](Server_Requirements.md)

## A) Installation

Open a Terminal and start by connecting to your server via SSH
> Creating and using a user other than **root** is recommended

### Connect via SSH

```
ssh username@ip_address
```

When prompted, type your ssh password
Or Connect by providing the generated SSH certificate

### Install Net Core 3.1 LTS

Follow instructions at [https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu](https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu)

For Ubuntu 18.04:

```
wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
```

```
sudo dpkg -i packages-microsoft-prod.deb
```

> It's recommended to install the SDK instead of the Runtime

```
sudo apt-get update; \
sudo apt-get install -y apt-transport-https && \
sudo apt-get update && \
sudo apt-get install -y dotnet-sdk-3.1
```

### Install EF Core Tools

Follow instructions at [https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet)

```
dotnet tool install --global dotnet-ef
```

> Since you've just installed the .NET Core SDK, you need to logout or restart your session before running

You can invoke the tool using the following command:

```
dotnet-ef Tool 'dotnet-ef' 
```

### Install Node.js

Follow instructions at [https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)

> Important! Make Sure the NPM version > 14.x

```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
```

```
sudo apt install nodejs
```

### Install Yarn _(preferred over npm)_

Follow instructions at [https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/)

### Install Nginx

Follow instructions at [https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)

### Install UFW (Optional but recommended)

```
sudo apt-get install ufw
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
```

_Don't forget to allow ssh if you're connected via ssh. Otherwise, you'll be kicked out_

```
sudo ufw allow ssh
```

_Prefer allowing only your static IP addresses for security_

```
sudo ufw allow from YOUR_STATIC_IP_ADDRESS to any port DB_SERVERS_PORT
```

```
sudo ufw enable
sudo ufw status verbose
sudo ufw reload
```

### Install Docker _(Optional)_

Optional but recommended for installing & configuring Redis, Kafka and ELK easily.

Follow instructions at [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)

> Note: Make sure you add the current user to the docker group to avoid typing sudo before docker commands:

```
sudo usermod -aG docker ${USER}
id -nG
```

### Install Docker-Compose _(Optional)_

Follow instructions at [https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04)

```
sudo curl -L https://github.com/docker/compose/releases/download/1.26.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Install PostgreSQL _(Change according to your preference)_

```
sudo apt update
sudo apt install postgresql postgresql-contrib
```

You only installed postgresql but you still need to set up roles, databases and so on.

Please follow instructions at [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)

### Install (Pull & Start) Redis Docker Image

Redis container image needs to be started with the `redis.conf` startup parameters that includes a password. This password needs to match the one in the connectionstring in the `coreSettings.json` file. ![]

Make sure you have a copy of the redis.conf file at `~/` or `YourAppName` while starting a redis instance. Using `docker-compose` ensures that Redis instance is started with the proper startup params.

Copy `docker-compose.yml` to the server

```
scp -r path_to_solution/docker-compose.yml remoteuser@your_server_ip:/var/www/YourAppName
```

Copy `redis.conf` to the server

```
scp -r path_to_solution/redis.conf remoteuser@your_server_ip:/var/www/YourAppName
```

Open SSH connection and run:

```
cd YourAppName
docker-compose up -d redis
```

> Note: You may desire a stand-alone Redis instance installed instead of Docker

### Install (Pull & Start) Kafka Docker Image (Optional - johnnypark/kafka-zookeeper)

```
cd YourAppName
docker-compose up -d kafka
```

> Note: You may desire a stand-alone Kafka instance installed instead of Docker

### Install (Pull & Start) ELK (Elastic-Logstash-Kibana) Docker Image _(Optional - sebp/elk)_

Copy `logstash.conf` to the server

```
scp -r path_to_solution/logstash.conf remoteuser@your_server_ip:/var/www/YourAppName
```

Open SSH connection and run:

```
cd YourAppName
docker-compose up -d elk
```

> Note: You may desire a stand-alone ELK instance installed instead of Docker

### Modify the following service configuration files at your solution, `YourAppName`

- appsettings.json
- appsettings. **Production**.json
- coreSettings.json
- coreSettings. **Production**.json

These files need to include CORS exceptions for the genesis API endpoint URLs.

> Check [Configuration](General/Configuration.md)

### Make sure that the environment is set according to the settings

 Add the following to the `~/.profile` or `~/bash_profile` to enable Production/Staging/Development settings:

```
export ASPNETCORE_ENVIRONMENT=Production
```

### Install Let's Encrypt certbot _(Optional except for Production Environment)_

Follow instructions at [https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)

```
sudo add-apt-repository ppa:certbot/certbot
sudo apt install python-certbot-nginx
```

> Let’s Encrypt’s certificates are only valid for ninety days. This is to encourage users to automate their certificate renewal process. Run the command below to renew.
>> `sudo certbot renew --dry-run`

### DevOps Integration _(Optional)_

If the server will be integrated with DroneCi, make sure the user has root rights. Also make sure the user's password prompts are disabled by adding the following line to the sudoers file. This step is required for remote DroneCi user to complete deployment steps without password intervention:

```
%username% ALL=(ALL) NOPASSWD:ALL
```

> **Important!** This step contains risks as it removes an extra level of breach protection.

For Oracle Cloud Images you may need to add the user to the sudoers file

Make sure the web app folders have their owner correctly set for the user:

```
sudo chown <username> YourAppName -R
```

Example: sudo chown netcore01 netcoregenesis.com -R

## B) Manuel App Deployment To Server

### i) Backend App

Open a terminal

#### Go to the service folders one by one and run publish command for each

```
cd path_to_solution/IdentityServer
dotnet publish -r linux-x64 -c Release -o bin/Release/idsvr --self-contained false
```

```
cd path_to_solution/Admin/Admin.Svc
dotnet publish -r linux-x64 -c Release -o bin/Release/admin-svc --self-contained false
```

```
cd path_to_solution/YourMicroserviceName/YourMicroserviceName.API
dotnet publish -r linux-x64 -c Release -o bin/Release/yourmicroservicename --self-contained false
```

> For each, a folder named `bin/Release/xxxxxx` will be created

#### Connect to server via SSH. Enter password when prompted

```
ssh remoteuser@your_server_ip
```

#### Create folders on the server

```
cd /var/www
mkdir YourAppName
cd YourAppName

mkdir idsvr
mkdir admin-svc
mkdir yourmicroservicename
```

> if you cannot find the directory, run `locate /var/www/`

#### Open a new terminal tab on your local machine and copy all published folders to the server separately

_Enter ssh password when prompted_

```
scp -r path_to_solution/IdentityServer/bin/Release/idsvr/* remoteuser@your_server_ip:/var/www/YourAppName/idsvr

scp -r path_to_solution/Admin/Admin.Svc/bin/Release/admin-svc/* remoteuser@your_server_ip:/var/www/YourAppName/admin-svc

scp -r path_to_solution/YourMicroserviceName/YourMicroserviceName.API/bin/Release/yourmicroservicename/* remoteuser@your_server_ip:/var/www/YourAppName/yourmicroservicename
```

#### Create `.service` files

Go to System directory

```
cd /etc/systemd/system
```

Create identity service file

```
cat >> identity.yourdomainname.com.service
```

Paste the content below and Ctrl-Z to save&exit

```
[Unit]
Description=identity.yourdomainname.com

[Service]
ExecStart=/usr/bin/dotnet IdentityServer.dll
# Change YourAppName in /var/www/YourAppName/idsvr/
WorkingDirectory=/var/www/YourAppName/idsvr/
Restart=always
# Restart service after 15 seconds if the dotnet service crashes:
RestartSec=15
KillSignal=SIGINT
SyslogIdentifier=dotnet-genesis-idsvr
# Change user if necessary
User=root
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target
```

Create Admin API service file

```
cat >> adminapi.yourdomainname.com.service
```

Paste the content below and Ctrl-Z to save&exit

```
[Unit]
Description=adminapi.yourdomainname.com

[Service]
WorkingDirectory=/var/www/YourAppName/admin-svc
ExecStart=/usr/bin/dotnet ./Admin.Svc.dll
Restart=always
# Restart service after 15 seconds if the dotnet service crashes:
RestartSec=15
KillSignal=SIGINT
SyslogIdentifier=dotnet-genesis-admin-svc
User=root
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target
```

Create your Microservice API service file _(repeat it for your each microservice)_

```
cat >> api.yourdomainname.com.service
```

Paste the content below and Ctrl-Z to save&exit

```
[Unit]
Description=api.yourdomainname.com

[Service]
WorkingDirectory=/var/www/YourAppName/YourMicroserviceName
ExecStart=/usr/bin/dotnet ./YourMicroserviceName.API.dll
Restart=always
# Restart service after 15 seconds if the dotnet service crashes:
RestartSec=15
KillSignal=SIGINT
SyslogIdentifier=dotnet-genesis-YourMicroserviceName-api
User=root
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target
```

> How to edit a file in Linux
[https://www.dummies.com/computers/operating-systems/linux/how-to-edit-files-in-linux-using-vi/](https://www.dummies.com/computers/operating-systems/linux/how-to-edit-files-in-linux-using-vi/)

> Be sure **Redis** is up and running

Start services

```
systemctl start identity.yourdomainname.com.service
systemctl start adminapi.yourdomainname.com.service
systemctl start api.yourdomainname.com.service
```

Check if they are up and running

```
systemctl list-units --type=service
```

> They should be *Loaded*, *Active* and *Running*
>> To list only failed ones : `systemctl list-units --type=service --state=failed`

#### Create & Configure Nginx Server part files

List existing web site templates (at first, only default exists)

```
cd /etc/nginx/sites-enabled && ls
```

##### 1) AdminApi Config

```
cat >> adminapi.yourdomainname.com
```

Paste the content below and Ctrl-Z to save&exit

```
server {
        server_name   adminapi.yourdomainname.com;

        location / {
                proxy_pass         http://localhost:5050/;
                proxy_http_version 1.1;
                proxy_set_header   Upgrade $http_upgrade;
                proxy_set_header   Connection keep-alive;
                proxy_set_header   Host $http_host;
                proxy_cache_bypass $http_upgrade;
                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto $scheme;
        }

    listen 80;
}
```

> To add SSL certificate, run the command below. The Nginx plugin will take care of reconfiguring Nginx and reloading the config whenever necessary:
>> `sudo certbot --nginx -d adminapi.yourdomainname.com`

##### 2) Web UI Config

Create config file

```
cat >> webui.yourdomainname.com
```

Paste the content below and Ctrl-Z to save&exit _(beware of the words to be changed)_

```
server {

        server_name webui.yourdomainname.com;

        root /var/www/YourAppName/ui;
        index index.html index.htm index.nginx-debian.html;

        location / {
                try_files $uri $uri/ /index.html;
        }

        listen 80;
}
```

> To add SSL certificate, run the command below:
>> `sudo certbot --nginx -d webui.yourdomainname.com`

##### 3) Genesis Identity Server Template

```
cat >> identity.yourdomainname.com
```

Paste the content below and Ctrl-Z to save&exit _(beware of the words to be changed)_

```

server {

        server_name   identity.yourdomainname.com;

        location / {
                proxy_pass         http://localhost:5000/;
                proxy_http_version 1.1;
                proxy_set_header   Upgrade $http_upgrade;
                proxy_set_header   Connection keep-alive;
                proxy_set_header   Host $http_host;
                proxy_cache_bypass $http_upgrade;
                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto $scheme;
        }

    listen 80;
}
```

> To add SSL certificate, run the command below:
>> `sudo certbot --nginx -d identity.yourdomainname.com`

##### 4) Microservice API Template

```
cat >> microserviceapi.yourdomainname.com
```

Paste the content below and Ctrl-Z to save&exit _(beware of the words to be changed)_

```

server {
        server_name   microserviceapi.yourdomainname.com;

        location / {
                proxy_pass         http://localhost:5051/;
                proxy_http_version 1.1;
                proxy_set_header   Upgrade $http_upgrade;
                proxy_set_header   Connection keep-alive;
                proxy_set_header   Host $http_host;
                proxy_cache_bypass $http_upgrade;
                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto $scheme;
        }

    listen 80;
}
```

> To add SSL certificate, run the command below:
>> `sudo certbot --nginx -d microserviceapi.yourdomainname.com`

##### 5) Reload Nginx server

```
sudo nginx -s reload
```

### ii) Frontend App

#### Change directory to your UI folder and run the commands _(yarn is recommended)_

```
cd path_to_solution/UI
yarn install
yarn build  # uses .env.production
```

> A folder named `build` will be created

To set an environment other than Development/Production (such as Staging), follow instructions at [UI Configuration](General/Configuration.md#3-ui) and run the build command as below:

```
yarn build:staging # uses .env.staging
```

> Don't forget to change the build command in your `.drone.yml` accordingly if the project is integrated to [CI/CD Pipeline](CI_CD_Management.md#droneyml-template)

#### Connect to server via SSH. Enter password when prompted

```
ssh remoteuser@your_server_ip
```

#### Create `ui` folder on the server

```
cd /var/www/YourAppName
mkdir ui
```

> if you cannot find the directory, run `locate /var/www/`

#### Open a new terminal tab on your local machine and copy the `ui/build` folder to the server

Enter ssh password when prompted

```
scp -r path_to_solution/UI/build/* remoteuser@your_server_ip:/var/www/YourAppName/ui
```

### Troubleshooting

#### To monitor a service

Sample to watch identity service:

```
sudo journalctl -fu identity.yourdomainname.com.service  --no-pager
```

> **Skip** the section-C below if you already have Genesis DB on your server

## C) Genesis Demo Solution Deployment _(Optional)_

Copy the Genesis-demo database:

**Method #1:**
Copy Genesis-demo postgres sql backup file to the new server from the source server:

```
sudo scp genesis_demo_backup.sql user@new.server.com:~
```

**Method #2:**
Download the db backup sql to the demo server:

```
wget https://netcoregenesis.com/documents/genesis-db.zip
```

Make sure that file has been encrypted and password protected during creation in the source

```
zip -e genesis-db.zip ~/genesis_demo_backup.sql
```

Also, make sure that zip and unzip are installed in both servers:

```
sudo apt-get install zip unzip -y
```

### Create the Genesis-demo database:

- Install preferred collation/encoding support if it doesn't exist:

```
sudo locale-gen tr_TR
sudo locale-gen tr_TR.UTF-8
sudo update-locale
```

- Create the genesis-demo database (with Turkish collation support)

```
CREATE DATABASE "genesis-demo" WITH OWNER "postgres" ENCODING 'UTF8' LC_COLLATE 'tr_TR.UTF-8' LC_CTYPE = 'tr_TR.UTF-8' TEMPLATE template0;
```

### Restore the Genesis-demo backup:

```
psql -U postgres -W -d "genesis-demo" -f ~/genesis_demo_backup.sql
```

If postgres user fails to authenticate, execute following to give postgres user local trust access:

- trust connection by adding in `pg_hba.conf` file

```
local all postgres trust
```

- Restart postgresql service

```
sudo service postgresql restart
```

**Important!**
The best method is to copy and edit default pg_hba.conf file:

```
sudo vi /etc/postgresql/10/main/pg_hba.conf
```

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     trust

# The same using local loopback TCP/IP connections.
#
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             127.0.0.1/32            trust

# The same as the previous line, but using a separate netmask column
#
# TYPE  DATABASE        USER            IP-ADDRESS      IP-MASK             METHOD
host    all             all             127.0.0.1       255.255.255.255     trust

# The same over IPv6.
#
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             ::1/128                 trust

# The same using a host name (would typically cover both IPv4 and IPv6).
#
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             localhost               trust
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             all                     md5
```

```
cd /etc/postgresql/10/main/
sudo vi postgresql.conf
```

Uncomment the line starting with `listen_addresses = 'localhost'` and change it to `listen_addresses = '*'`

Then esc -> :wq -> enter to save

```
sudo service postgresql restart
```

**You're ready to connect!**

- Edit `docker-compose.yml` file at `~/` to ensure availability of required ports:

```
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
    image: redis:latest
    command:
      - redis-server
      - /usr/local/etc/redis/redis.conf
    #container_name: redis
    hostname: redis
    ports:
      - "127.0.0.1:6379:6379" # enable host access only. otherwise overrides ufw/iptables and exposes port to internet
    network_mode: bridge
    volumes:
      - ./redis.conf:/usr/local/etc/redis/redis.conf
      - redis-data:/data

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
      dockerfile: Framework/IdentityServer/solution.Dockerfile
    network_mode: bridge
    depends_on:
      - redis
      - kafka

  adminsvc:
    image: ${DOCKER_REGISTRY-}adminsvc
    build:
      context: .
      dockerfile: Framework/Admin/Admin.Svc/solution.Dockerfile
    network_mode: bridge
    depends_on:
      - redis
      - kafka
      - identitysrv

volumes:
  redis-data:
  elk-data:
```
