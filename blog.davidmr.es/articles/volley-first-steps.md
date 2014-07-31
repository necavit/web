Wellcome back! Today's post is about something that has bugged me since I began coding Android apps: networking. By that, I mean managing all the complexity behind the process of fetching or posting data to a server. Not only at the HTTP level, which is not that difficult, but also launching the requests asynchronously, handle the results or the errors nicely and updating the app's UI accordingly, while taking into account the app's lifecycle and all those things that could go wrong. We will take a look on Google's Volley networking library, which is intended to ease the suffering in this context.

There is a lot of tutorials, blog posts and documentation on this subject on the internet, but some of them are clearly outdated, misleading or, sometimes, too simple. Many of them are great however, and after reading lots of these good articles and after some time struggling with the networking components of the applications that we have built, we ended up realizing that our initial approach was simply wrong, for many reasons. We were (and still are, because refactoring the apps takes time) using Android's classic [AsyncTask](BROKEN LINK) constructs to launch asynchronous network calls. This soon became a real problem in terms of code quality, maintainability, efficiency (both the code and the coding were slow) and application robustness. To do things right with AsyncTasks, you have to write lots of boilerplate code, error checking is sometimes hard and, many times, we were breaking many coding good practices - we are also sure that we could have done it better, but we were unexperienced at that time.

There are other Android 

## Volley ##

So,
