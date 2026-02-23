# Experiment 5: Cloud Data Logger(ThingSpeak)

## Short Description
You will connect your device to the cloud data platform ThingSpeak. The ESP8266 will monitor an IR sensor and upload a "1" to the cloud whenever an intruder passes by.

## Expected Outcome
Your ThingSpeak dashboard graph will update live (every 15s). When you trigger the sensor, the graph line jumps up to 1.

## Concept
Instead of temperature, we will log when an object (intruder) is detected.

## Account Setup:
- 1. Create a channel on Thingspeak.com.
- 2. Name Field 1 as "Intruder Status".
- 3. Copy Write API Key.

## Part A: Without Using ThingSpeak Library

### Wiring
IR Sensor Signal to GPIO 14 (Pin D5).

### Circuit Diagram
<!-- Insert Circuit Diagram Image Here -->

### The Code

```cpp
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASS";

ESP8266WebServer server(80); // Port 80 is the default HTTP port
const int ledPin = 5; // GPIO 5 (D1)

// HTML Code stored in a String (Simple method)
String htmlPage = "<h1>Control Room</h1>"
                  "<p><a href=\"/on\"><button style=\"background:green; color:white; font-size:20px; padding:10px;\">TURN ON</button></a></p>"
                  "<p><a href=\"/off\"><button style=\"background:red; color:white; font-size:20px; padding:10px;\">TURN OFF</button></a></p>";

void handleRoot() {
  server.send(200, "text/html", htmlPage); // Send HTML to browser
}

void handleOn() {
  digitalWrite(ledPin, HIGH);
  server.send(200, "text/html", "<h1>Light ON</h1> <a href='/'>Back</a>");
}

void handleOff() {
  digitalWrite(ledPin, LOW);
  server.send(200, "text/html", "<h1>Light OFF</h1> <a href='/'>Back</a>");
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nConnected!");
  Serial.print("Go to this URL: http://");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/on", handleOn);
  server.on("/off", handleOff);
  
  server.begin();
}

void loop() {
  server.handleClient(); // Listen for incoming browser requests
}

```

## Part B: The Easy Way (With Library)
- Cleaner code using the official library.
- Library: Go to Sketch -> Include Library -> Manage Libraries -> Search "ThingSpeak" (by MathWorks) -> Install.

### The Code:

``` cpp 
#include <ESP8266WiFi.h>
#include "ThingSpeak.h"

const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASS";

// ThingSpeak Settings
unsigned long myChannelNumber = 123456; // Replace with your Channel ID
const char* myWriteAPIKey = "YOUR_WRITE_API_KEY";

const int irPin = 14; // GPIO 14 (D5)
WiFiClient client;

void setup() {
  Serial.begin(115200);
  pinMode(irPin, INPUT);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  
  ThingSpeak.begin(client); // Initialize ThingSpeak
}

void loop() {
  int irState = digitalRead(irPin);
  int value = (irState == LOW) ? 1 : 0; 

  // Write to ThingSpeak Field 1
  int x = ThingSpeak.writeField(myChannelNumber, 1, value, myWriteAPIKey);

  if(x == 200){
    Serial.println("Channel update successful.");
  } else {
    Serial.println("Problem updating channel. HTTP error code " + String(x));
  }
  
  delay(15000); // Wait 15s
}

```

### Result & Analysis:

#### Result: 
A graph on your ThingSpeak dashboard updates every 15 seconds. If you wave your hand, the graph spikes to '1'.

#### Reason: 
The ESP8266 connects to ThingSpeak's REST API. Part A manually constructs the HTTP Headers (POST /update...). Part B uses a library to do the same task, abstracting the complexity.