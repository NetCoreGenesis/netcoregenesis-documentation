---
id: Grid_Table
slug: Grid_Table
title: Grid
sidebar_label: Grid
---

We currently use Ag-Grid's Community Edition. It is wrapped and customized according to the Genesis platform's requirements.

They claim to have the best Javascript grid in the world :)
![Ag-Grid](https://netcoregenesis.com/images/documentation/ag-grid.png)

> Please visit for more https://www.ag-grid.com/react-grid/

## Does it have lazy-loading feature?

Yes, by default 100 records (configurable) are fetched. When the end of it reached, automatically next 100 are fetched from server.

## How do built-in search, filter and ordering/sorting functions work?

Whenever a change done, related service is called instantly to fetch relevant data set.

## Override the buttons (edit-delete) on the right handside of each row

Use `actionColumnRenderer` function property  of `tableConfig` in `YourModelPageConfig.tsx`.

```js
import React from 'react';
import ActionRenderer from '../../../components/ActionRenderer';
import Button from '../../../components/Button';
.....

var pageConfig: IPageConfig = {
  headerTitle: getLocalizedText('SEARCH_LIST_TITLE'),
  tabs: [
    {
      title: 'Page Title',
      type: About,
      resourceCode: 'Some_Resource_Code',
      editOnModal: false,
      tableConfig: {
          actionColumnRenderer: (props) => {
              return <>
                  <ActionRenderer {...props} /> {/* Standard Edit and Delete buttons of Table */}
                  <ChangePasswordActionButton {...props} /> {/* Your custom buttons */}
              </>
          }
      },
      list: {
        url: `${Constants.ApiURL}/someApiService/list`
      },
      get: {
        url: `${Constants.ApiURL}/someApiService/getById`
      },
      insert: {
        url: `${Constants.ApiURL}/someApiService/insert`
      },
      update: {
        url: `${Constants.ApiURL}/someApiService/update`
      },
      delete: {
        url: `${Constants.ApiURL}/someApiService/delete`
      },
      allowedMethods: [
        LIST,
        GET,
        INSERT,
        UPDATE,
        DELETE,
        DUPLICATE
     ],
    },
  ],
}
```

![Ag-Grid](https://netcoregenesis.com/images/documentation/doc-table-config.jpg)
