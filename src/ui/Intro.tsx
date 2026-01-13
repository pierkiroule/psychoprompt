import type { ReactElement } from "react";

type IntroProps = {
  onStart: () => void;
};

export function Intro({ onStart }: IntroProps): ReactElement {
  return (
    <section className="panel">
      <h1>Psychoprompt</h1>
      <p>
        Un carnet intime et projectif. Un espace symbolique pour déposer ce qui
        traverse et nourrir un inconscient archétypal vivant.
      </p>
      <p>Ce n&apos;est pas une app d&apos;IA. C&apos;est une médiation douce.</p>
      <button className="primary" type="button" onClick={onStart}>
        Commencer
      </button>
    </section>
  );
}
