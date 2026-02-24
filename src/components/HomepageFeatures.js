import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Arduino UNO',
    Svg: require('../../static/img/2.svg').default,
    description: (
      <>
        A beginner-friendly development board based on the ATmega328P, ideal for learning electronics, programming, and rapid prototyping
      </>
    ),
  },
  {
    title: 'NodeMCU',
    Svg: require('../../static/img/1.svg').default,
    description: (
      <>
        A low-cost Wi-Fi-enabled ESP8266 development board, perfect for building IoT and wireless embedded applications
      </>
    ),
  },
  {
    title: 'Nucleo Board',
    Svg: require('../../static/img/Nucleo.svg').default,
    description: (
      <>
        An STM32 development board by STMicroelectronics, offering a flexible and affordable platform for embedded prototyping
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
