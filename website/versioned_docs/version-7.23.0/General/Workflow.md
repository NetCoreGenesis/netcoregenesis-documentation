---
id: Workflow
slug: Workflow
title: Workflow Engine & Designer
sidebar_label: Workflow
---
In line with our open source code strategy, we decided to use [Elsa](https://elsa-workflows.github.io/elsa-core/) with the flexibility, convenience and modularity it offers as a result of our studies of many workflow engines and design tools.

Elsa Workflows is a set of workflows libraries that enable workflow execution in any .NET Standard application. Workflows can be defined using C# code or using JSON and YAML. A workflow designer is provided in the form of an HTML5 web component.

> *Note: BPMN is currently not supported but will be developed soon*
>> For more information, please checkout https://elsa-workflows.github.io/elsa-core/

## Workflow Concepts

In order to work effectively with Workflow, it's helpful to understand some of its terminology. Below is a list of words that represent important concepts used.

### Workflow

A workflow consists of a series of steps called activities that are connected to one another. A workflow maintains all sorts of information, such as the following:

- Which activity is currently executing.
- What variables are set.
- What activities are blocking further execution.

Once an activity is done executing, the workflow checks its outcome and if there's another activity connected to it. If so, that activity is scheduled for execution.

This goes on until there are either no more activities to execute, or an activity is encountered that instructs the workflow invoker to halt the workflow.

### Activity

An activity is an atomic building block that represents a single executable step on the workflow. At a bare minimum, an activity implements the OnExecute method, which contains the code to execute.

### Blocking Activity

When an activity executes, it can return an activity result (somewhat analogous to an MVC ActionResult). There are various possible results that can be returned, but the most commonly used ones are Outcome and Halt.

When Halt is returned, the workflow will enter the Halted status, and the activity will be registered as a blocking activity.

### Halted Workflow

Halted workflows are blocked by one or more blocking activities. The only way to resume such a workflow is to trigger it with the name of one of the blocking activities.

### Connection

A connection represents a connection between two activities. This is how the workflow invoker knows what activities to execute next, A connection between two activities holds 3 bits of information:

The source activity ID.
The source outcome name.
The destination activity ID.
For each possible outcome of a given activity, a connection can be established from that outcome to another activity.

For example, let's say we have a workflow with three activities called Activity A, Activity B and Activity C. Activity A has 2 outcomes called Done and Failed, and we wish to connect the Done outcome to Activity B and Failed to Activity C.

This means we need the following two connections:

Connection 1
- Source: Activity A
- Outcome: Done
- Destination: Activity B

Connection 2
- Source: Activity A
- Outcome: Failed
- Destination: Activity C

### Scenario: User Signup

In this scenario, we have a web application where users can register an account. Upon registration, we want the system to assign a user role to the account and send an email containing an activation link.
If the user doesn’t activate their account within a specified amount of time, a reminder is sent per email to activate quickly.
If the user clicks the activation link, their account becomes activated and all will be well. However, if the user does not activate their account in time, their account will be removed.
The final workflow will look like this:
[![Workflow Instances](https://netcoregenesis.com/images/documentation/workflow_user_registration.png)](https://netcoregenesis.com/images/documentation/workflow_user_registration.png)

- Notice that the workflow has 2 finished instances. Clicking that link takes us to a list of these finished instances:
[![Workflow Instances](https://netcoregenesis.com/images/documentation/workflow_instances.png)](https://netcoregenesis.com/images/documentation/workflow_instances.png)

- The green-colored activities represent activities that have executed. Blue-colored activities represent blocking activities, while grey-colored activities represent activities that have not executed. If you ever see a red-colored activity, it means that activity has faulted, causing the entire workflow to fault as well.
[![Workflow Execution Path](https://netcoregenesis.com/images/documentation/workflow_execution_path.png)](https://netcoregenesis.com/images/documentation/workflow_execution_path.png)

- As you hover over each execution log entry, the corresponding activity on the canvas will highlight. This way you can visually see in what order the workflow executed its activities.
[![Workflow Execution Path Highlight](https://netcoregenesis.com/images/documentation/workflow_execution_path_highlight.gif)](https://netcoregenesis.com/images/documentation/workflow_execution_path_highlight.gif)

- See the data difference before and after
[![Workflow Data Difference](https://netcoregenesis.com/images/documentation/workflow_data_difference.png)](https://netcoregenesis.com/images/documentation/workflow_data_difference.png)

- Assignment history
[![Workflow Assignment History](https://netcoregenesis.com/images/documentation/workflow_assignment_history.png)](https://netcoregenesis.com/images/documentation/workflow_assignment_history.png)

> Thanks to [Sipke Schoorstra](https://sipkeschoorstra.medium.com/building-workflow-driven-net-core-applications-with-elsa-139523aa4c50)

### The Workflow Definition JSON file:

```
{
  "activities": [
    {
      "id": "1d6a22db-5c45-481f-b60e-dd91755af0fd",
      "type": "Signaled",
      "left": 18,
      "top": 9,
      "state": {
        "signal": {
          "expression": "RegisterUser",
          "syntax": "Literal"
        },
        "name": "",
        "title": "Register User",
        "description": "Trigger the workflow when this signal is received."
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "27ef426d-b367-4c7b-8d70-0895a9be9d3d",
      "type": "CreateUser",
      "left": 451,
      "top": 132,
      "state": {
        "userName": {
          "expression": "{{ Input.RegistrationModel.Name }}",
          "syntax": "Liquid"
        },
        "email": {
          "expression": "{{ Input.RegistrationModel.Email }}",
          "syntax": "Liquid"
        },
        "password": {
          "expression": "{{ Input.RegistrationModel.Password }}",
          "syntax": "Liquid"
        },
        "name": "CreateUser",
        "title": "",
        "description": ""
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "e40b865b-45fe-4b9a-a175-07b383ec270c",
      "type": "SendEmail",
      "left": 792,
      "top": 30,
      "state": {
        "from": {
          "expression": "noreply@acme.com",
          "syntax": "Literal"
        },
        "to": {
          "expression": "{{ Activities.CreateUser.User.Email }}",
          "syntax": "Liquid"
        },
        "subject": {
          "expression": "Activate your account!",
          "syntax": "Literal"
        },
        "body": {
          "expression": "<p>Welcome, {{ Activities.CreateUser.User.Name }}!</p>\r\n<p>Please <a href=\"{{ 'Activate' | signal_url }}\">activate your account </a> within the next 5 minutes.</p>",
          "syntax": "Liquid"
        },
        "name": "",
        "title": "Send Activation Link Email",
        "description": "Send an email containing an activation link."
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "0a2e2845-2285-440a-b04d-788cf64cbe83",
      "type": "Fork",
      "left": 862,
      "top": 296,
      "state": {
        "branches": [
          "Activate",
          "Timeout"
        ],
        "name": "",
        "title": "",
        "description": "Split execution"
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "972d6758-074a-4a8b-8299-24c38f869d75",
      "type": "TimerEvent",
      "left": 1243,
      "top": 430,
      "state": {
        "timeoutExpression": {
          "expression": "00:02:30",
          "syntax": "Literal"
        },
        "name": "",
        "title": "Wait for 2.5 minutes",
        "description": ""
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "25baaf68-9b4c-4feb-915c-97f624971da9",
      "type": "ActivateUser",
      "left": 112,
      "top": 728,
      "state": {
        "userId": {
          "expression": "{{ Activities.CreateUser.User.Id }}",
          "syntax": "Liquid"
        },
        "name": "",
        "title": "",
        "description": "Activate the created user."
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "9aa36a20-73b1-4fea-98fb-c2a7325783bf",
      "type": "SendEmail",
      "left": 85,
      "top": 1009,
      "state": {
        "from": {
          "expression": "noreply@acme.com",
          "syntax": "Literal"
        },
        "to": {
          "expression": "{{ Activities.CreateUser.User.Email }}",
          "syntax": "Liquid"
        },
        "subject": {
          "expression": "Thanks for activating!",
          "syntax": "Literal"
        },
        "body": {
          "expression": "<p>Hi {{ Activities.CreateUser.User.Name }},</p>\r\n<p>Thanks for activating your account!</p>",
          "syntax": "Liquid"
        },
        "name": "",
        "title": "Send Activation Confirmation Email",
        "description": "Send an email confirming that the account has been activated."
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "d20bdef7-ca1e-4a1c-ae5c-f0a05ee3749e",
      "type": "SendEmail",
      "left": 1574,
      "top": 617,
      "state": {
        "from": {
          "expression": "noreply@acme.com",
          "syntax": "Literal"
        },
        "to": {
          "expression": "{{ Activities.CreateUser.User.Email }}",
          "syntax": "Liquid"
        },
        "subject": {
          "expression": "Don't forget to activate your account!",
          "syntax": "Literal"
        },
        "body": {
          "expression": "<p>Hi {{ Activities.CreateUser.User.Name }}!</p>\r\n<p>Please don't forget to <a href=\"{{ 'Activate' | signal_url }}\">activate your account </a> within the next 2 minutes.</p>",
          "syntax": "Liquid"
        },
        "name": "",
        "title": "Send Reminder Email",
        "description": "Send a reminder email that the user's time is running out!"
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "f4c6664c-05b4-4b50-94a4-422cbf109629",
      "type": "TimerEvent",
      "left": 1079,
      "top": 766,
      "state": {
        "timeoutExpression": {
          "expression": "00:02:30",
          "syntax": "Literal"
        },
        "name": "",
        "title": "Wait for 2.5 minutes",
        "description": ""
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "eb3cd99d-51b8-45b9-8209-7573c04fae60",
      "type": "DeleteUser",
      "left": 1483,
      "top": 980,
      "state": {
        "userId": {
          "expression": "{{ Activities.CreateUser.User.Id }}",
          "syntax": "Liquid"
        },
        "name": "",
        "title": "",
        "description": "Delete the created user."
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "117b0481-2050-4c13-a4c1-a47d81a7851a",
      "type": "SendEmail",
      "left": 1020,
      "top": 1219,
      "state": {
        "from": {
          "expression": "noreply@acme.com",
          "syntax": "Literal"
        },
        "to": {
          "expression": "{{ Activities.CreateUser.User.Email }}",
          "syntax": "Liquid"
        },
        "subject": {
          "expression": "Sorry to see you go",
          "syntax": "Literal"
        },
        "body": {
          "expression": "<p>Hi {{ Activities.CreateUser.User.Name }},</p>\r\n<p>We're sorry to see you go. We look forward to having you again!</p>",
          "syntax": "Liquid"
        },
        "name": "",
        "title": "Send Account Deleted Email",
        "description": "Send the user an email confirming that their account has been deleted."
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "3eb399d3-29f4-495a-81cf-91a7b178cfe5",
      "type": "Signaled",
      "left": 295,
      "top": 430,
      "state": {
        "signal": {
          "expression": "Activate",
          "syntax": "Literal"
        },
        "name": "",
        "title": "Activation Link Clicked",
        "description": "Wait for user to click the activation link."
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "9adb0f3c-f5d2-41bc-b297-930b0bdd4f9a",
      "type": "Finish",
      "left": 607,
      "top": 1632,
      "state": {},
      "blocking": false,
      "executed": false,
      "faulted": false
    },
    {
      "id": "b9f580b0-6d27-4566-9203-8e6f57e8b6b6",
      "type": "WriteHttpResponse",
      "left": 85,
      "top": 1476,
      "state": {
        "statusCode": "200",
        "content": {
          "expression": "<p>Hi {{ Activities.CreateUser.User.Name }},</p>\r\n<p>Thanks for activating your account!</p>",
          "syntax": "Liquid"
        },
        "contentType": "text/html",
        "responseHeaders": {
          "expression": "",
          "syntax": "Literal"
        },
        "name": "",
        "title": "Display Activation Confirmation Page",
        "description": "Display a page confirming that the account has been activated."
      },
      "blocking": false,
      "executed": false,
      "faulted": false
    }
  ],
  "connections": [
    {
      "sourceActivityId": "1d6a22db-5c45-481f-b60e-dd91755af0fd",
      "destinationActivityId": "27ef426d-b367-4c7b-8d70-0895a9be9d3d",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "27ef426d-b367-4c7b-8d70-0895a9be9d3d",
      "destinationActivityId": "e40b865b-45fe-4b9a-a175-07b383ec270c",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "e40b865b-45fe-4b9a-a175-07b383ec270c",
      "destinationActivityId": "0a2e2845-2285-440a-b04d-788cf64cbe83",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "0a2e2845-2285-440a-b04d-788cf64cbe83",
      "destinationActivityId": "972d6758-074a-4a8b-8299-24c38f869d75",
      "outcome": "Timeout"
    },
    {
      "sourceActivityId": "25baaf68-9b4c-4feb-915c-97f624971da9",
      "destinationActivityId": "9aa36a20-73b1-4fea-98fb-c2a7325783bf",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "972d6758-074a-4a8b-8299-24c38f869d75",
      "destinationActivityId": "d20bdef7-ca1e-4a1c-ae5c-f0a05ee3749e",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "d20bdef7-ca1e-4a1c-ae5c-f0a05ee3749e",
      "destinationActivityId": "f4c6664c-05b4-4b50-94a4-422cbf109629",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "f4c6664c-05b4-4b50-94a4-422cbf109629",
      "destinationActivityId": "eb3cd99d-51b8-45b9-8209-7573c04fae60",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "eb3cd99d-51b8-45b9-8209-7573c04fae60",
      "destinationActivityId": "117b0481-2050-4c13-a4c1-a47d81a7851a",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "0a2e2845-2285-440a-b04d-788cf64cbe83",
      "destinationActivityId": "3eb399d3-29f4-495a-81cf-91a7b178cfe5",
      "outcome": "Activate"
    },
    {
      "sourceActivityId": "3eb399d3-29f4-495a-81cf-91a7b178cfe5",
      "destinationActivityId": "25baaf68-9b4c-4feb-915c-97f624971da9",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "117b0481-2050-4c13-a4c1-a47d81a7851a",
      "destinationActivityId": "9adb0f3c-f5d2-41bc-b297-930b0bdd4f9a",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "9aa36a20-73b1-4fea-98fb-c2a7325783bf",
      "destinationActivityId": "b9f580b0-6d27-4566-9203-8e6f57e8b6b6",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "b9f580b0-6d27-4566-9203-8e6f57e8b6b6",
      "destinationActivityId": "9adb0f3c-f5d2-41bc-b297-930b0bdd4f9a",
      "outcome": "Done"
    }
  ]
}
```
