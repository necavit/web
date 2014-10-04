Almost every web and mobile developer has to deal, at some point, with sending or receiving JSON formatted data. But there are some things we are not doing well: we are not validating these data and we are developing software based on badly documented services, which ends up being uncomfortable and, sometimes, painful. JSON Schema can help us address both these situations.

## JSON hard times  ##

Quite usually, in web and mobile development we developers end up using the [JSON](http://json.org) format as a means to exchange *structured* data between our systems and devices, because there are good reasons to do so: it is really widespread and very easy to integrate - libraries exist in most of the programming languages you can think of; it is more human readable than, say, XML; it is concise and, for many common purposes, its *expressive power* is sufficient.

However, when we are, for example, developing a mobile app that fetches data from a third party service, we often have some hard times with handling communication between the parties. More often than not, RESTful APIs are poorly documented: all we have available are some URLs and some request or response JSON *examples*. We find ourselves uncomfortably coding the API client, because we are uncertain what exactly is expected to be received or sent: "What is this attribute type?", "Is this field supposed to be required?", "Are these examples up-to-date?"... These unresolved questions and doubts can lead to errors and a certain loss of precious development time.

So, what is the problem here? The answer is simple: the lack of a *data model*. It happens that the JSON format is not the problem at all: we need a tool that helps us answering any doubt we have about the structure of our requests and the service responses. And that tool is the **JSON Schema**.

## JSON Schema ##

What exactly is the JSON Schema? Taken from its very own specification draft:

> JSON Schema provides a contract for what JSON data is required for a given application and how to interact with it. JSON Schema is intended to define validation, documentation, hyperlink navigation, and interaction control of JSON data.

And, the most important thing to me: it is still an easily understandable schema format - it is still written in JSON!

### A quick look into it ###

You are, of course, encouraged to read the formal specification draft... But a simple example will illustrate its uses and perhaps will arise your curiosity a bit more! There are some links provided at the end of this article, with tutorials, blog posts and reviews on the matter - take a look at them if you wish!

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

This short and simple schema is telling us that the array items are JSON objects with properties: `username` and `email_address`. Seeing that the only required attribute is the `username` field, our question is now answered. Moreover, we get to know that email addresses are formatted accordingly (they are not just usernames of an unknown domain, for example) and that usernames are never empty: their mininmum length is 1. Both properties are of type `string`, so no ambiguity is left to this particular service answer.

## Tooling ##

Of course, JSON Schema would not be of any good if there were no related tools to work with, because it is just a specification. Even though it is still a draft, a number of packages and online tools are already available.

For those of you developing Java based (Android!) projects, there are a couple of resources I found pretty handy to use:

* An open-source [schema validator library](https://github.com/fge/json-schema-validator) that can be easily imported, using Maven, Gradle or directly adding the JAR archive.
* A [JSON Schema to POJO](http://www.jsonschema2pojo.org) (Plain Old Java Object) code generator, which can be used online or offline as a plugin for either Maven and Gradle. It can also generate annotations for two popular JSON parsing libraries: Gson and Jackson. If you have access to the necessary schemas, you can have your data model parsing module running in just a few minutes or hours!

There are many other libraries available, for languages such as JavaScript (node.js packages too), Python, Objective-C, Ruby, Perl, PHP, Haskell... and some more that are listed on the [specification site](http://json-schema.org/implementations.html), as well. I hope you can find what you need there (or at GitHub, or ... anywhere, really!).

## Spoiler alert! ##

One last bit before the end! This post is meant to be the first of a series on RESTful services & Android REST clients: API documentation, (quick and dirty) services implementation and Android (many things to cover). Keep an eye on this blog if you want to see where is it going!

Alright, that's it for today! I hope you enjoyed this, learnt something new or just did not get bored at all... Happy coding!

## References & useful resources ##

Some
