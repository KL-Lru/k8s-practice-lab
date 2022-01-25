package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func getEnvVal(key, fallback string) string {
	value, ok := os.LookupEnv(key)
	if ok {
		return value
	}
	return fallback
}

func main() {
	godotenv.Load()

	port := getEnvVal("PORT", "8080")

	mux := Log(ConfigureRoutingHandler())
	server := &http.Server{
		Addr:    fmt.Sprintf("0.0.0.0:%v", port),
		Handler: mux,
	}
	server.ListenAndServe()
}
