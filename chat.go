package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

type (
	// Message is the message object
	Message struct {
		User      User      `json:"user"`
		Message   string    `json:"message"`
		Timestamp time.Time `json:"timestamp"`
	}
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var upgrader = websocket.Upgrader{}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}

	defer ws.Close()

	clients[ws] = true

	for {
		msg := Message{}
		if err := ws.ReadJSON(&msg); err != nil {
			delete(clients, ws)
			break
		}
		msg.Timestamp = time.Now()
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		for client := range clients {
			if err := client.WriteJSON(msg); err != nil {
				client.Close()
				delete(clients, client)
			}
		}
	}
}
