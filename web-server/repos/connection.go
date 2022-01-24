package repos

import (
	"database/sql"

	_ "github.com/lib/pq"
)

var Db *sql.DB

func init() {
	var err error
	Db, err = sql.Open("postgres", "user=app dbname=practice password=password")
	if err != nil {
		panic(err)
	}
}

type Scanner interface {
	Scan(dist ...interface{}) error
}
