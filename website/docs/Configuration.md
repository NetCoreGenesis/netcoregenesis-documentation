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

`IdentityServerSharedSecrets` in **coresettings.{ENVIRONMENT}.json** files such as `coresettings.Development.json`, `coresettings.Production.json`

**Identity Server Client Configurations;**

```json title="IdentityServer/appsettings.json"
"IdentityServer": {
    "Clients:0": {
        "ClientId": "js",
        "ClientName": "JavaScript Client",
        ...
    },
    "Clients:1": {
        "ClientId": "scheduler",
        "ClientName": "Scheduler Dashboard",
        ...
    },
    "Clients:2": {
        "ClientId": "short.client",
        "ClientName": "Short-Term Client",
        ...
    },
    "Clients:3": {
        "ClientId": "long.client",
        "ClientName": "Long-Term Client",
        ...
    }
}
```

**Client Secrets;**

> *All secrets are automatically generated for each environment by Solution Generator.*

```json title="Base/CoreSvc/coresettings.{ENVIRONMENT}.json"
"IdentityServerSharedSecrets": {
    // ie. "<ClientId>": <ClientSecret>
    "js": "",
    "scheduler": "y9mwSARHNZqk4adHoSEw",
    "short.client": "eIVs1OYHY21FT1rGGcKG",
    "long.client": "2vMYBIXev7a8C8PsPd86"
},
```

### c) Password Hashing/Encryption

`SymmetricKey` to be used for the symmetric algorithm. The key size must be 128, 192, or 256 bits.

> Data encrypted with a key can only be decrypted with the same key.

> *All secrets are automatically generated for each environment by Solution Generator.*

```json title="Base/CoreSvc/coresettings.{ENVIRONMENT}.json"
"Encryption": {
  "SymmetricKey": "<128, 192, or 256 bit key>"
}
```

## 2) Backend

Almost all application related info such as IP/Domain, Port, CORS Allowed is defined in **coresettings.{ENVIRONMENT}.json** files such as `coresettings.Development.json`, `coresettings.Production.json`

> Let's assume that the environment is Production, then the merge and override hierarchy is below;
>> coresettings -> coresettings.Production -> appsettings -> appsettings.Production

```json title="Base/CoreSvc/coresettings.{ENVIRONMENT}.json"
{
   "ConnectionStrings": {
        "GenesisDB": "User ID=postgres;Password=123456;Host=localhost;Port=5432;Database=GENESIS_DB;"
   },
   "DefaultDatabase": "GenesisDB",
   "GenesisDBType": "PostgreSQL",
   "AllowedCorsOrigins": [
        "http://localhost:3000", // UI, ie. https://adminpanel.yourdomain.com
        "http://localhost:5000", // Identity Server, ie. https://identityserver.yourdomain.com
        "http://localhost:5050", // Admin API, ie. https://admin-api.yourdomain.com
        "http://localhost:5051", // Microservice #1, ie. https://microservice1-api.yourdomain.com
        "http://localhost:5052", // Microservice #2, ie. https://microservice2-api.yourdomain.com
        "http://localhost:5053" // Microservice #3, ie. https://microservice3-api.yourdomain.com
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

Check [Change domain and base URLs for services](FAQ_About_UI.md#domains-and-base-urls-for-services) for details.

> For setting another environment such as Staging, follow instructions at https://dev.to/jam3/managing-env-variables-for-provisional-builds-h37
> - create `.env.staging`
> - install env-cmd by running `npm install env-cmd --save` or `yarn add env-cmd`
> - add the scripts in package.json
>>
>> ```json
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
        url: `${Constants.ApiURL}/sampleService/get`
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
	import:{
		url: `${Constants.ApiURL}/sampleService/bulkSave`
	}
```
