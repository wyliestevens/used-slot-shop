import { PageSection } from "@/lib/pages";

// Renders the `sections` array from a page JSON file: an optional <h2> heading,
// any number of <p> paragraphs, and an optional <ul> of bullets. Designed to
// sit inside a `.prose-slot` wrapper so it picks up the shared typography.
export default function PageSections({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <section key={i}>
          {section.heading ? <h2>{section.heading}</h2> : null}
          {(section.paragraphs ?? []).map((p, j) => (
            <p key={j}>{p}</p>
          ))}
          {section.bullets && section.bullets.length > 0 ? (
            <ul>
              {section.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </>
  );
}
