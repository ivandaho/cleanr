#**completely** override remote mongodb with local mongodb database#

**NOTE: you have to have the correct version of mongo tools installed on your local machine.
Check [official mongo docs](https://docs.mongodb.com/manual/release-notes/3.0-upgrade/) for instructions.
Tested with shell version 3.4.0 and server version 3.2.6.**

mongodump from inside of local project's root folder:
```
mongodump -h 127.0.0.1 --port 3001 -d meteor
```

copy dump files to droplet:

**NOTE: you should ```rm -rf relevant_folders``` if you are doing this more than once**

```
cd dump/meteor
scp -r . root@111.222.33.4:/dbdump
```

ssh into droplet:
```
ssh root@111.222.33.4
```

copy from droplet's file system into mongo docker's file system:


```
cd ..
docker cp dbdump mongodb:/dbdump
```

restore from inside mongo docker:
```
docker exec -it mongodb bash
mongorestore --drop -d appName dbdump
```
**NOTE: You might want to drop the database first in the mongo shell with something like**

```
use appName
appName.dropDatabase();
```


Final notes:
appName is app name in mup.js
