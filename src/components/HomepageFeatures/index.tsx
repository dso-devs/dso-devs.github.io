import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Direct aan de slag',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
       Geen dikke handboeken of complexe opstarttrajecten op het DSO: dit portaal is ontworpen om jou als ontwikkelaar razendsnel op weg te helpen. Kies je API, kopieer de codevoorbeelden en ga snel aan de slag. Zo bouw je in no-time je eigen viewer, service of integratie!
      </>
    ),
  },
  {
    title: 'Focus op jouw oplossing',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
         Je zit niet te wachten op PDF&apos;s of eindeloze handleidingen. Daarom vind je hier alleen wat echt nodig is: snelle toegang tot specs, endpoints, code snippets en samenhang tussen de DSO API&apos;s &ndash; direct bruikbaar in jouw eigen stack
      </>
    ),
  },
  {
    title: 'Voor Developers, door Developers',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Dit portaal is open source, GitHub-first en gebouwd op React. Geen vendor lock-ins, geen marketing. Gewoon: technische documentatie in Markdown, pull requests welkom. Net als jij houden we niet van poespas &ndash; maar wel van clean code.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
