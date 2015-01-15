---
layout: post
title:  "Reviewing JSON Schema"
date:   2015-01-07 19:36:27
comments: true
tags: json schema validation documentation
---

Almost every web and mobile developer has to deal, at some point, with sending or receiving JSON formatted data. But there are some things we are not doing well: we are not validating this data structures and we are developing software based on wrongfully documented services, which ends up being uncomfortable and, sometimes, painful. **JSON Schema** can help us address both these situations.

## JSON: hard times  ##

Quite usually in web and mobile development, we end up using the [JSON](http://json.org) format as a means to exchange *structured* data between our systems and devices, because there are many good reasons to do so: it is widespread and very easy to integrate - libraries to handle it exist in most of the programming languages you can think of; it is more human readable than, say, XML; it is concise and, for many common purposes, its "expressive power" is sufficient enough.

However, when we are, for example, developing a mobile app that fetches data from a server, we sometimes have a hard time trying to achieve communication between the parties. More often than not, RESTful APIs are poorly documented: in some cases, all we have are some URLs and some request or response JSON *examples*. We find ourselves uncomfortably coding the API client, because we are uncertain of what exactly is expected to be received or sent: *"What is this attribute type?"*, *"Is this field supposed to be required?"*, *"Are these examples up-to-date?"*... These unanswered questions and doubts lead to coding errors and a certain waste of precious development time.

So, what is the problem here? The answer is simple: the lack of a **data model**. It happens, though, that the JSON notation is not the problem at all. What we truly need is a tool that helps us answering any doubts we have about the structure of our requests and the service responses. And that tool is the **JSON Schema**.

## JSON Schema ##

What exactly is a "JSON Schema"? Quoting its very own [specification draft](http://json-schema.org/documentation.html):

> JSON Schema provides a contract for what JSON data is required for a given application and how to interact with it. JSON Schema is intended to define validation, documentation, hyperlink navigation, and interaction control of JSON data.

... and the most important thing to me: it is still an easily understandable schema format, because it's just JSON again!

### A quick look into it ###

You are, of course, encouraged to read the formal specification draft, but a simple example will illustrate its uses and perhaps will arise your curiosity a bit more. There are some links provided at the end of this article, with tutorials, blog posts and reviews on the matter - take a look at them if you wish!

Let's say you are building a client for a social network platform. Imagine that it exposes a service to access a list of basic user's information (for example, the list of a user's friends) and that the JSON server response example looks like this:

```javascript
// GET /users
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

You might think that this example is wrong, because *"Bob does not have an email address!"*. But, what if this attribute is not always filled? Or what if Bob decided he did not want his email address be publicly available? Is the API documentation misleading or is it intended to be this way? Let's have a look at the corresponding JSON Schema for the same response:

```javascript
// GET /users
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

This short and simple schema is telling us that the array items of the response are *JSON objects* ("Friends" in the data model) with the following properties: `username` and `email_address`. Seeing that the only *required* attribute is the `username` field, our previous question is now answered. Moreover, we get to know that email addresses must be [formatted accordingly](http://json-schema.org/latest/json-schema-validation.html#anchor111) (they are not just usernames of an unknown domain, for example) and that usernames are never empty: their *mininmum length* is 1. Also, both properties are of type `string`... We can no longer find the data model ambiguous now.

### So, with JSON Schema you can... ###

* **Describe your data model** in a formal specification.
* Provide a better **documentation** for your data model consumers: it is human & machine **readable!**
* **Validate** your generated or received JSON, to check for errors before an exception is thrown elsewhere in your code.
* Ease the automation of **tests**.
* Automatically **generate code** in your preferred programming language for parsing the data model.


## Tooling ##

Of course, JSON Schema would not be of any good if there were no related tools to work with, because it is just a specification. Even though it is still a draft, a number of packages and online tools are already available.

For those of you developing Java based (Android!) projects, there are a couple of resources I found pretty handy to use:

* An open-source [validation library](https://github.com/fge/json-schema-validator) that can be easily imported, using Maven, Gradle or directly adding the JAR archive.
* A [JSON Schema to Java](http://www.jsonschema2pojo.org) code generator, which can be used online or offline as a plugin for either Maven and Gradle. It can also generate annotations for two popular JSON parsing libraries: [Gson](https://code.google.com/p/google-gson) and [Jackson (renamed as FasterXML)](https://github.com/FasterXML/jackson). If you have access to the necessary schemas, you can have your data model parsing module running in just a few minutes or hours!

There are many other libraries available, for languages such as [JavaScript](http://geraintluff.github.io/tv4) ([node.js](https://www.npmjs.org/package/jsonschema) packages too), [Python](https://github.com/Julian/jsonschema), [Objective-C](https://github.com/samskiter/KiteJSONValidator), [Ruby](https://github.com/hoxworth/json-schema), [Perl](https://metacpan.org/pod/JSON::Schema), [PHP](https://github.com/geraintluff/jsv4-php), [Haskell](https://github.com/timjb/aeson-schema)... and some more that are listed on the [specification site](http://json-schema.org/implementations.html), as well. I hope you can find what you need there (or on GitHub, or ... anywhere, really!).

## Spoiler alert! ##

One last bit before the end! This post is meant to be the first of a series on RESTful services & Android REST clients: API documentation, (quick and dirty) services implementation and Android (many things to cover). Keep an eye on this blog if you want to see where is it going!

Alright, that's it for today! I hope you enjoyed this, learnt something new or just did not get bored at all

**Happy coding!**

## References & useful resources ##

* [JSON Schema](http://json-schema.org/) specification homepage.
* [Understanding JSON Schema](http://spacetelescope.github.io/understanding-json-schema/), by Michael Droettboom, Space Telescope Science Institute.
* [jsonschemalint.com](http://jsonschemalint.com), an online schema linter, by Nick Maynard.
* [JSON Validation with JSON Schema](http://davidwalsh.name/json-validation), by David Walsh.
* [JSON Schema: specifying and validating JSON data structures](http://nico.vahlas.eu/2010/04/23/json-schema-specifying-and-validating-json-data-structures), by Nicolas Vahlas.
* [jsonschema.net](http://www.jsonschema.net), an online JSON Schema generation tool.
