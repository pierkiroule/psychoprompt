import type { ReactElement } from "react";

type IntroProps = {
  onStart: () => void;
};

export function Intro({ onStart }: IntroProps): ReactElement {
  return (
    <section className="panel">
      <h1>Psychoprompt</h1>
      <p>
        Un espace projectif où un graphe symbolique se construit à partir de tes
        mots et de tes emojis.
      </p>
      <p>Ce n&apos;est pas une app d&apos;IA. C&apos;est une médiation douce et locale.</p>
      <button className="primary" type="button" onClick={onStart}>
        Commencer
      </button>
    </section>
  );
}
