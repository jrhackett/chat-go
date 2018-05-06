package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	envErr := godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("Must specify a PORT environment variable")
	}

	http.HandleFunc("/ws", handleConnections)
	http.HandleFunc("/api/v1/register", register)
	http.HandleFunc("/api/v1/auth", auth)

	go handleMessages()

	log.Println("http server started on :" + port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
