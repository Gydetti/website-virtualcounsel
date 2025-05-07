## Consolidated Research Brief: FAQ Page (Frequently Asked Questions)

**Overall Purpose:**

- Proactively address common client questions, concerns, and potential objections.
- Reduce friction in the decision-making process by providing quick answers.
- Build trust through transparency and demonstrated understanding of client needs.
- Save time by answering common queries upfront.
- Potentially improve SEO by targeting question-based search queries.

---

### 1. Base on Real Questions (`Content Strategy - Input Required from Client`)

- **Goal:** Ensure the FAQ is genuinely useful and relevant to potential clients.
- **Key Principles:** Relevance, practicality, client-centricity. Address _actual_ common queries.
- **AI TASK - Content Strategy & Generation:**
  - **Input:** Request list of frequently asked questions from the client (from sales calls, emails, onboarding). If unavailable, suggest standard topics for service businesses.
  - **Standard Topics:** Suggest/include questions related to:
    - Service delivery process (how it works).
    - Pricing, payment terms, contracts.
    - Scheduling, rescheduling, cancellations.
    - Expected results, guarantees (if any).
    - Specific methodologies used.
    - Onboarding process.
    - Differences from competitors.
    - Suitability ("Is this right for me if...?").
    - Logistics (e.g., virtual vs. in-person, tools used).

---

### 2. Clear Q&A Format (`Component: FAQAccordion` / `Component: FAQList`)

- **Goal:** Make information easy to scan and digest. Allow users to quickly find answers to specific questions.
- **Key Principles:** Scannability, usability, clarity.
- **AI TASK - Content Implementation & Structure:**
  - **Format:** Structure as a clear Question & Answer list.
  - **Question Phrasing:** Edit questions to be phrased naturally, as a client would ask them. Use clear, concise language. Make questions stand out (e.g., bold, larger font).
  - **Answer Presentation:** Provide the answer directly below the question.
  - **Interaction (Recommended):** Implement using an accordion/toggle style where questions are visible, and answers expand on click. This prevents overwhelming users with text. (If using accordion, consider expanding the first 1-2 questions by default).
  - **Alternative:** Simple Q: (bold) followed by A: (normal text) is acceptable for shorter FAQs.

---

### 3. Honest, Clear, and Concise Answers (`Content Generation/Editing`)

- **Goal:** Provide straightforward, easily understandable, and trustworthy answers. Set correct expectations.
- **Key Principles:** Honesty, transparency, clarity, conciseness. Avoid marketing jargon; focus on factual information.
- **AI TASK - Content Generation/Editing Guidance (For each answer):**
  - **Directness:** Ensure the answer directly addresses the question asked.
  - **Clarity:** Use plain language. Avoid ambiguity.
  - **Conciseness:** Provide sufficient detail but avoid unnecessary length. Link to other pages (e.g., Services) for more in-depth information if needed.
  - **Tone:** Maintain a helpful, reassuring, and professional tone.
  - **Policy Questions:** For questions about policies (refunds, cancellations, rescheduling), clearly state the actual policy. Transparency builds trust, even if the policy isn't universally loved.
    - _Research Example (Reschedule):_ "You can reschedule with 24 hours' notice, up to once per month without fee."

---

### 4. Address Objections and Fears (`Content Strategy & Answer Framing`)

- **Goal:** Proactively overcome common sales objections or client hesitations by addressing them in the FAQ.
- **Key Principles:** Objection handling, reassurance, building confidence.
- **AI TASK - Question Selection & Answer Framing:**
  - **Identify Objections:** Based on client input or common service business concerns, formulate questions addressing potential objections (cost, time commitment, uncertainty of results, comparison to others).
  - **Frame Answers:** Edit answers not just factually, but also to subtly overcome the objection or alleviate the fear.
    - _Research Example (Uncertainty):_ Q: "Not sure which service I need?" A: "...schedule a free discovery call to assess your needs. We'll recommend the best path, even if it's not with us." (Removes pressure, shows client focus).
    - _Research Example (Cost):_ Q: "Do you offer payment plans?" A: [State policy] OR Q: "Is the investment worth it?" A: [Briefly link investment to typical outcomes/value, reinforcing benefit].

---

### 5. Enhance Credibility within Answers (Optional) (`Answer Framing`)

- **Goal:** Subtly reinforce expertise or success while answering factually.
- **Key Principles:** Integrate proof points naturally. Avoid sounding overly salesy.
- **AI TASK - Answer Framing:**
  - Where appropriate, weave in brief mentions of experience or results into answers.
    - _Research Example:_ Q: "Worked with my industry?" A: "Yes, including [Industry A, B]. We helped a client in [Industry A] achieve [result]. Our core process adapts..."

---

### 6. Structured for Search Engines (Schema Markup) (`Technical Implementation`)

- **Goal:** Increase visibility by potentially appearing in Google's FAQ rich results.
- **Key Principles:** Use appropriate HTML and Schema.org markup for FAQs.
- **AI TASK - Technical Guidance/Implementation:**
  - Ensure the component structure uses appropriate HTML (e.g., `<dl>`, `<dt>`, `<dd>` or heading/paragraph structure).
  - Implement `FAQPage` schema markup (JSON-LD recommended) dynamically based on the Q&A content. This helps search engines recognize the content as an FAQ.

---

### 7. Keep FAQs Current (`Content Maintenance - Client Responsibility`)

- **Goal:** Ensure information remains accurate and reflects current services/policies.
- **Key Principles:** Accuracy, reliability. Outdated info erodes trust.
- **AI TASK - Documentation/Guidance:**
  - Note in documentation the need for the client to review and update the FAQ page periodically (e.g., annually or when services/policies change).
  - Prompt client to provide new FAQs as they arise.

---

### 8. Link to Contact / Further Help (`Component: FAQ_CTA`)

- **Goal:** Provide an outlet for unanswered questions and encourage contact if needed.
- **Key Principles:** Helpfulness, accessibility, ensuring no dead ends.
- **AI TASK - Content Implementation:**
  - **Concluding Text:** Add a sentence at the end of the FAQ list inviting users to reach out if their question wasn't answered.
    - _Research Example:_ "Have a question not answered here? Feel free to contact us – we’re happy to help."
  - **Link:** Include a clear link to the Contact page.
