
---
id: wifi-scanner
title: Experiment 3 - WiFi Scanner
sidebar_position: 3
---

# Experiment 3: WiFi Scanner

## Short Description
This experiment demonstrates the wireless capabilities of the chip. You will write code to command the ESP8266 to search the airwaves for available 2.4GHz WiFi networks.

## Expected Outcome
The Serial Monitor will constantly update with a list of WiFi names (SSIDs) and their signal strengths (RSSI) available in your room.

## Concept
The ESP8266 has a 2.4GHz Radio. Let's see what it hears.

## The Code

```cpp
#include "ESP8266WiFi.h"

void setup() {
  Serial.begin(115200);
  
  // Set mode to STATION (like a phone connecting to router)
  WiFi.mode(WIFI_STA);
  WiFi.disconnect(); // Good practice to clear old configs
  delay(100);
}

void loop() {
  Serial.println("Scanning for networks...");
  int n = WiFi.scanNetworks();
  
  if (n == 0) {
    Serial.println("No networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found:");
    for (int i = 0; i < n; ++i) {
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.println(" dBm)");
      delay(10);
    }
  }
  delay(5000);
}
```
