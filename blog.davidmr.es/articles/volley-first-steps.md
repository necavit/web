Wellcome back! Today's post is about something that has bugged me since I began coding Android apps: networking. By that, I mean managing all the complexity behind the process of fetching data from or posting it to a server. This involves not only HTTP requests, but also launching them *asynchronously*, handling the results or errors nicely and updating the app's UI accordingly, while taking into account the app's lifecycle and a bunch of things that could go wrong. I will take a look at Google's [Volley](Volley LINK BROKEN, MOTHERFUCKER) networking library, which is intended to ease the suffering in this field.

There is a lot of tutorials, blog posts and documentation on this subject on the internet, but some of them are clearly outdated, misleading or, sometimes, too simple. Many of them are great however, and after reading lots of these good articles and after some time struggling with the applications we have built at [inLab FIB](BROKEN LINK, PUSSY), we ended up realizing that our initial approach was simply wrong, for many reasons. We were using Android's classic [AsyncTask](BROKEN LINK) constructs to launch asynchronous network calls. This soon became a real problem in terms of code quality, maintainability, efficiency (both the code and the coding were slow) and application robustness. To do things right using AsyncTasks, you have to write lots of boilerplate code and error checking becomes hard as complexity increases.

There are other Android

## Volley ##

So,
