package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func conninfo(nodb bool) string {
	godotenv.Load()

	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	host := os.Getenv("POSTGRES_DB_HOST")
	dbname := os.Getenv("POSTGRES_DATABASE")

	if nodb {
		return fmt.Sprintf("user=%s password=%s host=%s sslmode=disable", user, password, host)
	}
	return fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=disable", user, password, host, dbname)
}

func createDatabase() {
	conninfo := conninfo(true)
	db, err := sql.Open("postgres", conninfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fmt.Println("Execute create database")
	dbName := "practice"
	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE %v", dbName))
	if err != nil {
		log.Fatal(err)
	}
}

func createTables() {
	conninfo := conninfo(false)
	db, err := sql.Open("postgres", conninfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fmt.Println("Execute create practice tables")
	_, err = db.Exec("CREATE TABLE projects ( id VARCHAR(255), name VARCHAR(255) )")
	if err != nil {
		log.Fatal(err)
	}
	_, err = db.Exec("CREATE TABLE tasks ( id VARCHAR(255), title VARCHAR(255), description TEXT, deadline TIMESTAMP, finished_at TIMESTAMP )")
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	createDatabase()
	createTables()
	fmt.Println("Finish initialize!")
}
