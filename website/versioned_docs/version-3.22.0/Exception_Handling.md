---
id: Exception_Handling
slug: Exception_Handling
title: Exception Handling
sidebar_label: Exception Handling
---

You don't need to handle exceptions for any of backend and frontend in most of the time.
They are gonna be caught and displayed in a friendly-manner in UI thanks to exception handling middleware.
 ![Exception Handling in UI](https://netcoregenesis.com/images/documentation/exception_handling_ui_message.png)

### A failed response object:

```json
 {
  "Success": false,
  "Errors": [],
  "Message": "An error occurred while updating the entries. See the inner exception for details.",
  "Data": {
    "InnerException": {
      "ClassName": "Npgsql.PostgresException",
      "Message": "External component has thrown an exception.",
      "Data": null,
      "InnerException": null,
      "HelpURL": null,
      "StackTraceString": "   at Npgsql.NpgsqlConnector.<>c__DisplayClass160_0.<<DoReadMessage>g__ReadMessageLong|0>d.MoveNext()\n--- End of stack trace from previous location where exception was thrown ---\n   at Npgsql.NpgsqlConnector.<>c__DisplayClass160_0.<<DoReadMessage>g__ReadMessageLong|0>d.MoveNext() in C:\\projects\\npgsql\\src\\Npgsql\\NpgsqlConnector.cs:line 973\n--- End of stack trace from previous location where exception was thrown ---\n   at Npgsql.NpgsqlDataReader.NextResult(Boolean async, Boolean isConsuming) in C:\\projects\\npgsql\\src\\Npgsql\\NpgsqlDataReader.cs:line 475\n   at Npgsql.NpgsqlDataReader.NextResult() in C:\\projects\\npgsql\\src\\Npgsql\\NpgsqlDataReader.cs:line 298\n   at Npgsql.NpgsqlCommand.ExecuteReaderAsync(CommandBehavior behavior, Boolean async, CancellationToken cancellationToken) in C:\\projects\\npgsql\\src\\Npgsql\\NpgsqlCommand.cs:line 1178\n   at Npgsql.NpgsqlCommand.ExecuteReader(CommandBehavior behavior) in C:\\projects\\npgsql\\src\\Npgsql\\NpgsqlCommand.cs:line 1059\n   at System.Data.Common.DbCommand.ExecuteReader()\n   at Microsoft.EntityFrameworkCore.Storage.Internal.RelationalCommand.Execute(IRelationalConnection connection, DbCommandMethod executeMethod, IReadOnlyDictionary`2 parameterValues)\n   at Microsoft.EntityFrameworkCore.Storage.Internal.RelationalCommand.ExecuteReader(IRelationalConnection connection, IReadOnlyDictionary`2 parameterValues)\n   at Microsoft.EntityFrameworkCore.Update.ReaderModificationCommandBatch.Execute(IRelationalConnection connection)",
      "RemoteStackTraceString": null,
      "RemoteStackIndex": 0,
      "ExceptionMethod": null,
      "HResult": -2147467259,
      "Source": "Npgsql",
      "WatsonBuckets": null,
      "Severity": "ERROR",
      "InvariantSeverity": "ERROR",
      "SqlState": "23505",
      "MessageText": "duplicate key value violates unique constraint \"KEYCODE_AND_VALUE_PAIR_MUST_BE_UNIQUE\"",
      "Detail": "Key (\"keyCode\", \"parentValue\", value, status)=(TEMPLATE_TYPE, 0, 1, 1) already exists.",
      "Hint": null,
      "Position": 0,
      "InternalPosition": 0,
      "InternalQuery": null,
      "Where": null,
      "SchemaName": "public",
      "TableName": "coreParameters",
      "ColumnName": null,
      "DataTypeName": null,
      "ConstraintName": "KEYCODE_AND_VALUE_PAIR_MUST_BE_UNIQUE",
      "File": "nbtinsert.c",
      "Line": "534",
      "Routine": "_bt_check_unique"
    },
    "Message": "An error occurred while updating the entries. See the inner exception for details.",
    "StackTrace": "   at CoreSvc.Filters.GlobalLoggingFilter.OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next) in /Users/martiranlar/Documents/Projects/genesis/Framework/Base/CoreSvc/Filters/GlobalLoggingFilter.cs:line 113\n   at Microsoft.AspNetCore.Mvc.Internal.ControllerActionInvoker.InvokeNextActionFilterAsync()\n   at Microsoft.AspNetCore.Mvc.Internal.ControllerActionInvoker.Rethrow(ActionExecutedContext context)\n   at Microsoft.AspNetCore.Mvc.Internal.ControllerActionInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)\n   at Microsoft.AspNetCore.Mvc.Internal.ControllerActionInvoker.InvokeInnerFilterAsync()\n   at Microsoft.AspNetCore.Mvc.Internal.ResourceInvoker.InvokeNextResourceFilter()\n   at Microsoft.AspNetCore.Mvc.Internal.ResourceInvoker.Rethrow(ResourceExecutedContext context)\n   at Microsoft.AspNetCore.Mvc.Internal.ResourceInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)\n   at Microsoft.AspNetCore.Mvc.Internal.ResourceInvoker.InvokeFilterPipelineAsync()\n   at Microsoft.AspNetCore.Mvc.Internal.ResourceInvoker.InvokeAsync()\n   at Microsoft.AspNetCore.Builder.RouterMiddleware.Invoke(HttpContext httpContext)\n   at CoreSvc.Middlewares.CommunicationMiddleware.Invoke(HttpContext context) in /Users/martiranlar/Documents/Projects/genesis/Framework/Base/CoreSvc/Middlewares/CommunicationMiddleware.cs:line 202\n   at CoreSvc.Middlewares.ExceptionHandlingMiddleware.Invoke(HttpContext context) in /Users/martiranlar/Documents/Projects/genesis/Framework/Base/CoreSvc/Middlewares/ExceptionHandlingMiddleware.cs:line 29"
  }
}
```

### `Inner Exception` and `Stack Trace` are displayed also.

![Exception Handling in Detail](https://netcoregenesis.com/images/documentation/exception_handling_ui_message_detail.png)

> TODO: will be elaborated.
