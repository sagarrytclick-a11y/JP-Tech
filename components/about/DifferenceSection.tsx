import DiamondLattice from "@/components/site/DiamondLattice";

const items = [
  <>Product-first mindset</>,
  <>
    Transparent pricing &amp;
    <br />
    clear timelines
  </>,
  <>
    Experience across
    <br />
    startups &amp; enterprises
  </>,
  <>
    Strong system
    <br />
    architecture &amp;
    <br />
    scalability focus
  </>,
  <>
    Founder-led
    <br />
    involvement
  </>,
  <>
    Long-term
    <br />
    partnership approach
  </>,
];

export default function DifferenceSection() {
  return (
    <section id="difference" className="shell overflow-x-clip py-12 lg:py-16">
      <div className="text-center">
        <span className="section-badge">Why JP Technology</span>
        <h2 className="section-heading mx-auto mt-5 max-w-[1100px] text-balance">
          What Makes <span className="text-accent">JP Technology Different</span>
        </h2>
        <p className="section-copy mt-4">
          Strategy, scalability, and execution aligned to your business goals.
        </p>
      </div>

      <DiamondLattice items={items} />
    </section>
  );
}
