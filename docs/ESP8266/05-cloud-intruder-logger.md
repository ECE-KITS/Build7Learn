# Experiment 5: Cloud Data Logger(ThingSpeak)

## Short Description
You will connect your device to the cloud data platform ThingSpeak. The ESP8266 will monitor an IR sensor and upload a "1" to the cloud whenever an intruder passes by.

## Expected Outcome
Your ThingSpeak dashboard graph will update live (every 15s). When you trigger the sensor, the graph line jumps up to 1.

## Concept
Instead of temperature, we will log when an object (intruder) is detected.

## Account Setup
1. Create a channel on Thingspeak.com.
2. Name Field 1 as "Intruder Status".
3. Copy Write API Key.

### Circuit Diagram
![alt text](images/exp2-a.jpeg)
IR Sensor Signal to GPIO 14 (Pin D5).

## The Intruder Logger (With Library)
- Cleaner code using the official library (ThingSpeak, by MathWorks).
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

### Result & Analysis

#### Result
A graph on your ThingSpeak dashboard updates every 15 seconds. If you wave your hand, the graph spikes to '1'.

#### Reason
The ESP8266 connects to ThingSpeak's REST API and updates the field.