# Advanced Smart Climate System

## Short Description
This is an advanced integration project. You will combine sensor reading (DHT11), actuator control (Servo), and MQTT communication. The system automates fan control based on room temperature.

## Expected Outcome
The system reports temperature to the MQTT broker every 5 seconds. If the temperature exceeds 30°C, the "Fan" (Servo) turns on automatically, and an alert is sent.

Read Temp. If > 30°C, turn on Fan (Servo) AND alert via MQTT.

## Wiring
1.	DHT Sensor -> GPIO 14 (Pin D5).
2.	Servo -> GPIO 12 (Pin D6).

## The Code
```cpp
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Servo.h>
#include "DHT.h"

// Configs
const char* ssid = "YOUR_WIFI";
const char* pass = "YOUR_PASS";
const char* mqtt_server = "broker.hivemq.com";

// Hardware Objects
Servo fanServo;
DHT dht(14, DHT11); // GPIO 14 (D5)
WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;

void setup() {
  Serial.begin(115200);
  pinMode(5, OUTPUT); // Status LED GPIO 5
  dht.begin();
  fanServo.attach(12); // GPIO 12 (D6)
  fanServo.write(0);   // Fan OFF
  
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    // Reconnect Logic
    if (client.connect("ESP-Climate-Bot")) {
      Serial.println("MQTT Connected");
    } else {
      delay(5000);
      return;
    }
  }
  client.loop();

  // Non-blocking timer: Run every 5 seconds
  long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;
    
    float t = dht.readTemperature();
    if (isnan(t)) return;

    // Publish Temperature
    String tempStr = String(t);
    client.publish("workshop/yourname/temp", tempStr.c_str());
    Serial.println("Temp: " + tempStr);

    // Automation Logic
    if (t > 30.0) {
      fanServo.write(180); // Fan ON
      digitalWrite(5, HIGH); // Alert LED ON
      client.publish("workshop/yourname/alert", "HOT");
    } else {
      fanServo.write(0); // Fan OFF
      digitalWrite(5, LOW);
      client.publish("workshop/yourname/alert", "NORMAL");
    }
  }
}
```

## Result & Analysis
### Result
Every 5 seconds, the temperature is sent to the Cloud. If you heat up the sensor (e.g., breathe on it) past 30°C, the Servo rotates (Fan ON) and the red LED lights up.
### Reason
The code combines three concepts: Sensor reading (DHT), Actuator control (Servo/LED), and Cloud Communication (MQTT). The logic runs locally on the loop but reports status globally.
