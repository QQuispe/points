from multiprocessing import connection
import sqlite3

db = "points"
connection = sqlite3.connect(db)

cursor = connection.cursor()
#cursor.execute("CREATE TABLE game (player1 INTEGER, player2 INTEGER, player3 INTEGER)")

cursor.execute("INSERT INTO game VALUES ('10', '20', 15)")
cursor.execute("INSERT INTO game VALUES ('15', '20', 15)")

#rows = cursor.execute("SELECT player1, player2, player3 FROM game").fetchall()

rows = cursor.execute("SELECT sum(player3) FROM game").fetchall()
print(rows)