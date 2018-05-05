package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type Message struct {
	User    User   `json:"user"`
	Message string `json:"message"`
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var upgrader = websocket.Upgrader{}

func main() {
	envErr := godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}

	http.HandleFunc("/ws", handleConnections)
	http.HandleFunc("/api/v1/register", register)
	http.HandleFunc("/api/v1/auth", auth)
	// TODO production file serving

	go handleMessages()

	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
