---
id: API_Layer
slug: API_Layer
title: API Layer
sidebar_label: API Layer
---

If you generate your project by using [AutoCode Solution/Code Generator](Getting%20Started/Using_CLI_Solution_Generator.md), you'll have 6 methods ready for each controller.

 1. list
 2. get
 3. insert
 4. update
 5. delete
 6. bulkSave


 > Find them in 
 >> - BE: {YourMicroserviceName}.API.{YourTableName}Controller.cs
 >> - UI: views/Routes/{YourTableName}/{YourTableName}PageConfig.tsx

## Swagger

We use Swagger for writing REST-based APIs.
> Swagger (now the "Open API Initiative") is a framework for describing your API using a common language that everyone can understand.

![enter image description here](https://netcoregenesis.com/images/documentation/swagger-admin.png)
- Design-first users: use  [Swagger Codegen](https://swagger.io/swagger-codegen/)  to  **generate a server stub**  for your API. The only thing left is to implement the server logic – and your API is ready to go live!
- Use  [Swagger Codegen](https://swagger.io/swagger-codegen/)  to  **generate client libraries**  for your API in over 40 languages.
- Use  [Swagger UI](https://swagger.io/swagger-ui/)  to generate  **interactive API documentation**  that lets your users try out the API calls directly in the browser.
- Use the spec to connect API-related tools to your API. For example, import the spec to  [SoapUI](https://soapui.org/)  to create automated tests for your API.
- And more! Check out the  [open-source](https://swagger.io/open-source-integrations/)  and  [commercial tools](https://swagger.io/commercial-tools/)  that integrate with Swagger.

## Open API 3.0

API layer is fully compliant with Open API 3.0 specifications. So feel free to use also at a bank which needs to comply with PSD2.

## Authorization of Controllers

By default,  all methods (except login) need a bearer token as JWT to be authenticated.

![bearer token as JWT](https://netcoregenesis.com/images/documentation/swagger-authorization-required.png)

## Response Object of Controller/Methods

There is a standard and generic reponse object returned for any method call. Thus, it gets easier to get familiar and integrate to UI endpoints.

| Property | Type |
|--|--|
| success | boolean |
| message | string |
| errors | JSON Object Array |
| data | JSON Object, JSON Object Array |

Successful example:

```json
{  	
	"success": true,  
	"message": "Listed successfully",
	"errors": [],
	"data": [
              { "fullName": "John Doe", "profession": "Engineer"},
              { "fullName": "Jane Doe", "profession": "Doctor"}
           ]
}
```

Failed example:

```json
{  	
	"success": false,  
	"message": "Something went wrong",
	"errors": [  
					{  
						"code":  "1020",  			
						"message":  "fullName cannot be null",  
						"stackTrace":  "<Stacktrace of exception>"
					}
				],
	"data":  {}  
}
```

## Request Object of List Methods

| Property | Type |
|--|--|
| pagination | JSON Object |
| criteria | JSON Object |

Example:

```json
{
  "pagination": {
    "currentPage": 0,
    "maxPage": 20,
    "totalRowCount": 0,
    "maxRowsPerPage": 100,
    "resultRowCount": 0
  },
  "criteria": {
    "fullName": "John",
    "status": 1
  },
  "GridCriterias":{
    "sortModel":[{"propertyName": "fullName", "order": "asc"}],
    "filterModel":[]
  }
}
```
