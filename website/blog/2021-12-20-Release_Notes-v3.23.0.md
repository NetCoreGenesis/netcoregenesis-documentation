---
title: Release Notes (v3.23.0)
author: Net Core Genesis
author_url: https://www.netcoregenesis.com/
description: Net Core Genesis Release Notes (Changelog)
tags: [release notes]
keywords: [changelog, release, note, release note, 3.23.0]
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
        {label: 'AutoCode Solution Generator', value: 'CLI'}
    ]}>

<TabItem value="BE_UI_FRAME">

##### *UI*

- Non-numeric primary key support added. (string, GUID etc.)
- TableComponent overrides internal state by inherited prop to act as a router to prevent conflictions.
- Child types forced to reset when top-parent record changes.
- Deleting a record on a child tab no longer collapses table view.
- Tooltip target not found error fixed.
- DatePicker props rearranged to fix visual bugs when disabled or invalid.
- Browser now redirects requested path after login flow.
- Redirects to logout if identity cookies somehow removed.
- `currencyFormatter` method updated to work according to selected locale instead of the hardcoded one. Currency type and locales can be overriden by the parameters.
- FileUploader/UploadContainer additional file type supports (pdf, json, txt etc.) & visual improvements on preview.
- UploadContainer a bug causes to open preview modal when removing an item fixed.
- UploadContainer modalSize support added same as FileUploader.
- All fields that use Dropdown as component type now supports "fetchRecord" parameter in `optionConfig` to allow all record fields to be cached instead of just label,value pair. This way other fields can be accessed on runtime.

---

##### *Backend*

- (New Feature) Auto generated Integration Tests.
- A bug fixed that causes EF Core filter extension to include empty string to where clause.
- All repositories, services and controllers can be accessed via Dependency Injection.
- Swagger XML commentation made optional to prevent throwing exception on startup if xml file does not exists.
- ResponseWrapper implicit casting supports null as well.
- New EF Core extension named `HasJsonConversion` added to simplify json configuration.
- Email address validations updated to prevent saving with empty strings.
- EF Core tracking problems fixed on `Resource Definitions` page.
- EF Core filter extension match by equality instead of "LIKE" if value converter is set. (HashedPersistence etc.)
- EncryptionManager IV parameter set empty to prevent creating different outcome for each evaluation.
- EF Core DbContext constructors reorganized to prevent ambiguity.
- eCommerce.API coresettings.json paths fixed.
- ExceptionHandlingMiddleware serializer settings updated to prevent pascal case response on unhandled exceptions.

</TabItem>

<TabItem value="CLI">

- Table list in config now supports glob pattern. For further information about glob patterns [see](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/file-providers#glob-patterns).
- A bug fixed when updating MySQL context to lead build errors.
- Additional arguments on scaffolded context configuration no longer removed.
- Git checkouts to default branch even when there are no changes.
- `config` parameter serialization problems fixed.
- Solution metadata files updated before committing changes.
- A bug fixed that causes some projects to be not found physically.
- Ports no longer overriden by default values on any action.
- Upgrade action updated to work with all template types.
- Git version tag created for upgrade action too and by the selected version instead of CLI version.

</TabItem>

</Tabs>
