Wellcome back! Today's post is about something that has bugged me since I began coding Android apps: networking. By that, I mean managing all the complexity behind the process of fetching data from a server or posting it back. This involves not only HTTP requests, but also launching them *asynchronously*, handling the results or errors nicely and updating the app's UI accordingly, while taking into account the app's lifecycle and a bunch of things that could go wrong. I will take a look at Google's [Volley](Volley LINK BROKEN, MOTHERFUCKER) networking library, which is intended to ease the suffering in this field.

There is a lot of tutorials, blog posts and documentation on this subject on the Internet, and I'll link some of them at the end of this post. Many of them are great, and after reading lots of these good articles and after some time struggling with the applications we have built at [inLab FIB](BROKEN LINK, PUSSY), we ended up realizing that our initial approach when dealing with network calls was simply wrong, for many reasons. We were using Android's classic [AsyncTask](BROKEN LINK) constructs to launch asynchronous network calls. This soon became a real problem in terms of code quality, maintainability, efficiency (both the code and the coding were slow) and application robustness. To do things right using AsyncTasks, you have to write lots of boilerplate code and error checking becomes hard as complexity increases.

**Disclaimer!** This tutorial is not intended for Android beginners, but to people who already know the basics, like populating a `ListView` with a backing `Adapter`. If you do now know what am I talking about, it will be hard to read.

## Volley ##

Since I began thinking of writing this article, long before I even had started the blog, Google has released a [tutorial](http://developer.android.com/training/volley/index.html) about the Volley library, which is really well explained to get the basics working. You can take a look at it - I'll try to extend some things they tell you here.

### What does it do? ###

There is a [video from 2013's Google I/O](https://developers.google.com/events/io/sessions/325304728) conference in which [Ficus Kirkpatrick](https://plus.google.com/+FicusKirkpatrick) presents Volley. It is well explained too and worthy to watch, but I'll give you a rapid overview of Volley's main features:

* High flexibility and **very easy customization**, through inheritance and other constructs. This turns out to be the best feature in my opinion, allowing  complex response handling to be implemented, if necessary.
* Managed *request queue* to **automatically schedule** network requests.
* Thread pools under the hood to provide **multiple concurrent** requests.
* Request **cancellation** (very handy!).
* **Transparent caching**, both "disk" and in-memory, that uses the standard HTTP cache coherence protocols.
* **Request priorization**, for example, to load images after more important data!
* Includes custom **image views** to use for image requests.
* Easy **timeout, retry and backoff** configuration.

And the list could be larger, mainly because of the first item! We will see that it is easy to get complex things done, if we know how to architecture it well.

#### What Volley is not ####

Having a look at the previous list, it seems like we are not going to ever need anything else to do a good job in our Android apps. Of course, we are wrong. Volley is aimed at RESTful services and back-ends and, very important, is targeted at performing well for *short, lightweight network requests*. The main reason is that request responses are all delivered in-memory, which is not that good when downloading big files to disk or when streaming audio or video files. Ficus Kirkpatrick explains it better in the I/O video I referenced before.

### Installing Volley ###

This library is still under development, at the time of this writing, though as far as I have tested, its core is functional and stable. The main drawback is that it is not bundled with the Android SDK (not even as an extra package). You will have to *clone* it from the Git repository where it is maintained. To do so, go into your Android workspace and create a new directory - call it however you like it. Move inside of it and execute the following command:

```bash
git clone https://android.googlesource.com/platform/frameworks/volley .
```

Do not forget that `.` at the end! It will download the last stable release of the library on the current directory. Next, we have to import it into our app project.

#### Importing Volley ####

There are a couple or three or four ways to include the library in your project. The Google's tutorial covers two of them: [referencing an Android library project](http://developer.android.com/tools/projects/projects-eclipse.html#ReferencingLibraryProject) and [importing it as a `.jar` file](http://developer.android.com/guide/faq/commontasks.html#addexternallibrary).

I'd say that if you are working alone, or you are setting up a mock project to test the library, the first solution is the simplest one. Moreover, if you are just referencing the library project, you'll allways be able to update it (Git-pulling it). On the contrary, `.jar` files have to be built by hand every time, so it can be nastier to maintain in the long run.

There are a couple more of solutions which I like best, though: using the new Android's build system, [Gradle](http://developer.android.com/sdk/installing/studio-build.html), and using [Maven](https://code.google.com/p/maven-android-plugin/wiki/GettingStarted). Both this approaches are best suited for more complex projects, with lots of dependencies or for big teams, which should definitely use dependency management systems like these. I have not used Gradle (I know, I'm getting left behind!! I should do something about it, someday), but for those of you who like Maven, the only thing you need to do is to add a `pom.xml` file and install the artifact on your local (and remote) repository. I will not cover now Maven-related processes for Android, because that well deserves a whole article by itself.

**Warning!** Ensure that Eclipse (or any IDE you are using) knows that the Volley project is an Android library project. Set the "is library project" check mark under `Project > Properties > Android > 'Is library'`.

Once you have "linked" the Volley library to the project, it's time to get your hands on it!

## The REST service ##

Before we start coding the app, we will think of a REST service that our example app will be using. Do not hesitate to change it for the one you need or for some you can have access to - it's are just meant to be an example.

Today's service will be about... zombies! Yeah, zombies! ... It's just a joke we came up with one day at a brainstorming session - to build a zombie social network. This way, the undead could at last communicate with other communities of their folk around the globe. Now, really, it's just a simple social network, only this way is not so boring to implement!

This new platform, that we will call Zocial, has all a zombie could desire: profile images, a social activity stream (somehow like Twitter... that's suspicious) and a way to comment and like those small posts. Also, authentication is needed to access these services, in order to block anyone who wanted to sneak in without being invited. Given the low amount of zombies in the planet, there is no need to follow anyone to get their activities on your stream; instead, all activities are posted to a global stream, making it waay easier to design and implement Zocial!

## Hands on! ##

### Volley's request queue ###

The first thing to have in mind is that network requests are no longer to be managed by your activities (at least to a certain point). The Volley's `RequestQueue` is going to do all the hard work, in background threads you don't have to worry much about. You can get such a queue from the `Volley` class using a convenient method and launch a request very simply:

```java
RequestQueue queue = Volley.newRequestQueue(this);

// ...

// build request
Request request = /* ... */
// launch request
queue.add(request);
```

[INSERT IMAGE HERE - REQUEST QUEUE ARCHITECTURE]

It is best practice to build your own request queue manager, because you only 
