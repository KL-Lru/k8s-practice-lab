package main

import (
	"fmt"
	"net/http"
)

func Log(handler http.Handler) http.Handler {
	return http.HandlerFunc(
		func(writer http.ResponseWriter, r *http.Request) {
			path := r.URL.Path
			method := r.Method
			writer.Header().Set("Access-Control-Allow-Headers", "*")
			writer.Header().Set("Access-Control-Allow-Origin", "*")
			writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

			handler.ServeHTTP(writer, r)
			fmt.Println(method, path, r.UserAgent())
		},
	)
}
