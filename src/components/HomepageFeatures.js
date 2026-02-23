import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Arduino UNO',
    Svg: require('../../static/img/2.svg').default,
    description: (
      <>
        The Arduino Uno is a beginner-friendly development board based on the ATmega328P microcontroller. Designed by Arduino, it offers an easy-to-use platform for learning electronics, programming, and rapid prototyping of embedded systems and IoT applications.
      </>
    ),
  },
  {
    title: 'NodeMCU',
    Svg: require('../../static/img/1.svg').default,
    description: (
      <>
        The ESP8266 is a low-cost Wi-Fi-enabled microcontroller developed by Espressif Systems. It provides a powerful and compact platform for building IoT devices, enabling wireless communication, cloud connectivity, and standalone embedded applications.
      </>
    ),
  },
  {
    title: 'Nucleo Board',
    Svg: require('../../static/img/Nucleo.svg').default,
    description: (
      <>
        A Nucleo Board is a development board designed by STMicroelectronics for STM32 microcontrollers. It provides a cost-effective, flexible, and easy-to-use platform for prototyping and development with STM32 MCUs
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
