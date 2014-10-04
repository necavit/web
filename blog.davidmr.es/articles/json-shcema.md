Almost every web and mobile developer has to deal, at some point, with sending or receiving JSON formatted data. But there are some things we are not doing well: we are not validating these data and we are developing software based on badly documented services, which ends up being uncomfortable and, sometimes, painful. JSON Schema can help us address both these situations.

## JSON hard times  ##

Many times, in web and mobile projects development we end up using the JSON format as a means to exchange *structured* data between our systems components and devices, and there are good reasons to do so. It is really widespread and is very easy to integrate - libraries exist in most of the programming languages you can think of; it is more human readable than, say, XML; it is concise and, for many purposes, its expressive power is more than enough.

However, when we are, for example, developing a mobile app that fetches data from a third party service, we often have some hard times with handling communication between the parties. More often than not, RESTful APIs are poorly documented: all we have available are some URLs and some request or response JSON *examples*. We find ourselves uncomfortably coding the API client, because we are uncertain what exactly is expected to be received or sent: "What is this attribute type?", "Is this field supposed to be required?", "Are these examples up-to-date?"... These unresolved questions and doubts can lead to errors and a certain loss of precious development time.

So, what is the problem here? The answer is simple: the lack of a *data model*. It happens that the JSON format is not the problem at all: we need a tool that helps us answering any doubt we have about the structure of our requests and the service responses. And that tool is the **JSON Schema**.

## JSON Schema ##

What exactly is the JSON Schema? Taken from its very own specification draft:

> JSON Schema provides a contract for what JSON data is required for a given application and how to interact with it. JSON Schema is intended to define validation, documentation, hyperlink navigation, and interaction control of JSON data.

And, the most important thing to me: it is still an easily understandable schema format - it is still written in JSON!

### A quick look into it ###

You are, of course, encouraged to read the formal specification draft... But a simple example will illustrate its uses better than a long, hard read on those documents. There are some links provided at the end of this article, with tutorials, blog posts and reviews on the matter - take a look at them if you wish!

Let's say you are building a client for a social network platform. Imagine that it exposes a service to access a list of basic user's information (for example, the list of a user's friends) and that the JSON server answer example looks like this:

```json
[
  {
    "username" : "Alice",
    "email_address" : "alice@example.com"
  },
  {
    "username" : "Bob"
  }
]
```

You might well think that this example is wrong, because Bob does not have an email address! But, what if this attribute is not always filled? Or what if Bob decided he did not want his email address be publicly available? Is the API documentation misleading or is it inteded to be this way? Let's have a look at the following JSON Schema:

```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "User friends list",
    "type": "array",
    "items": {
        "title": "Friend",
        "type": "object",
        "properties": {
            "username": {
                "type": "string",
                "minLength": 1
            },
            "email_address": {
                "type": "string",
                "format": "email"
            }
        },
        "required": ["username"]
    }
}
```

Introduction
Json, web, mobile - what's wrong
Json schema
Tools
Spoiler alert
