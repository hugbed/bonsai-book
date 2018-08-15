# backup database
date=`date +%Y-%m-%d"_"%H_%M_%S`
docker exec -t bonsai-book_db_1 pg_dump tree -c -U postgres \
    > backups/db/db_dump_$date.sql

# backup images
zip -r backups/img/img_dump_$date.zip ../server/public/img/
