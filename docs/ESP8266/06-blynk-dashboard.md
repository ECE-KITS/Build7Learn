# Experiment 6: IoT Dashboard (Blynk)
## Short Description
You will link your ESP8266 to a mobile app called Blynk. This allows you to create a custom smartphone interface with buttons and displays to control your hardware remotely.

## Expected Outcome
Tapping the virtual button on your phone screen will instantly toggle the physical LED on your breadboard, regardless of where you are (as long as you have internet).

## Concept
Using a 3rd party cloud broker to handle app communication.

## Setup
1. Blynk IoT App: Create Template -> Datastream (Virtual Pin V0, Int).
2. Library: Install "Blynk" by Volodymyr Shymanskyy.

## The Code

```cpp
// Template ID comes from Blynk Dashboard
#define BLYNK_TEMPLATE_ID "YOUR_TMPL_ID"
#define BLYNK_DEVICE_NAME "MyESP8266"
#define BLYNK_AUTH_TOKEN "YOUR_AUTH_TOKEN"

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

char auth[] = BLYNK_AUTH_TOKEN;
char ssid[] = "YOUR_WIFI_NAME";
char pass[] = "YOUR_WIFI_PASS";

const int ledPin = 5; // GPIO 5 (D1)

// This function runs AUTOMATICALLY when button V0 is pressed in App
BLYNK_WRITE(V0) {
  int pinValue = param.asInt();
  if (pinValue == 1) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  Blynk.begin(auth, ssid, pass);
}

void loop() {
  Blynk.run(); // Handles all the magic
}

```

## Result & Analysis

### Result
Pressing a button on the Blynk smartphone app turns the physical LED on the breadboard ON and OFF instantly.

### Reason
The Blynk library maintains a persistent connection (or uses efficient polling) with the Blynk Cloud. When the app state changes, the Cloud pushes the new value to the ESP8266, triggering the BLYNK_WRITE callback.
