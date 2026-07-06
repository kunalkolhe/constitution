export const SCENARIOS = [
  {
    id: 1,
    context: "You are peacefully protesting against a new local law in a public square. You have no weapons, and the protest is silent. However, the police approach and order you to disperse immediately without citing any valid security reason.",
    question: "Which Fundamental Right protects your action?",
    options: [
      { text: "Article 21: Right to Life and Liberty", isCorrect: false },
      { text: "Article 19: Freedom of Speech & Peaceful Assembly", isCorrect: true },
      { text: "Article 14: Equality before Law", isCorrect: false },
      { text: "Article 25: Freedom of Religion", isCorrect: false }
    ],
    explanation: "Under Article 19(1)(b) of the Indian Constitution, all citizens have the fundamental right to assemble peacefully and without arms. As long as your protest is peaceful, unarmed, and doesn't violate public order, you cannot be arbitrarily dispersed."
  },
  {
    id: 2,
    context: "You are on a road trip and stop at a hotel to book a room. The manager looks at your ID and refuses to give you a room, explicitly stating that they do not serve people from your specific caste or religion.",
    question: "Which Article strictly prohibits this behavior?",
    options: [
      { text: "Article 15: Prohibition of Discrimination", isCorrect: true },
      { text: "Article 17: Abolition of Untouchability", isCorrect: false },
      { text: "Article 21: Right to Privacy", isCorrect: false },
      { text: "Article 19: Freedom to Reside anywhere", isCorrect: false }
    ],
    explanation: "Article 15(2) explicitly states that no citizen shall be subject to any disability, liability, or restriction with regard to accessing shops, public restaurants, hotels, and places of public entertainment solely on the basis of religion, race, caste, sex, or place of birth."
  },
  {
    id: 3,
    context: "A factory owner in your town is employing children who are 12 years old to work in hazardous conditions near heavy machinery.",
    question: "Which Constitutional Right is being violated here?",
    options: [
      { text: "Article 14: Right to Equality", isCorrect: false },
      { text: "Article 21A: Right to Education", isCorrect: false },
      { text: "Article 24: Prohibition of Child Labor", isCorrect: true },
      { text: "Article 23: Prohibition of Human Trafficking", isCorrect: false }
    ],
    explanation: "Article 24 categorically prohibits the employment of children below the age of 14 years in any factory, mine, or other hazardous employment, protecting their right to a safe childhood."
  },
  {
    id: 4,
    context: "The police knock on your door and arrest you without a warrant. They lock you in a cell and refuse to tell you why you have been arrested, denying you a phone call to a lawyer.",
    question: "Which Article protects you from this arbitrary detention?",
    options: [
      { text: "Article 20: Protection in respect of conviction", isCorrect: false },
      { text: "Article 22: Protection against arrest and detention", isCorrect: true },
      { text: "Article 32: Constitutional Remedies", isCorrect: false },
      { text: "Article 14: Equality before law", isCorrect: false }
    ],
    explanation: "Article 22 grants you the right to be informed of the grounds of arrest as soon as possible, the right to consult and be defended by a legal practitioner, and the right to be produced before a magistrate within 24 hours of arrest."
  },
  {
    id: 5,
    context: "Your fundamental rights have been blatantly violated by a state authority. The local courts are taking years to process your case, and you need immediate constitutional relief.",
    question: "What powerful right allows you to directly approach the Supreme Court?",
    options: [
      { text: "Article 226: Power of High Courts", isCorrect: false },
      { text: "Article 32: Right to Constitutional Remedies", isCorrect: true },
      { text: "Article 13: Laws inconsistent with rights", isCorrect: false },
      { text: "Article 141: Supreme Court decrees", isCorrect: false }
    ],
    explanation: "Dr. B.R. Ambedkar called Article 32 the 'heart and soul of the Constitution'. It grants you the fundamental right to move the Supreme Court directly by appropriate proceedings for the enforcement of the rights conferred by Part III of the Constitution."
  },
  {
    id: 6,
    context: "The government passes a law stating that only people belonging to a specific religion can apply for a government job in the postal service.",
    question: "Which Article guarantees equality of opportunity in public employment?",
    options: [
      { text: "Article 16: Equality in Public Employment", isCorrect: true },
      { text: "Article 14: Equality before Law", isCorrect: false },
      { text: "Article 25: Freedom of Religion", isCorrect: false },
      { text: "Article 15: Prohibition of Discrimination", isCorrect: false }
    ],
    explanation: "Article 16 states there shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State, and no citizen shall be discriminated against on grounds of religion, race, caste, sex, descent, place of birth, or residence."
  },
  {
    id: 7,
    context: "You are a journalist who has uncovered corruption in a local municipality. You publish an article exposing the scam, but the mayor threatens to shut down your newspaper.",
    question: "Which Fundamental Right protects your right to publish?",
    options: [
      { text: "Article 21: Right to Life and Liberty", isCorrect: false },
      { text: "Article 19(1)(a): Freedom of Speech and Expression", isCorrect: true },
      { text: "Article 14: Right to Equality", isCorrect: false },
      { text: "Article 32: Constitutional Remedies", isCorrect: false }
    ],
    explanation: "Freedom of the press is an implied right under Article 19(1)(a), which guarantees freedom of speech and expression. The government cannot arbitrarily restrict the press without falling under the strict reasonable restrictions of Article 19(2)."
  },
  {
    id: 8,
    context: "A religious community wants to establish its own school to teach its unique language and religious texts to its children.",
    question: "Which Article grants minorities the right to establish educational institutions?",
    options: [
      { text: "Article 25: Freedom of Religion", isCorrect: false },
      { text: "Article 29: Protection of Interests of Minorities", isCorrect: false },
      { text: "Article 30: Right of Minorities to Establish Educational Institutions", isCorrect: true },
      { text: "Article 21A: Right to Education", isCorrect: false }
    ],
    explanation: "Article 30 guarantees all minorities, whether based on religion or language, the right to establish and administer educational institutions of their choice."
  },
  {
    id: 9,
    context: "A poor farmer's land is forcibly seized by a powerful landlord who forces the farmer to work on the land without pay to settle an old debt.",
    question: "Which Article prohibits forced labor and 'begar'?",
    options: [
      { text: "Article 23: Prohibition of Human Trafficking and Forced Labor", isCorrect: true },
      { text: "Article 21: Right to Life and Liberty", isCorrect: false },
      { text: "Article 14: Right to Equality", isCorrect: false },
      { text: "Article 24: Prohibition of Child Labor", isCorrect: false }
    ],
    explanation: "Article 23 prohibits traffic in human beings, 'begar' (unpaid labor), and other similar forms of forced labor. Any contravention of this provision is a punishable offense."
  },
  {
    id: 10,
    context: "You are stopped by the police while driving. They seize your phone and force you to unlock it and confess to a crime you didn't commit on camera.",
    question: "Which Article protects you from being compelled to be a witness against yourself?",
    options: [
      { text: "Article 22: Protection against arrest", isCorrect: false },
      { text: "Article 20(3): Protection against self-incrimination", isCorrect: true },
      { text: "Article 21: Right to Privacy", isCorrect: false },
      { text: "Article 32: Constitutional Remedies", isCorrect: false }
    ],
    explanation: "Article 20(3) explicitly states that 'no person accused of any offence shall be compelled to be a witness against himself.' You have the right to remain silent to avoid self-incrimination."
  },
  {
    id: 11,
    context: "The government introduces a massive surveillance program tapping everyone's personal phone calls without any legal authorization or national security threat.",
    question: "Which Article, interpreted by the Supreme Court, guarantees the Right to Privacy?",
    options: [
      { text: "Article 19: Freedom of Speech", isCorrect: false },
      { text: "Article 21: Right to Life and Personal Liberty", isCorrect: true },
      { text: "Article 14: Equality before Law", isCorrect: false },
      { text: "Article 25: Freedom of Religion", isCorrect: false }
    ],
    explanation: "In the landmark K.S. Puttaswamy judgment (2017), the Supreme Court ruled that the Right to Privacy is an intrinsic part of the Right to Life and Personal Liberty under Article 21."
  },
  {
    id: 12,
    context: "You move from Maharashtra to Karnataka for a new job. The local authorities say you cannot settle there because you are not a native of the state.",
    question: "Which Article guarantees you the right to reside and settle anywhere in India?",
    options: [
      { text: "Article 15: Prohibition of Discrimination", isCorrect: false },
      { text: "Article 16: Equality in Public Employment", isCorrect: false },
      { text: "Article 19(1)(e): Freedom to Reside and Settle", isCorrect: true },
      { text: "Article 21: Right to Liberty", isCorrect: false }
    ],
    explanation: "Article 19(1)(e) guarantees all citizens the right to reside and settle in any part of the territory of India, subject only to reasonable restrictions for the general public or Scheduled Tribes."
  }
];
