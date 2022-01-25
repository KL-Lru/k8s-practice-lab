package repos

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var Db *sql.DB

func init() {
	godotenv.Load()

	var err error
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	host := os.Getenv("POSTGRES_DB_HOST")
	dbname := os.Getenv("POSTGRES_DB_NAME")

	Db, err = sql.Open(
		"postgres",
		fmt.Sprintf("user=%s password=%s host=%s dbname=%s", user, password, host, dbname),
	)
	if err != nil {
		panic(err)
	}
}

type Scanner interface {
	Scan(dist ...interface{}) error
}
