# bonsai-book

A great way to keep track of your (probably quickly increasing in number) bonsai.

## Start

1. Start db docker: `$ docker-compose up`
2. Start server: `$ cd server && npm start`
3. Start client: `$ cd ../client && npm start`

## Database

### Backup

`$ cd db && ./backup.sh`

*Note: Script must be executed from within the db/ directory for paths to be resolved correctly.*

This will dump the database to a file and all images to a zip file, something like:

```bash
db/backups/
    --> db/db_dump_some_timestamp.sql
    --> img/img_dump_some_timestamp.zip
```

### Restore Backup

This will clear your database and restore it from the dump **all other data will be lost!**.

This will not clean the images folder though, so you might want to do it yourself.

```bash
$ ./db/restore.sh \
    ./db/backups/db/db_dump_some_timestamp.sql \
    ./db/backups/img/img_dump_some_timestamp.zip
```
