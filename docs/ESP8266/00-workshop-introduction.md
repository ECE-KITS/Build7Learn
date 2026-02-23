
---
id: workshop-introduction
title: 5-Day ESP8266 (NodeMCU) Workshop: Zero to IoT Hero
sidebar_position: 0
---

# 5-Day ESP8266 (NodeMCU) Workshop: Zero to IoT Hero

## Workshop Overview

### Objective
To take students from "What is a microcontroller?" to "I just controlled my fan from the other side of the world."

### Target Audience
B.Tech Students & Beginners.

### Prerequisite
A laptop and curiosity.

## Hardware Checklist (Per Team)

- NodeMCU ESP8266 (V3 Lolin/Amica): The main controller.
- Micro USB Cable: CRITICAL: Must be a Data Sync cable. Many cheap cables are "Charge Only" and will not work.
- Breadboard: For connecting components without soldering.
- Jumper Wires: Male-to-Male (M-M) and Male-to-Female (M-F).
- LEDs: Red & Green.
- Push Button: Tactile switch.
- IR Proximity Sensor: For obstacle detection.
- DHT11 Sensor: For Temperature & Humidity.
- SG90 Servo Motor: For mechanical movement.

# GETTING STARTED: The Setup Phase (Do this before Day 1)

## Technical Context
The ESP8266 uses a UART-to-USB bridge chip to talk to your PC. If you don't install the driver, your computer sees it as "Unknown Device".

## Step 1: Install Arduino IDE
Download and install Arduino IDE 2.x (modern) or 1.8.19 (classic/stable) from arduino.cc.

## Step 2: Install CP210x Drivers (The Bridge)
Plug the NodeMCU into your laptop.  
Download and install the CP210x Driver from Silicon Labs.  
Verify: Open Device Manager (Windows) -> Ports (COM & LPT). You should see "Silicon Labs CP210x USB to UART Bridge" on a COM port (e.g., COM3).

## Step 3: Install ESP8266 Board Package
Open Arduino IDE.  
Go to File > Preferences.  
In "Additional Boards Manager URLs", paste:

http://arduino.esp8266.com/stable/package_esp8266com_index.json

Go to Tools > Board > Boards Manager.  
Search esp8266 and click Install (by ESP8266 Community).

## Step 4: Final Config
Board: Tools > Board > ESP8266 Boards > NodeMCU 1.0 (ESP-12E Module).  
Port: Tools > Port > Select your COM port.  
Upload Speed: 115200.
