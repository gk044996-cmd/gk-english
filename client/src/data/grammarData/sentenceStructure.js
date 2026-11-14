// Sentence Structure Curriculum (8 comprehensive lessons)
export const sentenceStructure = {
    category: "Sentence Structure",
    description: "Master English clause architecture: core constituents, sentence classifications, speech acts, and agreement principles.",
    topics: [
        {
            id: "subject-verb-object",
            title: "Subject, Verb and Object",
            subtitle: "The foundational syntax of English sentences: actors, actions, and recipients",
            definition: "The Subject-Verb-Object (SVO) pattern is the standard grammatical word order in English affirmative declarative clauses, where the subject performs the action, the verb expresses the action or state, and the object receives the action.",
            explanation: "In English, word order largely replaces inflectional case endings found in other languages. The Subject identifies who or what performs the action or exists in a state; the Verb represents the action, occurrence, or relation; and the Object is the entity impacted by the verb. Verbs can be transitive (requiring a direct object), ditransitive (taking both indirect and direct objects), intransitive (requiring no object), or linking (requiring a subject complement).",
            formula: "[Subject] + [Verb] + [Direct Object] (+ [Indirect Object / Prepositional Object])",
            sentenceStructures: [
                { type: "S-V (Intransitive)", structure: "Subject + Intransitive Verb", example: "The birds migrated south. / The baby slept peacefully." },
                { type: "S-V-O (Transitive)", structure: "Subject + Transitive Verb + Direct Object", example: "The architect designed the museum." },
                { type: "S-V-IO-DO (Ditransitive)", structure: "Subject + Verb + Indirect Object + Direct Object", example: "Elena handed Marcus the confidential file." },
                { type: "S-V-DO-to/for-IO (Prepositional Ditransitive)", structure: "Subject + Verb + Direct Object + to/for + Indirect Object", example: "Elena handed the confidential file to Marcus." },
                { type: "S-V-C (Linking Verb + Complement)", structure: "Subject + Linking Verb + Subject Complement (Adjective/Noun)", example: "The hypothesis remains controversial. / Maya became an astronaut." }
            ],
            types: [
                {
                    name: "Direct Object (DO)",
                    desc: "The person or thing directly acted upon by the transitive verb. Answers 'What?' or 'Whom?' after the verb.",
                    examples: "She bought a telescope (Bought what? A telescope)."
                },
                {
                    name: "Indirect Object (IO)",
                    desc: "The beneficiary or recipient of the direct object. Answers 'To whom?' or 'For whom?' the action is performed.",
                    examples: "He sent his sister (IO) a postcard (DO)."
                },
                {
                    name: "Subject Complement",
                    desc: "Follows a linking verb (be, become, seem, appear, remain) and renames or describes the subject rather than receiving an action.",
                    examples: "The solution seems viable (adjective complement); She is a physicist (noun complement)."
                },
                {
                    name: "Object Complement",
                    desc: "Follows and modifies or renames the direct object.",
                    examples: "The committee appointed Liam chairperson; They painted the fence white."
                }
            ],
            rules: [
                "Strict SVO word order: Standard English does not freely rearrange core constituents. 'The dog bit the man' has a drastically different meaning from 'The man bit the dog'.",
                "Intransitive verbs cannot take direct objects: Verbs like 'sleep', 'arrive', 'die', 'vanish', and 'sneeze' do not transfer action onto an object (NEVER: 'He arrived the station' -> 'He arrived AT the station').",
                "Dative shift (Two object patterns): Ditransitive verbs (give, send, bring, lend, buy, offer) allow two configurations: Verb + IO + DO ('give her the key') OR Verb + DO + preposition + IO ('give the key to her').",
                "Pronoun case in object position: Pronouns serving as direct or indirect objects must take objective case forms: me, him, her, us, them, whom (NOT I, he, she, we, they, who).",
                "Linking verbs do not take adverbs: Linking verbs (look, smell, taste, sound, feel, seem) connect the subject to an adjective complement, not an adverb ('The stew smells delicious', NOT 'deliciously')."
            ],
            examples: [
                { text: "The biomedical startup developed a synthetic heart valve.", breakdown: "Subject (The biomedical startup) + Transitive Verb (developed) + Direct Object (a synthetic heart valve)", highlight: "Standard SVO pattern" },
                { text: "The professor offered the graduate student a research grant.", breakdown: "Subject (The professor) + Verb (offered) + Indirect Object (the graduate student) + Direct Object (a research grant)", highlight: "Ditransitive S-V-IO-DO pattern" },
                { text: "The professor offered a research grant to the graduate student.", breakdown: "Subject + Verb + Direct Object + prepositional Indirect Object", highlight: "Prepositional dative shift" },
                { text: "After twelve hours of deliberations, the jury reached a verdict.", breakdown: "Prepositional time phrase + Subject (the jury) + Verb (reached) + Direct Object (a verdict)", highlight: "SVO preceded by introductory phrase" },
                { text: "The freshly baked sourdough bread smells extraordinary.", breakdown: "Subject (The bread) + Linking Verb (smells) + Subject Complement Adjective (extraordinary)", highlight: "Linking verb with adjective complement" }
            ],
            commonMistakes: [
                {
                    wrong: "The courier delivered him the parcel.",
                    right: "The courier delivered the parcel to him.",
                    why: "Not all ditransitive verbs allow the Verb + IO + DO pattern. Verbs of Latin origin like 'deliver', 'explain', 'suggest', and 'describe' require 'to + recipient'."
                },
                {
                    wrong: "The manager gave the project to Sarah and I.",
                    right: "The manager gave the project to Sarah and me.",
                    why: "Objects of prepositions require the objective case pronoun ('me'), not the subjective case ('I')."
                },
                {
                    wrong: "The soup tastes deliciously.",
                    right: "The soup tastes delicious.",
                    why: "'Taste' functions here as a linking verb connecting to a sensory quality, which requires an adjective ('delicious'), not an adverb."
                }
            ],
            specialCases: [
                {
                    title: "Ergative (Labile) Verbs",
                    desc: "Some verbs can be transitive or intransitive with the same core noun moving between subject and object position: 'The chef melted the butter' (transitive SVO) vs 'The butter melted' (intransitive SV).",
                    example: "The driver stopped the car (transitive) / The car stopped abruptly (intransitive)."
                }
            ],
            exercises: [
                {
                    id: "svo-1",
                    question: "Identify the DIRECT object in: 'Dr. Watson lent Sherlock his pocket magnifier.'",
                    type: "mcq",
                    options: [
                        "his pocket magnifier",
                        "Sherlock",
                        "Dr. Watson",
                        "lent"
                    ],
                    answer: "his pocket magnifier",
                    explanation: "'His pocket magnifier' is the thing being lent (Direct Object); 'Sherlock' is the recipient (Indirect Object)."
                },
                {
                    id: "svo-2",
                    question: "Which verb requires a preposition when introducing a recipient?",
                    type: "mcq",
                    options: [
                        "explain",
                        "give",
                        "send",
                        "tell"
                    ],
                    answer: "explain",
                    explanation: "You say 'explain something to someone' (NEVER 'explain someone something'). 'Give', 'send', and 'tell' allow direct dative shift."
                },
                {
                    id: "svo-3",
                    question: "Complete the sentence with the correct pronoun: 'Between you and ___, the proposal will be rejected.'",
                    type: "fill-in",
                    options: ["me", "I", "myself", "mine"],
                    answer: "me",
                    explanation: "'Between' is a preposition; objects of prepositions require the objective case pronoun 'me'."
                },
                {
                    id: "svo-4",
                    question: "Select the sentence with an intransitive verb (no direct object):",
                    type: "mcq",
                    options: [
                        "The golden retriever slept under the shaded veranda.",
                        "The golden retriever chased the tennis ball.",
                        "The golden retriever caught the flying disc.",
                        "The golden retriever buried a bone."
                    ],
                    answer: "The golden retriever slept under the shaded veranda.",
                    explanation: "'Slept' is intransitive; 'under the shaded veranda' is a prepositional modifier indicating location, not an object receiving an action."
                }
            ],
            quickRevision: [
                "Basic English word order: Subject + Verb + Object (SVO).",
                "Direct Object answers 'What?' or 'Whom?'; Indirect Object answers 'To/For whom?'.",
                "Linking verbs (seem, look, smell, taste, be) take adjective/noun complements, not adverbs.",
                "Always use objective pronouns (me, him, her, us, them) after verbs and prepositions."
            ]
        },
        {
            id: "types-of-sentences",
            title: "Types of Sentences",
            subtitle: "Structural classification: Simple, Compound, Complex, and Compound-Complex clauses",
            definition: "Sentences are classified structurally based on the number and type of clauses (independent and dependent) they contain: Simple, Compound, Complex, and Compound-Complex.",
            explanation: "An independent clause contains a subject and predicate and expresses a complete thought (can stand alone as a sentence). A dependent (subordinate) clause contains a subject and predicate but begins with a subordinator (e.g., because, although, since) and cannot stand alone. Combining these clauses in various configurations allows writers to express relationships of equality, subordination, and nuanced complexity.",
            formula: "Simple = 1 Indep | Compound = Indep + FANBOYS + Indep | Complex = Indep + Dep (or Dep, + Indep) | Compound-Complex = 2+ Indep + 1+ Dep",
            sentenceStructures: [
                { type: "Simple Sentence", structure: "1 Independent Clause (Subject + Predicate)", example: "The Hubble Space Telescope revolutionized astronomy." },
                { type: "Compound Sentence", structure: "Independent Clause + Coordinating Conjunction (FANBOYS) or Semicolon + Independent Clause", example: "The laboratory completed the tests, and the board approved the report." },
                { type: "Complex Sentence", structure: "Independent Clause + Subordinating Conjunction + Dependent Clause (or vice versa)", example: "Although the storm severed power lines, the emergency generators kicked in immediately." },
                { type: "Compound-Complex Sentence", structure: "At least 2 Independent Clauses + at least 1 Dependent Clause", example: "Because the budget was reduced, the team postponed the launch, but they maintained research activities." }
            ],
            types: [
                {
                    name: "Simple Sentence",
                    desc: "Contains a single independent clause with one subject-predicate nexus. It may contain compound subjects ('Ana and Ben arrived') or compound verbs ('Ana sang and danced') while remaining structurally simple.",
                    examples: "Global trade routes expanded rapidly in the nineteenth century."
                },
                {
                    name: "Compound Sentence",
                    desc: "Contains two or more independent clauses joined by a coordinating conjunction (For, And, Nor, But, Or, Yet, So = FANBOYS), a semicolon (;), or a conjunctive adverb with semicolon.",
                    examples: "The dataset was vast, so the algorithms required twenty hours to process it."
                },
                {
                    name: "Complex Sentence",
                    desc: "Contains one independent clause and at least one dependent (subordinate) clause introduced by words like although, because, since, if, while, unless, or relative pronouns (who, which, that).",
                    examples: "Unless we secure the patent before August, rival firms may exploit the technology."
                },
                {
                    name: "Compound-Complex Sentence",
                    desc: "Combines compound and complex structures: two or more independent clauses plus one or more subordinate clauses.",
                    examples: "When the ceasefire took effect, diplomatic envoys met in Geneva, and both nations released their detainees."
                }
            ],
            rules: [
                "FANBOYS punctuation: In compound sentences, always place a comma before the coordinating conjunction (For, And, Nor, But, Or, Yet, So) when connecting two independent clauses.",
                "Comma with introductory dependent clause: If the dependent clause begins the sentence, place a comma after it ('Although it was freezing, we walked'). If the independent clause comes first, generally do NOT use a comma ('We walked although it was freezing').",
                "Avoid comma splices: Joining two independent clauses with only a comma (without a conjunction) is a serious grammatical error known as a comma splice. Fix with: (1) period, (2) comma + FANBOYS, or (3) semicolon.",
                "Avoid sentence fragments: A dependent clause left standing by itself with a period ('Because he was exhausted.') is an incomplete fragment. Attach it to an independent clause.",
                "Semicolon usage: A semicolon can link two closely related independent clauses without any conjunction ('The experiment succeeded; the replication failed')."
            ],
            examples: [
                { text: "The ancient aqueduct supplied water to over one hundred fountains.", breakdown: "One Subject (The aqueduct) + One Predicate (supplied...) -> 1 Independent Clause", highlight: "Simple sentence" },
                { text: "The harvest was exceptionally bountiful, but transport bottlenecks prevented timely distribution.", breakdown: "Independent Clause 1 + Comma + Coordinating Conjunction (but) + Independent Clause 2", highlight: "Compound sentence" },
                { text: "Since the global supply chain experienced disruptions, component prices surged by twenty percent.", breakdown: "Dependent Clause (Since...) + Comma + Independent Clause", highlight: "Complex sentence (introductory dependent clause)" },
                { text: "Although the cybersecurity audit revealed minor vulnerabilities, the encryption protocols remained uncompromised, and the clients praised the infrastructure.", breakdown: "Dependent Clause (Although...) + Independent Clause 1 + and + Independent Clause 2", highlight: "Compound-complex sentence" },
                { text: "Solar panels convert sunlight into electricity; wind turbines harness atmospheric kinetic energy.", breakdown: "Independent Clause 1 + Semicolon + Independent Clause 2", highlight: "Compound sentence joined by semicolon" }
            ],
            commonMistakes: [
                {
                    wrong: "The presentation concluded on time, the audience gave a standing ovation.",
                    right: "The presentation concluded on time, and the audience gave a standing ovation. (OR: The presentation concluded on time; the audience gave a standing ovation.)",
                    why: "This is a comma splice. Two independent clauses cannot be glued together with just a comma; use a comma + coordinating conjunction or a semicolon."
                },
                {
                    wrong: "Because the server overheated during peak traffic hours.",
                    right: "Because the server overheated during peak traffic hours, the application crashed.",
                    why: "A dependent clause starting with 'Because' is a sentence fragment if it lacks an independent main clause."
                },
                {
                    wrong: "Although he had a valid visa but he was detained at the border.",
                    right: "Although he had a valid visa, he was detained at the border. (OR: He had a valid visa, but he was detained at the border.)",
                    why: "Do not use both a subordinating conjunction ('although') and a coordinating conjunction ('but') in the same two-clause structure."
                }
            ],
            specialCases: [
                {
                    title: "Conjunctive Adverbs",
                    desc: "Words like 'however', 'therefore', 'moreover', 'nevertheless', and 'consequently' are conjunctive adverbs, NOT coordinating conjunctions. When joining independent clauses, precede them with a semicolon and follow with a comma.",
                    example: "The market expanded rapidly; however, supply constraints capped total revenue."
                }
            ],
            exercises: [
                {
                    id: "tos-1",
                    question: "Identify the sentence type: 'Although the team faced severe resource shortages, they met the launch deadline.'",
                    type: "mcq",
                    options: [
                        "Complex",
                        "Compound",
                        "Simple",
                        "Compound-Complex"
                    ],
                    answer: "Complex",
                    explanation: "It contains one dependent clause introduced by 'Although' and one independent clause ('they met the launch deadline'), making it a Complex sentence."
                },
                {
                    id: "tos-2",
                    question: "Which of the following is a COMMA SPLICE?",
                    type: "mcq",
                    options: [
                        "The library closed at nine, we continued studying at the café.",
                        "The library closed at nine, so we continued studying at the café.",
                        "When the library closed at nine, we continued studying at the café.",
                        "The library closed at nine; we continued studying at the café."
                    ],
                    answer: "The library closed at nine, we continued studying at the café.",
                    explanation: "Joining two complete independent clauses with only a comma and no coordinating conjunction is a classic comma splice."
                },
                {
                    id: "tos-3",
                    question: "What makes a sentence 'Compound-Complex'?",
                    type: "mcq",
                    options: [
                        "It has at least two independent clauses and at least one dependent clause.",
                        "It contains two subjects and two verbs in a single clause.",
                        "It uses both active and passive voice.",
                        "It contains more than twenty words."
                    ],
                    answer: "It has at least two independent clauses and at least one dependent clause.",
                    explanation: "A compound-complex sentence structurally requires 2+ independent clauses plus 1+ dependent (subordinate) clause."
                },
                {
                    id: "tos-4",
                    question: "Complete the sentence with the correct conjunction: 'The experiment was risky, ___ the researchers proceeded with caution.'",
                    type: "fill-in",
                    options: ["yet", "because", "although", "since"],
                    answer: "yet",
                    explanation: "'Yet' is a coordinating conjunction (FANBOYS) that expresses contrast between two independent clauses separated by a comma."
                }
            ],
            quickRevision: [
                "Simple = 1 independent clause.",
                "Compound = 2+ independent clauses joined by FANBOYS (for, and, nor, but, or, yet, so) or a semicolon.",
                "Complex = 1 independent clause + 1+ dependent clause (subordinating conjunction like although, because, since).",
                "Compound-Complex = 2+ independent clauses + 1+ dependent clause.",
                "Never glue two independent clauses with only a comma (avoid comma splices)."
            ]
        },
        {
            id: "affirmative-sentences",
            title: "Affirmative Sentences",
            subtitle: "Positive declarative statements expressing facts, assertions, and conditions",
            definition: "An affirmative sentence (positive declarative sentence) states that a fact is true, an event occurs, or a condition exists, without any negative words.",
            explanation: "Affirmative sentences constitute the most frequent sentence form in communication. In English, affirmative statements adhere strictly to canonical word order: Subject + Predicate (Verb + Objects / Complements + Adverbial Modifiers). Emphatic affirmative sentences can also insert the auxiliary 'do/does/did' to affirm a statement forcefully.",
            formula: "Subject + Auxiliary (optional) + Main Verb + Object/Complement + Adverbial Modifiers",
            sentenceStructures: [
                { type: "Standard Affirmative", structure: "Subject + Verb + Object", example: "The telescope detects faint infrared emissions." },
                { type: "Affirmative with Modal", structure: "Subject + Modal Aux + Bare Verb + Object", example: "Our analysts can interpret the financial disclosures." },
                { type: "Emphatic Affirmative", structure: "Subject + do/does/did + Base Verb", example: "I do understand the risks involved in this investment." },
                { type: "Affirmative with Adverb of Frequency", structure: "Subject + Frequency Adverb + Main Verb (or Aux + Adverb + Verb)", example: "She always verifies data sources before publishing." }
            ],
            types: [
                {
                    name: "Simple Affirmative",
                    desc: "A direct positive statement about a single state, action, or habit.",
                    examples: "Oxygen supports combustion."
                },
                {
                    name: "Emphatic Affirmative",
                    desc: "Uses the auxiliary 'do/does/did' in positive statements to emphasize conviction or contradict a prior doubt.",
                    examples: "I did send the attachment yesterday! / She does speak German fluently."
                },
                {
                    name: "Complex Affirmative",
                    desc: "An affirmative assertion containing subordinate clauses or relative qualifications.",
                    examples: "Scientists who study marine ecology discover new organisms annually."
                }
            ],
            rules: [
                "Canonical word order: In affirmative statements, the subject precedes the verb. Inversion only occurs in specialized stylistic constructions (e.g. negative adverb opening: 'Seldom have I seen...').",
                "Adverbs of frequency placement: Frequency adverbs (always, usually, often, never, rarely) appear before the main verb ('He always arrives early'), but after the verb 'to be' ('She is always punctual') and after the first auxiliary ('They have always supported us').",
                "Emphatic 'do': When 'do/does/did' is added to an affirmative sentence for emphasis, the main verb must be in its base infinitive ('He does want to join', NOT 'He does wants').",
                "Modifier placement: Place adverbs and prepositional phrases close to the words they modify to prevent ambiguous or dangling meanings."
            ],
            examples: [
                { text: "The European Space Agency launched the environmental monitoring satellite on schedule.", breakdown: "Subject (ESA) + Past Verb (launched) + Direct Object (satellite) + Adverbial (on schedule)", highlight: "Standard affirmative declaration" },
                { text: "Despite initial skepticism, the board did approve the renewable energy transition plan.", breakdown: "Concessive phrase + Subject (the board) + did (emphatic auxiliary) + base verb (approve)", highlight: "Emphatic affirmative sentence" },
                { text: "Renewable solar installations have increased exponentially across sunny provinces.", breakdown: "Subject + have increased (aux + V3) + adverb + prepositional location", highlight: "Present perfect affirmative" },
                { text: "The research team consistently adheres to rigorous ethical benchmarks.", breakdown: "Subject + Frequency adverb (consistently) + Verb (adheres) + prepositional object", highlight: "Affirmative with frequency adverb" },
                { text: "Every passenger must fasten their seatbelt prior to departure.", breakdown: "Subject + Modal (must) + Bare Verb (fasten) + Object + time phrase", highlight: "Modal affirmative requirement" }
            ],
            commonMistakes: [
                {
                    wrong: "Always he arrives on time for lectures.",
                    right: "He always arrives on time for lectures.",
                    why: "Adverbs of frequency typically belong between the subject and the main verb, not at the absolute start of a standard affirmative clause."
                },
                {
                    wrong: "She does works very hard in the clinic.",
                    right: "She does work very hard in the clinic.",
                    why: "When using emphatic 'does', the main verb must revert to its bare base form 'work'."
                },
                {
                    wrong: "The committee approved yesterday the proposed budget.",
                    right: "The committee approved the proposed budget yesterday.",
                    why: "In English, do not place time adverbs between the transitive verb ('approved') and its direct object ('the proposed budget')."
                }
            ],
            specialCases: [
                {
                    title: "Affirmative sentences with inherently negative words",
                    desc: "Words like 'barely', 'scarcely', 'hardly', and 'rarely' are grammatically affirmative in structure (no 'not') but semantically negative. They take positive question tags: 'She rarely speaks, does she?'",
                    example: "They barely finished the exam before the bell rang."
                }
            ],
            exercises: [
                {
                    id: "aff-1",
                    question: "Which sentence displays the correct placement of the adverb of frequency?",
                    type: "mcq",
                    options: [
                        "Marcus is always prepared for the weekly briefing.",
                        "Marcus always is prepared for the weekly briefing.",
                        "Always Marcus is prepared for the weekly briefing.",
                        "Marcus is prepared always for the weekly briefing."
                    ],
                    answer: "Marcus is always prepared for the weekly briefing.",
                    explanation: "Adverbs of frequency follow the verb 'to be' ('is always prepared')."
                },
                {
                    id: "aff-2",
                    question: "Select the sentence with correct emphatic affirmative structure:",
                    type: "mcq",
                    options: [
                        "I did submit the application before the 5 PM deadline.",
                        "I did submitted the application before the 5 PM deadline.",
                        "I did submits the application before the 5 PM deadline.",
                        "I did submitting the application before the 5 PM deadline."
                    ],
                    answer: "I did submit the application before the 5 PM deadline.",
                    explanation: "After emphatic 'did', the main verb must remain in its bare base form 'submit'."
                },
                {
                    id: "aff-3",
                    question: "Complete the sentence with proper object-adverb order: 'The pilot landed ___.'",
                    type: "mcq",
                    options: [
                        "the aircraft safely on the runway",
                        "safely the aircraft on the runway",
                        "on the runway safely the aircraft",
                        "the aircraft on the runway safely"
                    ],
                    answer: "the aircraft safely on the runway",
                    explanation: "Transitive verbs should be immediately followed by their direct object ('the aircraft') before adverbial manner ('safely') and location ('on the runway')."
                },
                {
                    id: "aff-4",
                    question: "What is the function of 'does' in: 'She does know the solution'?",
                    type: "mcq",
                    options: [
                        "It emphasizes the positive truth of the statement.",
                        "It makes the sentence a question.",
                        "It makes the sentence negative.",
                        "It indicates past tense."
                    ],
                    answer: "It emphasizes the positive truth of the statement.",
                    explanation: "'Does' used in an affirmative declarative sentence serves as an emphatic marker to stress conviction or resolve doubt."
                }
            ],
            quickRevision: [
                "Follows canonical Subject + Verb + Object order.",
                "Adverbs of frequency go BEFORE the main verb, but AFTER the verb 'to be' and auxiliaries.",
                "Do not place time/manner adverbs between a transitive verb and its direct object.",
                "Emphatic do/does/did is followed by the bare base verb."
            ]
        },
        {
            id: "negative-sentences",
            title: "Negative Sentences",
            subtitle: "Expressing denial, falsity, contradiction, and absence through negation particles and words",
            definition: "A negative sentence states that something is not true, does not happen, or is absent. In English, negation is formed by adding the negative particle 'not' to an auxiliary verb, or by using negative words like 'never', 'nothing', 'nobody', 'nowhere', or 'neither'.",
            explanation: "Unlike many languages that allow or require double negation, standard English strictly enforces single negation. If the affirmative sentence has an auxiliary or modal verb (be, have, can, will, must), 'not' is placed directly after it. If the affirmative sentence contains only a lexical main verb, the 'dummy' auxiliary 'do / does / did' must be inserted to carry the negative particle ('do-support').",
            formula: "Subject + Auxiliary Verb + not + Main Verb (+ Object)  OR  Subject + Negative Word + Affirmative Verb",
            sentenceStructures: [
                { type: "Auxiliary + Not", structure: "Subject + Aux/Modal + not (n't) + Main Verb", example: "The system cannot process corrupted file formats." },
                { type: "Do-Support Negation", structure: "Subject + do/does/did + not + Base Verb", example: "The supervisor does not (doesn't) tolerate chronic tardiness." },
                { type: "Negative Adverb / Pronoun", structure: "Subject + never / nobody / nothing + Affirmative Verb", example: "Nobody questioned the auditor's conclusions." },
                { type: "Neither... Nor", structure: "Neither + Subject 1 + nor + Subject 2 + Verb", example: "Neither the director nor the actors were satisfied with the cut." }
            ],
            types: [
                {
                    name: "Particle Negation ('not')",
                    desc: "Attaching 'not' or contracted 'n't' to the auxiliary verb.",
                    examples: "They haven't signed the lease yet."
                },
                {
                    name: "Lexical Word Negation",
                    desc: "Using inherently negative pronouns, determiners, or adverbs (nobody, nothing, nowhere, neither, no, never, rarely, seldom).",
                    examples: "We have no objections to the proposed revisions."
                },
                {
                    name: "Affixal Negation",
                    desc: "Using negative prefixes (un-, in-, dis-, non-) or suffixes (-less) on words within an otherwise affirmative sentence structure.",
                    examples: "His claim was inaccurate and illogical."
                }
            ],
            rules: [
                "The Double Negative Rule: In standard formal English, two negative words in the same clause cancel each other out to create an affirmative or are considered non-standard errors (Incorrect: 'I don't know nothing' -> Correct: 'I don't know anything' OR 'I know nothing').",
                "Do-support requirement: In Present and Past Simple with full verbs, you CANNOT simply place 'not' after the main verb (Incorrect: 'He walked not' -> Correct: 'He did not walk').",
                "Any vs Some in negative clauses: Negative sentences typically switch polarity-sensitive words from 'some' to 'any' ('I bought some apples' -> 'I didn't buy any apples').",
                "Inversion with negative introductory words: When an inherently negative or restrictive word opens a sentence for rhetorical emphasis, invert the auxiliary and subject ('Never have I witnessed such courage' / 'Seldom do we encounter such dedication').",
                "Negative imperatives: Always begin with 'Do not' or 'Don't' followed by the bare infinitive ('Don't touch that wire!')."
            ],
            examples: [
                { text: "The pharmaceutical candidate did not pass the rigorous third-phase clinical trial.", breakdown: "Subject + did not (do-support) + bare verb (pass) + object", highlight: "Past simple negation with do-support" },
                { text: "Our organization does not share user telemetry data with external advertisers.", breakdown: "Subject + does not + bare verb (share) + object", highlight: "Present simple third-person negation" },
                { text: "The researchers could not reproduce the reported laboratory anomalies.", breakdown: "Subject + modal (could) + not + bare verb (reproduce) + object", highlight: "Modal negation" },
                { text: "Rarely does a junior associate receive such high-profile trial responsibilities.", breakdown: "Negative adverb opening (Rarely) + auxiliary (does) + subject + bare verb (receive)", highlight: "Negative adverb inversion" },
                { text: "There was no consensus among the committee members regarding the zoning amendment.", breakdown: "There was + negative determiner (no) + noun (consensus)", highlight: "Lexical negation with 'no'" }
            ],
            commonMistakes: [
                {
                    wrong: "I didn't see nobody in the hallway.",
                    right: "I didn't see anybody in the hallway. (OR: I saw nobody in the hallway.)",
                    why: "Combining 'didn't' and 'nobody' creates an unintended double negative. Pair 'didn't' with 'anybody', or use an affirmative verb with 'nobody'."
                },
                {
                    wrong: "He doesn't knows the security password.",
                    right: "He doesn't know the security password.",
                    why: "After the auxiliary 'doesn't', the main verb must revert to its bare base form 'know'."
                },
                {
                    wrong: "She not speaks French.",
                    right: "She does not speak French.",
                    why: "English requires 'do-support' (does not) for lexical verbs in the Present Simple."
                }
            ],
            specialCases: [
                {
                    title: "Negative Raising",
                    desc: "With verbs of mental perception (think, believe, suppose, imagine), English prefers to negate the main clause verb rather than the subordinate clause: 'I don't think it will rain' (preferred over 'I think it will not rain').",
                    example: "We don't believe that the initial findings are accurate."
                }
            ],
            exercises: [
                {
                    id: "neg-1",
                    question: "Select the sentence that avoids an incorrect double negative:",
                    type: "mcq",
                    options: [
                        "We didn't receive any notification regarding the delay.",
                        "We didn't receive no notification regarding the delay.",
                        "We hadn't received none notification regarding the delay.",
                        "We didn't receive nothing regarding the delay."
                    ],
                    answer: "We didn't receive any notification regarding the delay.",
                    explanation: "'Didn't receive' correctly pairs with the non-assertive determiner 'any'."
                },
                {
                    id: "neg-2",
                    question: "Complete the sentence: 'The candidate ___ have sufficient administrative experience.'",
                    type: "fill-in",
                    options: ["does not", "is not", "not", "has not"],
                    answer: "does not",
                    explanation: "In Present Simple with the lexical verb 'have', third-person singular requires 'does not have'."
                },
                {
                    id: "neg-3",
                    question: "Choose the grammatically correct inverted negative sentence:",
                    type: "mcq",
                    options: [
                        "Seldom we have seen such unprecedented market volatility.",
                        "Seldom have we seen such unprecedented market volatility.",
                        "Seldom did we saw such unprecedented market volatility.",
                        "Seldom have we saw such unprecedented market volatility."
                    ],
                    answer: "Seldom have we seen such unprecedented market volatility.",
                    explanation: "When starting with the negative adverb 'Seldom', invert auxiliary and subject: 'Seldom have we seen...'."
                },
                {
                    id: "neg-4",
                    question: "Which of the following expresses the natural English 'negative raising' convention?",
                    type: "mcq",
                    options: [
                        "I don't think the flight will be canceled.",
                        "I think the flight will not be canceled.",
                        "I believe the flight will be not canceled.",
                        "I think not the flight will be canceled."
                    ],
                    answer: "I don't think the flight will be canceled.",
                    explanation: "English idiomatic usage moves the negation to the main cognitive verb ('I don't think...')."
                }
            ],
            quickRevision: [
                "Form: Subject + auxiliary + not + main verb (or do/does/did not + base verb).",
                "Avoid double negatives: use 'not + any/anybody/anything' or 'affirmative verb + no/nobody/nothing'.",
                "After doesn't/didn't, the main verb always reverts to its bare base form.",
                "Negative introductory words (seldom, rarely, never) require subject-auxiliary inversion."
            ]
        },
        {
            id: "interrogative-sentences",
            title: "Interrogative Sentences",
            subtitle: "Formulating questions to request information, verify facts, or confirm assumptions",
            definition: "An interrogative sentence asks a direct question to solicit information, confirm an assumption, or request clarification. It is characterized by subject-auxiliary inversion and ends with a question mark (?).",
            explanation: "English interrogative sentences fall into major categories: Yes/No questions (polar interrogatives), WH- questions (information interrogatives seeking specific content), Choice/Alternative questions, and Tag questions. Except when the question word itself serves as the subject, interrogatives invert the subject and auxiliary verb.",
            formula: "Yes/No: [Auxiliary] + [Subject] + [Main Verb]? | WH- (Object/Adverb): [WH-Word] + [Auxiliary] + [Subject] + [Main Verb]? | WH- (Subject): [WH-Word] + [Verb] + [Object]?",
            sentenceStructures: [
                { type: "Yes/No Question", structure: "Aux / Modal + Subject + Main Verb?", example: "Has the board reviewed the financial audit?" },
                { type: "WH- Question (Object inquiry)", structure: "WH-Word + Aux + Subject + Main Verb?", example: "What did the laboratory discover during the second phase?" },
                { type: "WH- Question (Subject inquiry)", structure: "WH-Word (Subject) + Main Verb (V1+s / V2) + Object?", example: "Who discovered the structure of DNA? (No inversion!)" },
                { type: "Question Tag", structure: "Statement + Comma + Opposing Auxiliary + Pronoun?", example: "The train departs at noon, doesn't it?" }
            ],
            types: [
                {
                    name: "Yes/No Questions",
                    desc: "Inquire about the truth value of a whole proposition. Answerable with 'Yes' or 'No'.",
                    examples: "Do you accept international credentials? / Are you traveling to Prague?"
                },
                {
                    name: "WH- Questions",
                    desc: "Seek specific information using interrogative words: Who, Whom, Whose, What, Which, Where, When, Why, How.",
                    examples: "Why did the cooling system fail under sustained load?"
                },
                {
                    name: "Choice Questions",
                    desc: "Offer two or more explicit alternatives connected by 'or'.",
                    examples: "Would you prefer a morning interview or an afternoon slot?"
                },
                {
                    name: "Embedded (Indirect) Questions",
                    desc: "A question polite wrapper inside another statement or question. Inversion is dropped!",
                    examples: "Could you tell me where the registration desk is? (NOT: 'where is the desk')."
                }
            ],
            rules: [
                "Subject-Auxiliary Inversion: Place the auxiliary verb before the subject (Statement: 'She is reading' -> Question: 'Is she reading?').",
                "Do-support in simple tenses: If no auxiliary exists, add 'do/does/did' before the subject (Statement: 'He works here' -> Question: 'Does he work here?').",
                "Subject vs Object WH- questions: If the WH- word is the subject of the sentence, do NOT invert and do NOT use do-support ('Who broke the window?' NOT 'Who did break the window?'). If the WH- word is the object, use inversion and do-support ('What did you break?').",
                "Embedded questions word order: When a question is embedded inside another clause, it reverts to standard declarative SVO order ('Do you know what time it is?' NOT 'what time is it').",
                "Question tag polarity: Positive statements take negative tags ('You are ready, aren't you?'); negative statements take positive tags ('She isn't coming, is she?')."
            ],
            examples: [
                { text: "Have the civil engineers inspected the suspension cables on the bridge?", breakdown: "Auxiliary (Have) + Subject (the civil engineers) + Past Participle (inspected) + Object", highlight: "Yes/No present perfect interrogative" },
                { text: "What did the demographic survey reveal regarding rural urbanization?", breakdown: "WH-word (What) + Aux (did) + Subject + Bare Verb (reveal) + object phrase", highlight: "WH- object question with do-support" },
                { text: "Who authored the pioneering paper on algorithmic neural nets?", breakdown: "WH-Subject (Who) + Past Verb (authored) + Direct Object", highlight: "WH- subject question (no do-support)" },
                { text: "Could you please inform me when the international symposium commences?", breakdown: "Polite wrapper + WH-connector (when) + Subject + Verb (commences)", highlight: "Embedded indirect question (SVO order)" },
                { text: "The contract has already been signed by both chief executives, hasn't it?", breakdown: "Affirmative statement + Comma + Negative auxiliary (hasn't) + Pronoun (it)", highlight: "Standard question tag" }
            ],
            commonMistakes: [
                {
                    wrong: "Could you tell me where is the library?",
                    right: "Could you tell me where the library is?",
                    why: "In embedded/indirect questions, word order reverts to normal subject + verb order. Inversion ('is the library') is an error."
                },
                {
                    wrong: "Who did discover the vaccine?",
                    right: "Who discovered the vaccine?",
                    why: "When 'Who' functions as the subject performing the action, do not use the auxiliary 'did'. Use the standard past tense verb."
                },
                {
                    wrong: "Does she likes contemporary art?",
                    right: "Does she like contemporary art?",
                    why: "After the auxiliary 'Does', the main verb must remain in its bare infinitive form ('like')."
                }
            ],
            specialCases: [
                {
                    title: "Rhetorical Questions",
                    desc: "An interrogative sentence asked for dramatic effect or to make a persuasive point, with no expectation of an answer.",
                    example: "Who doesn't want to live in peace and prosperity?"
                }
            ],
            exercises: [
                {
                    id: "int-1",
                    question: "Which of the following is a grammatically correct EMBEDDED question?",
                    type: "mcq",
                    options: [
                        "I wonder where did she leave her car keys.",
                        "I wonder where she left her car keys.",
                        "I wonder where left she her car keys.",
                        "I wonder where has she left her car keys."
                    ],
                    answer: "I wonder where she left her car keys.",
                    explanation: "Embedded questions use standard declarative word order (subject + verb: 'she left'), without auxiliary inversion."
                },
                {
                    id: "int-2",
                    question: "Choose the correct subject question asking about who performed the action:",
                    type: "mcq",
                    options: [
                        "Who designed this sustainable architecture?",
                        "Who did design this sustainable architecture?",
                        "Who was design this sustainable architecture?",
                        "Who does designed this sustainable architecture?"
                    ],
                    answer: "Who designed this sustainable architecture?",
                    explanation: "When 'Who' asks about the subject, no auxiliary 'did' is used; the verb simply takes its past form 'designed'."
                },
                {
                    id: "int-3",
                    question: "Complete the question tag: 'You haven't seen my laptop charger, ___?'",
                    type: "fill-in",
                    options: ["have you", "haven't you", "did you", "do you"],
                    answer: "have you",
                    explanation: "A negative statement ('haven't seen') requires a positive tag ('have you')."
                },
                {
                    id: "int-4",
                    question: "Identify the correct question structure:",
                    type: "mcq",
                    options: [
                        "Why does the server restarts every midnight?",
                        "Why does the server restart every midnight?",
                        "Why the server restarts every midnight?",
                        "Why is the server restarts every midnight?"
                    ],
                    answer: "Why does the server restart every midnight?",
                    explanation: "WH-word (Why) + auxiliary (does) + subject (the server) + bare verb (restart)."
                }
            ],
            quickRevision: [
                "Yes/No questions: Aux + Subject + Verb? (e.g. 'Are you ready?').",
                "WH- questions: WH-word + Aux + Subject + Verb? (unless WH-word is the subject).",
                "Subject questions use NO auxiliary do/did ('Who wrote this?', NOT 'Who did write this?').",
                "Embedded questions revert to declarative word order: 'Tell me where he lives' (NOT 'where does he live')."
            ]
        },
        {
            id: "imperative-sentences",
            title: "Imperative Sentences",
            subtitle: "Commands, instructions, directions, warnings, and polite invitations",
            definition: "An imperative sentence gives a direct command, request, instruction, warning, or advice. Its distinctive grammatical feature is that the subject 'you' is omitted and understood implicitly.",
            explanation: "Imperative sentences begin with the bare base form of the verb (bare infinitive). While direct commands can sound authoritative or abrupt, adding 'please' or using conditional framing transforms them into polite requests. Imperatives are universally used in recipe books, software interfaces, road signs, and technical manuals.",
            formula: "Affirmative: [Base Verb] + [Object / Modifier]! / . | Negative: Do not (Don't) + [Base Verb] + [Object / Modifier]!",
            sentenceStructures: [
                { type: "Direct Command", structure: "Base Verb + Object / Prepositional phrase", example: "Submit your final expense receipts by Friday." },
                { type: "Negative Imperative", structure: "Do not / Don't + Base Verb + Object", example: "Do not disclose confidential passwords to third parties." },
                { type: "Polite Request", structure: "Please + Base Verb (or Base Verb + please)", example: "Please take a seat in the waiting lounge." },
                { type: "Inclusive Imperative (Let's)", structure: "Let's (Let us) + Base Verb", example: "Let's review the risk assessments before signing." },
                { type: "Emphatic Imperative", structure: "Do + Base Verb", example: "Do make yourself comfortable while you wait." }
            ],
            types: [
                {
                    name: "Command / Order",
                    desc: "An authoritative directive requiring immediate compliance.",
                    examples: "Halt! Show your identification badge immediately."
                },
                {
                    name: "Instruction / Direction",
                    desc: "Step-by-step guidance found in user manuals, recipes, or maps.",
                    examples: "Insert the installation USB drive and reboot the computer."
                },
                {
                    name: "Request / Invitation",
                    desc: "Polite appeal softened with 'please', 'kindly', or warm hospitality.",
                    examples: "Kindly forward the PDF copy at your earliest convenience."
                },
                {
                    name: "Warning / Advice",
                    desc: "Alerts to prevent danger, harm, or procedural errors.",
                    examples: "Beware of the high voltage transformer behind this fence."
                }
            ],
            rules: [
                "Implied second-person subject: The subject of an imperative is always the unspoken pronoun '(you)'. Because the subject is second person, reflexive pronouns referring back must be 'yourself' or 'yourselves' ('Help yourself', NOT 'Help himself').",
                "Base verb requirement: Imperatives must always use the bare infinitive. Never use third-person -s, past tense -ed, or -ing forms to open an imperative sentence (Incorrect: 'Submits the form' -> Correct: 'Submit the form').",
                "Universal negative auxiliary: Negative imperatives always use 'Do not' or 'Don't', regardless of whether the verb is 'be', 'have', or a full lexical verb ('Don't be nervous', NOT 'Be not nervous').",
                "Inclusive 'Let's': When including both speaker and listener, use 'Let's' (Let us) + bare verb. The negative is 'Let's not + bare verb' ('Let's not rush into conclusions').",
                "Punctuation: End with a period (.) for mild requests or instructions, and an exclamation mark (!) for urgent warnings or strong commands."
            ],
            examples: [
                { text: "Always verify the checksum before executing third-party binaries.", breakdown: "Adverb (Always) + Base Verb (verify) + Direct Object + time clause", highlight: "Instruction / best practice guideline" },
                { text: "Do not touch the exposed copper wiring under any circumstances.", breakdown: "Negative auxiliary (Do not) + Base Verb (touch) + Object + adverbial modifier", highlight: "Urgent safety warning" },
                { text: "Please enter your multi-factor authentication token on the login portal.", breakdown: "Politeness marker (Please) + Base Verb (enter) + Object + location", highlight: "Polite software directive" },
                { text: "Let's convene an emergency meeting to address the server outage.", breakdown: "Inclusive marker (Let's) + Base Verb (convene) + Object + infinitive of purpose", highlight: "Collaborative inclusive suggestion" },
                { text: "Do visit our new exhibition whenever you find yourself in Vienna.", breakdown: "Emphatic auxiliary (Do) + Base Verb (visit) + Object + temporal clause", highlight: "Emphatic warm invitation" }
            ],
            commonMistakes: [
                {
                    wrong: "You submit your test papers now.",
                    right: "Submit your test papers now.",
                    why: "In standard imperative commands, the subject 'you' is omitted."
                },
                {
                    wrong: "Don't to open the emergency door.",
                    right: "Don't open the emergency door.",
                    why: "After 'Don't', use the bare infinitive without the infinitive marker 'to'."
                },
                {
                    wrong: "Be not afraid of asking questions.",
                    right: "Don't be afraid of asking questions.",
                    why: "Modern English requires 'Don't be...', not the archaic 'Be not...'."
                }
            ],
            specialCases: [
                {
                    title: "Imperative with explicit vocative noun",
                    desc: "A speaker may address a specific person before or after an imperative, separated by a comma: 'David, lock the front door.' The subject is still grammatically '(you)'.",
                    example: "Team, focus your attention on slide number four."
                }
            ],
            exercises: [
                {
                    id: "imp-1",
                    question: "Which of the following is a grammatically standard negative imperative?",
                    type: "mcq",
                    options: [
                        "Don't be alarmed by the loud siren.",
                        "Be not alarmed by the loud siren.",
                        "Not be alarmed by the loud siren.",
                        "Don't to be alarmed by the loud siren."
                    ],
                    answer: "Don't be alarmed by the loud siren.",
                    explanation: "Negative imperatives with the verb 'to be' universally use 'Don't be...'."
                },
                {
                    id: "imp-2",
                    question: "Complete the reflexive imperative: 'Make ___ at home while I prepare tea.'",
                    type: "fill-in",
                    options: ["yourself", "himself", "oneself", "themselves"],
                    answer: "yourself",
                    explanation: "The implied subject of an imperative is 'you', so the reflexive pronoun must be 'yourself' (or 'yourselves')."
                },
                {
                    id: "imp-3",
                    question: "Choose the correct negative inclusive suggestion:",
                    type: "mcq",
                    options: [
                        "Let's not make any hasty decisions.",
                        "Don't let's make any hasty decisions.",
                        "Let's make not any hasty decisions.",
                        "Let's don't make any hasty decisions."
                    ],
                    answer: "Let's not make any hasty decisions.",
                    explanation: "The standard negative form for inclusive 'Let's' is 'Let's not + bare verb'."
                },
                {
                    id: "imp-4",
                    question: "What is the implied subject in: 'Follow the green signs to terminal two'?",
                    type: "mcq",
                    options: [
                        "You",
                        "They",
                        "We",
                        "One"
                    ],
                    answer: "You",
                    explanation: "All standard imperative sentences have an implicit second-person subject: '(You) follow the green signs'."
                }
            ],
            quickRevision: [
                "Starts with the bare base verb (no 'you', no -s, no -ed, no -ing).",
                "Subject is always the understood '(you)'.",
                "Negatives always use 'Do not / Don't + base verb' (including 'Don't be...').",
                "Use 'Let's + base verb' for inclusive suggestions (negative: 'Let's not')."
            ]
        },
        {
            id: "exclamatory-sentences",
            title: "Exclamatory Sentences",
            subtitle: "Expressing intense emotion, admiration, shock, grief, or astonishment",
            definition: "An exclamatory sentence conveys strong emotion, surprise, admiration, or shock, and traditionally ends with an exclamation mark (!). In formal grammar, exclamative clauses are formed using 'What' or 'How'.",
            explanation: "While any declarative sentence can be spoken with emotional excitement, true grammatical exclamatives follow specific syntactic templates starting with 'What' (paired with noun phrases) or 'How' (paired with adjectives or adverbs). Crucially, despite starting with WH-words, they do NOT use question inversion; the subject and verb remain in declarative order.",
            formula: "What: What (+ a/an) + [Adjective] + [Noun] + [Subject] + [Verb]! | How: How + [Adjective/Adverb] + [Subject] + [Verb]!",
            sentenceStructures: [
                { type: "What + Singular Countable Noun", structure: "What + a / an + Adjective + Singular Noun (+ Subject + Verb)!", example: "What an extraordinary achievement this is!" },
                { type: "What + Plural / Uncountable Noun", structure: "What + Adjective + Plural / Uncountable Noun (+ Subject + Verb)!", example: "What breathtaking scenery we witnessed!" },
                { type: "How + Adjective", structure: "How + Adjective + Subject + Verb!", example: "How resilient these ancient structures are!" },
                { type: "How + Adverb", structure: "How + Adverb + Subject + Verb!", example: "How fluently she delivered the keynote address!" }
            ],
            types: [
                {
                    name: "Exclamative with 'What'",
                    desc: "Modifies a noun phrase. Takes 'a/an' before singular countable nouns; omits 'a/an' before plural or uncountable nouns.",
                    examples: "What a splendid idea! / What delicious coffee! / What talented engineers they are!"
                },
                {
                    name: "Exclamative with 'How'",
                    desc: "Modifies an adjective, adverb, or entire clause directly, emphasizing degree.",
                    examples: "How fast the years have flown! / How strange it sounds!"
                },
                {
                    name: "Truncated Exclamatives",
                    desc: "Short exclamatory phrases where the subject and verb are omitted for punchy spoken effect.",
                    examples: "What a catastrophe! / How wonderful!"
                }
            ],
            rules: [
                "No question inversion: Unlike interrogative sentences, exclamative clauses DO NOT invert the subject and verb (Correct: 'How beautiful the sunrise is!' NOT: 'How beautiful is the sunrise!').",
                "Article rule with 'What': Use 'What a/an' ONLY with singular countable nouns ('What a car!'). NEVER use 'a/an' with plural nouns ('What cars!', NOT 'What a cars!') or uncountable nouns ('What good advice!', NOT 'What a good advice!').",
                "Punctuation discipline: Exclamative sentences must end with an exclamation point (!). In formal academic and technical writing, avoid multiple exclamation marks (!!!) or overuse.",
                "How vs What distinction: Use 'How' directly with adjectives/adverbs ('How cold it is!'). Use 'What' when a noun follows ('What cold weather it is!')."
            ],
            examples: [
                { text: "What an ingenious solution the young mathematician devised!", breakdown: "What + an + Adjective (ingenious) + Singular Noun (solution) + Subject + Verb", highlight: "Exclamative modifying singular noun phrase" },
                { text: "What invaluable assistance your team provided during the security breach!", breakdown: "What + Adjective (invaluable) + Uncountable Noun (assistance) + Subject + Verb", highlight: "Exclamative with uncountable noun (no article)" },
                { text: "How accurately the satellite captured the environmental degradation!", breakdown: "How + Adverb (accurately) + Subject (the satellite) + Verb (captured) + Object", highlight: "Exclamative modifying an adverb" },
                { text: "How magnificent the snow-capped Himalayan peaks look at sunrise!", breakdown: "How + Adjective (magnificent) + Subject + Linking Verb (look)", highlight: "Exclamative modifying an adjective" },
                { text: "What devastating consequences this ecological oversight has unleashed!", breakdown: "What + Adjective + Plural Noun (consequences) + Subject + Verb", highlight: "Exclamative with plural noun" }
            ],
            commonMistakes: [
                {
                    wrong: "How a beautiful painting!",
                    right: "What a beautiful painting! (OR: How beautiful the painting is!)",
                    why: "Use 'What a...' with noun phrases ('a beautiful painting'). 'How' directly modifies adjectives without 'a/an' ('How beautiful...')."
                },
                {
                    wrong: "What a cold weather we are having today!",
                    right: "What cold weather we are having today!",
                    why: "'Weather' is an uncountable noun and cannot take the indefinite article 'a'."
                },
                {
                    wrong: "How wonderful is this opportunity!",
                    right: "How wonderful this opportunity is!",
                    why: "Exclamatory sentences retain declarative word order (Subject + Verb: 'this opportunity is'); do not invert as if it were a question."
                }
            ],
            specialCases: [
                {
                    title: "Exclamations in Question Form",
                    desc: "Sometimes a rhetorical negative question is spoken as an exclamation: 'Isn't she brilliant!' or 'Didn't they perform amazingly!' Though structured as a question, it functions as an exclamative affirmation.",
                    example: "Hasn't the city transformed remarkably over the past decade!"
                }
            ],
            exercises: [
                {
                    id: "exc-1",
                    question: "Complete the exclamatory sentence: '___ magnificent discovery the team made!'",
                    type: "fill-in",
                    options: ["What a", "How", "What", "How a"],
                    answer: "What a",
                    explanation: "'Discovery' is a singular countable noun preceded by the adjective 'magnificent', requiring 'What a'."
                },
                {
                    id: "exc-2",
                    question: "Which of the following avoids inverted question word order?",
                    type: "mcq",
                    options: [
                        "How remarkably well she handled the crisis!",
                        "How remarkably well did she handle the crisis!",
                        "How remarkably well handled she the crisis!",
                        "How remarkably well was she handled the crisis!"
                    ],
                    answer: "How remarkably well she handled the crisis!",
                    explanation: "Exclamatory sentences maintain standard Subject + Verb order ('she handled'), never subject-auxiliary inversion."
                },
                {
                    id: "exc-3",
                    question: "Choose the correct sentence for the uncountable noun 'furniture':",
                    type: "mcq",
                    options: [
                        "What elegant antique furniture this is!",
                        "What an elegant antique furniture this is!",
                        "How an elegant antique furniture this is!",
                        "What a furniture this is!"
                    ],
                    answer: "What elegant antique furniture this is!",
                    explanation: "'Furniture' is uncountable and cannot take 'a/an'. The correct formulation is 'What elegant antique furniture this is!'."
                },
                {
                    id: "exc-4",
                    question: "Convert 'The sunset is extremely vibrant' into an exclamatory sentence starting with 'How':",
                    type: "mcq",
                    options: [
                        "How vibrant the sunset is!",
                        "How vibrant is the sunset!",
                        "How a vibrant sunset it is!",
                        "How the sunset is vibrant!"
                    ],
                    answer: "How vibrant the sunset is!",
                    explanation: "How + Adjective (vibrant) + Subject (the sunset) + Verb (is)!"
                }
            ],
            quickRevision: [
                "What + a/an + adjective + singular noun ('What a great idea!').",
                "What + adjective + plural/uncountable noun ('What great ideas! / What good advice!').",
                "How + adjective/adverb + Subject + Verb ('How wonderful she is!').",
                "Never invert subject and verb in exclamatives (Subject comes BEFORE Verb)."
            ]
        },
        {
            id: "subject-verb-agreement",
            title: "Subject-Verb Agreement",
            subtitle: "Harmonizing person and number between the grammatical subject and its predicate verb",
            definition: "Subject-Verb Agreement (concord) is the grammatical rule requiring that a singular subject take a singular verb, and a plural subject take a plural verb, across all persons and tenses.",
            explanation: "While straightforward in simple sentences ('The dog barks', 'The dogs bark'), subject-verb agreement becomes challenging when words intervene between the subject and verb, with compound subjects joined by 'or'/'nor', with collective nouns, with indefinite pronouns, and in inverted sentences.",
            formula: "[Singular Subject] -> [Singular Verb (-s in Present Simple)] | [Plural Subject] -> [Plural Verb (base form in Present Simple)]",
            sentenceStructures: [
                { type: "Basic Agreement", structure: "Singular: He/She/It + V-s | Plural: They/We/You + V-base", example: "The researcher publishes. / The researchers publish." },
                { type: "Intervening Prepositional Phrase", structure: "Subject + [prepositional phrase] + Verb", example: "The box of vintage vinyl records is in the attic." },
                { type: "Compound Subject with 'And'", structure: "Noun 1 + and + Noun 2 + Plural Verb", example: "The architect and the structural engineer work together." },
                { type: "Proximity Rule (Either/Neither... Or/Nor)", structure: "Either A or B + Verb (agrees with B)", example: "Neither the manager nor the employees were informed." },
                { type: "There is / There are", structure: "There + Verb + Real Subject", example: "There is an anomaly in the data. / There are three anomalies in the data." }
            ],
            types: [
                {
                    name: "Intervening Phrase Illusion",
                    desc: "Prepositional phrases (of, with, together with, as well as, in addition to) coming between the subject and the verb do NOT change the subject's grammatical number.",
                    examples: "The captain, as well as his crew members, was commended for bravery."
                },
                {
                    name: "Indefinite Pronouns",
                    desc: "Pronouns like 'everyone', 'everybody', 'anyone', 'each', 'either', and 'neither' are grammatically singular and take singular verbs.",
                    examples: "Each of the candidates has submitted a portfolio."
                },
                {
                    name: "SANAM Pronouns (Variable Agreement)",
                    desc: "Some, Any, None, All, Most (SANAM) depend on the noun in the following prepositional phrase: singular if uncountable, plural if countable.",
                    examples: "All of the cake is gone (uncountable) vs All of the cupcakes are gone (countable)."
                },
                {
                    name: "Collective Nouns",
                    desc: "In American English, collective nouns (team, committee, family, audience) almost always take a singular verb when acting as a unit. In British English, plural verbs are also common if members act individually.",
                    examples: "The jury has reached its verdict."
                }
            ],
            rules: [
                "Ignore intervening parenthetical phrases: Expressions like 'along with', 'as well as', 'accompanied by', 'together with', and 'including' do NOT create a compound plural subject ('The professor, along with five doctoral students, is attending').",
                "Rule of proximity for 'or' / 'nor': When subjects are joined by 'or', 'nor', 'either... or', or 'neither... nor', the verb agrees with the subject closest to it ('Neither the teacher nor the students were ready' vs 'Neither the students nor the teacher was ready').",
                "Compound subjects with 'and': Two or more subjects joined by 'and' take a plural verb, unless they refer to a single unified concept or dish ('Bacon and eggs is my favorite breakfast' / 'The author and illustrator of the book is here' [same person]).",
                "'Each' and 'Every' enforce singular: When 'each' or 'every' precedes compound nouns, the verb remains singular ('Every boy and girl is eligible').",
                "Inverted sentences (Here/There): 'There' and 'Here' are dummy adverbs, never the grammatical subject. Look after the verb to find the true subject ('There are two reasons', 'There is one reason').",
                "Measurements, money, and time: Sums of money, periods of time, and measurements of distance/weight take singular verbs when considered as a unified bulk quantity ('Ten thousand dollars is an exorbitant price' / 'Five miles is a long walk')."
            ],
            examples: [
                { text: "The bouquet of vibrant yellow sunflowers brightens the entire reception lobby.", breakdown: "Subject (The bouquet - singular) + Prepositional phrase (of sunflowers) + Singular Verb (brightens)", highlight: "Intervening phrase does not affect singular subject" },
                { text: "Neither the chief financial officer nor the executive board members support the hostile takeover.", breakdown: "Neither A nor B (plural: board members) + Plural Verb (support) [proximity rule]", highlight: "Proximity rule with 'nor'" },
                { text: "Each of the clinical trial participants receives a confidential health monitoring kit.", breakdown: "Indefinite pronoun (Each - singular) + prepositional phrase + Singular Verb (receives)", highlight: "Indefinite pronoun taking singular verb" },
                { text: "There are several unresolved discrepancies in the latest quarterly ledger.", breakdown: "There (dummy) + Plural Verb (are) + Real Subject (several unresolved discrepancies)", highlight: "Inverted agreement with 'There'" },
                { text: "Three hundred miles across the desert was an arduous journey for the expedition.", breakdown: "Unified distance measure (Three hundred miles) + Singular Verb (was)", highlight: "Unified distance measurement taking singular verb" }
            ],
            commonMistakes: [
                {
                    wrong: "A collection of ancient gold coins were discovered by the archaeologists.",
                    right: "A collection of ancient gold coins was discovered by the archaeologists.",
                    why: "The subject is the singular noun 'collection', not the plural object of the preposition 'coins'."
                },
                {
                    wrong: "Everyone of the employees have completed the mandatory security training.",
                    right: "Every one of the employees has completed the mandatory security training.",
                    why: "'Every one' is grammatically singular and requires the singular verb 'has'."
                },
                {
                    wrong: "Neither the doctor nor the nurses was available during the emergency.",
                    right: "Neither the doctor nor the nurses were available during the emergency.",
                    why: "Under the proximity rule, the verb must agree with 'the nurses' (plural), which is closest to the verb."
                }
            ],
            specialCases: [
                {
                    title: "The number of vs A number of",
                    desc: "'The number of...' specifies a single mathematical figure and takes a singular verb: 'The number of applicants is growing'. 'A number of...' means 'several/many' and takes a plural verb: 'A number of applicants have arrived'.",
                    example: "The number of endangered species is alarming, yet a number of conservation projects are underway."
                }
            ],
            exercises: [
                {
                    id: "sva-1",
                    question: "Choose the correct verb form: 'The quality of these organic ingredients ___ strictly inspected.'",
                    type: "mcq",
                    options: ["is", "are", "were", "have been"],
                    answer: "is",
                    explanation: "The grammatical subject is 'The quality' (singular), not 'ingredients'. Singular subject takes 'is'."
                },
                {
                    id: "sva-2",
                    question: "Complete the sentence: 'Neither the supervisor nor the technicians ___ able to diagnose the power fault yesterday.'",
                    type: "fill-in",
                    options: ["were", "was", "is", "are"],
                    answer: "were",
                    explanation: "By the rule of proximity with 'neither... nor', the verb agrees with 'technicians' (plural) in the past tense ('were')."
                },
                {
                    id: "sva-3",
                    question: "Fill in the blank: 'Every one of the applicants ___ submitted their credentials.'",
                    type: "fill-in",
                    options: ["has", "have", "are", "having"],
                    answer: "has",
                    explanation: "'Every one' is grammatically singular and takes 'has'."
                },
                {
                    id: "sva-4",
                    question: "Select the sentence with correct subject-verb agreement:",
                    type: "mcq",
                    options: [
                        "Ten kilometers is a challenging distance for novice runners.",
                        "Ten kilometers are a challenging distance for novice runners.",
                        "Ten kilometers were a challenging distance for novice runners.",
                        "Ten kilometers have been a challenging distance for novice runners."
                    ],
                    answer: "Ten kilometers is a challenging distance for novice runners.",
                    explanation: "Units of measurement and distance considered as a single unified total take a singular verb ('is')."
                }
            ],
            quickRevision: [
                "Singular subjects take singular verbs; plural subjects take plural verbs.",
                "Ignore intervening prepositional phrases (e.g. 'one of the boxes IS', NOT 'are').",
                "With 'either... or' and 'neither... nor', the verb agrees with the closest subject.",
                "Indefinite pronouns (everyone, each, neither) are singular.",
                "'The number of' is singular; 'A number of' is plural."
            ]
        }
    ]
};

