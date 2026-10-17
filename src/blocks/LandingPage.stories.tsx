import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, Receipt, Users } from "lucide-react";
import { Hero } from "./Hero/Hero";
import { FeatureGrid } from "./FeatureGrid/FeatureGrid";
import { PricingTable } from "./Pricing/Pricing";
import { Testimonial } from "./Testimonial/Testimonial";
import { CTASection } from "./CTASection/CTASection";
import { Footer } from "./Footer/Footer";
import { Section, SectionHeading } from "./Section/Section";
import { Banner, BannerLink } from "../components/Banner/Banner";
import { Button } from "../components/Button/Button";
import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContainer,
  NavbarLink,
  NavbarNav,
} from "../components/Navbar/Navbar";

const meta = {
  title: "Blocks/Landing Page",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullPage: Story = {
  render: () => (
    <div>
      <Banner action={<BannerLink href="#">See what's new →</BannerLink>}>
        Studio 2.0 just launched.
      </Banner>
      <Navbar sticky>
        <NavbarContainer>
          <NavbarBrand href="#">Studio</NavbarBrand>
          <NavbarNav className="hidden md:flex">
            <NavbarLink href="#">Features</NavbarLink>
            <NavbarLink href="#">Pricing</NavbarLink>
          </NavbarNav>
          <NavbarActions>
            <Button size="sm">Start free</Button>
          </NavbarActions>
        </NavbarContainer>
      </Navbar>

      <Hero
        tone="yellow"
        title="Ship client work without the busywork."
        description="Invoices, proposals and project tracking in one loud, fast workspace."
        actions={
          <>
            <Button size="lg" variant="inverse">Start free trial</Button>
            <Button size="lg" variant="secondary">Book a demo</Button>
          </>
        }
        footnote="14-day trial. No credit card required."
      />

      <FeatureGrid
        eyebrow="Features"
        title="Everything a one-person studio needs"
        features={[
          { icon: <FileText />, title: "Proposals", description: "Templated proposals clients sign in one click." },
          { icon: <Receipt />, iconTone: "pink", title: "Invoicing", description: "Recurring invoices with automatic reminders." },
          { icon: <Users />, iconTone: "blue", title: "Client portal", description: "One link for files, updates and approvals." },
        ]}
      />

      <Section tone="blue" bordered>
        <SectionHeading title="Loved by tiny teams" />
        <div className="grid gap-6 md:grid-cols-2">
          <Testimonial rating={5} name="Maria Santos" role="Founder, Santos Studio" quote="We replaced three tools in a weekend." />
          <Testimonial tone="yellow" rating={5} name="Dev Patel" role="Freelance engineer" quote="Clients actually pay on time now." />
        </div>
      </Section>

      <PricingTable
        title="Simple pricing"
        plans={[
          { name: "Solo", price: "$12", period: "/month", features: ["3 clients", "Invoices"], cta: <Button variant="secondary" fullWidth>Start free</Button> },
          { name: "Studio", price: "$29", period: "/month", featured: true, features: ["Unlimited clients", "Client portal"], cta: <Button variant="inverse" fullWidth>Start trial</Button> },
        ]}
      />

      <CTASection
        tone="dark"
        title="Ready to stop chasing invoices?"
        actions={<Button size="lg">Start free trial</Button>}
      />

      <Footer
        brand="Studio"
        legal="© 2026 Studio Inc."
        columns={[
          { title: "Product", links: [{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }] },
          { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] },
        ]}
      />
    </div>
  ),
};
