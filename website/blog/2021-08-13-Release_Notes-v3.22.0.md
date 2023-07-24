---
title: Release Notes (v3.22.0)
author: Net Core Genesis
author_url: https://www.netcoregenesis.com/
description: Net Core Genesis Release Notes (Changelog)
tags: [release notes]
keywords: [changelog, release, note, release note, 3.22.0]
---

These release notes document all relevant changes(improvements, migration notes, fixes, new features) that have been implemented in a release since the previous release.

<!--truncate-->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Use Solution Generation's [upgrade method](/docs/CLI_Commands#2-upgrade) for a smooth upgrade experience.

<Tabs
    defaultValue="BE_UI_FRAME"
    values={[
        {label: 'BE & FE Frameworks', value: 'BE_UI_FRAME'},
        {label: 'AutoCode Solution Generator', value: 'CLI'},
        {label: 'DB Alter Scripts for Versions', value: 'DB'},
    ]}>

<TabItem value="BE_UI_FRAME">

##### *UI*

- Row based detailed error messages shown on Excel import error review.
- WebSocket connection retry policy enabled due to possibly loss of connection.
- "minValue/maxValue" validations now fails on incomparable types as well.
- InnerException section on error preview expanded as default.
- ECommerce module api url added to constants via .env file.
- Tenant page allowed for bulk import as default.
- A bug fixed that causes suggestion view to not trigger value changes.
- Duplicate button enabled as default for "Parameters" page.
- Tenant selection dropdown limited to 10 and filtering moved to server-side.
- react-scripts package updated from "3.0" to "3.4".
- RadioButton component improvement.
- Hard coded messages localized.
- Typo fixes.

---

##### *Backend*

- "SelectExclusively" method now works with nested expression as well.
- A bug fixed that causes Kafka consumer to subscribe when disabled.
- .NET Core and EF Core logs managed via "Serilog" and overrides built-in log factory as well.
- Loggings now can be manually suppressed from outer scope.
- "LogManager.Logger" deprecated instead use "Log" from "Serilog".
- "GetById" Controller/Service/Repository method names renamed as "Get" to match standard naming.
- Entity Framework "SaveChanges" optimized.
- New Entity Framework extensions added.
- Genesis managed repositories derived from "GenericGenesisRepository" to ensure context type is valid and access related tables directly.
- "Get/Delete/SoftDelete/HardDelete" methods that takes primary id as parameter suffixed with "ById". (ex. "DeleteById")
- List method parameter name changed from "entity" to "request".
- All Controller urls now Pascal cased but case-insensitive as default.
- Bulk save services refactored and merged as "BulkSave", all usages updated.
- All Entity Framework Core related packages including "Microsoft.EntityFrameworkCore.Tools".
removed individually and inherited from base projects.
- GenericRepository revision.
- Soft deletion can be managed by attribute named "SoftDeleteAttribute" on related model.
- A new "GetAll" method that fetches all records without pagination and returns entity list.
- Entity Framework Core package versions upgraded to v5.
- User/Claim queries optimized.
- "ParentTenantId" field added to both JWT and Session.
- "ChangePassword" service method matched with related resource as well.
- Exception handling improvements & fixes.
- MaskedLogging, HashedLogging attributes now supports non-string types as well.
- Identity server login page button layout changed.
- "CompanyOrder" table and related files deleted from base template.
- Any service definition related methods separated from "GenesisController" to give access non-authoritative users.
- "GetServiceDefinitions" method no longer returns non-api methods neither requires HttpMethodAttribute to predict relative url and unwraps Task type service methods.
- "AuthTemplateRepository.Get" method now includes details by default.
- Any services inherited from "IGenericService" injected to IoC.
- A bug fixed on DistributedCache.Get method that causes string payload to be deserialized.
- "OpenIdConnectClient" null pointer bug fix.
- Missing parameters added and a few existing ones updated.
- Removed unused variables.
- Hard coded messages localized.
- Typo fixes.

---

##### *CI/CD*

- Node docker version upgraded to v14.4.
- Recursive file listing command commented due to a bug caused by drone.

</TabItem>

<TabItem value="CLI">

- Basic upgrade option is disabled temporarily due to private nuget packages are obsolete.
- New resources added to manage eCommerce module.
- Re-scaffolding "Genesis" database improvements.
- Unrelated scaffold process outputs hidden.
- Lowercase scaffolded models no longer leads lowercase file creations.
- Selection view page size set to 15.
- Serialized json configuration can be passed through arguments. (via "--config")
- Line breaking problem on macOS fixed.
- UI build option added to support building & publishing UI project when creating a new solution. (via "--ui-build")
- Non-interactive session fixes & improvements. (via "--non-interactive")
- Version selection support added on upgrade action.
- Unnecessary files caused by renaming or deletion backed up and deleted on upgrading/downgrading solution.
- Solution wide metadata file creation same as projects to be used on further actions.
- A bug fixed that causes prevent creating empty folders.
- A bug fixed on scaffolding related database tables.
- User interface improvements.

</TabItem>

<TabItem value="DB">

```sql
-- PostgreSQL

ALTER TABLE "coreUsers" RENAME COLUMN "userName" TO "name";
ALTER TABLE "coreUsers" RENAME COLUMN "userSurname" TO "surname";
ALTER TABLE "coreUsers" RENAME COLUMN "roleTemplateId" TO "roleId";

CREATE OR REPLACE FUNCTION adm_sel_auth_claims; # find in genesis-YOUR_OS-x64.zip/DB Scripts/YOUR_DB/01_adm_sel_authorization_claims.sql
```

</TabItem>

</Tabs>
