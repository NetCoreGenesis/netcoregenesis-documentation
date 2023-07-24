---
title: Release Notes (v3.20.0)
author: Net Core Genesis
author_url: https://www.netcoregenesis.com/
description: Net Core Genesis Release Notes (Changelog)
tags: [release notes]
keywords: [changelog, release, note, release note, 3.20.0]
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

- Master-Detail structures can be defined just as you do in declarative JSON format in the same page easily. Check [sample](FAQ_About_UI.md#set-master-detail-parent-child-relation-in-the-same-page) (Table.js, BasePage.js)
- Dashboard screen enriched with more charts (Dashboard.js)
- 'User Sign Up' process implemented (Register.ts, Register.js)
- A User's password can be forced to change
- Roles can be duplicated easily just by a button click (AuthTemplatesPageConfig.tsx)
- If a tenant-A creates a new tenant-B, the tenant-A becomes the parent of tenant-B by default (Tenant.cs, TenantRepository.cs)
- 'Address' fields masked in logging middleware for privacy at Tenant and User (Tenant.cs, CoreUser.cs)
- The password also hashed for security through logging pipeline of Log-in
- A 'Role' can be set as default for new users (AuthTemplates.ts, AuthTemplate.cs)
- A 'Tenant' can be set as default for new users (Tenant.ts, Tenant.cs)
- 'Role Name' added to table at Users page (UserTypes.ts, CoreUsers.cs, UserRepository.cs)
- For System Owners, Tenant is made editable when adding or updating a User (UserTypes.ts)
- When a new user registered or created, a welcoming activation email to be sent is defined on the Communication Templates page
- File_Uploader and Upload_Container can be styled with `customProps` in order to set sizes
- `labelProps` property has been added to manage Component's label properties (ITypeElement -> labelProps)
- Table column formatters has been re-implemented and moved to constants.ts -> `Formatters`
- A parameter can be customized for any tenant , the new one should be shown only to her (multi-language)
- Now you can manage separately 'validation rules' (`varlRules, filterValRules`) and 'default values' (`defaultValue, filterProps.defaultValue`) of the Component's FORM and FILTER modes
- For GDPR, privacy and security purposes, any data can be persisted as encrypted, hashed, or masked easily just by placing attributes in the related Model (EncryptedPersistence, HashedPersistence, MaskedPersistence) Check [sample](FAQ_About_Backend.md#storepersist-data-as-encrypted-but-decrypt-it-when-fetched)
- Refreshing the list after deletion can be managed on PageConfig.tsx by `refreshOnDelete` property
- Refreshing the list after saving can be managed on PageConfig.tsx by `refreshOnSave` property
- Explanatory tooltips added to Action Buttons of the table in the pages (BasePage.js)
- 'Copy-Duplicate of a Record' button can be added to `allowedMethods` on PageConfig.tsx (BasePage.js)
- Tenant page has been re-designed
- The control 'One of the recipients (to, cc, bcc) must be filled' has been added (CommunicationTemplates.ts)
- `StatusCode` has been added as database column for filtering purpose (TransactionLogs.ts, it is also in JSON's body)
- 'Status Code' and 'End Date' added to search criteria at Transaction Logs page (TransactionLogs.ts)
- MaskedAttribute multiple regex group support has been added
- Logging attribute improvements have been made
- Security improvements especially for passwords and secret keys have been made
- Method Highlights mean that request/response models are the same as the selected method, so they are allowed to be used together(Communication middleware, customReflectionRenderer.js)
- `PrioritizeByTenant` extension method added to manage getting closest records by current tenant (ParameterRepository.cs)
- To prevent conflictions `AutoSuggest` is now singleton
- JsonView's word wrap problem fixed
- Grid interface extended to access internal API
- If the model is not validated in the controller, the original request can be obtained by `originalRequestBody` to assess the failure (Logging middleware, TransactionLogs.ts)

</TabItem>

<TabItem value="CLI">

- CLI executable for windows OS has been signed with the Sectigo corporate code signing certificate.
- "Trusted_connection=true" choice for "Connection Builder"

</TabItem>

<TabItem value="DB">

```sql
-- PostgreSQL

ALTER TABLE "tenants" ADD "isDefault" bool default 0;
ALTER TABLE "authTemplate" ADD "isDefault" bool default 0;
ALTER TABLE "transactionLogs" ADD "statusCode" int;
ALTER TABLE "coreUsers" ADD "shouldChangePassword" bool default 0;
ALTER TABLE "coreUsers" ADD "verificationKey" varchar(255);
ALTER TABLE "coreUsers" ADD "verificationKeyExpiration" datetime; # Change according to your DB ALTER TABLE genesis_db.

ALTER TABLE "communicationTemplates" ALTER COLUMN "serviceUrls" nvarchar(MAX) NULL;
ALTER TABLE "communicationTemplates" ALTER COLUMN "requestType" nvarchar(1000) NULL;
ALTER TABLE "communicationTemplates" ALTER COLUMN "responseType" nvarchar(1000) NULL;
ALTER TABLE "communicationTemplates" ALTER COLUMN "commDefinitionType" smallint NULL;

ALTER TABLE "coreParameters" ALTER COLUMN "keyCode" nvarchar(100) NOT NULL;

CREATE OR REPLACE FUNCTION adm_ins_transactionlogs; # find in genesis-YOUR_OS-x64.zip/DB Scripts/YOUR_DB/02_adm_ins_transactionlogs.sql
```

</TabItem>

</Tabs>
