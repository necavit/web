Almost every web and mobile developer has to deal, at some point, with sending or receiving JSON formatted data. But there are some things we are not doing well: we are not validating these data and we are developing software based on badly documented services, which ends up being uncomfortable and, sometimes, painful. JSON Schema can help us address both these situations.

## JSON hard times  ##

Many times, in web and mobile projects development we end up using the JSON format as a means to exchange *structured* data between our systems components and devices, and there are good reasons to do so. It is really widespread and is very easy to integrate - libraries exist in most of the programming languages you can think of; it is more human readable than, say, XML; it is concise and, for many purposes, its expressive power is more than enough.

However, when we are, for example, developing a mobile app that fetches data from a third party service, we often have some hard times with handling communication between the parties. More often than not, RESTful APIs are poorly documented: all we have available are some URLs and some request or response JSON *examples*. We find ourselves uncomfortably coding the API client, because we are uncertain what exactly is expected to be received or sent: "What is this attribute type?", "Is this field supposed to be required?", "Are these examples up-to-date?"... These unresolved questions and doubts can lead to errors and a certain loss of precious development time.

So, what is the problem here? The answer is simple: the lack of a *data model*. We 


JSON (JavaScript Object Notation) format is not the problem at all



Introduction
Json, web, mobile - what's wrong
Json schema
Tools
Spoiler alert
