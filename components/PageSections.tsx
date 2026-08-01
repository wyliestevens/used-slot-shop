import { PageSection } from "@/lib/pages";

// Renders the `sections` array from a page JSON file: an optional <h2> heading,
// any number of <p> paragraphs, and an optional list of bullets (a numbered <ol>
// when `ordered` is set, otherwise a bulleted <ul>). Designed to sit inside a
// `.prose-slot` wrapper so it picks up the shared typography.
export default function PageSections({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        const hasBullets = section.bullets && section.bullets.length > 0;
        const List = section.ordered ? "ol" : "ul";
        return (
          <section key={i}>
            {section.heading ? <h2>{section.heading}</h2> : null}
            {(section.paragraphs ?? []).map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {hasBullets ? (
              <List>
                {section.bullets!.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </List>
            ) : null}
          </section>
        );
      })}
    </>
  );
}
