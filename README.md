# Web

A repository for my own [personal webpage](http://davidmr.es).

## Overview

The web (under the `davidmr.es` directory) is built on [Jekyll](https://jekyllrb.com/), a static site generator, that renders [Markdown](https://daringfireball.net/projects/markdown/) and other plain text formats to HTML to construct the whole site.

To style the webpage and provide a better user experience, a number of open source projects are being used:

* [Materialize CSS](http://materializecss.com/): a CSS framework, with similar working principles to [Bootstrap](http://getbootstrap.com/), but implementing Google's [material design](https://www.google.com/design/spec/material-design/introduction.html) patterns.
* [Prism](http://prismjs.com/): a lightweight, extensible syntax highlighter, built with modern web standards in mind. Used to highlight the syntax of code blocks in the blog articles.
* [Masonry](http://masonry.desandro.com/): a JavaScript grid layout library. It works by placing elements in optimal position based on available vertical space, sort of like a mason fitting stones in a wall.
* [Disqus](https://disqus.com/): an externally hosted comments engine, relieving this site of the need for dynamic content management (database, forms, authentication, etc.).

## Deployment

The website is served directly by an [Nginx](http://nginx.org/) web server, which also allows other projects to be hosted under the same domain, by acting as a reverse proxy.

The deployment of the website is done using a [bare Git repository](http://stackoverflow.com/a/7861254) together with a [`post-receive` Git hook](http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). Whenever a new release is to be rolled out, a simple

```
git push deploy master
```

command will push the `master` branch to the bare `deploy` [remote](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes), triggering a `post-receive` hook, which takes care of actually copying the updated code to the staging directory from which it is served by the Nginx proxy.

#### post-receive Git hook

In order to deploy the files from the bare repository, once a new `push` is received, a simple Bash script named `post-receive` has to be placed under the `hooks` directory in the Git repository. (Remember to `chmod +x` the script!)

```bash
#!/bin/bash -l
GIT_REPO=$HOME/davidmr-web.git
TMP_GIT_CLONE=$HOME/tmp/davidmres-jekyll-build-dir
PUBLIC_WWW=/data/web/davidmr.es

git clone -b master $GIT_REPO $TMP_GIT_CLONE
jekyll build --source $TMP_GIT_CLONE/davidmr.es --destination $PUBLIC_WWW
rm -Rf $TMP_GIT_CLONE

exit
```

## [License](LICENSE)

```
Copyright 2016 David Martínez Rodríguez

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

```
