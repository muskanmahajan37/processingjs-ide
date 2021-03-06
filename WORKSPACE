# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

# Dependency of rules_closure
git_repository(
    name = "rules_cc",
    remote = "https://github.com/bazelbuild/rules_cc.git",
    branch = "master",
)

git_repository(
    name = "rules_java",
    remote = "https://github.com/bazelbuild/rules_java.git",
    branch = "master",
)

git_repository(
    name = "rules_proto",
    remote = "https://github.com/bazelbuild/rules_proto.git",
    branch = "master",
)

# Dependency of com_google_protobuf
git_repository(
    name = "rules_python",
    remote = "https://github.com/bazelbuild/rules_python.git",
    branch = "master",
)

# For Bazel 0.21 or later, the minimum Protocol Buffer version required is 3.6.1.2,
# because of the REPOSITORY_NAME removal.
git_repository(
    name = "com_google_protobuf",
    branch = "master",
    remote = "https://github.com/google/protobuf.git",
)

#
# Bazel rules for Closure compiler.
#

git_repository(
    name = "io_bazel_rules_closure",
    branch = "master",
    remote = "https://github.com/bazelbuild/rules_closure.git",
)

load("@io_bazel_rules_closure//closure:defs.bzl", "closure_repositories")

closure_repositories()

#
# Import Processing.js from a minimal distribution under third_party/.
#
new_local_repository(
    name = "processing_js",
    build_file = "//:third_party/processing-js.BUILD",
    path = "third_party",
)

#
# Import jQuery.
#
http_archive(
    name = "jquery",
    build_file = "//:third_party/jquery.BUILD",
    sha256 = "31d8c2e22dd48a7973fe3617cc656fe6b64d2250d07a258cd8ab30ead031c24a",
    strip_prefix = "jquery-3.2.1",
    urls = ["https://github.com/jquery/jquery/archive/3.2.1.tar.gz"],
)

#
# Import Closure compiler to use contrib/externs.
#
http_archive(
    name = "closure_compiler",
    build_file = "//:third_party/closure-compiler.BUILD",
    sha256 = "418f1120146bd349b246388ce0d0255acd3f7e96519682237bad0909b32f931d",
    strip_prefix = "closure-compiler-20190121",
    url = "https://github.com/google/closure-compiler/archive/v20190121.tar.gz",
)

#
# Bazel rules for Go compiler.
#
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "f04d2373bcaf8aa09bccb08a98a57e721306c8f6043a2a0ee610fd6853dcde3d",
    urls = [
        "https://storage.googleapis.com/bazel-mirror/github.com/bazelbuild/rules_go/releases/download/0.18.6/rules_go-0.18.6.tar.gz",
        "https://github.com/bazelbuild/rules_go/releases/download/0.18.6/rules_go-0.18.6.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()

go_register_toolchains()

http_archive(
    name = "bazel_gazelle",
    sha256 = "3c681998538231a2d24d0c07ed5a7658cb72bfb5fd4bf9911157c0e9ac6a2687",
    urls = ["https://github.com/bazelbuild/bazel-gazelle/releases/download/0.17.0/bazel-gazelle-0.17.0.tar.gz"],
)

load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies", "go_repository")

gazelle_dependencies()

#
# Import dependencies of Goquery.
#
go_repository(
    name = "com_github_andybalholm_cascadia",
    commit = "349dd0209470eabd9514242c688c403c0926d266",
    importpath = "github.com/andybalholm/cascadia",
    remote = "https://github.com/andybalholm/cascadia.git",
    vcs = "git",
)

#
# Import Goquery.
#
go_repository(
    name = "com_github_PuerkitoBio_goquery",
    importpath = "github.com/PuerkitoBio/goquery",
    sha256 = "8242ca59ecb79aada1463ee327304953ad49bb5053807e79e2ad07e8d70a00c6",
    strip_prefix = "goquery-1.1.0",
    urls = ["https://github.com/PuerkitoBio/goquery/archive/v1.1.0.tar.gz"],
)

#
# Import golang.org/x/net/html
#
go_repository(
    name = "com_github_golang_net",
    commit = "42fe2e1c20de1054d3d30f82cc9fb5b41e2e3767",
    importpath = "golang.org/x/net",
    remote = "https://github.com/golang/net.git",
    vcs = "git",
)

#
# Import gopkg.in/russross/blackfriday.v2
#
go_repository(
    name = "com_github_russross_blackfriday",
    commit = "cadec560ec52d93835bf2f15bd794700d3a2473b",
    importpath = "gopkg.in/russross/blackfriday.v2",
    remote = "https://github.com/russross/blackfriday",
    vcs = "git",
)

#
# Import github.com/shurcool/sanitized_anchor_name, a dependency of blackfriday.
#
go_repository(
    name = "com_github_shurcool_sanitized_anchor_name",
    commit = "86672fcb3f950f35f2e675df2240550f2a50762f",
    importpath = "github.com/shurcooL/sanitized_anchor_name",
    remote = "https://github.com/shurcooL/sanitized_anchor_name",
    vcs = "git",
)

#
# Bazel rules for yarn modules and nodejs tests.
#
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "06cb04f4f745e37d542ec6883a2896029715a591c0e44c5d250a268d3752f865",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.32.0/rules_nodejs-0.32.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")

node_repositories(package_json = ["//:package.json"])

# yarm_modules enables to use npm modules as fine-grained data dependencies.
yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)
