---
id: Configuration
slug: Configuration
title: Configuration
sidebar_label: Configuration
---
## 1) Secret Keys

Change passwords and secret keys of each:

### a) Redis

Find details in [Distributed Cache](Distributed_Cache.md)

### b) Identity Server

`ClientSecrets` and `IdentityServerSharedSecret` in **appsettings.{ENVIRONMENT}.json** files such as `appsettings.Development.json`, `appsettings.Production.json`

```
"Clients:1": {
    "ClientSecrets": [
        {
            "Value": "<Strong_Secret_Key_1>"
        }
    ],
    "RedirectUris": [
        "http://localhost:5001/signin-oidc"
    ],
    "AllowedCorsOrigins": [
        "http://localhost:5001"
    ]
},
"Clients:2": {
    "ClientSecrets": [
        {
            "Value": "<Strong_Secret_Key_2>"
        }
    ]
},
"Clients:3": {
    "ClientSecrets": [
        {
            "Value": "<Strong_Secret_Key_3>"
        }
    ]
}
```

```
"IdentityServerSharedSecret": "<Strong_Idsrv_Secret_Key>",
```

### c) Password Hashing/Encryption

Change to a long and strong key unique to your project in `Base/CoreSvc/coreSettings.json`

```
"Encryption": {
  "SymmetricKey": "<Choose_a_Long_and_Strong_Key>"
}
```

## 2) Backend

Almost all application related info such as IP/Domain, Port, CORS Allowed is defined in **appsettings.{ENVIRONMENT}.json** files such as `appsettings.Development.json`, `appsettings.Production.json`

> Let's assume that the environment is Production, then the merge and override hierarchy is below;
>> coreSettings -> coreSettings.Production -> appsettings -> appsettings.Production

```json
{
   "ConnectionStrings": {
      "GenesisDB": "User ID=postgres;Password=123456;Host=localhost;Port=5432;Database=GENESIS_DB;",
      "PostgreSQL": "User ID=postgres;Password=123456;Host=localhost;Port=5432;Database=YOUR_DB;"
   },
   "DefaultDatabase": "PostgreSQL",
   "GenesisDBType": "PostgreSQL",
   "ApplicationUrl": "http://0.0.0.0:5051", //  Microservice #1
   "AllowedCorsOrigins": [
      "http://localhost:3000", // UI, ie. https://adminpanel.yourdomain.com
      "http://localhost:5050", // Admin API, ie. https://admin-api.yourdomain.com
      "http://localhost:5052", // Microservice #2, ie. https://microservice2-api.yourdomain.com
      "http://localhost:5053", // Microservice #3, ie. https://microservice3-api.yourdomain.com
      "http://localhost:5000" // Identity Server, ie. https://identityserver.yourdomain.com
   ]
}
```

> **AllowedCorsOrigins** setting is used to allow access for cross-origin requests. This is also be needed if you host your React UI or Microservices in separate servers/domains/ports.

## 3) UI

### Base URL, Port and Environment

You can override/replace them in hidden files `.env.development` or `.env.production` files according to the environment.
- .env - Keep all common/shared environment variable
- .env.development - Variables used for the local development
- .env.production - Variables used for the production build

```js
PORT=3000 // UI project's port
REACT_APP_IDENTITY_URL=http://localhost:5000
REACT_APP_ADMIN_URL=http://localhost:5050
REACT_APP_API_URL=http://localhost:5051
REACT_APP_API2_URL=http://localhost:5052
REACT_APP_API3_URL=http://localhost:5053
REACT_APP_KIBANA_URL=http://localhost:5601
REACT_APP_SCHEDULER_URL=http://localhost:5001
```

Check [Change domain and base URLs for services](FAQ/FAQ_About_UI.md#domains-and-base-urls-for-services) for details.

> For setting another environment such as Staging, follow instructions at https://dev.to/jam3/managing-env-variables-for-provisional-builds-h37
> - create `.env.staging`
> - install env-cmd by running `npm install env-cmd --save` or `yarn add env-cmd`
> - add the scripts in package.json
>>
>> ```
>> scripts: {
>>   "start": "react-scripts start", // `NODE_ENV` is `development`
>>   "build": "react-scripts build", // `NODE_ENV` is `production`
>>   "build:staging": "env-cmd -f .env.staging react-scripts build", // `NODE_ENV` is `staging`
>>   ...
>> }
>> ```

### API URL

Check `YourModelPageConfig.tsx` files in `src/views/Routes` folder.

Sample part to be changed in page config:

```js
	list: {
        url: `${Constants.ApiURL}/sampleService/list`
      },
    get: {
        url: `${Constants.ApiURL}/sampleService/getById`
      },
    insert: {
        url: `${Constants.ApiURL}/sampleService/insert`
      },
    update: {
        url: `${Constants.ApiURL}/sampleService/update`
      },
    delete: {
        url: `${Constants.ApiURL}/sampleService/delete`
      },
	bulkImport:{
		url: `${Constants.ApiURL}/sampleService/bulkSave`
	}
```
