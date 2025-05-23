export default function Section(props) {
  return (
    <section className="response-section">
      <h2>Chef Claude Recommends:</h2>
      <article className="suggested-recipe-container" aria-live="polite">
        {props.reccipe}
      </article>
    </section>
  );
}
