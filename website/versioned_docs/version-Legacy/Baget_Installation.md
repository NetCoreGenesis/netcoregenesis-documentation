---
id: BaGet_Installation
slug: BaGet_Installation
title: BaGet Server Installation & Documentation (for Docker)
sidebar_label: BaGet Server Installation
---
BaGet (pronounced "baguette") is a lightweight NuGet and symbol server. It is open source, cross-platform and cloud ready.

## Pull BaGet's latest docker image:

```
docker pull loicsharma/baget
```

> Follow instructions on https://loic-sharma.github.io/BaGet/quickstart/docker/

## Run Baget private package repository Instance:

```
docker run -d --name nuget-server -p 5555:80 --env-file baget.env -v "$(pwd)/baget-data:/var/baget" loicsharma/baget:latest
```

>**Notes:**
> - Runs in detached mode
> - Create a `/baget-data folder` under current running directory
> - Create a `baget.env` file under current running directory
> - Maps hosts port 5555 to docker instance’s port 80
> - Maps hosts `$(pwd)/baget-data` path to docker instance’s `/var/baget* folder

Sample Genesis **baget.env** file

```
ApiKey=<Your_ultra_secret_API_key>
Storage__Type=FileSystem
Storage__Path=/var/baget/packages
Database__Type=Sqlite
Database__ConnectionString=Data Source=/var/baget/baget.db
Search__Type=Database
```

Sample Configuration for Nginx Web Server to display Baget dashboard and forward requests to your Baget instance:

```
server {
    server_name   nugetrepo.netcoregenesis.com;
    location / {
        proxy_pass         http://localhost:5555;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $http_host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    Ssl_certificate <path-to>/fullchain.pem; # managed by Certbot
    ssl_certificate_key <path-to>/privkey.pem; # managed by Certbot
    include <path-to>/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam <path-to>/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = nugetrepo.netcoregenesis.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name   nugetrepo.netcoregenesis.com;
    return 404; # managed by Certbot

}
```

>**Notes:**
> - Use your subdomain name here, i.e. **repo.`}<your-domain>{`.com**
> - SSL is configured with **Let’s Encrypt** and all http requests are redirected to https

## Make sure Baget Dashboard is up & running under your domain name

![](https://netcoregenesis.com/images/documentation/baget_packages.png)

## Configure your Private Package Repo in your Favorite IDE:

Go to Package Manager Settings:
![](https://netcoregenesis.com/images/documentation/baget_package_manager.png)

Add your package source here:
![](https://netcoregenesis.com/images/documentation/baget_package_sources.png)

Make sure your developers can add package references to the project from your private package repo:
![](https://netcoregenesis.com/images/documentation/baget_browse_datalib.png)

## Building and pushing your packages

```
dotnet nuget push -k <Your_ultra_secret_API_key> -s http://<your_private_repo_address>/v3/index.json .\CoreSvc.1.0.2.nupkg
```

>**Notes:**
> - Make sure you add Nuget.Packaging nuget package to your core projects (that you intend to distribute via Baget). After this, your nupkg packages will be created by taking a Release mode build.
