# xml_feed_checker
Check multiple xml feeds with a single xpath expression

## Usage
- Create a yaml file with all your feed urls
```
- http://www.example.com/feed1.xml
- http://www.example.com/feed2.xml
- http://www.example.com/feed3.xml
- http://www.example.com/feed4.xml
```

- Run an xpath expression against this file:
```
./index.js --xpath "count(//node)" --file feeds.yml
```
