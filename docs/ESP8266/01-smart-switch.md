# Experiment 1: The Smart Switch (Input & Output)

## Short Description
In this experiment, you will build a basic circuit where an LED acts as an output and a push button acts as an input. You will write a program that constantly checks if the button is pressed.

## Expected Outcome
When you press and hold the button, the LED will light up. When you release the button, the LED turns off.

## Concept
We will read a digital signal from a button and write a digital signal to an LED.

## Wiring

### LED
Long leg (+) to GPIO 5 (Pin D1).  
Short leg (-) to GND.

### Button
One leg to GPIO 4 (Pin D2).  
Diagonal leg to GND.

## Circuit Diagram
<!-- Insert Circuit Diagram Image Here -->

## The Code

```cpp
// We use raw GPIO numbers directly.
// On NodeMCU: D1 = GPIO 5, D2 = GPIO 4

const int ledPin = 5;     
const int buttonPin = 4;  

void setup() {
  Serial.begin(9600);       // Start communication for debugging
  pinMode(ledPin, OUTPUT);  // Configure GPIO 5 to send voltage out
  
  // INPUT_PULLUP uses an internal 10k resistor to keep the pin at 3.3V (HIGH)
  // when the button is NOT pressed. This prevents "floating" signals.
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  // LOGIC INVERSION:
  // Since we connect the button to GND, pressing it makes the voltage 0 (LOW).
  if (buttonState == LOW) { 
    digitalWrite(ledPin, HIGH); // Turn LED ON
    Serial.println("Button Pressed - LED ON");
  } else {
    digitalWrite(ledPin, LOW);  // Turn LED OFF
  }
}
```

## Result & Analysis

### Result
The LED stays OFF normally. When you press the button, the LED turns ON. The Serial Monitor prints "Button Pressed - LED ON".

### Reason
The button is wired to Ground. When pressed, it completes the circuit to Ground, pulling GPIO 4 to 0V (LOW). The if statement detects this LOW state and sends 3.3V (HIGH) to GPIO 5, turning on the LED.

## Troubleshooting
LED always ON? You might have wired the button incorrectly. Ensure it connects GPIO 4 to GND when pressed.
