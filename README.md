![Node](https://img.shields.io/badge/node-14.9.0-green.svg)
[![npm version](https://badge.fury.io/js/%40promptapi%2Fscraper-pkg.svg)](https://badge.fury.io/js/%40promptapi%2Fscraper-pkg)

# Prompt API - Scraper - Node Package

`@promptapi/scraper-pkg` is a simple JavaScript wrapper for [scraper-api][scraper-api].

## Requirements

1. You need to signup for [Prompt API][promptapi-signup]
1. You need to subscribe [scraper-api][scraper-api], test drive is **free!!!**
1. You need to set `PROMPTAPI_TOKEN` environment variable after subscription.

then;

```bash
$ npm install @promptapi/scraper-pkg
```

or, install from GitHub registry;

```bash
$ npm install @promptapi/scraper-pkg@0.1.5
```

---

## Example Usage

Basic scrape feature:

```javascript
const promptapi = require('@promptapi/scraper-pkg')
params = {}
promptapi.scraper('https://pypi.org/classifiers/', params).then(result => {
  if(result.error){
    console.log(result.error)
  } else {
    console.log(result.data); // your scraped data...
    console.log(result.headers);
    console.log(result.url);

    promptapi.save('/tmp/data.html', result.data) // save result
  }
})
```

Output:

    // result.data
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta name="defaultLanguage" content="en">
        <meta name="availableLanguages" content="en, es, fr, ja, pt_BR, uk, el, de, zh_Hans, ru, he">
    :
    :
    :
    
    // result.headers
    { 'Content-Length': '322126', ...
    
    // result.url
    https://pypi.org/classifiers/
    
    /tmp/data.html saved successfully, written 322126 bytes

You can add url parameters for extra operations. Valid parameters are:

- `auth_password`: for HTTP Realm auth password
- `auth_username`: for HTTP Realm auth username
- `cookie`: URL Encoded cookie header.
- `country`: 2 character country code. If you wish to scrape from an IP address of a specific country.
- `referer`: HTTP referer header
- `selector`: CSS style selector path such as `a.btn div li`. If `selector` is
  enabled, returning result will be collection of data and saved file will be
  in `.json` format.

```javascript
const promptapi = require('@promptapi/scraper-pkg')

params = {country: 'EE', selector: 'ul li button[data-clipboard-text]'}

promptapi.scraper('https://pypi.org/classifiers/', params).then(result => {
  if(result.error){
    console.log(result.error)
  } else {
    console.log(result.data); // your scraped data...
    console.log(result.headers);
    console.log(result.url);

    promptapi.save('/tmp/data.json', result.data)
  }
})
```

Output :

    // result.data
    [ '<button class="button button--small margin-top margin-bottom copy-tooltip copy-tooltip-w" data-clipboard-text="Development Status :: 1 - Planning" data-tooltip-label="Copy to clipboard" type="button">\n Copy\n</button>\n',
      '<button class="button button--small margin-top margin-bottom copy-tooltip copy-tooltip-w" data-clipboard-text="Development Status :: 2 - Pre-Alpha" data-tooltip-label="Copy to clipboard" type="button">\n Copy\n</button>\n',
      '<button class="button button--small margin-top margin-bottom copy-tooltip copy-tooltip-w" data-clipboard-text="Development Status :: 3 - Alpha" data-tooltip-label="Copy to clipboard" type="button">\n Copy\n</button>\n',
    :
    :
    :
    
    // result.headers
    { 'Content-Length': '322126', ...
    
    // result.url
    https://pypi.org/classifiers/
    
    /tmp/data.json saved successfully, written 174182 bytes

If you have `jq` tool;

```bash
$ cat /tmp/data.json | jq 'length'
736
```

---

## Development

All you need is `node` and `npm`...

---

## License

This project is licensed under MIT

---

## Contributer(s)

* [Prompt API](https://github.com/promptapi) - Creator, maintainer

---

## Contribute

All PR’s are welcome!

1. `fork` (https://github.com/promptapi/scraper-pkg/fork)
1. Create your `branch` (`git checkout -b my-feature`)
1. `commit` yours (`git commit -am 'Add awesome features...'`)
1. `push` your `branch` (`git push origin my-feature`)
1. Than create a new **Pull Request**!

This project is intended to be a safe,
welcoming space for collaboration, and contributors are expected to adhere to
the [code of conduct][coc].

[promptapi-signup]: https://promptapi.com/#signup-form
[scraper-api]:      https://promptapi.com/marketplace/description/scraper-api
[coc]:              https://github.com/promptapi/scraper-pkg/blob/main/CODE_OF_CONDUCT.md