---
id: Deployment
slug: Deployment
title: How To Deploy on Web Server
sidebar_label: Deploy on Web Server
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1) Configuration

Please review [Configuration Settings](General/Configuration.md) first for separate environments such as development and production.

## 2) UI/Frontend Deployment (React App)

### To host app on any web server we first need to create a production build

Create the production build of your react app by using command below in your app's directory.

```
yarn run build
```

The output of the above command creates a new build folder inside the project which contains production build.

So far we have created a production build of your React app.  

### Now, next step is to deploy it on web server
Press  `Windows + R`  key and write  `inetmgr`  to open the IIS Manager. You can see the below screen.
![open_IIS_Manager.png](https://www.netcoregenesis.com/images/documentation/open_IIS_Manager.png)

First, we will create a new Application Pool, so right-click on  **Application Pools**  and click on  **Add Application Pool**. Then give it name as you want and click on OK button.

After that right-click on the new app pool and select Advanced Settings. You will see below window.
![IIS_Add_Application_Pool.png](https://www.netcoregenesis.com/images/documentation/IIS_Add_Application_Pool.png)

Then click on Identity and choose a Custom account and click on the set button and then add your windows credentials and click on OK.

After that right-click on  **Sites**  and then click on  **Add Website**. Add the Site name and select application pool which we created earlier. After that under physical path section, you have to give the path of build folder & also give the port number where you want to host.
![IIS_add_website.png](https://www.netcoregenesis.com/images/documentation/IIS_add_website.png)

Now right click on new website i.e  **ReactApp**  ->  **Manage Website**  ->  **Browse**. Your react app is now successfully test.

Follow instructions at [Frontend App Deployment](Server_Setup_Deployment.md#ii-frontend-app)



## 3) Backend Deployment (.NET)

<Tabs
    defaultValue="IIS"
    values={[
        {label: 'IIS', value: 'IIS'},
        {label: 'Nginx', value: 'Nginx'},
    ]}>

<TabItem value="IIS">

- Please follow Microsoft's instructions in official web site.

https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/?view=aspnetcore-7.0#create-the-iis-site
</TabItem>

<TabItem value="Nginx">

- Follow instructions at [Backend App Deployment](Server_Setup_Deployment.md#i-backend-app)

https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-7.0&tabs=linux-ubuntu

</TabItem>
</Tabs>

> An ASP.NET Core app runs with an in-process HTTP server implementation, namely Kestrel. 
> Kestrel server is the default, cross-platform HTTP server implementation. 
> To host the applications without a web server and to use Kestrel, follow the instructions below
>> https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/?view=aspnetcore-7.0&tabs=windows