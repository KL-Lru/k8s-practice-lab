package main

import (
	"net/http"
)

func main() {
	mux := Log(ConfigureRoutingHandler())
	server := &http.Server{
		Addr:    "0.0.0.0:8088",
		Handler: mux,
	}
	server.ListenAndServe()
}
