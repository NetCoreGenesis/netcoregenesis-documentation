---
id: Sample_Page
slug: Sample_Page
title: Adding New Page
sidebar_label: Adding New Page
---
This tutorial below explains backend and frontend development of adding a new page/process step by step.

## UI / Frontend

You'll generally be dealing with 4 files in `src` folder for a standard page which you can manage easily with JSON objects without coding javascript or typescript.

### 1) Menu Item Component

**`views/Routes/YourPageName/YourPageNamePageConfig.js`**

 It includes a generic component to be used in `pages.js`  for menu. You'll just need to import related `SamplePageConfig.js`

```js
import React from 'react';
import BasePage from '../../../components/BasePage';
import PageConfig from './SamplePageConfig'; // Edit this line

export default class SampleUserCls extends React.PureComponent {
  render() {
    return (
      <BasePage config={PageConfig} />
    )
  }
}
```

### 2) Page Config

**`views/Routes/YourPageName/YourPageNamePageConfig.tsx`**

 Page structure specifying title, tabs, resource code, CRUD service urls, buttons and so on.

```js
import { IPageConfig, Methods, pageConfigWrapper, Tables } from '../../../common/typeConfig';
import { getLocalizedText } from '../../../common/localizationManager';
import Constants from '../../../common/constants';

import SamplePage from '../../../entities/SamplePage';

const { LIST, GET, INSERT, UPDATE, DELETE, EXPORT, IMPORT } = Methods;

let pageConfig: IPageConfig = {
  headerTitle: getLocalizedText('SEARCH_LIST_TITLE'),
  tabs: [
    {
      title: 'User Title', // Tab title
      type: SamplePage,
      resourceCode: 'SamplePage_Resource_Code',
      editOnModal: false, // Behaviour when clicked on a row of the table
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
      import: {
        url: `${Constants.ApiURL}/sampleService/bulkSave`
      },
      allowedMethods:  // Allowed buttons/actions of the table
      [
        LIST,
        GET,
        INSERT,
        UPDATE,
        DELETE,
        IMPORT,
        EXPORT,
        DUPLICATE
      ],
    },
  ],
};

export default pageConfigWrapper(pageConfig);
```

### 3) Model Class

**`entities/YourPageNamePage.ts`**

Simply consists of the model class as JSON specifying components, groupings, rules, validations and so on.

```js
import TableFormatters from '../common/TableFormatters';
import { Regexes } from '../common/validations';
import { IType, ComponentType, Visibility, typeConfigWrapper, IGroup, CaseStyles, LabelPositions } from '../common/typeConfig';
import { ParameterOptionTemplate } from '../common/typePresets';
import { getLocalizedText } from '../common/localizationManager';

const { TABLE, FORM, FILTER, BG_FILTER, BG_FORM, FK_FILTER, FK_FORM } = Visibility;

// We have 3 groups to gather components in order to have a better look & feel
let group1: IGroup = { title: 'User Info', columnSize: { all: 4 } };
let group2: IGroup = { title: 'Job Info', columnSize: { all: 4 } };
let group3: IGroup = { title: 'Profile Picture', columnSize: { all: 4 } };

let type: IType = {
    userId: {
        label: getLocalizedText('userId'),
        isPrimaryId: true, // Almost every page should have one primary key
        typeKey: 'user',
        onValueChanged: (value, type, initial, isFilter, that) => {
            type.password.valRules.acceptEmptyStrings = value > 0; // 
            type.password.updateState(); // Refresh the component state
        },
    },
    infoMessage: {
        typeInd: ComponentType.LABEL,
        labelProps: {
            position: LabelPositions.NONE
        },
        visibility: [FORM],
        columnSize: { all: 12 },
        defaultValue: "This page is specially designed for Live Preview with many different examples"
    },
    userName: {
        label: "Name", // static label without localization
        typeInd: ComponentType.FORM_CONTROL,
        forceCaseTo: CaseStyles.UPPER_CASE, // Make the letters uppercase as typed
        visibility: [FORM, FILTER, TABLE],
        group: group1, // dislay in group1
        valRules: {
            minLength: 2, // must be at least 2 char-long
            maxLength: 30 // must be at most 30 char-long
        }
    },
    userSurname: { // if typeInd not specified, it is FORM_CONTROL (text-input) by default
        label: "Surname",
        forceCaseTo: CaseStyles.UPPER_CASE,
        visibility: [FORM, FILTER, TABLE], // display in FORM=insert/update, FILTER=search criteria, TABLE=grid
        group: group1,
        valRules: {
            minLength: 2,
            maxLength: 50
        }
    },
    companyId: {
        label: getLocalizedText('COMPANY_LABEL'), // Multi-language label. COMPANY_LABEL is a keyCode in coreParameters
        typeInd: ComponentType.DROPDOWN_ASYNC,
        visibility: [FORM], // display only in insert/update mode
        group: group2,
        valRules: {
            minLength: 1
        },
        optionConfig: { // state how to fill the options
            listUrl: 'coreCompany/list', // service url and method
            getValue: (item) => '@{companyId}',
            getLabel: (item) => '@{companyName}',
            filterBy: (type, inputText) => ({
                Criteria:
                {
                  companyId: type.companyId.value || 0, // post current companyId if exists
                  companyName: inputText // and post typed text to search and filter
                }
            }),
        }
    },
    userTitle: {
        label: getLocalizedText('JOB_TITLE_IN_COMPANY_LABEL'),
        typeInd: ComponentType.DROPDOWN,
        visibility: [FORM],
        group: group1,
        optionConfig: {
            ...ParameterOptionTemplate, // fill with options from coreParameters which are currently in browser's cache
            filterBy: (type, inputText) => ({
                keyCode: 'USER_TITLE', // use this keyCode to filter
            }),
        },
    },
    email: {
        label: getLocalizedText('EMAIL_LABEL'),
        visibility: [TABLE, FILTER, FORM],
        group: group1,
        valRules: {
            regex: Regexes.email, // use pre-defined regular expression to validate
            minLength: 6,
            maxLength: 50,
            customErrMsg: getLocalizedText("ENTER_VALID_EMAIL"), // use this multi-lingual custom message for regex mismatch
        }
    },
    password: {
        label: getLocalizedText('PASSWORD_LABEL'),
        visibility: [FORM],
        group: group1,
        exportConfig: {
            excelConfig: {
                exportable: false // don't include when excel downloaded/exported
        },
        valRules: {
            regex: Regexes.password, // use pre-defined regular expression to validate
            customErrMsg: "This is a custom message when regex is not validated instantly"
        },
        customProps: {
            type: 'password' // special attribute to mask the value with *
        }
    },
    gender: {
        label: getLocalizedText("GENDER_LABEL"),
        typeInd: ComponentType.DROPDOWN,
        visibility: [FORM],
        group: group1,
        optionConfig: {
            ...ParameterOptionTemplate,
            filterBy: (type, inputText) => ({
                keyCode: 'GENDER',
            }),
        }
    },
    phoneNumber: {
        label: getLocalizedText('TELEPHONE_LABEL'),
        typeInd: ComponentType.PHONE_INPUT, // phone input with country code. But you must handle country code.
        visibility: [FORM],
        group: group1,
        valRules: {
            acceptEmptyStrings: true, // allow to be empty. But if not empty, validate by regex and others
            minLength: 9,
            maxLength: 16
        }
    },
    ibanNumber: {
        label: getLocalizedText('ibanNumber'),
        visibility: [FORM],
        group: group1,
        maskPattern: "AA99 999 99999999999999999", // A represents letter and 9 represents digits.
        forceCaseTo: CaseStyles.UPPER_CASE,
        valRules: {
            acceptEmptyStrings: true,
            minLength: 20,
            maxLength: 32,
        },
    },
    taxNumber: {
        label: "Tax Number",
        visibility: [FORM],
        group: group2,
        valRules: {
            exactLength: 10 // must be exactly 10 char-long
        }
    },
    countriesServed: {
        label: "Countries Served",
        typeInd: ComponentType.MULTIPLE_SELECT, // Multiple choice dropdown
        visibility: [FORM],
        group: group2,
        optionConfig: {
            ...ParameterOptionTemplate,
            filterBy: (type, inputText) => ({
                keyCode: 'COUNTRY'
            }),
        },
    },
    cityId: {
        label: getLocalizedText('CITY_LABEL'),
        typeInd: ComponentType.DROPDOWN,
        visibility: [FORM, FILTER],
        group: group2,
        optionConfig: {
            ...ParameterOptionTemplate,
            filterBy: (type, inputText) => ({
                keyCode: 'CITY',
            }),
        },
        onValueChanged: (value, type, initial, isFilter, that) => { // fill countyId dropdown when city changes
            if (!isFilter && type.countyId)
                that.dataManagement.fillDropdownData(type.countyId); // trigger filling
            if (isFilter && type.countyId_filter)
                that.dataManagement.fillDropdownData(type.countyId_filter); // a second instance of countyId is created namely countyId_filter for filter. So fill it also
        },
    },
    countyId: {
        label: getLocalizedText('countyId'),
        typeInd: ComponentType.DROPDOWN,
        visibility: [FORM, FILTER],
        group: group2,
        optionConfig: {
            ...ParameterOptionTemplate,
            filterBy: (type, inputText) => ({
                keyCode: 'COUNTY',
                parentValue: type.cityId.value || 0 // post cityId as well as keyCode to the web service
            }),
        },
        filterOptionConfig: {
            filterBy: (type, inputText) => ({
                parentValue: type.cityId_filter.value || 0 // a second instance of cityId is created namely cityId_filter for filter. Get its value to post
            }),
        },
    },
    workStartDate: {
        label: getLocalizedText('WORK_START_DATE'),
        typeInd: ComponentType.DATE_PICKER,
        visibility: [FORM, TABLE],
        group: group2,
        tableDataFormatter: TableFormatters.defaultDateFormatter // Format the date value in table display according
    },
    salary: {
      label: 'Salary',
      typeInd: ComponentType.NUMERIC_INPUT,
      visibility: [FORM],
      group: group2,
      customProps: {
        decimalPrecision: 3, // default is 2
        thousandSeparator: ',', // default is dot
        decimalSeparator: '.' // default is comma
      },
      valRules:{
        customValidator: (value, typeElement) => {
            return parseFloat(value as string) > 10000 ? 'Good Salary! Keep going on' : ''
        }
      }
    },  
    note: {
        label: "Note",
        typeInd: ComponentType.TEXT_AREA,
        labelProps: {
            position: LabelPositions.NONE
        },
        placeholder: "enter any note about the user or company",
        visibility: [FORM],
        group: group2,
        customProps: {
          rows: 5
        }
    },
    picture: {
        label: "Will not be shown",
        typeInd: ComponentType.FILE_UPLOADER,
        labelProps: {
            position: LabelPositions.NONE // Display no label
        },
        visibility: [FORM],
        group: group3,
        customProps: {
          accept: 'image/*' // allow only image files
        }
    },
    status: {
        label: getLocalizedText('statusName'),
        typeInd: ComponentType.TOGGLE, // On-Off switch
        visibility: [TABLE, FILTER, FORM],
        group: group1,
        defaultValue: 1, // Set to true/on. According to your data type you can set a boolean value
        tableDataFormatter: TableFormatters.toggleFormatter // Change label to show in table according to the language
    }
}
export default type;
```

### 4) Sidebar Menu & Navigation

**`pages.js`**

Place its menu item.
> Be aware of the code block below is simplified and shortened for better understanding.

```js
import React from 'react';
import _ from 'lodash';
import { getLocalizedText } from './common/localizationManager';

const SamplePage = React.lazy(() => import('./views/Routes/SamplePage/SamplePageConfig'));

var PageInfos = {
	// -- Addition Beg --
    SamplePage: {
        name: 'Sample Page Title',
        url: `/SamplePage`,
        component: SamplePage,
        resourceCode: 'SamplePage_Resource_Code',
        icon: 'icon-some',
    }
    // -- Addition End --
}
....

```

### 5) Here below is what you're gonna get by almost no-coding but only json-declaration.

**Outcome**
![UI Sample Page view outcome](https://netcoregenesis.com/images/documentation/ui_sample_page_view.png)

**Automatic Validations  and Corresponding Warning Messages**
![UI Sample Page view with validation warnings](https://netcoregenesis.com/images/documentation/ui_validation_warning_messages.png)

**Search, List and the Table**
![UI Sample Page's Search, List and the Table](https://netcoregenesis.com/images/documentation/ui_page_search_list.png)

**With Data**
![UI Sample Page with data](https://netcoregenesis.com/images/documentation/ui_final_page_with_data.png)

> To form a customized UI page, check [Custom Page](Custom_UI_Pages.md) for details.

## Backend

### 1) Model

> Be aware of the code block below is simplified and shortened for better understanding.

```cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microservice.DataLib.DBModels
{
    public partial class SampleModelClass
    {
        [Column("userId")]
        public int UserId { get; set; }

        [Required]
        [Column("userName")]
        [StringLength(50)]
        public string UserName { get; set; }

        [Required]
        [Column("userSurname")]
        [StringLength(50)]
        public string UserSurname { get; set; }

        [Column("companyId")]
        public int CompanyId { get; set; }

        [Column("userTitle")]
        public int? UserTitle { get; set; }

        [Required]
        [Column("email")]
        [StringLength(80)]
        public string Email { get; set; }

        [Column("password")]
        [StringLength(64)]
        [HashedLogging] // Log the password as hashed
        public string Password { get; set; }

        [EncryptedPersistence] // Store the gender as encrypted since it is subject to GDPR
        [IgnoreLogging] // Don't log the gender
        [Column("gender")]
        public short? Gender { get; set; }

        ....
    }
}
```

### 2) DBContext

> Be aware of the code block below is simplified and shortened for better understanding.

```cs
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using CoreData.Common;
using CoreData.Infrastructure.Common;

namespace Microservice.DataLib.DBModels
{
    public partial class Your_DBContext : ContextBase
    {
        public Your_DBContext()
        {
        }

        public Your_DBContext(DbContextOptions<Your_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<SampleModelClass> SampleModelClass { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(ConfigurationManager.GetConnectionString("PostgreSQL"), b => b.MigrationsAssembly("Microservice.API"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<SampleModelClass>(entity =>
            {
                entity.HasKey(e => e.userId)
                    .HasName("userId_pk");
            });
        }
    }
}

```

### 3) Repository

**`Microservice.DataLib.Repositories.SampleModelClassRepository.cs`**

```cs
using Microservice.TypeLib.DBModels;
using Microservice.DataLib.Common;
using Microservice.DataLib.DBContexts;
using Microservice.DataLib.Validators;

namespace Microservice.DataLib.Repositories
{
    public class SampleModelClassRepository : GenericRepository<SampleModelClass, int, SampleModelClassValidator>
    {
        public SampleModelClassRepository()
        {
        }

        public SampleModelClassRepository(Your_DBContext context) : base(context)
        {
        }
    }
}
```

### 4) Validator

This is an example of FluentValidation. It is used in Controller methods insert and update.  
> Be aware of the code block below is simplified and shortened for better understanding.

**`Microservice.DataLib.Validators.SampleClassModelValidator.cs`**

```cs
using Microservice.DataLib.DBModels;
using CoreData.Validators;
using FluentValidation;

namespace Microservice.DataLib.Validators
{
    public class SampleClassModelValidator : AbstractValidator<User>
    {
        public SampleClassModelValidatorValidator()
        {
            RuleFor(x => x.UserId)
				.NotNull();

			RuleFor(x => x.UserName)
				.NotNull()
                .NotEmpty()
                .MinimumLength(2)
				.MaximumLength(50);

			RuleFor(x => x.UserSurname)
				.NotNull()
                .NotEmpty()
                .Length(2, 50);

			RuleFor(x => x.CompanyId)
				.NotNull()
                .NotEqual(0);

			RuleFor(x => x.Email)
                .EmailAddress()
				.MaximumLength(80);

			RuleFor(x => x.IdentificationNo)
				.NotNull()
				.MaximumLength(11);

			RuleFor(x => x.Password)
				.MaximumLength(64)
                .Matches("some regex here");

            RuleFor(x => x.Password)
                .Equal(x => x.PasswordAgain);

            ...
        }
    }
}
```

> Please visit [FluentValidation official web site](https://fluentvalidation.net/start) for details.

### 5) Service
**`Microservice.API.Services.SampleModelClassService.cs`**

```cs
using CoreSvc.Services;
using Microservice.TypeLib.DBModels;
using Microservice.DataLib.Repositories;
using Microservice.DataLib.Validators;

namespace Microservice.API.Services
{
    public class SampleModelClassService : GenericService<SampleModelClass, int, SampleModelClassValidator, SampleModelClassRepository>
    {
    }
}
```

### 6) Controller

**`Microservice.API.Controllers.SampleModelClassController.cs`**

```cs
using System.Threading.Tasks;
using CoreSvc.Filters;
using CoreType.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microservice.TypeLib.DBModels;
using Microservice.API.Services;

namespace Microservice.API.Controllers
{
    [Authorize]
    [DefaultRoute]
    [Resources("SamplePage_Resource_Code")]
    public class BrandController : BaseController
    {
        private readonly BrandService _mainService = new BrandService();
        
        [HttpPost]
        [ClaimRequirement(ActionType.List)]
        public async Task<ResponseWrapper<PaginationWrapper<Brand>>> List([FromBody] RequestWithPagination<Brand> request)
        {
            return await _mainService.ListAsync(request);
        }

        [HttpPost]
        [ClaimRequirement(ActionType.GetRecord)]
        public async Task<ResponseWrapper<Brand>> Get([FromBody] Brand request)
        {
            return await _mainService.GetAsync(request);
        }

        [HttpPost]
        [ClaimRequirement(ActionType.Insert)]
        public async Task<ResponseWrapper<Brand>> Insert([FromBody] Brand request)
        {
            return await _mainService.SaveAsync(request);
        }

        [HttpPost]
        [ClaimRequirement(ActionType.Update)]
        public async Task<ResponseWrapper<Brand>> Update([FromBody] Brand request)
        {
            return await _mainService.SaveAsync(request);
        }
        
        [HttpPost]
        [ClaimRequirement(ActionType.Import)]
        public Task<ResponseWrapper> BulkSave([FromBody] RequestWithExcelData<Brand> request)
        {
            return _mainService.BulkSaveAsync(request);
        }
        
        [HttpPost]
        [ClaimRequirement(ActionType.Delete)]
        public async Task<ResponseWrapper<bool>> Delete([FromBody] Brand request)
        {
            return await _mainService.DeleteAsync(request);
        }
    }
}
```