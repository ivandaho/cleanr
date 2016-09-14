#**completely** override remote mongodb with local mongodb database#

mongodump from inside of local project's root folder:
```
mongodump -h 127.0.0.1 --port 3001 -d meteor
```

copy dump files to droplet:
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

notes:
appName is app name in mup.js
