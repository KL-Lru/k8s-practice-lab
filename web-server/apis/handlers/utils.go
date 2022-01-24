package handlers

import (
	"encoding/json"
	"log"
	"net/http"
)

func writeJsonResponse(w http.ResponseWriter, v interface{}) {
	output, err := json.MarshalIndent(&v, "", "  ")
	if err != nil {
		log.Println(err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(output)
	return
}

func parseJsonRequest(r *http.Request) (body []byte) {
	len := r.ContentLength
	body = make([]byte, len)
	r.Body.Read(body)
	return
}
