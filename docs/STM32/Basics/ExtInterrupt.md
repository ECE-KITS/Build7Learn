# Basics: External Interrupt
`Task: Toggle inbuilt 'LED' on 'USER BUTTON' press using Interrupt Callback`
### Step 1: Create a STM32 Project "InterruptButtonLED"

---

### Step 2: Configure GPIO Pins

<!-- [Docs](https://wiki.st.com/stm32mcu/wiki/STM32StepByStep:Step2_Blink_LED) -->

![Image](..\Images\ButtonLED\2.png)

- **PA5** as `GPIO_OUTPUT` (Inbuilt LED)
- **PC13** as `GPIO_EXTI13` (User Button)

(Already configured when initialized the pheripherals in default configuration)

#### GPIO Pin Details:
- **Inbuilt LED**: Port A, GPIO Pin 5
- **User Button**: Port C, GPIO Pin 13
---

### Step 3: Enable EXTI Line in NVIC Interrupt:

<!-- [Docs](https://wiki.st.com/stm32mcu/wiki/STM32StepByStep:Step2_Blink_LED) -->
**SystemCore-> GPIO-> NVIC-> EXTI Line->'Enable'**

![Image](..\Images\ButtonLED\3.png)

#### GPIO Pin Details:
- **Inbuilt LED**: Port A, GPIO Pin 5
- **User Button**: Port C, GPIO Pin 13
---

### Step 4: Code Snippet for Button Press and LED Toggling

Paste the following code snippet inside the `/* USER CODE BEGIN 0 */`:

```c
// Check if the user button (PC13) is pressed
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
}
```

- **Note**: The USER BUTTON is in PULL-UP Mode by default, so we use negative logic in 'IF condition'