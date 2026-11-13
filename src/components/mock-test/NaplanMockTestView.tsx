"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  QD,
  QW,
  PAS,
  TOT,
  SUB,
  type QuestionItem,
} from "@/data/naplanMockTests";
import { FREE_ASSESSMENT_URL, LOGIN_URL } from "@/utils/externalLinks";

const DOMAINS = ["Numeracy", "Reading", "Conventions", "Writing"] as const;
type DomainType = (typeof DOMAINS)[number];

const YEARS = ["3", "5", "7", "9"] as const;
type YearType = (typeof YEARS)[number];

const OPTION_LABELS = ["A", "B", "C", "D"];

function splitStem(st: string): [string, string] {
  const m = st.match(/^(.*?\?)\s*(\u201c.*)$/);
  return m ? [m[1], m[2]] : [st, ""];
}

export default function NaplanMockTestView() {
  const [dom, setDom] = useState<DomainType>("Numeracy");
  const [yr, setYr] = useState<YearType>("3");
  const [answersVisible, setAnswersVisible] = useState<Record<number, boolean>>({});
  const [passagesVisible, setPassagesVisible] = useState<Record<number, boolean>>({});

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalYear, setModalYear] = useState<string>("Year 3");
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    year?: string;
    form?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync year tab to modal year default
  useEffect(() => {
    setModalYear(`Year ${yr}`);
  }, [yr]);

  // Reset toggles when domain or year changes
  useEffect(() => {
    setAnswersVisible({});
    setPassagesVisible({});
  }, [dom, yr]);

  // Modal ESC key listener
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const openModal = (targetYear?: string) => {
    setModalYear(targetYear || `Year ${yr}`);
    setErrors({});
    setSubmitted(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleAnswer = (n: number) => {
    setAnswersVisible((prev) => ({ ...prev, [n]: !prev[n] }));
  };

  const togglePassage = (n: number) => {
    setPassagesVisible((prev) => ({ ...prev, [n]: !prev[n] }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!parentName.trim() || parentName.trim().length < 2) {
      newErrors.name = "Please enter your name.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email.";
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!modalYear) {
      newErrors.year = "Please choose a year level.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/free-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: parentName.trim(),
          studentName: parentName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          yearLevel: modalYear,
          subject: "NAPLAN Mock Test",
          region: "au",
          website: honeypot,
          source: "NAPLAN Free Mock Test",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors({ form: msg });
    } finally {
      setSubmitting(false);
    }
  };

  // Active question data
  const currentQuestions: QuestionItem[] = dom !== "Writing" && QD[dom] ? QD[dom][yr] || [] : [];
  const openQuestions = currentQuestions.slice(0, 3);
  const lockedQuestions = currentQuestions.slice(3);
  const currentWriting = QW[yr];

  const yearTrackLeft = `${YEARS.indexOf(yr) * 25}%`;

  return (
    <div className="mt-page">
      <main id="top">
        {/* 1. Hero Section */}
        <section className="mt-hero">
          <div className="mt-wrap mt-hgrid">
            <div>
              <nav className="mt-crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/mock-test/naplan">Mock Test</Link>
                <span>/</span>
                <b>NAPLAN Free Mock Tests</b>
              </nav>

              <span className="mt-pill">
                <i />
                Years 3, 5, 7 and 9
              </span>

              <h1>
                Free <span className="mt-grad">NAPLAN Mock Tests</span> for Years 3, 5, 7 and 9
              </h1>

              <p className="mt-lead">
                Practise Reading, Writing, Conventions and Numeracy the way test day works. Sign up free, log in and every mock test is yours. No credit card needed.
              </p>

              <div className="mt-hero-actions">
                <button
                  className="mt-btn mt-btn-primary"
                  type="button"
                  onClick={() => openModal()}
                >
                  Claim Your Free Mock Test
                </button>
                <Link className="mt-btn mt-btn-secondary" href="/exam-prep/naplan">
                  View NAPLAN Prep
                </Link>
              </div>
            </div>

            <aside className="mt-glance" aria-label="Free mock tests at a glance">
              <div className="mt-lab">Free Mock Tests at a Glance</div>
              <div className="mt-grow">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="8" width="18" height="12" rx="2" />
                    <path d="M12 8v12M3 13h18M12 8c-2-4-6-3-5 0M12 8c2-4 6-3 5 0" />
                  </svg>
                </div>
                <div>
                  <small>Cost</small>
                  <span>Free. Sign up and log in to unlock it</span>
                </div>
              </div>

              <div className="mt-grow">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 4h6l1 2h3v14H5V6h3z" />
                    <path d="M9 13l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <small>Year levels</small>
                  <span>Mock tests for Years 3, 5, 7 and 9</span>
                </div>
              </div>

              <div className="mt-grow">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="13" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                <div>
                  <small>Format</small>
                  <span>Online, with audio for the spelling questions</span>
                </div>
              </div>

              <div className="mt-grow">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h7v14H4zM13 5h7v14h-7z" />
                  </svg>
                </div>
                <div>
                  <small>Domains</small>
                  <span>Reading, Writing, Conventions, Numeracy</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* 2. Four Domains Section */}
        <section className="mt-sec" id="inside">
          <div className="mt-wrap">
            <div className="mt-eb">What is inside</div>
            <h2>The NAPLAN Tests You Can Practise</h2>
            <p className="mt-sub">Four domains for every year level, laid out like the real thing.</p>

            <div className="mt-c4">
              <article className="mt-dc">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z" />
                    <path d="M12 6v13" />
                  </svg>
                </div>
                <h3>Reading</h3>
                <div className="mt-cnt">39 to 48 questions</div>
                <ul>
                  <li>Passages with questions on what the writer means</li>
                  <li>Texts get longer and harder by year</li>
                </ul>
                <div className="mt-how2">
                  <b>What&apos;s inside</b>
                  <p>Read each text, then answer multiple choice questions about it.</p>
                </div>
              </article>

              <article className="mt-dc">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 20l1-4L16 5l3 3L8 19z" />
                    <path d="M14 7l3 3" />
                  </svg>
                </div>
                <h3>Writing</h3>
                <div className="mt-cnt">1 task per year</div>
                <ul>
                  <li>Narrative in Years 3 and 7, persuasive in Years 5 and 9</li>
                  <li>Year 3 is 40 minutes, handwritten</li>
                </ul>
                <div className="mt-how2">
                  <b>What&apos;s inside</b>
                  <p>A prompt with planning notes and a remember to checklist.</p>
                </div>
              </article>

              <article className="mt-dc">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 18l5-13 5 13M7 13h6" />
                    <path d="M17 8h4M19 6v4" />
                  </svg>
                </div>
                <h3>Language Conventions</h3>
                <div className="mt-cnt">52 questions</div>
                <ul>
                  <li>Spelling, with audio questions</li>
                  <li>Grammar and Punctuation</li>
                </ul>
                <div className="mt-how2">
                  <b>What&apos;s inside</b>
                  <p>Listen, spot the error and choose the correct answer.</p>
                </div>
              </article>

              <article className="mt-dc">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="2" />
                    <path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2" />
                  </svg>
                </div>
                <h3>Numeracy</h3>
                <div className="mt-cnt">36 to 48 questions</div>
                <ul>
                  <li>Number, algebra, measurement, geometry and data</li>
                  <li>Some questions use pictures</li>
                </ul>
                <div className="mt-how2">
                  <b>What&apos;s inside</b>
                  <p>Work out each problem and choose from four answers.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Interactive Tests Table Section */}
        <section className="mt-tests" id="tests">
          <div className="mt-wrap">
            <div className="mt-eyebrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
              </svg>
              4 domains. 4 year levels. All free to unlock.
            </div>

            <h2 className="mt-h2">NAPLAN Mock Tests, Year by Year</h2>

            {/* Domain Tabs */}
            <div className="mt-seg" role="tablist" aria-label="Domain">
              {DOMAINS.map((d) => (
                <button
                  key={d}
                  role="tab"
                  aria-selected={dom === d}
                  onClick={() => setDom(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Year Tabs */}
            <div className="mt-years">
              <div className="mt-ytabs" role="tablist" aria-label="Year level">
                {YEARS.map((y) => (
                  <button
                    key={y}
                    role="tab"
                    aria-selected={yr === y}
                    onClick={() => setYr(y)}
                  >
                    Year {y}
                  </button>
                ))}
              </div>
              <div className="mt-track">
                <i style={{ left: yearTrackLeft }} />
              </div>
            </div>

            {/* Dynamic Caption */}
            <p className="mt-cap">
              {dom === "Writing" ? (
                <>
                  Free preview of the <b>Year {yr} Writing</b> mock test. {currentWriting.g} task, {currentWriting.t.replace(/ \(handwritten\)/, "")}.
                </>
              ) : (
                <>
                  Free preview of the <b>Year {yr} {dom}</b> mock test. {TOT[dom]?.[yr]} questions covering {SUB[dom]}.
                </>
              )}
            </p>

            {/* Table */}
            <div className="mt-card-t">
              <table>
                <colgroup>
                  <col className="mt-c-no" />
                  <col className="mt-c-tp" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>{dom === "Writing" ? "Writing Task" : "Question"}</th>
                    <th>{dom === "Writing" ? "Plan Your Writing" : "Answer Options"}</th>
                  </tr>
                </thead>

                {/* Open rows */}
                <tbody>
                  {dom === "Writing" ? (
                    <tr className="mt-light">
                      <td>01</td>
                      <td>
                        <div className="mt-wt">
                          <span className="mt-meta">
                            <span className="mt-aud mt-pt">{currentWriting.g} writing task</span>
                            <span className="mt-aud">{currentWriting.t}</span>
                          </span>
                          {currentWriting.b.map((paragraph, idx) => {
                            if (/:$/.test(paragraph)) {
                              return (
                                <p key={idx} className="mt-lb">
                                  {paragraph}
                                </p>
                              );
                            }
                            if (idx > 0 && /:$/.test(currentWriting.b[idx - 1])) {
                              return (
                                <p key={idx} className="mt-ti">
                                  {paragraph}
                                </p>
                              );
                            }
                            return <p key={idx}>{paragraph}</p>;
                          })}
                          {currentWriting.i && (
                            <Image
                              src={currentWriting.i}
                              alt="Writing prompt stimulus illustration"
                              width={400}
                              height={300}
                              style={{ width: "100%", height: "auto" }}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="mt-th">
                          <h4>Think about</h4>
                          <ul>
                            {currentWriting.th.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                          <h4>Remember to</h4>
                          <ul className="mt-ck">
                            {currentWriting.r.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    openQuestions.map((q, idx) => {
                      const [stemQuestion, stemQuote] = splitStem(q.s);
                      const isEven = idx % 2 === 0;
                      const hasPassage = q.t && PAS[yr] && PAS[yr][q.t];
                      const isPassageOpen = passagesVisible[q.n];
                      const isAnswerOpen = answersVisible[q.n];

                      return (
                        <tr key={q.n} className={isEven ? "mt-light" : "mt-white"}>
                          <td>{q.n < 10 ? `0${q.n}` : q.n}</td>
                          <td>
                            <div className="mt-qs">
                              {q.t && (
                                <>
                                  <span className="mt-aud mt-pt">Passage: {q.t}</span>
                                  <br />
                                </>
                              )}
                              {q.a && (
                                <>
                                  <span className="mt-aud">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M4 9v6h4l5 4V5L8 9z" />
                                      <path d="M16.5 8.5a5 5 0 010 7" />
                                    </svg>
                                    Audio question
                                  </span>
                                  <br />
                                </>
                              )}
                              {stemQuestion}
                              {stemQuote && <q>{stemQuote}</q>}
                            </div>

                            {hasPassage && (
                              <>
                                <button
                                  className="mt-sa"
                                  type="button"
                                  onClick={() => togglePassage(q.n)}
                                >
                                  {isPassageOpen ? "Hide the passage" : "Read the passage"}
                                </button>
                                {isPassageOpen && (
                                  <div className="mt-pas">
                                    <b>{q.t}</b>
                                    {PAS[yr][q.t!]
                                      .split(/\n\n/)
                                      .filter((p, i) => !(i === 0 && p.trim() === q.t))
                                      .map((para, pIdx) => (
                                        <p key={pIdx}>{para}</p>
                                      ))}
                                  </div>
                                )}
                              </>
                            )}
                          </td>
                          <td>
                            <div className="mt-opts">
                              {q.o.map((opt, oIdx) => {
                                const isCorrect = isAnswerOpen && oIdx === q.k;
                                return (
                                  <span key={oIdx} className={isCorrect ? "mt-ok" : ""}>
                                    <b>{OPTION_LABELS[oIdx]})</b> {opt}
                                  </span>
                                );
                              })}
                            </div>
                            <button
                              className="mt-sa"
                              type="button"
                              onClick={() => toggleAnswer(q.n)}
                            >
                              {isAnswerOpen ? "Hide answer" : "Show answer"}
                            </button>
                            {isAnswerOpen && (
                              <div className="mt-exp">
                                <b>
                                  Correct answer: {OPTION_LABELS[q.k]}) {q.o[q.k]}.
                                </b>{" "}
                                {q.e}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              {/* Locked rows with gate overlay */}
              <div className="mt-lockwrap">
                <table>
                  <colgroup>
                    <col className="mt-c-no" />
                    <col className="mt-c-tp" />
                    <col />
                  </colgroup>
                  <tbody>
                    {dom === "Writing" ? (
                      <>
                        <tr className="mt-white">
                          <td>02</td>
                          <td>
                            <div className="mt-wt">
                              <p className="mt-lb">Planning</p>
                              <p>Use this space to plan your {currentWriting.g === "Narrative" ? "story" : "writing"}. Your planning will not be marked.</p>
                            </div>
                          </td>
                          <td>
                            <div className="mt-rule" />
                          </td>
                        </tr>
                        <tr className="mt-light">
                          <td>03</td>
                          <td>
                            <div className="mt-wt">
                              <p className="mt-lb">Writing</p>
                              <p>Write your {currentWriting.g === "Narrative" ? "story" : "persuasive text"} here. Write on every line.</p>
                            </div>
                          </td>
                          <td>
                            <div className="mt-rule" />
                          </td>
                        </tr>
                        <tr className="mt-white">
                          <td>04</td>
                          <td>
                            <div className="mt-wt">
                              <p className="mt-lb">Writing (continued)</p>
                              <p>Keep writing on every line.</p>
                            </div>
                          </td>
                          <td>
                            <div className="mt-rule" />
                          </td>
                        </tr>
                      </>
                    ) : (
                      lockedQuestions.map((q, idx) => {
                        const [stemQuestion, stemQuote] = splitStem(q.s);
                        const isEven = idx % 2 === 0;
                        return (
                          <tr key={q.n} className={isEven ? "mt-light" : "mt-white"}>
                            <td>{q.n < 10 ? `0${q.n}` : q.n}</td>
                            <td>
                              <div className="mt-qs">
                                {stemQuestion}
                                {stemQuote && <q>{stemQuote}</q>}
                              </div>
                            </td>
                            <td>
                              <div className="mt-opts">
                                {q.o.map((opt, oIdx) => (
                                  <span key={oIdx}>
                                    <b>{OPTION_LABELS[oIdx]})</b> {opt}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>

                {/* Gate overlay */}
                <div className="mt-gate">
                  <div className="mt-ic">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="10" width="16" height="11" rx="3" />
                      <path d="M8 10V7a4 4 0 018 0v3" />
                    </svg>
                  </div>
                  <h3>
                    Sign Up Free to Unlock the Full Year {yr} {dom} Mock Test
                  </h3>
                  <p>
                    See the full test in action. Your child&apos;s mock test is completely free, no credit card needed.
                  </p>
                  <button
                    className="mt-btn mt-btn-primary"
                    type="button"
                    onClick={() => openModal()}
                  >
                    Claim Your Free Mock Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works Section */}
        <section className="mt-sec" id="how">
          <div className="mt-wrap mt-hw">
            <div>
              <div className="mt-eb">How it works</div>
              <h2>Start in 3 Simple Steps</h2>
              <p className="mt-sub">Same easy process as our Free Assessment Test.</p>
              <button
                className="mt-btn mt-btn-primary"
                type="button"
                onClick={() => openModal()}
              >
                Claim Your Free Mock Test
              </button>
            </div>
            <div className="mt-tint">
              <div className="mt-tc mt-t1">
                <h3>
                  <em>01</em>Claim your free test
                </h3>
                <p>Fill in the short form with your details and your child&apos;s year level.</p>
              </div>
              <div className="mt-tc mt-t2">
                <h3>
                  <em>02</em>Sign up and log in
                </h3>
                <p>Create your free account. Every year level is unlocked for you.</p>
              </div>
              <div className="mt-tc mt-t3">
                <h3>
                  <em>03</em>Practise at your own pace
                </h3>
                <p>Pick a year level, then work through Reading, Writing, Conventions and Numeracy one domain at a time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. What to Do Next Section */}
        <section className="mt-sec" id="years">
          <div className="mt-wrap">
            <div className="mt-eb">Keep exploring</div>
            <h2>What to Do Next</h2>
            <p className="mt-sub">Use the mock test results to plan your child&apos;s practice.</p>

            <div className="mt-c3">
              <Link className="mt-oc" href="/exam-prep/naplan">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z" />
                  </svg>
                </div>
                <h3>NAPLAN Preparation</h3>
                <p>See how our live tutors prepare students for NAPLAN.</p>
                <span className="mt-go">
                  View program{" "}
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 10h13M11 5l5 5-5 5" />
                  </svg>
                </span>
              </Link>

              <Link className="mt-oc" href="/free-assessment">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 4h6l1 2h3v14H5V6h3z" />
                    <path d="M9 13l2 2 4-4" />
                  </svg>
                </div>
                <h3>Free Assessment Test</h3>
                <p>Find your child&apos;s level and see strengths and gaps.</p>
                <span className="mt-go">
                  Take the test{" "}
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 10h13M11 5l5 5-5 5" />
                  </svg>
                </span>
              </Link>

              <Link className="mt-oc" href="/exam-prep">
                <div className="mt-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 9h18" />
                  </svg>
                </div>
                <h3>All Exam Prep</h3>
                <p>ICAS, OC Test, Selective and Scholarship preparation.</p>
                <span className="mt-go">
                  Explore{" "}
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 10h13M11 5l5 5-5 5" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="mt-sec" id="faq">
          <div className="mt-wrap mt-fq">
            <div className="mt-stk">
              <div className="mt-eb">FAQ</div>
              <h2>Mock Test Questions</h2>
              <p className="mt-sub" style={{ marginBottom: "24px" }}>
                Still unsure? Message us and we will help.
              </p>
              <a
                className="mt-wab"
                href="https://wa.me/61469833028?text=Hi%20TutorExel,%20I%20have%20a%20question%20about%20NAPLAN%20mock%20tests"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.6.3.1.2.1.8-.2 1.4z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-fqs">
              <details open>
                <summary>Are the NAPLAN mock tests really free?</summary>
                <p>Yes. Sign up, log in and every mock test is available at no cost. No credit card is needed.</p>
              </details>

              <details>
                <summary>Which year levels are available?</summary>
                <p>Years 3, 5, 7 and 9, each with Reading, Writing, Conventions and Numeracy.</p>
              </details>

              <details>
                <summary>How long are the Writing tasks?</summary>
                <p>The Year 3 Writing task is 40 minutes and handwritten. Years 5, 7 and 9 are 42 minutes: 5 minutes planning, 30 minutes writing and 7 minutes editing.</p>
              </details>

              <details>
                <summary>Are there audio questions?</summary>
                <p>Yes. The Spelling questions in Language Conventions have audio, so your child listens and chooses the correct spelling.</p>
              </details>

              <details>
                <summary>Do we need to enrol in a class?</summary>
                <p>No. The mock test is open to everyone. If your child needs help with weak areas, book a free assessment with our tutors.</p>
              </details>
            </div>
          </div>
        </section>

        {/* 7. Split CTA Section */}
        <section className="mt-sec" id="cta">
          <div className="mt-wrap">
            <div className="mt-split">
              <div className="mt-sp-l">
                <div aria-hidden="true" className="mt-fa-art">
                  <svg className="mt-fa-spark" viewBox="0 0 24 24">
                    <path
                      d="M12 0l2.2 8.3L22 5.6l-5.3 6.4L24 16l-8.6-.6L12 24l-3.4-8.6L0 16l7.3-4L2 5.6l7.8 2.7Z"
                      fill="#F7A23B"
                    />
                  </svg>
                  <div className="mt-fa-stat mt-fa-stat--1">
                    <b>100%</b>
                    <span>Aligned to the Australian Curriculum</span>
                  </div>
                  <div className="mt-fa-stat mt-fa-stat--2">
                    <b>15+ years</b>
                    <span>Combined teaching experience</span>
                  </div>
                  <div className="mt-fa-stat mt-fa-stat--3">
                    <b>1:1 or small group</b>
                    <span>Live online classes</span>
                  </div>
                </div>
                <Image
                  src="/images/cta/lady_image.webp"
                  alt="Happy student learning online"
                  width={560}
                  height={560}
                  className="mt-final-lady"
                />
              </div>

              <div className="mt-sp-r">
                <h2>Ready to See Your Child Excel?</h2>
                <p>Start with a free mock test, then book your FREE trial class. No credit card required.</p>
                <div className="mt-row">
                  <button
                    className="mt-btn mt-btn-primary"
                    type="button"
                    onClick={() => openModal()}
                  >
                    Claim Your Free Mock Test
                  </button>
                  <a className="mt-tel" href="tel:+61469833028">
                    <i>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                        <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.6.3.1.2.1.8-.2 1.4z" />
                      </svg>
                    </i>
                    +61 469 833 028
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Popup Modal */}
      {modalOpen && (
        <div
          className="mt-ov"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="mt-modal">
            <button
              className="mt-modal-close"
              type="button"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>

            {!submitted ? (
              <div>
                <div className="mt-modal-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 4h6l1 2h3v14H5V6h3z" />
                    <path d="M9 13l2 2 4-4" />
                  </svg>
                </div>
                <h2 id="modal-title">Claim Your Free NAPLAN Mock Tests</h2>
                <p className="mt-modal-sub">
                  Tell us a little about your child and we will unlock all mock tests for Years 3, 5, 7 and 9.
                </p>

                <form className="mt-form" onSubmit={handleFormSubmit} noValidate>
                  {/* Honeypot field for anti-bot protection */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <label htmlFor="f-name">
                    Parent or student name
                    <input
                      id="f-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      aria-invalid={!!errors.name}
                      required
                    />
                    {errors.name && <span className="mt-err">{errors.name}</span>}
                  </label>

                  <label htmlFor="f-email">
                    Email address
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                      required
                    />
                    {errors.email && <span className="mt-err">{errors.email}</span>}
                  </label>

                  <div className="mt-row2">
                    <label htmlFor="f-phone">
                      Mobile number
                      <input
                        id="f-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="04xx xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-invalid={!!errors.phone}
                        required
                      />
                      {errors.phone && <span className="mt-err">{errors.phone}</span>}
                    </label>

                    <label htmlFor="f-year">
                      Year level
                      <select
                        id="f-year"
                        name="year"
                        value={modalYear}
                        onChange={(e) => setModalYear(e.target.value)}
                        aria-invalid={!!errors.year}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Year 3">Year 3</option>
                        <option value="Year 5">Year 5</option>
                        <option value="Year 7">Year 7</option>
                        <option value="Year 9">Year 9</option>
                      </select>
                      {errors.year && <span className="mt-err">{errors.year}</span>}
                    </label>
                  </div>

                  {errors.form && <span className="mt-err">{errors.form}</span>}

                  <button
                    className="mt-btn mt-btn-primary"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Unlocking..." : "Unlock Free Mock Tests"}
                  </button>

                  <p className="mt-fine">
                    Free. No credit card needed. We never share your details.
                  </p>
                </form>
              </div>
            ) : (
              <div className="mt-done">
                <div className="mt-modal-icon mt-modal-icon-success">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </div>
                <h2>You Are All Set!</h2>
                <p>
                  Next, create your free account and log in. Your NAPLAN mock tests will be waiting for you.
                </p>
                <a
                  className="mt-btn mt-btn-primary"
                  href={FREE_ASSESSMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%", marginBottom: "14px" }}
                >
                  Go to Sign Up
                </a>
                <div>
                  <a
                    href={LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "14px", color: "var(--primary)", textDecoration: "underline" }}
                  >
                    Already have an account? Log in
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
