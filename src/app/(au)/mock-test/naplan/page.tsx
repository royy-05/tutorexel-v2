import type { Metadata } from "next";
import NaplanMockTestView from "@/components/mock-test/NaplanMockTestView";
import "./mock-test.css";

export const metadata: Metadata = {
  title: "Free NAPLAN Mock Tests for Years 3, 5, 7 and 9 | TutorExel",
  description:
    "Practise free NAPLAN mock tests for Years 3, 5, 7 and 9. Review sample questions in Numeracy, Reading, Conventions and Writing with answers and explanations.",
  alternates: {
    canonical: "https://www.tutorexel.com/mock-test/naplan",
  },
  openGraph: {
    title: "Free NAPLAN Mock Tests for Years 3, 5, 7 and 9 | TutorExel",
    description:
      "Practise free NAPLAN mock tests for Years 3, 5, 7 and 9. Review sample questions in Numeracy, Reading, Conventions and Writing with answers and explanations.",
    url: "https://www.tutorexel.com/mock-test/naplan",
    siteName: "TutorExel",
    images: [
      {
        url: "https://www.tutorexel.com/images/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Free NAPLAN Mock Tests - TutorExel",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.tutorexel.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mock Test",
        item: "https://www.tutorexel.com/mock-test/naplan",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "NAPLAN Free Mock Tests",
        item: "https://www.tutorexel.com/mock-test/naplan",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are the NAPLAN mock tests really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Sign up, log in and every mock test is available at no cost. No credit card is needed.",
        },
      },
      {
        "@type": "Question",
        name: "Which year levels are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Years 3, 5, 7 and 9, each with Reading, Writing, Conventions and Numeracy.",
        },
      },
      {
        "@type": "Question",
        name: "How long are the Writing tasks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Year 3 Writing task is 40 minutes and handwritten. Years 5, 7 and 9 are 42 minutes: 5 minutes planning, 30 minutes writing and 7 minutes editing.",
        },
      },
      {
        "@type": "Question",
        name: "Are there audio questions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Spelling questions in Language Conventions have audio, so your child listens and chooses the correct spelling.",
        },
      },
      {
        "@type": "Question",
        name: "Do we need to enrol in a class?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The mock test is open to everyone. If your child needs help with weak areas, book a free assessment with our tutors.",
        },
      },
    ],
  },
];

export default function NaplanMockTestPage() {
  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <NaplanMockTestView />
    </>
  );
}

