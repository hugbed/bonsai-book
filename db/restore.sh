# $1: db filename, $2: img zip filename
# i.e: ./restore.sh db_dump_2018-08-15_18_20_34.sql img_dump_2018-08-15_18_20_34.zip

# restore db from sql dump file
cat backups/db/$1 | docker exec -i bonsai-book_db_1 psql -U postgres -d tree

# restore images
unzip -o backups/img/$2 -d ../
