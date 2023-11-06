from mysql.connector import connect, Error

try:
    with connect(
            host="localhost:3306",
            user="root",
            password="root"
    ) as connection:
        request = "SELECT * FROM demo"
        with connection.cursor() as cursor:
            cursor.execute(request)
            for db in cursor:
                print(db)
except Error as e:
    print(e)