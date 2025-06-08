to make tabs in this folder visible again, take two steps:
1. move the file to /tabs dir 
2. remove the line from .github/workflows (see example below)


from the snippet below, remove: `/^\/tags\//`
```
name: Test site
run: |
  bundle exec htmlproofer _site \
    \-\-disable-external \
    \-\-ignore-urls "/^http:\/\/127.0.0.1/,/^http:\/\/0.0.0.0/,/^http:\/\/localhost/,/^\/tags\//"
```
