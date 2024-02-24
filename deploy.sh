#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://cr870406.github.io
# git push -f git@github.com:cr870406/cr870406.github.io.git main

# if you are deploying to https://li-0406.github.io/looking
git push -f git@github.com:li-0406/looking.git main:gh-pages
cd -