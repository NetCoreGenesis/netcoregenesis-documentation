---
id: Authentication_Authorization
slug: Authentication_Authorization 
title: Authentication & Authorization
sidebar_label: Authentication & Authorization
---

## IdentityServer4

Identity Server 4 is the newest iteration of IdentityServer, the popular OpenID Connect and OAuth Framework for .NET, updated and redesigned for ASP.NET Core and .NET Core.

## Permission Management

Organization, User, Role, Resource and Action based management is provided.

## Resource + Action Structure

Every page, tab or any entity/transaction that needs to be authenticated has/should have a resource code assigned which is stored in `authResources` db table.

Each resource code has actions assigned which are stored in `authActions` db table.

In both backend and UI authorization system use these resource code and action properties to manage permissions of a user.

Management / Resource Definitions:
![enter image description here](https://netcoregenesis.com/images/documentation/Resource_page.png)

Resource's Actions:
![enter image description here](https://netcoregenesis.com/images/documentation/Resource_actions_page.png)

> If a Resource's permission scope (ie: status, Actions) changes, all related users assigned sign off automatically from the server cache. And those users are expected to log in again.

## Backend

**{YourModelName}Controller.cs**
> You should set **[Resources("Model_Resource_Code")]** to authorize all controller and its methods.
> You can relate  additional resource codes to a method.

```cs
namespace Microservice.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [Resources("Model_Resource_Code")]
    public class ModelController : BaseController
    {
        private readonly ModelRepository _mainRepository = new ModelRepository();
        private readonly ModelValidator _ModelValidator = new ModelValidator();
        private readonly HubContext _hubContext;

        public ModelController(HubContext hubContext)
        {
            _hubContext = hubContext;
        }
        
        [HttpPost("list")]
        [ClaimRequirement(ActionType.List)]
        public ResponseWrapper List([FromBody] RequestWithPagination<Model> request)
        {
            ResponseWrapper genericResponse = new ResponseWrapper();

            genericResponse.Data = _mainRepository.List(request);
            genericResponse.Message = DistributedCache.Get(Messages.PROCESS_SUCCESSFUL);
            genericResponse.Success = true;

            return genericResponse;
        }

        [HttpPost("getById")]
        [ClaimRequirement(ActionType.GetRecord, "Additional_Resource_Code1", "Additional_Resource_Code2")]
        public ResponseWrapper GetById([FromBody] Model request)
        {
            ResponseWrapper genericResponse = new ResponseWrapper();

            genericResponse.Data = _mainRepository.GetById(request);
            genericResponse.Message = DistributedCache.Get(Messages.PROCESS_SUCCESSFUL);
            genericResponse.Success = true;

            return genericResponse;
        }
    }
}
```

## UI

**src/pages.js**
> You should set **resourceCode** property to manage menu items.

```json
Company_Mng: { 
	name: getLocalizedText("MENU_TITLE"), 
	url: '/modelURL', 
	component: ModelType, 
	parentResourceCode: 'AdminPages', 
	resourceCode: 'Model_Resource_Code', 
	icon: 'icon-grid'
}
```

**src/views/Routes/{YourModelName}PageConfig.tsx**

> You should set **resourceCode** property of a page in order to match related authorization claims to API calls from UI.

```js
let  pageConfig:  IPageConfig  = {
headerTitle:  getLocalizedText('SEARCH_LIST_TITLE'),
tabs: [
	{
		title:  'Model Title',
		type:  ModelType,
		resourceCode:  'Model_Resource_Code',
		editOnModal:  false,
		list: {
			url: `${Constants.ApiURL}/modelApi/list`
		},
		get: {
			url: `${Constants.ApiURL}/modelApi/getById`
		},
		insert: {
			url: `${Constants.ApiURL}/modelApi/insert`
		},
		update: {
			url: `${Constants.ApiURL}/modelApi/update`
		},
		delete: {
			url: `${Constants.ApiURL}/modelApi/delete`
		},
		allowedMethods: [
			LIST,
			GET,
			INSERT,
			UPDATE,
			DELETE,
        	DUPLICATE
		]
	},
]
};
```

## User's Permissions

User's permissions are stored in `authUserRights` db table.
They are controlled both in backend and UI.

![User Permissions](https://netcoregenesis.com/images/documentation/Permission_page.png)

| Action | Description |
|--|--|
| View | View in menu |
| List | Search and list records |
| GetRecord | Get and view a record |
| Insert | Insert a new record |
| Update | Update a record |
| Delete | Delete a record |
| Import | Batch insert/update by excel |
| Export | Download records as excel file |

## Role Definition

![Role Definition](https://netcoregenesis.com/images/documentation/Permission_role.png)
> If a role's permission scope changes, all related users assigned sign off automatically from the server cache. And those users are expected to log in again.

## How to add new Action?

1) In UI's `Management / Parameters` page, add new parameter with KeyCode = `AUTH_ACTION_TYPE` and different `Value`

2) In Backend, add new parameter to `ActionType` enum:

   ```cs
   public  enum ActionType
   {
     CanView,
     List,
     GetRecord,
     Insert,
     Update,
     Delete,
     Import,
     Export,
     YourNewAction // Assign the value in coreParameters
   }
   ```

3) Then you're free to use in Controller/Methods

## How to access and check user's permission in UI

This is how to get a specific resource code and action
`cacheGet('authorizationClaims')['Some_Resource_code']['SomeActionType']`

Example:

```
import { getPermissions } from '../../../../common/authorization';
this.permissions = getPermissions(Some_Resource_code);

if (this.permissions.canInsert)
	alert("Current user has insert right for Some_Resource_code");
```

or

```
if (cacheGet('authorizationClaims')['Some_Resource_code']['Insert'])
	alert("Current user has insert right for Some_Resource_code");
```

> For more comprehensive sample, check `department.js`

## Under the Hood

If a user's permission set has been changed, the system will  destroy the claims in server's session store immediately.

So, even if that user is not logged out yet, s/he will not be able to access with the old invalid permission set and will get `401-Unathorized Access`.
