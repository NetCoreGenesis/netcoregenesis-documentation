---
id: Localization
slug: Localization
title: Localization
sidebar_label: Localization
---

## Multi-Language

Selected language can be changed from dropdown in the header
![Language Selection](https://netcoregenesis.com/images/documentation/language_selection.png)

Translations to be used must be defined in Genesis DB's **`coreParameters`** table.

i) You can directly **insert** into the table. *(`translations` column is in JSON format)*

```
INSERT INTO "coreParameters" ("keyCode","parentValue","value","orderIndex","status","description","translations") 
VALUES ('GREETING_KEY_CODE',NULL,1,1,1,'some description',N'{"EN":"Hello","DE":"Hallo"}');
```

 ii) or use **Management / Parameters** screen
![enter image description here](https://netcoregenesis.com/images/documentation/parametees_multi_language_hello.png)

## System Parameters

We recommend using coreParameters (Management / Parameters) for any label, title, message, warning, dropdown options and so on.

> The system uses the selected language (otherwise your browser's language setting)  to decide for translation

## UI

i) **getLocalizedText** method handles all the job for multi-language

```
columnName: {
	    label: getLocalizedText('SOME_KEY_CODE'),
	    visibility: [TABLE, FORM, FILTER],
        forceCaseTo: CaseStyles.ALL_WORDS_CAPITALIZED_CASE,
        valRules: {
            minLength: 1,
            maxLength: 50
        }
    }
```

ii) For **dropdowns**, just set the key code, it will handle the rest.

Sample from "src/entities/Management/UserTypes.ts"

```
userTitle: {
	label: getLocalizedText('JOB_TITLE_IN_COMPANY_LABEL'),
	typeInd: ComponentType.DROPDOWN,
	visibility: [FORM],
	optionConfig: {
		...ParameterOptionTemplate,
		filterBy: (type, inputText) => ({
			keyCode: 'USER_TITLE', // in this case, USER_TITLE is the parameter key to fill options
		}),
	},
}
```

## Backend

There are two ways to get translation of the related parameter code which is defined in coreParameters.

```cs
string localizedMessage1 = DistributedCache.Get("SOME_PARAMETER_CODE");
string localizedMessage2 = LocalizedMessages.SOME_PARAMETER_CODE;
```

> The language is set in service call's header parameter of **Accept-Language** and **X-Accept-Language**

## RTL / Right to Left support

Just change **`dir="ltr"`** to **`dir="rtl"`** in `public/index.html`

```html
<html dir="rtl" lang="en">
```
