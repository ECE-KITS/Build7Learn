# Exp 7: Professional IoT (MQTT): MQTT Remote Control
## Short Description
You will use the MQTT protocol, which is the industry standard for IoT. You will use a public server (Broker) to send text commands from your computer to your ESP8266. 

## Expected Outcome
Using an MQTT client on your computer, publishing the message "ON" to your specific topic turns the LED on. Publishing "OFF" turns it off.

## Goal
Use the standard protocol of industrial IoT: MQTT (Message Queuing Telemetry Transport). Use a public broker (broker.hivemq.com) to toggle an LED.

## Technical Concept
- Broker: The central server (Post Office).
- Topic: The specific channel (Mailbox), e.g., home/livingroom/light.
- Publish: Send data.
- Subscribe: Listen for data.

## Setup
Install Library PubSubClient by Nick O'Leary.

## The Code

```cpp
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASS";
const char* mqtt_server = "broker.hivemq.com"; // Public Broker

WiFiClient espClient;
PubSubClient client(espClient);
const int ledPin = 5; // GPIO 5

// This function runs when a message arrives
void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (int i = 0; i < length; i++) {
    msg += (char)payload[i];
  }
  Serial.print("Message received: ");
  Serial.println(msg);

  if (msg == "ON") digitalWrite(ledPin, HIGH);
  if (msg == "OFF") digitalWrite(ledPin, LOW);
}

void reconnect() {
  while (!client.connected()) {
    String clientId = "ESP8266-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("MQTT Connected!");
      client.subscribe("workshop/yourname/light"); // Unique Topic
    } else {
      delay(5000);
    }
  }
}

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  
  client.setServer(mqtt_server, 1883); // Port 1883 is standard
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();
}

```

## Result & Analysis

### Result
You can use an MQTT Desktop Client (like MQTTX) to publish "ON" to the topic workshop/yourname/light, and the LED turns on.

### Reason
MQTT is a lightweight publish-subscribe protocol. The ESP8266 "Subscribes" to the topic. When the Broker receives a message for that topic, it immediately pushes it to the ESP8266, triggering the callback function.
