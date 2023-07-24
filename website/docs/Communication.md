---
id: Communication
slug: Communication
title: Communication Middleware
sidebar_label: Communication Middleware
---

Almost all projects needs a communication part which handles email and sms sendings in order to inform some people.

To align with our motto "to ease developer's burden", we developed a definition-based communication middleware.

Please go to your GUI in the browser, and navigate to **Management / Communication**.
[![](https://netcoregenesis.com/images/documentation/communication-menu.png)](https://netcoregenesis.com/images/documentation/communication-menu.png)

## 1) Save emails and cell phones

First save your email addresses or cell phone numbers and their related integration settings.
[![](https://netcoregenesis.com/images/documentation/communication-definitions-email.png)](https://netcoregenesis.com/images/documentation/communication-definitions-email.png)

## 2) Save message templates

Yes, you've seen right we have **intellisense** support for `Session`, `Request`, `Response`,`Comm Definition`, `Comm Template`  objects and `Helper` methods.
[![](https://netcoregenesis.com/images/documentation/communication-templates-intellisense-support.png)](https://netcoregenesis.com/images/documentation/communication-templates-intellisense-support.png)

| Objects | Helper Methods |
|--|--|
|[![](https://netcoregenesis.com/images/documentation/communication_templates_intellisense_all_objects.png)](https://netcoregenesis.com/images/documentation/communication_templates_intellisense_all_objects.png) | [![](https://netcoregenesis.com/images/documentation/communication_templates_intellisense_helper_methods.png)](https://netcoregenesis.com/images/documentation/communication_templates_intellisense_helper_methods.png)|

By reflection, all controllers/methods and their properties can be used when setting the triggering rules.
[![](https://netcoregenesis.com/images/documentation/communication-templates-reflection-and-rules.png)](https://netcoregenesis.com/images/documentation/communication-templates-reflection-and-rules.png)
---

[![communication_templates_sample_rules](https://netcoregenesis.com/images/documentation/communication_templates_sample_rules.png)](https://netcoregenesis.com/images/documentation/communication_templates_sample_rules.png)

> Highligths refer to the models which are the same as the selected one, so they are allowed to be used together

## 3) That's it

You don't have to code anything. We'll be handling the job on the fly.

> Check the tables **communicationDefinitions** and **communicationTemplates** of your Genesis DB.

## Questions

### Can a property's old and new value be compared?

Yes, you have both Request and Response objects.

### Can I trigger a communication rule hardcoded/manually?

Yes, you can find examples in Forgot/Reset and Success email processes.
`CommunicationManager.Mail.SendAsync(......)`
