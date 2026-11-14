// Advanced Grammar Curriculum (10 comprehensive lessons)
export const advancedGrammar = {
    category: "Advanced Grammar",
    description: "Master sophisticated English mechanics: voice transformations, reported discourse, hypothetical conditionals, modals, and clausal modifiers.",
    topics: [
        {
            id: "active-passive-voice",
            title: "Active and Passive Voice",
            subtitle: "Shifting rhetorical focus between the agent performing the action and the recipient receiving it",
            definition: "Voice describes the relationship between the verb and the participants identified by its arguments. In the Active Voice, the subject performs the action. In the Passive Voice, the subject receives the action, while the original agent is either demoted to an optional 'by' prepositional phrase or omitted entirely.",
            explanation: "The passive voice is formed using an appropriate tense of the auxiliary verb 'to be' + the past participle (V3) of the transitive main verb. Passive voice is essential in scientific, academic, and journalistic discourse where the outcome, product, or recipient of an action is more significant than the identity of the person performing it.",
            formula: "Active: [Subject (Agent)] + [Verb] + [Direct Object] | Passive: [Object] + [to be (in same tense)] + [Past Participle (V3)] (+ by [Agent])",
            sentenceStructures: [
                { type: "Present Simple Passive", structure: "Object + am / is / are + V3", example: "Microchips are manufactured in cleanroom environments." },
                { type: "Past Simple Passive", structure: "Object + was / were + V3", example: "The cornerstone was laid in 1892." },
                { type: "Present Perfect Passive", structure: "Object + have / has been + V3", example: "The security breach has been contained by technicians." },
                { type: "Modal Passive", structure: "Object + Modal + be + V3", example: "The safety valve must be inspected weekly." },
                { type: "Continuous Passive", structure: "Object + is / was being + V3", example: "The highway was being resurfaced when the storm struck." }
            ],
            types: [
                {
                    name: "Agentive Passive (with 'by')",
                    desc: "Explicitly names the actor or cause when that information remains essential or surprising.",
                    examples: "The novel was written by Mary Shelley when she was only nineteen."
                },
                {
                    name: "Agentless (Truncated) Passive",
                    desc: "Omits the actor because the agent is unknown, obvious, confidential, or irrelevant.",
                    examples: "Over ten thousand votes were counted before midnight."
                },
                {
                    name: "Ditransitive Passives",
                    desc: "Verbs with two objects (give, send, award) can form two distinct passives: Indirect object as subject (preferred: 'She was awarded a scholarship') or direct object as subject ('A scholarship was awarded to her').",
                    examples: "The researcher was granted an emergency extension."
                },
                {
                    name: "Impersonal Passive",
                    desc: "Used in formal reporting with verbs of reporting (say, believe, think): 'It is believed that...' or 'Subject is thought to be...'.",
                    examples: "The ancient temple is thought to date back to 400 BC."
                }
            ],
            rules: [
                "Only transitive verbs can form the passive: Intransitive verbs (arrive, die, happen, exist, sleep, vanish) have no direct object to promote to the subject position (NEVER: 'An accident was happened' -> 'An accident happened').",
                "Tense preservation: The auxiliary verb 'to be' must exactly mirror the original active tense and agree with the new grammatical subject.",
                "Stative verbs resisting passive: Some transitive stative verbs cannot be made passive in standard English: fit, have (possess), lack, resemble, suit (Incorrect: 'A red sports car is had by him').",
                "Prepositional verbs (phrasal verbs): Keep the particle/preposition attached to the verb in the passive ('They laughed at the clown' -> 'The clown was laughed at').",
                "Avoid passive overuse: Prefer active voice in general narrative writing for vigor, clarity, and directness; employ passive deliberately when the agent is irrelevant or unknown."
            ],
            examples: [
                { text: "The James Webb Space Telescope was deployed by NASA and ESA to study primordial galaxies.", breakdown: "Promoted Object (JWST) + was deployed (Past Simple Passive) + by Agent + purpose infinitive", highlight: "Past simple passive with named agent" },
                { text: "Significant quantities of rare earth elements are mined in specialized subterranean facilities.", breakdown: "Promoted Object + are mined (Present Simple Passive) + location modifier", highlight: "Agentless passive in scientific contexts" },
                { text: "The patient is being monitored continuously in the intensive care unit.", breakdown: "Subject + is being monitored (Present Continuous Passive) + adverbial phrase", highlight: "Continuous passive indicating ongoing process" },
                { text: "All safety protocols must be observed before operating heavy industrial equipment.", breakdown: "Subject + must be observed (Modal Passive) + temporal condition", highlight: "Modal passive expressing regulation" },
                { text: "The lead investigator was awarded the prestigious Turing Medal for her cryptographic research.", breakdown: "Indirect Object as Subject + was awarded + Direct Object (Turing Medal)", highlight: "Ditransitive passive promoting the recipient" }
            ],
            commonMistakes: [
                {
                    wrong: "The solar eclipse was occurred yesterday afternoon.",
                    right: "The solar eclipse occurred yesterday afternoon.",
                    why: "'Occur' is an intransitive verb and cannot take passive voice. Never say 'was occurred' or 'was happened'."
                },
                {
                    wrong: "The report has being completed by the auditing firm.",
                    right: "The report has been completed by the auditing firm.",
                    why: "Present Perfect Passive requires 'has been + V3', not 'has being'."
                },
                {
                    wrong: "The baby resembles by his mother.",
                    right: "The baby resembles his mother.",
                    why: "'Resemble' is a stative transitive verb that does not admit passive transformations."
                }
            ],
            specialCases: [
                {
                    title: "Get-Passive in Informal English",
                    desc: "English speakers often substitute 'get' for 'be' to express sudden, accidental, or adverse occurrences: 'He got fired', 'The car got damaged in the hail'.",
                    example: "Several priceless vases got broken during the chaotic move."
                }
            ],
            exercises: [
                {
                    id: "act-pas-1",
                    question: "Convert to Passive Voice: 'The hurricane destroyed twenty coastal cottages.'",
                    type: "mcq",
                    options: [
                        "Twenty coastal cottages were destroyed by the hurricane.",
                        "Twenty coastal cottages was destroyed by the hurricane.",
                        "Twenty coastal cottages had been destroy by the hurricane.",
                        "Twenty coastal cottages were destroying by the hurricane."
                    ],
                    answer: "Twenty coastal cottages were destroyed by the hurricane.",
                    explanation: "Past simple active ('destroyed') becomes plural past passive ('were destroyed') agreeing with 'Twenty coastal cottages'."
                },
                {
                    id: "act-pas-2",
                    question: "Why is 'The ancient vase was disappeared from the display case' grammatically incorrect?",
                    type: "mcq",
                    options: [
                        "'Disappear' is an intransitive verb and cannot form a passive voice.",
                        "'Display case' is an inanimate object.",
                        "'Was' cannot precede a past participle.",
                        "The sentence requires 'by someone'."
                    ],
                    answer: "'Disappear' is an intransitive verb and cannot form a passive voice.",
                    explanation: "Intransitive verbs cannot take objects and therefore cannot undergo passive voice transformation."
                },
                {
                    id: "act-pas-3",
                    question: "Complete the modal passive: 'Strict confidentiality ___ maintained at all times.'",
                    type: "fill-in",
                    options: ["must be", "must to be", "must being", "must have"],
                    answer: "must be",
                    explanation: "Modal passive formula is Modal + be + Past Participle ('must be maintained')."
                },
                {
                    id: "act-pas-4",
                    question: "Identify the continuous passive sentence:",
                    type: "mcq",
                    options: [
                        "The old railway bridge is being repaired this month.",
                        "The old railway bridge was repaired last month.",
                        "The old railway bridge has been repaired.",
                        "The old railway bridge is repairing."
                    ],
                    answer: "The old railway bridge is being repaired this month.",
                    explanation: "'is being repaired' is the Present Continuous Passive formula (am/is/are + being + V3)."
                }
            ],
            quickRevision: [
                "Form: Subject (receiver) + to be (in target tense) + V3 (Past Participle).",
                "Only transitive verbs (verbs taking direct objects) can form passives.",
                "Intransitive verbs (occur, happen, vanish, arrive, sleep) NEVER take passive form.",
                "Continuous passive uses 'being' (is being built, was being tested)."
            ]
        },
        {
            id: "direct-indirect-speech",
            title: "Direct and Indirect Speech",
            subtitle: "Quoting exact utterances versus reporting messages with systematic backshifting and pronoun adjustments",
            definition: "Direct speech quotes the exact words spoken, enclosed within quotation marks. Indirect speech (reported speech) conveys the content of a speaker's statement without quoting verbatim, requiring grammatical backshifting of tenses, adjustments of pronouns, and changes to time/place deixis.",
            explanation: "When the reporting verb is in the past tense (said, told, stated, explained), the tenses in the reported clause generally shift one step back into the past (e.g. Present Simple becomes Past Simple; Present Perfect becomes Past Perfect). 'Tell' requires an indirect object recipient ('She told me'), whereas 'say' does not ('She said that').",
            formula: "Direct: Speaker said, \"[Exact utterance]\" | Indirect: Speaker said (that) + [Adjusted pronouns] + [Backshifted verb] + [Adjusted time words]",
            sentenceStructures: [
                { type: "Present Simple -> Past Simple", structure: "\"I live in Boston\" -> She said she lived in Boston.", example: "Direct: \"We understand.\" -> Indirect: They said they understood." },
                { type: "Present Continuous -> Past Continuous", structure: "\"I am working\" -> He said he was working.", example: "Direct: \"I am leaving.\" -> Indirect: She explained she was leaving." },
                { type: "Past Simple / Present Perfect -> Past Perfect", structure: "\"I finished\" / \"I have finished\" -> He said he had finished.", example: "Direct: \"We lost the key.\" -> Indirect: They admitted they had lost the key." },
                { type: "Will -> Would / Can -> Could", structure: "\"I will attend\" -> She stated she would attend.", example: "Direct: \"I can help.\" -> Indirect: He offered that he could help." },
                { type: "Imperatives -> To-Infinitive", structure: "\"Sign here!\" -> He instructed me to sign there.", example: "Direct: \"Don't wait!\" -> Indirect: She warned us not to wait." }
            ],
            types: [
                {
                    name: "Say vs Tell",
                    desc: "'Tell' must be followed by a personal direct recipient: tell someone (that). 'Say' does not take a personal object directly: say (that) someone... OR say to someone.",
                    examples: "She told me she was ready (NOT: She said me). / She said she was ready."
                },
                {
                    name: "Deictic Shifts (Time and Place)",
                    desc: "Here -> there | Now -> then / at that time | Today -> that day | Yesterday -> the day before / the previous day | Tomorrow -> the following day / the next day | This -> that.",
                    examples: "\"I will arrive tomorrow\" -> He said he would arrive the following day."
                },
                {
                    name: "Modal Shifts",
                    desc: "Can -> could | May -> might | Must -> had to (or must for universal rules) | Will -> would | Should, would, could, might remain unchanged.",
                    examples: "\"You must wear a helmet\" -> The inspector said we had to wear a helmet."
                }
            ],
            rules: [
                "Backshifting exception for universal truths: If the reported statement expresses a timeless scientific truth or an ongoing fact that is still true right now, backshifting is optional or avoided ('Galileo argued that the Earth revolves around the Sun').",
                "No backshift with present reporting verb: If the reporting verb is in the present (says, explains, claims), the verb tense does NOT shift ('She says she is tired').",
                "Past Perfect does not shift: Past Perfect remains Past Perfect in reported speech ('\"I had already left\" -> He said he had already left').",
                "Reporting commands and requests: Use 'Reporting verb + object + (not) to + bare infinitive' (advise, warn, command, instruct, urge, remind: 'The doctor advised him to stop smoking').",
                "Omission of 'that': In conversational and informal English, the subordinator 'that' is frequently omitted ('He said he was leaving')."
            ],
            examples: [
                { text: "Direct: \"We have launched our primary clinical trials,\" the CEO announced.", breakdown: "Exact utterance in quotes + present perfect tense (have launched)", highlight: "Direct speech" },
                { text: "Indirect: The CEO announced that they had launched their primary clinical trials.", breakdown: "Reporting verb (announced) + that + adjusted pronoun (they) + backshifted verb (had launched)", highlight: "Reported speech transformation" },
                { text: "Direct: \"I will submit the revised calculations tomorrow,\" Marcus promised.", breakdown: "Direct speech with modal 'will' and time deictic 'tomorrow'", highlight: "Direct speech with future marker" },
                { text: "Indirect: Marcus promised that he would submit the revised calculations the following day.", breakdown: "Reporting verb (promised) + would submit + adjusted time marker (the following day)", highlight: "Modal and deictic backshifting" },
                { text: "Indirect Command: The flight attendant instructed the passengers to turn off their electronic devices.", breakdown: "Reporting verb (instructed) + personal object (passengers) + to-infinitive (to turn off)", highlight: "Reported imperative command" }
            ],
            commonMistakes: [
                {
                    wrong: "She said me that she was exhausted.",
                    right: "She told me that she was exhausted. (OR: She said that she was exhausted.)",
                    why: "'Say' cannot take a personal object directly without 'to'. Use 'told me' or 'said that'."
                },
                {
                    wrong: "He told he had lost his credentials.",
                    right: "He said he had lost his credentials. (OR: He told us he had lost his credentials.)",
                    why: "'Tell' requires an explicit person/recipient ('told us', 'told me'). If no recipient is stated, use 'said'."
                },
                {
                    wrong: "The teacher told us to not speak during the exam.",
                    right: "The teacher told us not to speak during the exam.",
                    why: "Place 'not' before the infinitive marker 'to' in reported negative commands ('not to speak')."
                }
            ],
            specialCases: [
                {
                    title: "Reporting Verbs with Gerunds",
                    desc: "Some reporting verbs (admit, deny, suggest, apologize for) take a gerund rather than a that-clause or infinitive: 'He denied leaking the documents' / 'She suggested postponing the review'.",
                    example: "The treasurer apologized for miscalculating the travel stipends."
                }
            ],
            exercises: [
                {
                    id: "dir-ind-1",
                    question: "Transform into reported speech: '\"I can solve this equation,\" Liam declared.'",
                    type: "mcq",
                    options: [
                        "Liam declared that he could solve that equation.",
                        "Liam declared that he can solve that equation.",
                        "Liam declared that I could solve this equation.",
                        "Liam declared that he would solve this equation."
                    ],
                    answer: "Liam declared that he could solve that equation.",
                    explanation: "Pronoun shifts from 'I' to 'he', modal 'can' backshifts to 'could', and 'this' shifts to 'that'."
                },
                {
                    id: "dir-ind-2",
                    question: "Complete the sentence with the correct reporting verb: 'Helena ___ us that the seminar had been postponed.'",
                    type: "fill-in",
                    options: ["told", "said", "explained", "spoke"],
                    answer: "told",
                    explanation: "'Told' is followed immediately by the personal recipient pronoun 'us' ('told us that...')."
                },
                {
                    id: "dir-ind-3",
                    question: "How do you report the negative command: '\"Don't open the valve!\"'?",
                    type: "mcq",
                    options: [
                        "The engineer warned us not to open the valve.",
                        "The engineer warned us to not open the valve.",
                        "The engineer warned us that don't open the valve.",
                        "The engineer warned us we must not open the valve."
                    ],
                    answer: "The engineer warned us not to open the valve.",
                    explanation: "Reported negative imperatives use 'warned/told + object + not to + bare verb'."
                },
                {
                    id: "dir-ind-4",
                    question: "Why does 'The teacher explained that the moon orbits the Earth' NOT backshift to 'orbited'?",
                    type: "mcq",
                    options: [
                        "Because it expresses an immutable scientific fact / universal truth.",
                        "Because 'moon' is singular.",
                        "Because 'explained' is an irregular verb.",
                        "Because 'orbit' cannot be conjugated in the past tense."
                    ],
                    answer: "Because it expresses an immutable scientific fact / universal truth.",
                    explanation: "Scientific truths and universal permanent facts retain present tense in reported speech."
                }
            ],
            quickRevision: [
                "Backshift: Present Simple -> Past Simple; Present Perfect/Past Simple -> Past Perfect; will -> would; can -> could.",
                "'Tell + someone' requires a recipient; 'Say' does not.",
                "Adjust pronouns (I -> he/she) and time/place words (tomorrow -> the following day, here -> there).",
                "Universal scientific facts do not need backshifting.",
                "Negative commands: 'told/warned someone not to do something'."
            ]
        },
        {
            id: "conditional-sentences",
            title: "Conditional Sentences",
            subtitle: "Hypothetical realities: Zero, First, Second, Third, and Mixed conditionals",
            definition: "Conditional sentences discuss hypothetical situations, conditions, and their anticipated, imagined, or missed outcomes. They typically consist of a conditional 'if-clause' (protasis) and a main result clause (apodosis).",
            explanation: "English features five principal conditional patterns: Zero (scientific universal truths), First (real future possibilities), Second (unreal or improbable present/future hypotheticals), Third (impossible counterfactual past regrets), and Mixed (connecting past causes with present outcomes or vice versa).",
            formula: "Zero: If + V1, V1 | 1st: If + V1, will + V1 | 2nd: If + V2, would + V1 | 3rd: If + had V3, would have V3 | Mixed: If + had V3, would + V1",
            sentenceStructures: [
                { type: "Zero Conditional (Facts & Science)", structure: "If / When + Present Simple, Present Simple", example: "If water reaches 100°C, it vaporizes." },
                { type: "First Conditional (Real Future Possibility)", structure: "If + Present Simple, will + Base Verb", example: "If the test succeeds, we will deploy the patch tonight." },
                { type: "Second Conditional (Unreal Present/Future)", structure: "If + Past Simple (were), would / could + Base Verb", example: "If I possessed the capital, I would invest in fusion energy." },
                { type: "Third Conditional (Counterfactual Past)", structure: "If + Past Perfect (had + V3), would have + Past Participle", example: "If they had reinforced the levees, the flood would not have breached the city." },
                { type: "Mixed Conditional (Past condition -> Present result)", structure: "If + Past Perfect (had + V3), would + Base Verb", example: "If I had accepted the scholarship in Tokyo, I would speak fluent Japanese today." }
            ],
            types: [
                {
                    name: "Zero Conditional",
                    desc: "Expresses physical laws, mechanical realities, and automatic cause-and-effect relationships. 'When' can replace 'if'.",
                    examples: "If you heat ice, it melts."
                },
                {
                    name: "First Conditional",
                    desc: "Expresses realistic, probable events that depend on a feasible future condition.",
                    examples: "If traffic is clear, we will arrive before 6 PM."
                },
                {
                    name: "Second Conditional",
                    desc: "Imagines hypothetical, impossible, or contrary-to-fact present or future scenarios. Standard English prefers the subjunctive 'were' for all persons: 'If I were you'.",
                    examples: "If she were the chief editor, she would reform the review policy."
                },
                {
                    name: "Third Conditional",
                    desc: "Reflects on the past with counterfactual regret or relief. Both condition and consequence are completely unchangeable history.",
                    examples: "If the driver had seen the red signal, he would have applied the emergency brake."
                },
                {
                    name: "Mixed Conditional",
                    desc: "Bridges different time planes: most commonly a past action having a persistent present consequence.",
                    examples: "If we had won the tender last month, we would be expanding our operations right now."
                }
            ],
            rules: [
                "NEVER use 'will' or 'would' inside the 'if' clause: Standard English places modals in the result clause, not in the conditional clause (Incorrect: 'If it will rain, we will stay' -> Correct: 'If it rains, we will stay'; Incorrect: 'If I would have known' -> Correct: 'If I had known').",
                "Subjunctive 'were' in Second Conditional: In formal English, use 'were' instead of 'was' for all subjects (I, he, she, it) in hypothetical conditions ('If I were taller' / 'If he were present').",
                "Unless = If... not: 'Unless' expresses a negative condition: 'Unless you submit the paperwork, your visa will be denied' (= If you do not submit the paperwork...).",
                "Inversion in conditionals (Without 'if'): Formal and literary English inverts clauses to omit 'if':\n• First: 'Should you require assistance...' (If you should require...)\n• Second: 'Were he here today...' (If he were here...)\n• Third: 'Had we known the risks...' (If we had known...).",
                "Punctuation: If the 'if' clause comes first, follow it with a comma. If the main result clause comes first, do NOT use a comma ('We will stay inside if it rains')."
            ],
            examples: [
                { text: "If atmospheric humidity exceeds ninety percent, condensation forms on the chilled metallic surface.", breakdown: "If + Present Simple (exceeds) + Present Simple (forms)", highlight: "Zero conditional physical fact" },
                { text: "If the board approves the capital outlay, our laboratory will procure two advanced electron microscopes.", breakdown: "If + Present Simple (approves) + will + bare verb (procure)", highlight: "First conditional real possibility" },
                { text: "If the expedition were better provisioned, the explorers could survive the sub-zero winter on the plateau.", breakdown: "If + Subjunctive were + modal could + bare verb", highlight: "Second conditional unreal present hypothetical" },
                { text: "If the diagnostic sensors had detected the oil leak earlier, the engine would not have seized on the runway.", breakdown: "If + had detected (Past Perfect) + would not have seized (modal perfect)", highlight: "Third conditional counterfactual past regret" },
                { text: "Had the navigation crew checked the sonar readings, the vessel would have avoided the submerged reef.", breakdown: "Inverted Third Conditional without 'if' (Had + Subject + V3)", highlight: "Formal literary conditional inversion" }
            ],
            commonMistakes: [
                {
                    wrong: "If I will win the prize, I will donate the funds.",
                    right: "If I win the prize, I will donate the funds.",
                    why: "Do not use 'will' in the 'if' clause of a first conditional; use Present Simple."
                },
                {
                    wrong: "If I would have studied harder, I would have passed the bar exam.",
                    right: "If I had studied harder, I would have passed the bar exam.",
                    why: "Do not use 'would have' in the 'if' clause of a third conditional; use Past Perfect ('had studied')."
                },
                {
                    wrong: "Unless you don't wear your badge, security will stop you.",
                    right: "Unless you wear your badge, security will stop you. (OR: If you don't wear your badge...)",
                    why: "'Unless' already means 'if... not'. Adding another negative ('don't') creates a confusing double negative."
                }
            ],
            specialCases: [
                {
                    title: "Polite 'Would' in If-Clauses",
                    desc: "An exception where 'would' appears in the 'if' clause is for polite requests or willingness: 'If you would be so kind as to sign here' / 'If you would wait a moment'.",
                    example: "If you would just fill out this medical declaration, the doctor will see you."
                }
            ],
            exercises: [
                {
                    id: "cond-1",
                    question: "Complete the Third Conditional: 'If the team ___ the defect earlier, the recall would have been avoided.'",
                    type: "mcq",
                    options: [
                        "had discovered",
                        "discovered",
                        "would discover",
                        "would have discovered"
                    ],
                    answer: "had discovered",
                    explanation: "Third conditional 'if' clauses require the Past Perfect ('had discovered')."
                },
                {
                    id: "cond-2",
                    question: "Choose the formal inverted equivalent of: 'If you should encounter any complications...'",
                    type: "mcq",
                    options: [
                        "Should you encounter any complications...",
                        "Were you encounter any complications...",
                        "Had you encounter any complications...",
                        "Could you encounter any complications..."
                    ],
                    answer: "Should you encounter any complications...",
                    explanation: "First conditional inversion drops 'if' and front-shifts 'Should': 'Should you encounter...'."
                },
                {
                    id: "cond-3",
                    question: "Fill in the blank with the standard subjunctive: 'If I ___ in your position, I would decline the offer.'",
                    type: "fill-in",
                    options: ["were", "was", "am", "would be"],
                    answer: "were",
                    explanation: "In formal hypothetical Second Conditionals, 'were' is the standard subjunctive form for all persons."
                },
                {
                    id: "cond-4",
                    question: "Identify the MIXED conditional connecting a past decision with a present reality:",
                    type: "mcq",
                    options: [
                        "If I had learned programming in college, I would be working as a software architect today.",
                        "If I had learned programming in college, I would have worked as an architect back then.",
                        "If I learn programming, I will be an architect.",
                        "If I learned programming, I would become an architect."
                    ],
                    answer: "If I had learned programming in college, I would be working as a software architect today.",
                    explanation: "Past condition ('had learned') paired with present consequence ('would be working today') constitutes a classic mixed conditional."
                }
            ],
            quickRevision: [
                "Zero: If + Present, Present (timeless facts, science).",
                "First: If + Present, will + Bare Verb (real future possibilities).",
                "Second: If + Past Simple (were), would + Bare Verb (unreal present/future).",
                "Third: If + Past Perfect (had + V3), would have + V3 (past regrets/counterfactuals).",
                "NEVER put 'will' or 'would' inside the 'if' clause.",
                "Inversions: 'Should you need...', 'Were I you...', 'Had I known...'."
            ]
        },
        {
            id: "modal-verbs",
            title: "Modal Verbs",
            subtitle: "Auxiliaries expressing ability, permission, obligation, prohibition, deduction, and advice",
            definition: "Modal verbs are a distinct class of auxiliary verbs that express the speaker's attitude toward the possibility, necessity, permission, ability, or probability of an action. The primary core modals are: can, could, may, might, must, shall, should, will, and would.",
            explanation: "Modal verbs possess unique grammatical characteristics: they do not take third-person '-s' suffixes (he can, NEVER he cans), they do not have infinitive or participle forms (no 'to can', no 'canning'), they form negatives by adding 'not' directly, and they are followed by the bare infinitive of the main verb (without 'to', with the sole exception of 'ought to').",
            formula: "[Subject] + [Modal Verb] + [Bare Infinitive (Base Verb)]  |  Past Deduction: [Modal] + have + [Past Participle (V3)]",
            sentenceStructures: [
                { type: "Ability / Capacity", structure: "Subject + can / could / be able to + Base Verb", example: "Marine iguanas can forage underwater for thirty minutes." },
                { type: "Permission / Polite Request", structure: "May / Can / Could + Subject + Base Verb?", example: "May I review the patient's neurological chart?" },
                { type: "Obligation / Necessity", structure: "Subject + must / have to / ought to + Base Verb", example: "Commercial pilots must undergo recurrent simulator evaluations." },
                { type: "Prohibition", structure: "Subject + must not / cannot + Base Verb", example: "Visitors must not cross the safety perimeter line." },
                { type: "Degrees of Certainty (Deduction)", structure: "Subject + must / can't / might + be (or have been V3)", example: "That artifact must be over two thousand years old." }
            ],
            types: [
                {
                    name: "Can & Could",
                    desc: "Express present/general ability (can), past ability (could), informal permission, possibility, and polite requests.",
                    examples: "She can synthesize complex data. / Could you open the archive door?"
                },
                {
                    name: "May & Might",
                    desc: "Express formal permission (may) and hypothetical or uncertain possibility (may: ~50%; might: ~30-40%).",
                    examples: "The economic forecast may improve by autumn, but inflation might linger."
                },
                {
                    name: "Must & Have to",
                    desc: "'Must' indicates internal conviction, urgency, or strict legal rule. 'Have to' represents external obligation imposed by external circumstances or rules. In negatives, 'must not' = prohibition, whereas 'don't have to' = lack of necessity (optional!).",
                    examples: "You must not enter (Forbidden). / You don't have to enter (Optional)."
                },
                {
                    name: "Should & Ought to",
                    desc: "Express moral duty, strong recommendations, good advice, or reasonable expectations.",
                    examples: "You should double-check your data citations before submission."
                },
                {
                    name: "Modals of Past Deduction",
                    desc: "Must have + V3 (almost certain it happened); Can't/Couldn't have + V3 (impossible); Might/May/Could have + V3 (possible it happened).",
                    examples: "He must have forgotten his badge; his desk is completely cleared."
                }
            ],
            rules: [
                "Bare infinitive rule: Modals (except 'ought to') must be followed directly by a bare infinitive without 'to' (Correct: 'She can speak', NOT: 'She can to speak').",
                "No third-person '-s': Modals never change form for he/she/it ('She must go', NOT 'She musts go').",
                "Crucial negative contrast (Must not vs Don't have to): 'You must not do that' means it is strictly prohibited. 'You don't have to do that' means it is unnecessary, but you may if you want.",
                "Past ability: Could expresses general past ability ('I could swim when I was four'). When succeeding in a specific difficult past instance, use 'was/were able to' or 'managed to' (Correct: 'I was able to escape the fire', NOT: 'I could escape the fire').",
                "Past deduction vs past advice: 'Should have + V3' conveys regret or unfulfilled obligation ('You should have called'). 'Must have + V3' expresses logical deduction about past evidence ('The street is wet; it must have rained')."
            ],
            examples: [
                { text: "Archaeologists must exercise extreme delicacy when excavating fragile fossilized remains.", breakdown: "Subject + must + bare verb (exercise) + object phrase", highlight: "Strong professional obligation" },
                { text: "The laboratory lights are off; the technicians must have departed for the weekend.", breakdown: "Observation + semi-colon + Subject + must have departed (Past Deduction)", highlight: "Logical past deduction based on evidence" },
                { text: "You don't have to print the boarding pass; an electronic barcode on your smartphone is acceptable.", breakdown: "Subject + don't have to + bare verb (print) [lack of necessity]", highlight: "Absence of obligation / optional action" },
                { text: "Could you possibly summarize the key findings before the executive committee convenes?", breakdown: "Polite modal (Could) + subject + adverb + bare verb (summarize)", highlight: "Polite formal request" },
                { text: "Under international maritime treaties, commercial vessels cannot enter territorial straits without notification.", breakdown: "Subject + cannot (prohibition) + bare verb (enter)", highlight: "Legal prohibition" }
            ],
            commonMistakes: [
                {
                    wrong: "She must to submit her dissertation before May.",
                    right: "She must submit her dissertation before May.",
                    why: "Modal verbs are followed by the bare infinitive without 'to'."
                },
                {
                    wrong: "Tomorrow is Sunday, so I must not wake up early.",
                    right: "Tomorrow is Sunday, so I don't have to wake up early.",
                    why: "'Must not' expresses prohibition (forbidden). When something is merely unnecessary or optional, use 'don't have to'."
                },
                {
                    wrong: "The team could win the final match yesterday after extra time.",
                    right: "The team was able to win the final match yesterday after extra time.",
                    why: "For achievement in a specific, individual past challenge, use 'was/were able to' or 'managed to', not 'could'."
                }
            ],
            specialCases: [
                {
                    title: "Semi-Modals (Marginal Modals)",
                    desc: "Verbs like 'need', 'dare', and 'used to' can behave partly like modals and partly like lexical verbs: 'You needn't worry' (modal) vs 'You don't need to worry' (lexical verb).",
                    example: "He dared not challenge the arbitrator's ruling."
                }
            ],
            exercises: [
                {
                    id: "mod-1",
                    question: "Complete the deduction: 'The ground is soaked with puddles; it ___ heavily last night.'",
                    type: "mcq",
                    options: [
                        "must have rained",
                        "should have rained",
                        "would rain",
                        "can rain"
                    ],
                    answer: "must have rained",
                    explanation: "When visible evidence makes a past event nearly certain, use the past deduction modal 'must have + V3'."
                },
                {
                    id: "mod-2",
                    question: "Choose the sentence where the action is OPTIONAL rather than strictly forbidden:",
                    type: "mcq",
                    options: [
                        "You don't have to wear formal attire to the reception.",
                        "You must not wear casual attire to the reception.",
                        "You cannot wear casual attire to the reception.",
                        "You are not allowed to wear casual attire to the reception."
                    ],
                    answer: "You don't have to wear formal attire to the reception.",
                    explanation: "'Don't have to' means lack of obligation (optional), whereas 'must not' and 'cannot' mean prohibition."
                },
                {
                    id: "mod-3",
                    question: "Fill in the blank for a specific past achievement: 'Despite the blinding blizzard, the rescue team ___ reach the stranded hikers.'",
                    type: "fill-in",
                    options: ["was able to", "could", "must", "can"],
                    answer: "was able to",
                    explanation: "Overcoming a specific, difficult challenge on a particular occasion in the past requires 'was able to', not 'could'."
                },
                {
                    id: "mod-4",
                    question: "Which modal verb uniquely takes 'to' in standard grammar?",
                    type: "mcq",
                    options: [
                        "ought to",
                        "must",
                        "should",
                        "might"
                    ],
                    answer: "ought to",
                    explanation: "'Ought to' is the only core modal construction that requires the infinitive marker 'to' ('You ought to inspect the brakes')."
                }
            ],
            quickRevision: [
                "Modals: can, could, may, might, must, shall, should, will, would, ought to.",
                "Followed by BARE infinitive (no 'to', except 'ought to').",
                "Never add '-s' for third person (he can, NOT he cans).",
                "Must not = Forbidden / Prohibited; Don't have to = Not necessary / Optional.",
                "Past deduction: must have + V3 (certain); can't have + V3 (impossible)."
            ]
        },
        {
            id: "gerunds-and-infinitives",
            title: "Gerunds and Infinitives",
            subtitle: "Non-finite verbals functioning as nouns, subjects, objects, and complements",
            definition: "Gerunds (verb + -ing) and Infinitives (to + base verb) are non-finite verb forms that operate grammatically as nouns in sentences, serving as subjects, direct objects, or subject complements.",
            explanation: "While both look like verbs, their grammatical behavior is nominal. Deciding whether a verb takes a gerund, a to-infinitive, or a bare infinitive is one of the most critical aspects of English mastery. Some verbs take only gerunds (e.g. enjoy, avoid), some take only to-infinitives (e.g. decide, hope), and others can take either, sometimes with radical shifts in meaning (e.g. remember, stop, forget, regret).",
            formula: "Gerund: [Verb-ing] | To-Infinitive: [to + Base Verb] | Bare Infinitive: [Base Verb alone]",
            sentenceStructures: [
                { type: "Gerund as Subject", structure: "Verb-ing + Singular Verb + Complement", example: "Mastering complex algorithms requires disciplined practice." },
                { type: "Verb + Gerund Object", structure: "Subject + Verb + Verb-ing", example: "The firm avoided paying redundant administrative tariffs." },
                { type: "Verb + Infinitive Object", structure: "Subject + Verb + to + Base Verb", example: "The council decided to allocate additional emergency funding." },
                { type: "Preposition + Gerund", structure: "Preposition + Verb-ing (Universal Rule!)", example: "She is interested in pursuing quantum biophysics." },
                { type: "Infinitive of Purpose", structure: "Subject + Verb + to + Base Verb (answers 'Why?')", example: "He traveled to Geneva to attend the diplomatic conference." }
            ],
            types: [
                {
                    name: "Verbs followed ONLY by Gerunds",
                    desc: "admit, avoid, consider, deny, enjoy, finish, imagine, mind, postpone, practice, recommend, risk, suggest.",
                    examples: "She suggested revising the manuscript. / He admitted making a calculation error."
                },
                {
                    name: "Verbs followed ONLY by To-Infinitives",
                    desc: "agree, decide, hope, manage, offer, plan, promise, refuse, seem, threaten, want, wish.",
                    examples: "We decided to postpone the inspection. / He promised to deliver the draft."
                },
                {
                    name: "Verbs with NO change in meaning",
                    desc: "begin, start, continue, like, love, hate, prefer (can take either gerund or infinitive with virtually identical meaning).",
                    examples: "It started raining. = It started to rain."
                },
                {
                    name: "Verbs with CRITICAL changes in meaning",
                    desc: "stop, remember, forget, regret, try, mean.",
                    examples: "• Stop smoking (quit habit) vs Stop to smoke (halt an activity in order to smoke).\n• Remember to call (don't forget future task) vs Remember calling (have memory of past event)."
                }
            ],
            rules: [
                "The Universal Preposition Rule: Any verb directly following a preposition (in, on, at, of, with, about, before, after, without) MUST be a gerund (-ing form), NEVER an infinitive (Correct: 'before leaving', NOT: 'before to leave'; 'accused of stealing', NOT: 'accused of to steal').",
                "'Look forward to' takes a gerund: Here, 'to' is a preposition, not the infinitive marker (Correct: 'I look forward to meeting you', NOT 'to meet'). Other examples: 'be used to doing', 'object to doing'.",
                "Gerunds as subjects take singular verbs: 'Exercising regularly improves cardiovascular health' ('Exercising' is singular, verb is 'improves').",
                "Bare infinitive with verbs of perception and causation: Verbs like 'make', 'let', 'hear', 'see', 'watch' take a bare infinitive without 'to' ('She made him apologize', NOT 'made him to apologize').",
                "Possessive with gerunds in formal writing: Formal English places a possessive adjective before a gerund: 'I appreciate your coming on short notice' (rather than 'you coming')."
            ],
            examples: [
                { text: "Developing sustainable thermonuclear fusion remains one of humanity's foremost scientific challenges.", breakdown: "Gerund phrase as subject (Developing...) + Singular Verb (remains) + Complement", highlight: "Gerund phrase functioning as subject" },
                { text: "The senior committee refused to compromise on stringent environmental regulations.", breakdown: "Subject + Verb of refusal + To-Infinitive (to compromise) + prepositional phrase", highlight: "Verb taking infinitive object" },
                { text: "After thoroughly analyzing the telemetry logs, the aerospace team recommended aborting the launch.", breakdown: "Preposition + Gerund (After analyzing) + Verb + Gerund object (aborting)", highlight: "Preposition with gerund & verb taking gerund" },
                { text: "She remembered locking the high-security vault before departing for the evening.", breakdown: "Subject + remembered + Gerund (locking) [memory of past completed action]", highlight: "Remember + gerund (past memory)" },
                { text: "Please remember to lock the high-security vault before you leave tonight.", breakdown: "Imperative + remember + To-Infinitive (to lock) [future task obligation]", highlight: "Remember + infinitive (duty/task)" }
            ],
            commonMistakes: [
                {
                    wrong: "I look forward to hear from you soon.",
                    right: "I look forward to hearing from you soon.",
                    why: "In 'look forward to', 'to' is a preposition, which universally requires a gerund (-ing form)."
                },
                {
                    wrong: "She made him to rewrite the entire report.",
                    right: "She made him rewrite the entire report.",
                    why: "Causative 'make' takes an object + bare infinitive without 'to'."
                },
                {
                    wrong: "He stopped to smoke because it was damaging his health.",
                    right: "He stopped smoking because it was damaging his health.",
                    why: "'Stop smoking' means giving up the habit. 'Stop to smoke' means pausing an activity in order to smoke a cigarette."
                }
            ],
            specialCases: [
                {
                    title: "Try to do vs Try doing",
                    desc: "'Try to do' means making an effort or attempting a difficult task ('I tried to lift the boulder'). 'Try doing' means experimenting with a method to see if it works ('Try restarting your router').",
                    example: "If the pain persists, try applying a cold compress to the joint."
                }
            ],
            exercises: [
                {
                    id: "ger-inf-1",
                    question: "Complete the sentence with the correct form: 'The suspect denied ___ the classified files.'",
                    type: "mcq",
                    options: [
                        "accessing",
                        "to access",
                        "access",
                        "to accessing"
                    ],
                    answer: "accessing",
                    explanation: "'Deny' is a verb that is strictly followed by a gerund ('denied accessing')."
                },
                {
                    id: "ger-inf-2",
                    question: "Fill in the blank with the correct prepositional verb form: 'She succeeded in ___ the scholarship.'",
                    type: "fill-in",
                    options: ["securing", "to secure", "secure", "secured"],
                    answer: "securing",
                    explanation: "Verbs following any preposition ('in') must always take the gerund (-ing) form."
                },
                {
                    id: "ger-inf-3",
                    question: "What does 'Mark stopped to talk to the receptionist' mean?",
                    type: "mcq",
                    options: [
                        "Mark paused his walking or prior activity in order to converse with the receptionist.",
                        "Mark ceased ever talking to the receptionist again.",
                        "Mark refused to speak with the receptionist.",
                        "Mark forgot who the receptionist was."
                    ],
                    answer: "Mark paused his walking or prior activity in order to converse with the receptionist.",
                    explanation: "'Stop + to-infinitive' expresses an infinitive of purpose — pausing one activity in order to do another."
                },
                {
                    id: "ger-inf-4",
                    question: "Which causative verb takes a BARE infinitive (without 'to')?",
                    type: "mcq",
                    options: [
                        "let",
                        "allow",
                        "permit",
                        "compel"
                    ],
                    answer: "let",
                    explanation: "'Let' takes a bare infinitive: 'Let him go' (compared to 'Allow him to go')."
                }
            ],
            quickRevision: [
                "Gerund = Verb-ing; Infinitive = to + Base Verb.",
                "Universal Rule: Verbs after any preposition MUST be gerunds (e.g. interested in learning).",
                "'Look forward to', 'used to', 'object to' take gerunds because 'to' is a preposition.",
                "Remember to do = future duty; Remember doing = past memory.",
                "Stop to do = pause to do something; Stop doing = quit the habit/action."
            ]
        },
        {
            id: "phrases-and-clauses",
            title: "Phrases and Clauses",
            subtitle: "Distinguishing grammatical building blocks: independent clauses, dependent clauses, and phrase families",
            definition: "A clause is a grammatical unit containing both a subject and a finite predicate (verb). A phrase is a group of related words that functions as a single part of speech but lacks a subject-verb nexus.",
            explanation: "Mastering the hierarchy of syntax requires recognizing whether a word group constitutes a complete clause (independent or dependent) or a modifying phrase (noun phrase, prepositional phrase, participial phrase, gerund phrase, or infinitive phrase). Misunderstanding phrase boundaries leads to comma splices, dangling modifiers, and fragmented sentences.",
            formula: "Clause = [Subject] + [Predicate Verb] | Phrase = [Head Word] + [Modifiers] (No Subject-Verb combination)",
            sentenceStructures: [
                { type: "Independent Clause", structure: "Subject + Predicate (can stand alone)", example: "The telescope captured distant galaxies." },
                { type: "Dependent (Subordinate) Clause", structure: "Subordinating Conjunction + Subject + Predicate", example: "...because atmospheric conditions were ideal." },
                { type: "Prepositional Phrase", structure: "Preposition + [Determiner/Adj] + Noun", example: "under the canopy of the rainforest" },
                { type: "Participial Phrase", structure: "Present/Past Participle + Objects/Modifiers", example: "Having completed the laboratory tests, the team celebrated." },
                { type: "Appositive Phrase", structure: "Noun Phrase renaming adjacent noun", example: "Marie Curie, a pioneering nuclear physicist, won two Nobel Prizes." }
            ],
            types: [
                {
                    name: "Noun Clauses",
                    desc: "A dependent clause functioning as a subject, object, or complement: 'What you discovered is revolutionary' (Subject).",
                    examples: "She realized that the calculations were accurate (Direct Object)."
                },
                {
                    name: "Adjective (Relative) Clauses",
                    desc: "A dependent clause modifying a noun or pronoun, introduced by relative pronouns (who, which, that, whose).",
                    examples: "The algorithm that analyzed the imagery was developed in Zurich."
                },
                {
                    name: "Adverbial Clauses",
                    desc: "A dependent clause modifying a verb, adjective, or clause, indicating time, cause, condition, concession, or purpose.",
                    examples: "Although the budget was curtailed, the project concluded on schedule."
                },
                {
                    name: "Participial Phrases",
                    desc: "Acts as an adjective modifying a noun. Present participles end in -ing; past participles end in -ed or irregular V3 forms.",
                    examples: "Exhausted by the marathon, the runner collapsed on the turf."
                }
            ],
            rules: [
                "Clause vs Phrase distinction: If there is no subject performing a conjugated verb, it is a phrase. If both subject and finite verb exist, it is a clause.",
                "Dangling Modifier Rule: A participial phrase opening a sentence must logically modify the exact subject that appears immediately after the comma (Incorrect: 'Walking down the lane, the trees looked majestic' [The trees were not walking!] -> Correct: 'Walking down the lane, I admired the majestic trees').",
                "Misplaced Modifiers: Phrases should be situated as near as possible to the nouns they intend to modify to eliminate comedic or misleading ambiguity.",
                "Punctuation of introductory phrases: Prepositional or participial phrases that introduce a sentence should generally be followed by a comma if longer than four words ('In the midst of the violent thunderstorm, the beacon shone')."
            ],
            examples: [
                { text: "Driven by curiosity, the young scholar spent years deciphering the ancient cuneiform tablets.", breakdown: "Participial Phrase (Driven by curiosity) + Comma + Subject (the young scholar) + Verb + Object", highlight: "Introductory participial phrase modifying subject" },
                { text: "What surprised the international panel of judges was the contestant's remarkable humility.", breakdown: "Noun Clause as Subject (What surprised...) + Verb (was) + Subject Complement", highlight: "Noun clause functioning as grammatical subject" },
                { text: "The architectural blueprints, which were restored using laser scanning, are exhibited in the rotunda.", breakdown: "Subject + Non-defining Adjective Clause + Verb + Prepositional Phrase", highlight: "Embedded adjective relative clause" },
                { text: "While conducting field research in the Amazon, Dr. Santos documented three new species of amphibians.", breakdown: "Adverbial Clause of time + Subject + Verb + Object", highlight: "Adverbial clause specifying time" },
                { text: "To optimize thermal efficiency, modern skyscrapers utilize double-glazed insulated windows.", breakdown: "Infinitive Phrase of purpose (To optimize...) + Subject + Verb + Object", highlight: "Infinitive phrase functioning as introductory purpose modifier" }
            ],
            commonMistakes: [
                {
                    wrong: "Walking through the forest, the mushrooms were spotted by the botanist.",
                    right: "Walking through the forest, the botanist spotted the mushrooms.",
                    why: "This is a dangling modifier. The opening participial phrase ('Walking through the forest') erroneously modifies 'the mushrooms' instead of 'the botanist'."
                },
                {
                    wrong: "Because the power supply was severed.",
                    right: "Because the power supply was severed, the manufacturing plant shut down.",
                    why: "A dependent clause cannot stand alone with a period; it is a sentence fragment requiring an independent clause."
                },
                {
                    wrong: "She bought a car from a neighbor that had low mileage.",
                    right: "She bought a car that had low mileage from a neighbor.",
                    why: "Misplaced modifier: 'that had low mileage' belongs immediately next to 'car', not 'neighbor'."
                }
            ],
            specialCases: [
                {
                    title: "Absolute Phrases",
                    desc: "An absolute phrase contains a noun and a participle with its own modifier, modifying the entire sentence rather than a specific noun: 'Her voice trembling with emotion, the witness recounted the event.'",
                    example: "The storm having passed, the repair crews commenced restoring the power grid."
                }
            ],
            exercises: [
                {
                    id: "phr-cla-1",
                    question: "Identify the DANGLING MODIFIER in the following options:",
                    type: "mcq",
                    options: [
                        "Having finished the thesis, the computer was shut down by Clara.",
                        "Having finished the thesis, Clara shut down her computer.",
                        "After Clara finished her thesis, she shut down the computer.",
                        "When the thesis was finished, Clara shut down her computer."
                    ],
                    answer: "Having finished the thesis, the computer was shut down by Clara.",
                    explanation: "'Having finished the thesis' dangles because it grammatically attaches to 'the computer', which did not write or finish the thesis."
                },
                {
                    id: "phr-cla-2",
                    question: "What grammatical role does the bracketed clause play: '[What the expedition discovered in the cave] baffled geologists'?",
                    type: "mcq",
                    options: [
                        "Noun clause acting as the grammatical subject",
                        "Adverbial clause of time",
                        "Relative clause modifying geologists",
                        "Prepositional phrase"
                    ],
                    answer: "Noun clause acting as the grammatical subject",
                    explanation: "The clause begins with 'What' and operates collectively as the subject of the predicate verb 'baffled'."
                },
                {
                    id: "phr-cla-3",
                    question: "What differentiates a clause from a phrase?",
                    type: "mcq",
                    options: [
                        "A clause contains both a subject and a predicate verb, whereas a phrase does not.",
                        "A phrase is always longer than a clause.",
                        "A clause cannot contain prepositions.",
                        "A phrase always contains punctuation."
                    ],
                    answer: "A clause contains both a subject and a predicate verb, whereas a phrase does not.",
                    explanation: "The fundamental grammatical distinction is that a clause contains a subject-verb combination, while a phrase lacks one."
                },
                {
                    id: "phr-cla-4",
                    question: "Complete the sentence with an introductory participial phrase that logically modifies the subject: '___, the pilot prepared for an emergency landing.'",
                    type: "fill-in",
                    options: [
                        "Noticing the sudden loss of cabin pressure",
                        "When the cabin pressure was lost",
                        "Because the engine stopped",
                        "With the wings damaged"
                    ],
                    answer: "Noticing the sudden loss of cabin pressure",
                    explanation: "'Noticing the sudden loss of cabin pressure' is a participial phrase whose subject is logically 'the pilot'."
                }
            ],
            quickRevision: [
                "Clause = Subject + Verb (Independent: can stand alone; Dependent: cannot).",
                "Phrase = Group of words without a subject-verb pair (Noun phrase, Prepositional, Participial).",
                "Watch out for dangling modifiers: the subject after the comma MUST perform the action of the opening phrase.",
                "Noun clauses can serve as subjects, objects, or complements."
            ]
        },
        {
            id: "relative-clauses",
            title: "Relative Clauses",
            subtitle: "Defining and non-defining clauses modifying nouns using relative pronouns",
            definition: "A relative clause (adjective clause) is a dependent clause that modifies a noun or noun phrase, providing essential identification or supplementary description. It is introduced by relative pronouns (who, whom, whose, which, that) or relative adverbs (where, when, why).",
            explanation: "The central distinction in English relative clauses is between Defining (restrictive) clauses and Non-Defining (non-restrictive) clauses. Defining clauses provide indispensable information necessary to identify which entity is being referred to, take no commas, and can use 'that'. Non-defining clauses provide extra, non-essential parenthetical information, must be set off by commas, and CANNOT use 'that'.",
            formula: "Defining: Noun + who/which/that + Predicate (No commas) | Non-Defining: Noun, + who/which + Predicate, + Main Predicate (Commas required!)",
            sentenceStructures: [
                { type: "Defining Subject Relative", structure: "Noun (person) + who / that + Verb", example: "The architect who designed the library won a prestigious award." },
                { type: "Defining Object Relative", structure: "Noun (thing) + which / that / [omitted] + Subject + Verb", example: "The book (that) I purchased yesterday is fascinating." },
                { type: "Non-Defining Relative Clause", structure: "Noun, + who / which + clause, + Verb", example: "Albert Einstein, who formulated relativity, was awarded the Nobel Prize." },
                { type: "Possessive Relative Clause", structure: "Noun + whose + Noun + Predicate", example: "The author whose novel topped the bestseller list gave a lecture." },
                { type: "Relative Adverbs", structure: "Noun of place/time/reason + where / when / why", example: "The laboratory where the vaccines were formulated has received accreditation." }
            ],
            types: [
                {
                    name: "Defining (Restrictive) Clause",
                    desc: "Essential to identify the noun. If removed, the sentence loses its intended meaning. Never use commas around defining clauses; 'that' is permitted for things and people.",
                    examples: "Students who submit assignments late will incur a five percent penalty."
                },
                {
                    name: "Non-Defining (Non-Restrictive) Clause",
                    desc: "Provides bonus or incidental information about an already identified noun. MUST be separated by commas. NEVER use 'that'; use 'who' for people and 'which' for things.",
                    examples: "Mount Everest, which stands at 8,848 meters, attracts hundreds of mountaineers annually."
                },
                {
                    name: "Who vs Whom",
                    desc: "'Who' functions as the grammatical subject of the relative clause ('the woman who called'). 'Whom' functions as the object of a verb or preposition ('the woman whom I interviewed' / 'the scientist to whom we reported').",
                    examples: "The candidate whom the committee selected accepted the appointment."
                },
                {
                    name: "Contact Clause (Zero Relative Pronoun)",
                    desc: "When the relative pronoun represents the object of the relative clause, it can be dropped entirely in defining clauses.",
                    examples: "The dataset [that/which] we gathered confirmed the initial hypothesis."
                }
            ],
            rules: [
                "Comma rule: NEVER place commas around a defining relative clause. ALWAYS surround non-defining relative clauses with commas (or a comma and a period if at the end of a sentence).",
                "'That' restriction: In standard English, NEVER use 'that' in non-defining relative clauses (Incorrect: 'London, that is the capital, is busy' -> Correct: 'London, which is the capital, is busy').",
                "Preposition placement (Formal vs Informal): In formal writing, prepositions precede the relative pronoun ('the committee to which I submitted the paper'). In casual English, prepositions are stranded at the end ('the committee which I submitted the paper to'). Note: After a preposition, use 'whom' for people, never 'who' or 'that' ('to whom', 'with whom').",
                "Omission rule: You can omit the relative pronoun ONLY when it is the object of the relative clause ('The man [whom] I met'). You CANNOT omit it if it is the subject ('The man who spoke to me', NOT 'The man spoke to me').",
                "Sentential 'Which': 'Which' can refer back to an entire preceding clause or idea, separated by a comma ('The train was canceled, which caused widespread commuter delays')."
            ],
            examples: [
                { text: "The engineer who supervised the tunnel excavation received an international medal of valor.", breakdown: "Subject (The engineer) + Defining Relative Clause (who supervised...) + Predicate", highlight: "Defining subject relative clause (no commas)" },
                { text: "Oxford University, which was founded in the eleventh century, houses thirty-nine constituent colleges.", breakdown: "Proper noun (Oxford University) + Non-defining Clause with commas + Predicate", highlight: "Non-defining relative clause with 'which' and commas" },
                { text: "The researcher whose breakthrough algorithm deciphered the protein folds delivered the keynote.", breakdown: "Subject + Possessive Relative Clause (whose breakthrough...) + Predicate", highlight: "Possessive relative clause with 'whose'" },
                { text: "The diplomat to whom the ambassador delivered the communiqué initiated high-level consultations.", breakdown: "Formal fronted preposition + objective pronoun 'whom'", highlight: "Formal preposition + whom construction" },
                { text: "The laboratory team concluded the third trial ahead of schedule, which surprised everyone.", breakdown: "Independent Clause + comma + Sentential Relative Pronoun (which) referring to whole event", highlight: "Sentential relative clause modifying entire preceding clause" }
            ],
            commonMistakes: [
                {
                    wrong: "My mother, that lives in Seattle, is visiting next weekend.",
                    right: "My mother, who lives in Seattle, is visiting next weekend.",
                    why: "Never use 'that' in non-defining clauses set off by commas. Use 'who' for people."
                },
                {
                    wrong: "The device who was invented in 2021 transformed telecommunications.",
                    right: "The device that (or which) was invented in 2021 transformed telecommunications.",
                    why: "'Who' refers only to people. For objects, inanimate things, and devices, use 'which' or 'that'."
                },
                {
                    wrong: "The student, which won the debate, is my cousin.",
                    right: "The student who won the debate is my cousin.",
                    why: "Use 'who' for human beings, not 'which'. Furthermore, if identifying which student, do not use commas."
                }
            ],
            specialCases: [
                {
                    title: "Reduced Relative Clauses",
                    desc: "A relative clause can be reduced to a participial phrase by dropping the relative pronoun and the verb 'to be': 'The documents which were signed yesterday' -> 'The documents signed yesterday'.",
                    example: "Passengers arriving from non-Schengen countries must proceed to customs inspection."
                }
            ],
            exercises: [
                {
                    id: "rel-1",
                    question: "Select the sentence with the grammatically correct NON-DEFINING relative clause:",
                    type: "mcq",
                    options: [
                        "Alexander Graham Bell, who patented the telephone, was born in Edinburgh.",
                        "Alexander Graham Bell, that patented the telephone, was born in Edinburgh.",
                        "Alexander Graham Bell which patented the telephone was born in Edinburgh.",
                        "Alexander Graham Bell who patented the telephone, was born in Edinburgh."
                    ],
                    answer: "Alexander Graham Bell, who patented the telephone, was born in Edinburgh.",
                    explanation: "Non-defining clauses require commas on both sides and use 'who' (never 'that') for human beings."
                },
                {
                    id: "rel-2",
                    question: "In which sentence can the relative pronoun be safely OMITTED?",
                    type: "mcq",
                    options: [
                        "The manuscript that the archivist discovered dates from the 14th century.",
                        "The archivist who discovered the manuscript dates from the 14th century.",
                        "The manuscript that contains the ancient hymns is fragile.",
                        "The scholar who translated the text is a professor."
                    ],
                    answer: "The manuscript that the archivist discovered dates from the 14th century.",
                    explanation: "'That' is the object of 'discovered' ('the archivist discovered it'), so it can be omitted: 'The manuscript the archivist discovered...'."
                },
                {
                    id: "rel-3",
                    question: "Complete the formal relative clause: 'The distinguished physicist to ___ the grant was awarded held a press conference.'",
                    type: "fill-in",
                    options: ["whom", "who", "which", "that"],
                    answer: "whom",
                    explanation: "After a preposition ('to') referring to a human person, the objective relative pronoun 'whom' is required."
                },
                {
                    id: "rel-4",
                    question: "Choose the possessive relative pronoun: 'We interviewed the entrepreneur ___ company developed the autonomous rover.'",
                    type: "fill-in",
                    options: ["whose", "who's", "whom", "which"],
                    answer: "whose",
                    explanation: "'Whose' is the possessive relative pronoun modifying 'company' ('whose company'). 'Who's' is a contraction of 'who is'."
                }
            ],
            quickRevision: [
                "Defining clause: Essential information, NO commas, can use 'that'.",
                "Non-defining clause: Bonus/extra information, surrounded by COMMAS, NEVER use 'that' (use who/which).",
                "Relative pronoun can be dropped ONLY when it is the object of the clause.",
                "Use 'whom' after prepositions (to whom, with whom); use 'whose' for possession."
            ]
        },
        {
            id: "question-tags",
            title: "Question Tags",
            subtitle: "Mini-questions appended to declarative statements to invite confirmation or consensus",
            definition: "A question tag (tag question) is a short grammatical fragment turned into a question, added to the end of a declarative statement. It consists of an auxiliary or modal verb and a corresponding subject pronoun.",
            explanation: "In standard English, question tags adhere to the principle of reverse polarity: an affirmative statement receives a negative tag, while a negative statement receives an affirmative tag. The auxiliary verb in the tag must match the tense, aspect, and person of the verb in the main clause, and the intonation (rising vs falling) determines whether the speaker is seeking genuine confirmation or merely making conversation.",
            formula: "Affirmative Statement, + [Negative Auxiliary (contracted)] + [Pronoun]?  |  Negative Statement, + [Affirmative Auxiliary] + [Pronoun]?",
            sentenceStructures: [
                { type: "Positive Statement + Negative Tag", structure: "Subject + Verb, + Aux-n't + Pronoun?", example: "The train departs at noon, doesn't it?" },
                { type: "Negative Statement + Positive Tag", structure: "Subject + Aux-not + Verb, + Aux + Pronoun?", example: "You haven't seen my laptop charger, have you?" },
                { type: "Modal Statement Tag", structure: "Subject + Modal + Verb, + Modal-n't + Pronoun?", example: "She can play the cello, can't she?" },
                { type: "Imperative Tag", structure: "Base Verb + Object, + will / won't / would you?", example: "Pass me the wrench, will you?" },
                { type: "Let's Tag", structure: "Let's + Base Verb, + shall we?", example: "Let's review the risk calculations, shall we?" }
            ],
            types: [
                {
                    name: "Opposite Polarity Tags",
                    desc: "The standard and most frequent tag pattern: Positive sentence -> Negative tag; Negative sentence -> Positive tag.",
                    examples: "It is cold outside, isn't it? / They won't fail, will they?"
                },
                {
                    name: "Intonation Nuances",
                    desc: "Falling intonation (↘): Speaker is confident of the answer and invites agreement. Rising intonation (↗): Speaker is uncertain and genuinely asking for confirmation.",
                    examples: "You're Dr. Bennett, aren't you? (↗ = Are you really? / ↘ = I know you are; just greeting you)."
                },
                {
                    name: "Irregular 'I am' Tag",
                    desc: "The affirmative 'I am' takes the irregular negative tag 'aren't I?' (NOT 'amn't I' in standard English).",
                    examples: "I am next in line for the oral defense, aren't I?"
                },
                {
                    name: "Inherently Negative Words",
                    desc: "Statements containing negative words (never, seldom, rarely, hardly, barely, nobody, nothing) are semantically negative and take POSITIVE question tags.",
                    examples: "He rarely attends the optional seminars, does he?"
                }
            ],
            rules: [
                "Matching auxiliary: The auxiliary verb in the tag must match the tense and verb form of the main sentence. If the main sentence has no auxiliary (Present/Past Simple), use 'do/does/did' ('You like jazz, don't you?' / 'He called yesterday, didn't he?').",
                "Contracted negative tags: Negative tags are almost universally contracted in speech and writing: 'isn't it?', 'didn't she?', 'won't they?'. (The archaic uncontracted form puts the pronoun before 'not': 'is it not?').",
                "Indefinite pronouns with 'they': When the subject is an indefinite pronoun like 'everyone', 'everybody', 'someone', 'nobody', the pronoun in the tag becomes 'they', and the auxiliary verb must agree in plural ('Everyone was invited, weren't they?').",
                "Pronoun 'it' for things: When the subject is 'everything', 'something', or 'nothing', the pronoun in the tag is 'it' ('Nothing was damaged, was it?').",
                "Punctuation: Always place a comma between the declarative statement and the question tag, and conclude with a question mark."
            ],
            examples: [
                { text: "The structural foundation complies with local building codes, doesn't it?", breakdown: "Affirmative statement (complies - 3rd person present) + Comma + doesn't it?", highlight: "Do-support tag with reverse polarity" },
                { text: "Our international flight hasn't been delayed by the snowstorm, has it?", breakdown: "Negative statement (hasn't been) + Comma + Affirmative tag (has it?)", highlight: "Negative statement with positive tag" },
                { text: "I am scheduled to deliver the presentation first, aren't I?", breakdown: "Affirmative 'I am' + irregular tag 'aren't I?'", highlight: "Irregular 'I am' tag construction" },
                { text: "Nobody answered the emergency paging system, did they?", breakdown: "Negative subject (Nobody) + Past verb (answered) + Positive plural tag (did they?)", highlight: "Indefinite pronoun taking 'they' with positive polarity" },
                { text: "Let's finalize the memorandum of understanding before lunch, shall we?", breakdown: "Inclusive 'Let's' + specialized tag 'shall we?'", highlight: "Inclusive suggestion tag with 'shall we'" }
            ],
            commonMistakes: [
                {
                    wrong: "I am included in the project roster, amn't I?",
                    right: "I am included in the project roster, aren't I?",
                    why: "Standard English uses 'aren't I?' as the negative tag for 'I am'. ('Amn't' is non-standard outside certain regional dialects)."
                },
                {
                    wrong: "She never drinks coffee, doesn't she?",
                    right: "She never drinks coffee, does she?",
                    why: "The adverb 'never' makes the statement negative; therefore, the question tag must be positive ('does she?')."
                },
                {
                    wrong: "Everyone was pleased with the venue, wasn't they?",
                    right: "Everyone was pleased with the venue, weren't they?",
                    why: "Because the tag pronoun for 'everyone' is 'they', the auxiliary verb must change to the plural form 'weren't'."
                }
            ],
            specialCases: [
                {
                    title: "Same-Polarity (Copy) Tags",
                    desc: "Occasionally, an affirmative sentence takes an affirmative tag (Positive + Positive) with rising intonation to express surprise, sarcasm, or disbelief: 'So you think you're clever, do you?'",
                    example: "You bought another sports car, did you?"
                }
            ],
            exercises: [
                {
                    id: "q-tag-1",
                    question: "Complete the tag: 'They rarely arrive at the studio on time, ___?'",
                    type: "mcq",
                    options: [
                        "do they",
                        "don't they",
                        "did they",
                        "aren't they"
                    ],
                    answer: "do they",
                    explanation: "'Rarely' makes the statement negative, which requires a positive question tag with Present Simple do-support ('do they?')."
                },
                {
                    id: "q-tag-2",
                    question: "Choose the correct tag for 'I am': 'I am responsible for securing the venue, ___?'",
                    type: "fill-in",
                    options: ["aren't I", "amn't I", "am I not", "am not I"],
                    answer: "aren't I",
                    explanation: "In standard modern English, the contracted tag for 'I am' is 'aren't I?'."
                },
                {
                    id: "q-tag-3",
                    question: "Fill in the blank: 'Everybody enjoyed the musical performance, ___?'",
                    type: "fill-in",
                    options: ["didn't they", "wasn't they", "didn't he", "weren't they"],
                    answer: "didn't they",
                    explanation: "'Enjoyed' is Past Simple lexical verb requiring 'did', and 'everybody' converts to the tag pronoun 'they' ('didn't they?')."
                },
                {
                    id: "q-tag-4",
                    question: "What is the standard question tag for: 'Let's take a short coffee break'?",
                    type: "mcq",
                    options: [
                        "shall we?",
                        "will we?",
                        "don't we?",
                        "can't we?"
                    ],
                    answer: "shall we?",
                    explanation: "The standard idiomatic question tag for inclusive 'Let's' is 'shall we?'."
                }
            ],
            quickRevision: [
                "Positive statement -> Negative tag (You speak English, don't you?).",
                "Negative statement -> Positive tag (You don't smoke, do you?).",
                "I am -> aren't I? (universal rule).",
                "Words like never, rarely, seldom, nobody make the sentence negative -> need POSITIVE tag.",
                "Let's... -> shall we? | Imperatives -> will you?."
            ]
        },
        {
            id: "reported-questions",
            title: "Reported Questions",
            subtitle: "Transforming direct inquiries into indirect reported discourse without question marks or subject-auxiliary inversion",
            definition: "A reported question (indirect question) conveys an inquiry made by another speaker without using direct quotation. When reporting a question, the sentence ceases to be a direct question: question marks and auxiliary inversions are eliminated, and standard declarative word order (Subject + Verb) is restored.",
            explanation: "Reported questions fall into two syntactic types: (1) Yes/No questions, which are connected using 'if' or 'whether', and (2) WH- questions, which retain the original interrogative word (who, where, when, why, what, how) as the clause connector. As with reported speech, verbs undergo systematic backshifting if the reporting verb is in the past tense.",
            formula: "Yes/No: [Speaker] asked [recipient] if / whether + [Subject] + [Backshifted Verb] | WH-: [Speaker] asked [recipient] [WH-word] + [Subject] + [Backshifted Verb]",
            sentenceStructures: [
                { type: "Reported Yes/No Question", structure: "Subject + asked (object) + if / whether + Subject + Verb", example: "He asked if the train had departed." },
                { type: "Reported WH- Question", structure: "Subject + asked (object) + WH-word + Subject + Verb", example: "She inquired where the conference was taking place." },
                { type: "Whether or not", structure: "Subject + asked + whether (or not) + Subject + Verb (+ or not)", example: "The auditor asked whether or not the receipts were authenticated." },
                { type: "Reporting with Inquire / Wonder", structure: "Subject + wondered / inquired + WH-word / if + Subject + Verb", example: "They wondered how long the repairs would take." }
            ],
            types: [
                {
                    name: "Reporting Verbs for Questions",
                    desc: "ask, inquire, wonder, want to know, demand to know. Unlike 'tell', these verbs do not always require a personal object.",
                    examples: "She inquired whether vacancies remained. / He asked me where I lived."
                },
                {
                    name: "Whether vs If",
                    desc: "Both introduce reported Yes/No questions. However, 'whether' is preferred in formal writing, when expressing two explicit alternatives ('whether... or'), or immediately before 'or not' ('whether or not').",
                    examples: "He asked whether I intended to accept or decline the offer."
                },
                {
                    name: "Direct to Indirect Word Order Reset",
                    desc: "Direct questions have inversion (Auxiliary + Subject). Reported questions eliminate inversion (Subject + Verb) and do NOT use 'do/does/did' auxiliaries.",
                    examples: "\"Where do you live?\" -> She asked where I lived (NOT: where did I live)."
                }
            ],
            rules: [
                "NO inversion in reported questions: Standard declarative SVO order is restored. The subject MUST precede the verb (Correct: 'He asked where she was going', NOT: 'He asked where was she going').",
                "NO 'do-support' auxiliaries: Do, does, and did are completely dropped in affirmative reported questions (Direct: 'Why did you call?' -> Indirect: 'She asked why I had called', NOT 'why did I call').",
                "NO question marks: Because the overall sentence is a declarative report, it ends with a period (.), NEVER a question mark (?).",
                "Backshifting and deictic shifts: Standard reported speech shifts apply: Present -> Past; Past/Present Perfect -> Past Perfect; will -> would; here -> there; tomorrow -> the next day.",
                "'Whether' immediately followed by 'or not': You can say 'whether or not they agreed', but NEVER 'if or not they agreed'."
            ],
            examples: [
                { text: "Direct: \"Are you flying to Geneva tomorrow?\" she asked Marcus.", breakdown: "Direct Yes/No question with present continuous and time deictic", highlight: "Direct Yes/No question" },
                { text: "Indirect: She asked Marcus whether he was flying to Geneva the following day.", breakdown: "Reporting verb (asked) + personal object + whether + Subject (he) + Verb (was flying) + deictic shift", highlight: "Reported Yes/No question with 'whether'" },
                { text: "Direct: \"What time does the last express train depart?\" the tourist asked.", breakdown: "Direct WH- question with auxiliary 'does' and question mark", highlight: "Direct WH- question" },
                { text: "Indirect: The tourist asked what time the last express train departed.", breakdown: "Reporting verb + WH-phrase (what time) + Subject (train) + Past Verb (departed) + period", highlight: "Reported WH- question (no inversion, no 'does', ends with period)" },
                { text: "Direct: \"Why did the cooling pumps shut down?\" the director inquired.", breakdown: "Direct question with past auxiliary 'did'", highlight: "Direct past question" },
                { text: "Indirect: The director inquired why the cooling pumps had shut down.", breakdown: "Reporting verb (inquired) + why + Subject + Past Perfect (had shut down)", highlight: "Reported question with past perfect backshift" }
            ],
            commonMistakes: [
                {
                    wrong: "She asked me where was the nearest pharmacy.",
                    right: "She asked me where the nearest pharmacy was.",
                    why: "Reported questions do not use subject-auxiliary inversion. The subject ('the nearest pharmacy') must precede the verb ('was')."
                },
                {
                    wrong: "He asked me why did I leave the company.",
                    right: "He asked me why I had left the company.",
                    why: "Do not retain the auxiliary 'did' in reported questions. Use standard declarative word order with backshifted past perfect ('why I had left')."
                },
                {
                    wrong: "I wonder if or not the flight is delayed.",
                    right: "I wonder whether or not the flight is delayed. (OR: I wonder if the flight is delayed or not.)",
                    why: "'Or not' can immediately follow 'whether', but cannot directly follow 'if'."
                }
            ],
            specialCases: [
                {
                    title: "Reported questions with infinitives",
                    desc: "When the subject of the reported question is the same as the main subject and involves a choice or duty, a WH-word can be followed by a to-infinitive: 'She asked how to operate the machinery' / 'He wondered what to do next'.",
                    example: "The new recruit asked where to submit his security badge."
                }
            ],
            exercises: [
                {
                    id: "rep-q-1",
                    question: "Transform into a reported question: '\"Where did you purchase this vintage lens?\" Arthur asked me.'",
                    type: "mcq",
                    options: [
                        "Arthur asked me where I had purchased that vintage lens.",
                        "Arthur asked me where did I purchase that vintage lens.",
                        "Arthur asked me where I purchased this vintage lens?",
                        "Arthur asked me where had I purchased that vintage lens."
                    ],
                    answer: "Arthur asked me where I had purchased that vintage lens.",
                    explanation: "Drop auxiliary 'did', backshift past simple to past perfect ('had purchased'), adjust 'this' to 'that', restore declarative word order, and end with a period."
                },
                {
                    id: "rep-q-2",
                    question: "Which of the following sentences correctly maintains DECLARATIVE word order in a reported question?",
                    type: "mcq",
                    options: [
                        "The inspector asked why the alarm had sounded.",
                        "The inspector asked why had the alarm sounded.",
                        "The inspector asked why did the alarm sound.",
                        "The inspector asked why the alarm had sounded?"
                    ],
                    answer: "The inspector asked why the alarm had sounded.",
                    explanation: "The subject ('the alarm') precedes the verb ('had sounded'), and the sentence ends with a period without question inversion."
                },
                {
                    id: "rep-q-3",
                    question: "Complete the formal reported sentence: 'The director wanted to know ___ or not the budget had been approved.'",
                    type: "fill-in",
                    options: ["whether", "if", "that", "how"],
                    answer: "whether",
                    explanation: "When followed immediately by 'or not', 'whether' is the grammatically required connector."
                },
                {
                    id: "rep-q-4",
                    question: "Convert the Yes/No question: '\"Do you speak German?\" the interviewer inquired.'",
                    type: "mcq",
                    options: [
                        "The interviewer inquired if I spoke German.",
                        "The interviewer inquired if I do speak German.",
                        "The interviewer inquired did I speak German.",
                        "The interviewer inquired if do I speak German."
                    ],
                    answer: "The interviewer inquired if I spoke German.",
                    explanation: "Yes/No questions take 'if/whether', auxiliary 'do' is dropped, and the main verb backshifts to Past Simple ('spoke')."
                }
            ],
            quickRevision: [
                "NO inversion: Subject comes BEFORE the verb (He asked where I lived, NOT where did I live).",
                "Drop auxiliaries 'do', 'does', and 'did'.",
                "Yes/No questions use 'if' or 'whether'.",
                "End with a PERIOD (.), never a question mark (?).",
                "Standard backshifting and pronoun rules apply."
            ]
        },
        {
            id: "comparison-adjectives-adverbs",
            title: "Comparison of Adjectives and Adverbs",
            subtitle: "Positive, comparative, and superlative degrees of modifiers, equative structures, and proportional comparisons",
            definition: "Comparison allows speakers to indicate relative degrees of quality, quantity, manner, or intensity between entities. Adjectives and adverbs possess three degrees of comparison: Positive (base quality), Comparative (comparing two entities), and Superlative (comparing three or more entities).",
            explanation: "Short one-syllable modifiers typically form comparatives and superlatives by adding '-er' and '-est', while longer multi-syllable modifiers use 'more' and 'most'. In addition, English features irregular comparison systems (good/better/best), equative comparisons with 'as... as', and double comparative constructions showing proportional correlation ('the more... the better').",
            formula: "Comparative: [Short-Adj + -er] / [more + Long-Adj] + than | Superlative: the + [Short-Adj + -est] / [the most + Long-Adj] | Equative: as + [Adj/Adv] + as",
            sentenceStructures: [
                { type: "Comparative Degree", structure: "Subject + Verb + Comparative Adjective/Adverb + than + Object", example: "Titanium is lighter and stronger than steel." },
                { type: "Superlative Degree", structure: "Subject + Verb + the + Superlative Adjective/Adverb + of / in + Group", example: "Jupiter is the largest planet in our solar system." },
                { type: "Equative Degree", structure: "Subject + Verb + as + Positive Adjective/Adverb + as + Object", example: "The optical sensor is as sensitive as human eyesight." },
                { type: "Negative Equative", structure: "Subject + Verb-not + as / so + Adj/Adv + as + Object", example: "The draft was not as comprehensive as the final report." },
                { type: "Proportional Double Comparative", structure: "The + comparative..., the + comparative...", example: "The more sophisticated the algorithm, the more accurate the predictions." }
            ],
            types: [
                {
                    name: "Regular One-Syllable Modifiers",
                    desc: "Add -er and -est. Spelling adjustments: double final consonant for CVC words (hot -> hotter -> hottest); drop silent -e (large -> larger -> largest).",
                    examples: "tall -> taller -> tallest; fast -> faster -> fastest."
                },
                {
                    name: "Two-Syllable Modifiers ending in -y",
                    desc: "Change -y to -i and add -er and -est.",
                    examples: "easy -> easier -> easiest; heavy -> heavier -> heaviest; happy -> happier -> happiest."
                },
                {
                    name: "Multi-Syllable Modifiers (Two or more syllables)",
                    desc: "Use 'more' for comparative and 'the most' for superlative.",
                    examples: "efficient -> more efficient -> the most efficient; meticulously -> more meticulously -> most meticulously."
                },
                {
                    name: "Irregular Modifiers",
                    desc: "good/well -> better -> best | bad/badly -> worse -> worst | far -> farther (physical distance) / further (abstract extent) -> farthest/furthest | little -> less -> least | much/many -> more -> most.",
                    examples: "The economic climate grew worse before it grew better."
                }
            ],
            rules: [
                "Avoid double comparatives/superlatives: Never combine '-er' with 'more' or '-est' with 'most' (Incorrect: 'more easier' -> Correct: 'easier'; Incorrect: 'most fastest' -> Correct: 'fastest').",
                "Than vs Then: Always use 'than' for comparisons of degree ('She is taller than her brother'). 'Then' refers exclusively to time or sequence ('We ate, then we departed').",
                "Superlative article 'the': Superlative adjectives modifying a noun require the definite article 'the' ('the highest mountain').",
                "Comparing two vs three or more: Use comparative degree when comparing exactly two items ('Between the two candidates, she is the more experienced'). Use superlative when comparing three or more ('Among the three candidates, she is the most experienced').",
                "Modifiers of comparison: You can qualify the degree of difference using modifiers: 'far', 'much', 'significantly', 'slightly', 'a little', 'a bit' before comparatives ('much more efficient', 'far better', 'slightly taller'). NEVER use 'very' directly with a comparative (Incorrect: 'very better' -> Correct: 'much better')."
            ],
            examples: [
                { text: "Fiber-optic networks transmit digital data significantly faster than conventional copper cables.", breakdown: "Subject + Verb + Degree modifier (significantly) + Comparative (faster) + than + Object", highlight: "Modified comparative degree" },
                { text: "The Mariana Trench is the deepest oceanic depression documented on Earth.", breakdown: "Subject + Verb + the + Superlative (deepest) + Noun + prepositional realm", highlight: "Superlative degree with 'the'" },
                { text: "The revised prototype is nearly as lightweight as the carbon-fiber composite model.", breakdown: "Subject + Verb + adverb + as + Positive Adj (lightweight) + as + Object", highlight: "Equative comparison with 'as... as'" },
                { text: "The deeper researchers probe into quantum mechanics, the more enigmatic reality appears.", breakdown: "The + comparative (deeper) + clause, the + comparative (more enigmatic) + clause", highlight: "Proportional double comparative" },
                { text: "Without further empirical evidence, we cannot substantiate this speculative claim.", breakdown: "Preposition + Irregular comparative (further = additional abstract extent) + noun", highlight: "Irregular comparative 'further' for figurative extent" }
            ],
            commonMistakes: [
                {
                    wrong: "This problem is much more easier to resolve.",
                    right: "This problem is much easier to resolve.",
                    why: "Do not use 'more' with adjectives that already take '-er'. Say 'much easier', not 'more easier'."
                },
                {
                    wrong: "She is very taller then her sister.",
                    right: "She is much taller than her sister.",
                    why: "Use 'much' or 'far' to intensify comparatives, never 'very'. Also use 'than' for comparisons, not 'then'."
                },
                {
                    wrong: "Of the two designs, the second is the best.",
                    right: "Of the two designs, the second is the better.",
                    why: "When comparing exactly two items, standard grammar requires the comparative degree ('better'), not the superlative ('best')."
                }
            ],
            specialCases: [
                {
                    title: "Latin Comparatives with 'To'",
                    desc: "A group of comparative adjectives borrowed from Latin (senior, junior, superior, inferior, prior, posterior, preferable) are followed by the preposition 'to', NEVER 'than'.",
                    example: "His technical experience is superior to that of his competitors."
                }
            ],
            exercises: [
                {
                    id: "comp-1",
                    question: "Complete the sentence: 'Between the two proposed architectural models, this blueprint is ___.'",
                    type: "mcq",
                    options: [
                        "the more viable",
                        "the most viable",
                        "more viable than",
                        "most viable"
                    ],
                    answer: "the more viable",
                    explanation: "When comparing exactly two options ('Between the two...'), standard grammar requires the comparative degree with 'the': 'the more viable'."
                },
                {
                    id: "comp-2",
                    question: "Which word correctly completes the comparison with Latin-derived adjectives: 'Organic LED screens are superior ___ legacy LCD panels.'",
                    type: "fill-in",
                    options: ["to", "than", "then", "from"],
                    answer: "to",
                    explanation: "Adjectives like 'superior', 'inferior', 'senior', and 'preferable' take the preposition 'to', never 'than'."
                },
                {
                    id: "comp-3",
                    question: "Choose the correct proportional comparative structure:",
                    type: "mcq",
                    options: [
                        "The higher you climb, the colder the air becomes.",
                        "The highest you climb, the coldest the air becomes.",
                        "Higher you climb, colder the air becomes.",
                        "The more you climb high, the more air becomes cold."
                    ],
                    answer: "The higher you climb, the colder the air becomes.",
                    explanation: "The proportional structure uses 'The + comparative..., the + comparative...'."
                },
                {
                    id: "comp-4",
                    question: "Why is 'The engine is very faster' grammatically incorrect?",
                    type: "mcq",
                    options: [
                        "'Very' cannot modify comparative adjectives; use 'much', 'far', or 'significantly' instead.",
                        "'Faster' is an irregular adjective.",
                        "'Engine' is a machine, not a living entity.",
                        "Comparatives cannot be intensified."
                    ],
                    answer: "'Very' cannot modify comparative adjectives; use 'much', 'far', or 'significantly' instead.",
                    explanation: "Comparatives are intensified using 'much', 'far', 'considerably', or 'significantly', never 'very'."
                }
            ],
            quickRevision: [
                "Short adjectives: -er / -est (taller, the tallest).",
                "Long adjectives: more / the most (more complex, the most complex).",
                "Two-syllable -y words: change y to i (easier, easiest).",
                "Never use double comparatives (NO 'more easier').",
                "Use 'than' for comparison, not 'then'.",
                "Latin comparatives (superior, inferior, senior, junior, preferable) take 'to', NOT 'than'."
            ]
        }
    ]
};

