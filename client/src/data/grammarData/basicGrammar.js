// Basic Grammar Curriculum (10 comprehensive lessons)
export const basicGrammar = {
    category: "Basic Grammar",
    description: "The core building blocks of the English language: parts of speech, noun classifications, and word relationships.",
    topics: [
        {
            id: "nouns",
            title: "Nouns",
            subtitle: "Naming words for people, places, things, ideas, and substances",
            definition: "A noun is a word used to identify any of a class of people, places, or things (common noun), or to name a particular one of these (proper noun), as well as concepts, emotions, qualities, and substances.",
            explanation: "Nouns function as the backbone of sentences. They can serve as the subject that performs an action, the direct or indirect object receiving an action, the object of a preposition, or a subject complement describing who or what someone is. Unlike a simplified rule stating every noun requires an article, nouns can appear alone (proper nouns, uncountable nouns, plural generic nouns) or with determiners and adjectives.",
            formula: "[Determiner / Article (optional)] + [Adjective(s) (optional)] + [Noun]  OR  [Noun alone]",
            types: [
                {
                    name: "Proper Nouns",
                    desc: "Specific, unique names of people, places, days, months, and organizations. Always capitalized.",
                    examples: "London, William Shakespeare, Google, Monday, July, Mount Everest."
                },
                {
                    name: "Common Nouns",
                    desc: "General names for a person, place, or thing of the same kind. Not capitalized unless starting a sentence.",
                    examples: "city, author, company, day, month, mountain, table, child."
                },
                {
                    name: "Countable vs Uncountable Nouns",
                    desc: "Countable nouns have singular and plural forms (book/books). Uncountable nouns cannot be counted directly and generally have no plural form (water, information, furniture).",
                    examples: "Countable: three apples, five coins. Uncountable: milk, advice, knowledge, luggage."
                },
                {
                    name: "Abstract Nouns",
                    desc: "Intangible concepts, feelings, emotions, qualities, or states of being that cannot be perceived through the five senses.",
                    examples: "courage, honesty, freedom, sadness, education, childhood, beauty."
                },
                {
                    name: "Concrete Nouns",
                    desc: "Material objects that you can see, hear, smell, touch, or taste.",
                    examples: "guitar, perfume, thunder, coffee, sandpaper, brick."
                },
                {
                    name: "Collective Nouns",
                    desc: "Words that refer to a group or collection of individuals taken as a single unit.",
                    examples: "team, family, choir, flock (of birds), herd (of cattle), jury, committee."
                },
                {
                    name: "Material Nouns",
                    desc: "Substances, raw materials, or ingredients extracted from the earth or used to manufacture things.",
                    examples: "gold, iron, cotton, plastic, wood, silk, glass, clay."
                },
                {
                    name: "Possessive Nouns",
                    desc: "Show ownership or association. Add 's for singular nouns (the dog's leash) and an apostrophe after the s for regular plural nouns (the dogs' owners).",
                    examples: "Sarah's computer, children's toys, James's (or James') car, the teachers' lounge."
                }
            ],
            rules: [
                "Regular plurals add -s (cat -> cats), -es for words ending in -s, -sh, -ch, -x, -z (bus -> buses, box -> boxes), and -ies for consonant + y (city -> cities).",
                "Irregular plurals change vowels or whole forms: man -> men, woman -> women, foot -> feet, tooth -> teeth, mouse -> mice, child -> children, person -> people.",
                "Zero-plural nouns keep the same form in singular and plural: sheep -> sheep, deer -> deer, fish -> fish, aircraft -> aircraft.",
                "Uncountable nouns take singular verbs: 'Information is essential' (NEVER: 'Informations are'). Do not use 'a/an' directly with uncountable nouns; use partitives like 'a piece of advice', 'a cup of water'.",
                "Some nouns look plural because of -s but are grammatically singular: physics, mathematics, economics, news, measles ('The news is encouraging').",
                "Some nouns are always plural and take plural verbs: scissors, trousers, glasses (spectacles), pliers, tweezers ('My scissors are on the desk'). To count them, use 'a pair of scissors'."
            ],
            structures: [
                {
                    label: "Noun as Sentence Subject",
                    formula: "[Noun / Noun Phrase] + [Verb] + [Complement / Object]",
                    example: "Fresh coffee stimulates focus in the morning."
                },
                {
                    label: "Noun as Direct Object",
                    formula: "[Subject] + [Transitive Verb] + [Noun / Noun Phrase]",
                    example: "The architect reviewed the blueprint carefully."
                },
                {
                    label: "Noun as Object of Preposition",
                    formula: "[Clause] + [Preposition] + [Noun / Noun Phrase]",
                    example: "She parked the vehicle near the harbor."
                },
                {
                    label: "Noun as Subject Complement",
                    formula: "[Subject] + [Linking Verb] + [Noun Complement]",
                    example: "Marcus is an accomplished surgeon."
                }
            ],
            examples: [
                "Dr. Eleanor Vance presented her new *research* at Oxford *University* on Tuesday.",
                "A *flock* of wild *geese* flew gracefully across the morning *sky*.",
                "The *furniture* in the historic *library* was crafted from solid *oak*.",
                "True *wisdom* consists of knowing the *limits* of one's own *knowledge*.",
                "Both *women* volunteered their *expertise* to assist the local *community*."
            ],
            commonMistakes: [
                {
                    wrong: "I need to ask you for an advice regarding my homeworks.",
                    right: "I need to ask you for some advice (or a piece of advice) regarding my homework.",
                    why: "'Advice' and 'homework' are uncountable in English; they cannot take 'an' and never take a plural -s."
                },
                {
                    wrong: "The team have arrived in the stadium.",
                    right: "The team has arrived at the stadium. (In American English, collective nouns take singular verbs; in British English, plural is also acceptable when viewing members individually).",
                    why: "In formal standard English, a collective noun acting as a single unit takes a singular verb."
                },
                {
                    wrong: "The children's room is filled with lot of childs' toys.",
                    right: "The children's room is filled with lots of children's toys.",
                    why: "'Child' has the irregular plural 'children', so the possessive form is 'children's', not 'childs''."
                },
                {
                    wrong: "This scissors is not sharp enough to cut the papers.",
                    right: "These scissors are not sharp enough to cut the paper.",
                    why: "'Scissors' is always plural and takes 'these' and 'are'. 'Paper' is uncountable when referring to the material."
                }
            ],
            specialCases: [
                "Nouns with dual countable/uncountable meanings: 'Business' (commercial trade, uncountable) vs 'A business' (a specific company, countable); 'Light' (illumination, uncountable) vs 'A light' (a lamp/fixture, countable); 'Coffee' (the liquid substance, uncountable) vs 'Two coffees' (two cups/servings, countable colloquial usage).",
                "Latin and Greek loan plurals: analysis -> analyses, crisis -> crises, phenomenon -> phenomena, criterion -> criteria, syllabus -> syllabi (or syllabuses)."
            ],
            exercises: [
                {
                    id: "noun-q1",
                    type: "mcq",
                    question: "Which of the following nouns is uncountable in standard English?",
                    options: ["Luggage", "Suitcase", "Backpack", "Bag"],
                    answer: "Luggage",
                    explanation: "'Luggage' is an uncountable mass noun representing travel bags collectively. 'Suitcase', 'backpack', and 'bag' are countable."
                },
                {
                    id: "noun-q2",
                    type: "fill",
                    question: "The economic news ___ (is / are) broadcasted every evening at six o'clock.",
                    options: ["is", "are", "were", "have been"],
                    answer: "is",
                    explanation: "'News' looks plural because of the -s ending, but it is grammatically an uncountable singular noun requiring 'is'."
                },
                {
                    id: "noun-q3",
                    type: "identify",
                    question: "Identify the mistake: 'She bought three furnitures and two soaps from the market.'",
                    options: ["furnitures -> pieces of furniture", "bought -> buyed", "soaps -> soap bars", "market -> markets"],
                    answer: "furnitures -> pieces of furniture",
                    explanation: "'Furniture' is uncountable and cannot take the plural form 'furnitures'. Use 'three pieces of furniture'."
                },
                {
                    id: "noun-q4",
                    type: "correction",
                    question: "Select the correctly punctuated possessive sentence:",
                    options: [
                        "The teacher's lounge is reserved for all teachers.",
                        "The teachers' lounge is reserved for all teachers.",
                        "The teachers lounge's is reserved for all teachers.",
                        "The teacher lounge is reserved for all teachers."
                    ],
                    answer: "The teachers' lounge is reserved for all teachers.",
                    explanation: "Because the lounge belongs to multiple teachers, the plural possessive places the apostrophe after the 's': 'teachers''."
                }
            ],
            quickRevision: [
                "Nouns name people, places, things, concepts, and materials.",
                "Proper nouns require capital letters; common nouns do not.",
                "Uncountable nouns take singular verbs and cannot take 'a/an' or an -s plural.",
                "Not every noun requires an article or adjective.",
                "Irregular plurals (men, women, children, feet) require careful memorization."
            ]
        },
        {
            id: "pronouns",
            title: "Pronouns",
            subtitle: "Words that substitute for nouns to eliminate repetition and establish reference",
            definition: "A pronoun is a word that replaces a noun or noun phrase in a sentence. The noun that a pronoun refers back to is known as its antecedent.",
            explanation: "Pronouns streamline language by preventing the awkward repetition of names and nouns. They must agree with their antecedents in number (singular vs plural), person (first, second, third), and gender (masculine, feminine, neuter, non-binary).",
            formula: "[Subject Pronoun] + [Verb] + [Object Pronoun] / [Possessive Pronoun / Reflexive]",
            types: [
                {
                    name: "Personal Pronouns (Subject & Object)",
                    desc: "Subject pronouns act as the agent performing the verb (I, you, he, she, it, we, they). Object pronouns receive the action or follow prepositions (me, you, him, her, it, us, them).",
                    examples: "Subject: 'She called yesterday.' Object: 'He warned them.'"
                },
                {
                    name: "Possessive Pronouns vs Possessive Determiners",
                    desc: "Possessive determiners come before a noun (my, your, his, her, its, our, their). Possessive pronouns stand alone without a noun (mine, yours, his, hers, its, ours, theirs).",
                    examples: "Determiner: 'This is my coat.' Standalone Pronoun: 'This coat is mine.'"
                },
                {
                    name: "Reflexive & Intensive Pronouns",
                    desc: "End in -self (singular) or -selves (plural). Reflexive pronouns reflect the action back to the subject (I hurt myself). Intensive pronouns emphasize a noun (The director himself called me).",
                    examples: "myself, yourself, himself, herself, itself, ourselves, yourselves, themselves."
                },
                {
                    name: "Demonstrative Pronouns",
                    desc: "Point to specific things based on distance in space or time: near singular (this), far singular (that), near plural (these), far plural (those).",
                    examples: "'This is delicious.' 'Those look vintage.'"
                },
                {
                    name: "Relative Pronouns",
                    desc: "Connect a clause to a preceding noun: 'who' (people, subject), 'whom' (people, object), 'whose' (possession), 'which' (things/animals), 'that' (people/things in defining clauses).",
                    examples: "The scientist who discovered the vaccine was celebrated."
                },
                {
                    name: "Indefinite Pronouns",
                    desc: "Refer to non-specific people or things. Singular: someone, anybody, everyone, nobody, each, either, neither. Plural: both, few, many, several.",
                    examples: "'Everyone has completed the assignment.' 'Both are qualified.'"
                },
                {
                    name: "Interrogative Pronouns",
                    desc: "Used to ask questions: who, whom, whose, what, which.",
                    examples: "'Who answered the phone?' 'Whose jacket is this?'"
                }
            ],
            rules: [
                "Use subject pronouns after linking verbs in formal English: 'It was he who organized the conference' (colloquial: 'It was him').",
                "Compound subjects use subject pronouns: 'David and I completed the survey' (Test by removing 'David': 'I completed', never 'Me completed').",
                "Compound objects use object pronouns: 'The supervisor assigned the task to David and me' (Test by removing 'David': 'assigned to me', never 'assigned to I').",
                "Indefinite pronouns like everyone, everybody, nobody, someone are grammatically singular in standard English: 'Everyone has brought their own pen' (their is widely accepted as singular non-gendered pronoun).",
                "'Its' is a possessive determiner (no apostrophe: 'The dog wagged its tail'). 'It's' is a contraction for 'it is' or 'it has' ('It's raining outside')."
            ],
            structures: [
                {
                    label: "Subject Pronoun + Verb + Object Pronoun",
                    formula: "[Subject Pronoun] + [Verb] + [Object Pronoun]",
                    example: "They welcomed us with warm smiles."
                },
                {
                    label: "Reflexive Action Structure",
                    formula: "[Subject] + [Transitive Verb] + [Reflexive Pronoun matching Subject]",
                    example: "He taught himself how to program in Python."
                },
                {
                    label: "Relative Clause Pronoun Structure",
                    formula: "[Main Clause Noun] + [Relative Pronoun] + [Relative Clause]",
                    example: "The author whose book won the prize attended the gala."
                }
            ],
            examples: [
                "*She* promised that *she* would email *us* the report before noon.",
                "Between you and *me*, *I* believe *this* strategy will succeed.",
                "The cat stretched *itself* comfortably in the warm sunlight.",
                "Is that umbrella *yours*, or did someone leave *it* by accident?",
                "*Everyone* who participated in the marathon received *their* commemorative medal."
            ],
            commonMistakes: [
                {
                    wrong: "Me and him went to the library together.",
                    right: "He and I went to the library together.",
                    why: "Both 'he' and 'I' are functioning as the subject of the sentence. Subject pronouns must be used, and polite English places the other person first."
                },
                {
                    wrong: "The manager distributed the files between Sarah and I.",
                    right: "The manager distributed the files between Sarah and me.",
                    why: "'Between' is a preposition. Prepositions take object pronouns ('me', not 'I')."
                },
                {
                    wrong: "The company announced it's annual revenue figures yesterday.",
                    right: "The company announced its annual revenue figures yesterday.",
                    why: "'Its' is the possessive pronoun showing ownership. 'It's' means 'it is'."
                },
                {
                    wrong: "The workers completed the difficult project by theirselves.",
                    right: "The workers completed the difficult project by themselves.",
                    why: "'Theirselves' does not exist in standard English. The correct plural reflexive pronoun is 'themselves'."
                }
            ],
            specialCases: [
                "'Who' vs 'Whom': Use 'who' when the word is performing the action (subject: 'Who called? -> He called'). Use 'whom' when the word is receiving the action or follows a preposition (object: 'To whom did you send it? -> I sent it to him').",
                "Singular 'they': Long established in English literature and standard contemporary usage for an individual whose gender is unknown, unspecified, or non-binary ('Somebody left their umbrella')."
            ],
            exercises: [
                {
                    id: "pro-q1",
                    type: "mcq",
                    question: "Choose the correct pronoun: 'The professor asked ___ to review the manuscript.'",
                    options: ["Sarah and I", "Sarah and me", "Sarah and myself", "me and Sarah"],
                    answer: "Sarah and me",
                    explanation: "The pronoun is the direct object of the verb 'asked'. Removing 'Sarah' leaves 'asked me', which confirms 'me' is correct."
                },
                {
                    id: "pro-q2",
                    type: "fill",
                    question: "Neither of the candidates had submitted ___ (his or her / their) financial disclosure.",
                    options: ["their", "theirs", "they", "them"],
                    answer: "their",
                    explanation: "'Their' is the standard gender-neutral possessive determiner modifying 'financial disclosure'."
                },
                {
                    id: "pro-q3",
                    type: "identify",
                    question: "Identify the mistake: 'The bird hurt it's wing when it collided with the window.'",
                    options: ["it's wing -> its wing", "hurt -> hurted", "collided -> was collided", "No error"],
                    answer: "it's wing -> its wing",
                    explanation: "'It's' is the contraction for 'it is'. The possessive form showing that the wing belongs to the bird is 'its'."
                },
                {
                    id: "pro-q4",
                    type: "correction",
                    question: "Select the sentence with correct pronoun usage:",
                    options: [
                        "Him and myself will lead the delegation.",
                        "He and I will lead the delegation.",
                        "He and me will lead the delegation.",
                        "Him and I will lead the delegation."
                    ],
                    answer: "He and I will lead the delegation.",
                    explanation: "Both pronouns form the compound subject of the verb 'will lead', requiring subject pronouns: 'He and I'."
                }
            ],
            quickRevision: [
                "Subject pronouns (I, you, he, she, it, we, they) perform actions.",
                "Object pronouns (me, you, him, her, it, us, them) receive actions or follow prepositions.",
                "Possessive pronouns (mine, yours, hers, theirs) stand alone without nouns.",
                "Never use 'theirselves' or 'hisself'; standard forms are 'themselves' and 'himself'.",
                "'Its' = possessive; 'It's' = it is / it has."
            ]
        },
        {
            id: "verbs",
            title: "Verbs",
            subtitle: "The engine of sentences: action, state of being, linking, and helping verbs",
            definition: "A verb is a word or phrase that describes an action (run, write), an occurrence (happen, develop), or a state of being (be, seem, exist). Every complete English sentence must contain at least one finite verb.",
            explanation: "Verbs indicate not only what happens, but when it happens (through tense and aspect) and how the action relates to reality (through mood and voice). They are categorized by function into dynamic action verbs, stative verbs, auxiliary helping verbs, and linking verbs.",
            formula: "[Subject] + [Finite Verb] + [Object / Complement (depending on verb transitivity)]",
            types: [
                {
                    name: "Dynamic (Action) Verbs",
                    desc: "Describe physical or mental actions that have a distinct beginning and end. Can be used in both continuous (-ing) and simple tenses.",
                    examples: "run, build, discuss, write, accelerate, cook, analyze."
                },
                {
                    name: "Stative (State of Being) Verbs",
                    desc: "Describe states, conditions, mental perceptions, emotions, or possession. Usually not used in continuous (-ing) tenses in standard English.",
                    examples: "know, believe, understand, love, belong, resemble, seem, weigh."
                },
                {
                    name: "Transitive vs Intransitive Verbs",
                    desc: "Transitive verbs require a direct object to complete their meaning (She read the report). Intransitive verbs do not take a direct object (The baby slept). Some verbs can be both.",
                    examples: "Transitive: raise, hit, buy. Intransitive: arrive, sleep, die. Both: open, run, sing."
                },
                {
                    name: "Linking (Copular) Verbs",
                    desc: "Connect the subject to a subject complement (noun or adjective) that renames or describes the subject. They do not express physical action.",
                    examples: "be (am/is/are/was/were), become, seem, appear, look, smell, taste, feel."
                },
                {
                    name: "Auxiliary (Helping) Verbs",
                    desc: "Work with the main verb to form various tenses, aspects, voices, and questions. Primary auxiliaries: be, do, have.",
                    examples: "is eating (continuous), have finished (perfect), do not care (negative)."
                },
                {
                    name: "Modal Auxiliaries",
                    desc: "Special helping verbs that express ability, permission, necessity, likelihood, or obligation. They never change form (-s, -ed, -ing).",
                    examples: "can, could, may, might, shall, should, will, would, must."
                }
            ],
            rules: [
                "Subject-verb agreement: A singular subject takes a singular verb (The student writes), while a plural subject takes a plural verb (The students write).",
                "Regular verbs form past simple (V2) and past participle (V3) by adding -ed (walk -> walked -> walked).",
                "Irregular verbs change forms irregularly: go -> went -> gone; take -> took -> taken; write -> wrote -> written; cut -> cut -> cut.",
                "Stative verbs are not used in continuous forms in standard grammar: Say 'I understand this concept', NOT 'I am understanding this concept'.",
                "After modal verbs (can, should, must), always use the bare infinitive (base form without 'to'): 'She can sing' (NEVER: 'She can to sing' or 'She can sings')."
            ],
            structures: [
                {
                    label: "Transitive Action Sentence",
                    formula: "[Subject] + [Transitive Verb] + [Direct Object]",
                    example: "The mechanic repaired the engine promptly."
                },
                {
                    label: "Intransitive Action Sentence",
                    formula: "[Subject] + [Intransitive Verb] + [Adverbial Modifier (optional)]",
                    example: "The aircraft landed smoothly on the runway."
                },
                {
                    label: "Linking Verb Sentence",
                    formula: "[Subject] + [Linking Verb] + [Subject Complement Adjective / Noun]",
                    example: "The soup smells fragrant."
                }
            ],
            examples: [
                "The scientific team *published* their groundbreaking discoveries in a peer-reviewed journal.",
                "Although the exam *appeared* challenging, all candidates *passed* with distinction.",
                "She *has written* three critically acclaimed novels over the past decade.",
                "The train *arrived* twenty minutes ahead of schedule.",
                "They *must respect* the safety regulations outlined by the building inspector."
            ],
            commonMistakes: [
                {
                    wrong: "I am knowing the answer to this difficult question.",
                    right: "I know the answer to this difficult question.",
                    why: "'Know' is a stative verb representing mental state; it is not conjugated in the continuous form."
                },
                {
                    wrong: "She must to submit the application before Friday.",
                    right: "She must submit the application before Friday.",
                    why: "Modal verbs like 'must' take the bare infinitive (base verb without 'to')."
                },
                {
                    wrong: "The price of groceries have risen sharply this year.",
                    right: "The price of groceries has risen sharply this year.",
                    why: "The subject is the singular noun 'price', not the plural prepositional modifier 'groceries'. Singular subjects require singular verbs ('has risen')."
                },
                {
                    wrong: "He laid on the sofa for three hours yesterday.",
                    right: "He lay on the sofa for three hours yesterday.",
                    why: "'Lie' (to recline) has past tense 'lay'. 'Lay' (to place an object) has past tense 'laid'."
                }
            ],
            specialCases: [
                "Verbs with both stative and dynamic meanings depending on context: 'I think you are right' (opinion, stative) vs 'I am thinking about moving' (mental process, dynamic); 'The soup tastes good' (property, stative) vs 'The chef is tasting the soup' (action, dynamic).",
                "Subjunctive mood verbs use the bare infinitive after verbs of demand/recommendation: 'The manager insisted that he be present' (not 'he is present')."
            ],
            exercises: [
                {
                    id: "verb-q1",
                    type: "mcq",
                    question: "Which of the following verbs is strictly intransitive (cannot take a direct object)?",
                    options: ["Arrive", "Build", "Devour", "Transport"],
                    answer: "Arrive",
                    explanation: "You cannot 'arrive something'. 'Arrive' never takes a direct object, whereas build, devour, and transport require objects."
                },
                {
                    id: "verb-q2",
                    type: "fill",
                    question: "Neither the teacher nor the students ___ (was / were) aware of the schedule change.",
                    options: ["were", "was", "is", "has been"],
                    answer: "were",
                    explanation: "When subjects are joined by 'neither...nor', the verb agrees with the closer subject ('the students' -> 'were')."
                },
                {
                    id: "verb-q3",
                    type: "identify",
                    question: "Identify the error in this sentence: 'The committee members should to reconsider their verdict.'",
                    options: ["should to reconsider -> should reconsider", "members -> member", "verdict -> verdicts", "No error"],
                    answer: "should to reconsider -> should reconsider",
                    explanation: "Modal verbs like 'should' take the bare infinitive without 'to'."
                },
                {
                    id: "verb-q4",
                    type: "correction",
                    question: "Which sentence correctly uses a linking verb with an adjective complement?",
                    options: [
                        "The fresh bread smells deliciously.",
                        "The fresh bread smells delicious.",
                        "The fresh bread is smelling delicious.",
                        "The fresh bread smells like deliciously."
                    ],
                    answer: "The fresh bread smells delicious.",
                    explanation: "Linking verbs take adjectives as subject complements, not adverbs. 'The bread smells delicious' describes the bread's quality."
                }
            ],
            quickRevision: [
                "Dynamic verbs describe actions; stative verbs describe states and feelings.",
                "Stative verbs are usually not used in continuous (-ing) tenses.",
                "Transitive verbs require an object; intransitive verbs do not.",
                "Modal auxiliaries are followed by bare infinitives (no 'to').",
                "Always check subject-verb agreement across modifying phrases."
            ]
        },
        {
            id: "adjectives",
            title: "Adjectives",
            subtitle: "Modifiers that describe, qualify, quantify, or specify nouns and pronouns",
            definition: "An adjective is a word that modifies, quantifies, or describes a noun or pronoun, providing details about size, shape, color, origin, material, quality, or quantity.",
            explanation: "Adjectives make writing precise and evocative. They can be placed directly before a noun in the attributive position ('a diligent student') or after a linking verb in the predicative position ('the student is diligent'). When multiple adjectives modify a single noun, English follows a natural Royal Order of Adjectives.",
            formula: "[Determiner] + [Adjective(s)] + [Noun]  OR  [Subject] + [Linking Verb] + [Predicative Adjective]",
            types: [
                {
                    name: "Descriptive (Qualitative) Adjectives",
                    desc: "Describe the characteristics, attributes, or qualities of a noun.",
                    examples: "radiant, courageous, delicate, ancient, freezing, stormy."
                },
                {
                    name: "Quantitative Adjectives",
                    desc: "Indicate quantity, amount, or number without counting exactly.",
                    examples: "many, several, few, little, numerous, enough, abundant."
                },
                {
                    name: "Demonstrative Adjectives",
                    desc: "Directly modify a noun to indicate which one (this, that, these, those). Must be followed by a noun to be an adjective rather than a pronoun.",
                    examples: "'This chapter is vital.' 'Those ideas are innovative.'"
                },
                {
                    name: "Possessive Adjectives (Determiners)",
                    desc: "Indicate ownership and precede the noun they modify.",
                    examples: "my, your, his, her, its, our, their ('my notebook', 'their house')."
                },
                {
                    name: "Proper Adjectives",
                    desc: "Derived from proper nouns, especially countries, regions, and historic figures. Always capitalized.",
                    examples: "Shakespearean, Victorian, Japanese, Italian, American."
                },
                {
                    name: "Participial Adjectives (-ed vs -ing)",
                    desc: "Adjectives formed from verb participles. -ed describes how a person feels; -ing describes the cause of the feeling.",
                    examples: "bored (feeling) vs boring (cause); interested (feeling) vs interesting (cause)."
                }
            ],
            rules: [
                "Attributive position: Adjectives usually precede the noun they modify ('a blue sky').",
                "Predicative position: Adjectives follow linking verbs and describe the subject ('The sky turned blue').",
                "Royal Order of Adjectives before a noun: 1. Opinion/Observation, 2. Size, 3. Shape, 4. Age, 5. Color, 6. Origin, 7. Material, 8. Purpose/Qualifier + Noun.",
                "Coordinate adjectives of equal importance describing the same noun take commas: 'a long, exhausting journey' (Test: Can you put 'and' between them? If yes, use a comma).",
                "Cumulative adjectives build upon each other without commas: 'three small vintage wooden chairs'."
            ],
            structures: [
                {
                    label: "Attributive Multiple Adjective Order",
                    formula: "[Opinion] + [Size] + [Age] + [Color] + [Origin] + [Material] + [Noun]",
                    example: "A lovely small antique silver mirror."
                },
                {
                    label: "Predicative Adjective Structure",
                    formula: "[Subject] + [Linking Verb (be/seem/look/feel)] + [Adjective]",
                    example: "The experimental results remain inconclusive."
                }
            ],
            examples: [
                "The curator unveiled an *exquisite*, *small*, *fifteenth-century* *Italian* *marble* sculpture.",
                "After the rigorous hike, all participants felt completely *exhausted*.",
                "The lecture on astrophysics was deeply *fascinating* and thought-provoking.",
                "Her *calm*, *deliberate* voice restored order in the crowded hall.",
                "We purchased several *large*, *circular* *wooden* dining tables for the banquet."
            ],
            commonMistakes: [
                {
                    wrong: "I was so boring during the long three-hour lecture.",
                    right: "I was so bored during the long three-hour lecture.",
                    why: "Use -ed for the emotional state experienced by a person. If you say 'I was boring', it means you made other people bored!"
                },
                {
                    wrong: "She bought a leather black stylish jacket.",
                    right: "She bought a stylish black leather jacket.",
                    why: "English requires the order: Opinion (stylish) -> Color (black) -> Material (leather)."
                },
                {
                    wrong: "The cake tasted deliciously after dinner.",
                    right: "The cake tasted delicious after dinner.",
                    why: "'Tasted' is functioning as a linking verb here, requiring an adjective complement ('delicious'), not an adverb."
                }
            ],
            specialCases: [
                "Compound adjectives with hyphens: When two or more words act as a single unit before a noun, hyphenate them ('a well-known artist', 'a five-year-old child', 'a state-of-the-art facility'). If they follow the verb, do not hyphenate ('The artist is well known').",
                "Postpositive adjectives: In specific poetic or legal expressions, adjectives follow the noun: 'attorney general', 'heir apparent', 'something wonderful', 'someone responsible'."
            ],
            exercises: [
                {
                    id: "adj-q1",
                    type: "mcq",
                    question: "Which sequence correctly follows the Royal Order of Adjectives?",
                    options: [
                        "A wooden antique beautiful desk",
                        "A beautiful antique wooden desk",
                        "An antique beautiful wooden desk",
                        "A wooden beautiful antique desk"
                    ],
                    answer: "A beautiful antique wooden desk",
                    explanation: "The standard order is Opinion (beautiful) -> Age (antique) -> Material (wooden) + Noun (desk)."
                },
                {
                    id: "adj-q2",
                    type: "fill",
                    question: "The documentary was so ___ (confused / confusing) that nobody understood the main argument.",
                    options: ["confusing", "confused", "confusedly", "confusion"],
                    answer: "confusing",
                    explanation: "The documentary caused confusion, so the active participle adjective ending in '-ing' is required."
                },
                {
                    id: "adj-q3",
                    type: "identify",
                    question: "Identify the mistake: 'He has an eight-years-old daughter who plays violin.'",
                    options: ["eight-years-old -> eight-year-old", "who -> which", "violin -> the violin", "has -> is having"],
                    answer: "eight-years-old -> eight-year-old",
                    explanation: "When age expressions act as compound adjectives before a noun, the noun unit remains singular: 'eight-year-old'."
                },
                {
                    id: "adj-q4",
                    type: "correction",
                    question: "Select the sentence with correct adjective placement:",
                    options: [
                        "The flowers smell wonderfully in the spring garden.",
                        "The flowers smell wonderful in the spring garden.",
                        "The flowers are smelling wonderful in the spring garden.",
                        "The flowers smell wonderful like perfume."
                    ],
                    answer: "The flowers smell wonderful in the spring garden.",
                    explanation: "'Smell' functions as a sensory linking verb and must be followed by the predicative adjective 'wonderful'."
                }
            ],
            quickRevision: [
                "Adjectives modify nouns and pronouns.",
                "Attributive adjectives go before the noun; predicative adjectives follow linking verbs.",
                "Adjectives order: Opinion -> Size -> Shape -> Age -> Color -> Origin -> Material -> Purpose.",
                "-ed adjectives express how you feel; -ing adjectives describe what causes the feeling.",
                "Hyphenate compound adjectives before nouns, but drop hyphens after verbs."
            ]
        },
        {
            id: "adverbs",
            title: "Adverbs",
            subtitle: "Versatile modifiers that describe verbs, adjectives, clauses, or other adverbs",
            definition: "An adverb is a word that modifies or provides additional information about a verb (how, when, where, how often an action happens), an adjective, another adverb, or an entire sentence.",
            explanation: "Adverbs provide answers to essential questions: How? (manner), When? (time), Where? (place), How often? (frequency), and To what extent? (degree). While many adverbs end in -ly, some common adverbs have identical forms to adjectives (fast, hard, early).",
            formula: "[Subject] + [Verb] + [Adverb of Manner/Place/Time]  OR  [Adverb of Frequency] + [Main Verb]",
            types: [
                {
                    name: "Adverbs of Manner",
                    desc: "Explain HOW an action is performed. Usually formed by adding -ly to adjectives.",
                    examples: "gracefully, quickly, meticulously, quietly, reluctantly, efficiently."
                },
                {
                    name: "Adverbs of Time",
                    desc: "Explain WHEN an action happens or for how long. Frequently placed at the beginning or end of sentences.",
                    examples: "yesterday, soon, now, later, recently, already, tomorrow."
                },
                {
                    name: "Adverbs of Place",
                    desc: "Explain WHERE an action happens. Usually follow the main verb or object.",
                    examples: "here, everywhere, outside, nearby, overseas, upstairs, abroad."
                },
                {
                    name: "Adverbs of Frequency",
                    desc: "Explain HOW OFTEN an action occurs. Positioned before main verbs but after 'to be'.",
                    examples: "always, usually, frequently, often, sometimes, rarely, seldom, never."
                },
                {
                    name: "Adverbs of Degree",
                    desc: "Explain the INTENSITY, degree, or extent of a verb, adjective, or another adverb.",
                    examples: "extremely, very, quite, fairly, totally, barely, scarcely, exceptionally."
                },
                {
                    name: "Sentence Adverbs",
                    desc: "Modify the entire sentence or clause, conveying the speaker's perspective.",
                    examples: "Fortunately, Honestly, Regrettably, Consequently, Undoubtedly."
                }
            ],
            rules: [
                "Frequency adverb placement: Place BEFORE main verbs (She rarely complains) but AFTER the auxiliary/linking verb 'to be' (She is rarely late).",
                "Do not place an adverb between a transitive verb and its direct object: Say 'He answered the phone quickly' (NOT: 'He answered quickly the phone').",
                "Flat adverbs: Some adverbs have the exact same spelling as adjectives without -ly: fast, hard, late, early, daily, straight. 'He runs fast' (fast = adverb); 'A fast runner' (fast = adjective).",
                "Hard vs Hardly: 'Hard' means with great energy/effort ('She works hard'). 'Hardly' means barely/almost not at all ('She hardly worked'). They have opposite meanings!",
                "Late vs Lately: 'Late' means not on time. 'Lately' means recently."
            ],
            structures: [
                {
                    label: "Manner, Place, and Time Sequence",
                    formula: "[Verb] + [Manner] + [Place] + [Time]",
                    example: "The pianist performed flawlessly at the concert hall last night."
                },
                {
                    label: "Frequency Adverb Mid-Position",
                    formula: "[Subject] + [Adverb of Frequency] + [Main Verb] + [Object]",
                    example: "We consistently verify our research data."
                },
                {
                    label: "Degree Adverb Modifying Adjective",
                    formula: "[Subject] + [Linking Verb] + [Adverb of Degree] + [Adjective]",
                    example: "The architectural design is exceptionally innovative."
                }
            ],
            examples: [
                "The surgeon performed the delicate operation *meticulously*.",
                "She *rarely* leaves her office before seven in the evening.",
                "The storm struck *suddenly* and caused extensive damage *everywhere*.",
                "His argument was *incredibly* persuasive and logically sound.",
                "*Fortunately*, all passengers disembarked *safely* after the emergency landing."
            ],
            commonMistakes: [
                {
                    wrong: "He completed the assignment good and turned it in.",
                    right: "He completed the assignment well and turned it in.",
                    why: "'Good' is an adjective. 'Well' is the adverb modifying the verb 'completed'."
                },
                {
                    wrong: "She studied hardly all night, so she aced the exam.",
                    right: "She studied hard all night, so she aced the exam.",
                    why: "'Hard' means with great effort. 'Hardly' means almost not at all!"
                },
                {
                    wrong: "The team played very bad during the second half.",
                    right: "The team played very badly during the second half.",
                    why: "Modify the action verb 'played' with the adverb 'badly', not the adjective 'bad'."
                },
                {
                    wrong: "She speaks fluently French in business meetings.",
                    right: "She speaks French fluently in business meetings.",
                    why: "Do not separate the transitive verb ('speaks') from its direct object ('French') with an adverb."
                }
            ],
            specialCases: [
                "Adjectives ending in -ly: Words like friendly, lovely, lonely, silly, cowardly, and lively are adjectives, NOT adverbs! To use them adverbially, say: 'in a friendly manner' or 'in a lovely way'.",
                "Inversion after negative adverbs: When sentences begin with negative/restrictive adverbs (seldom, rarely, never, scarcely, hardly), invert the subject and auxiliary verb: 'Rarely have I seen such dedication' (instead of 'Rarely I have seen')."
            ],
            exercises: [
                {
                    id: "adv-q1",
                    type: "mcq",
                    question: "Which sentence correctly places the adverb of frequency?",
                    options: [
                        "He arrives always on time for morning meetings.",
                        "He always arrives on time for morning meetings.",
                        "Always he arrives on time for morning meetings.",
                        "He arrives on time always for morning meetings."
                    ],
                    answer: "He always arrives on time for morning meetings.",
                    explanation: "Adverbs of frequency sit before main action verbs: 'always arrives'."
                },
                {
                    id: "adv-q2",
                    type: "fill",
                    question: "The pianist played so ___ (good / well) that the audience gave a standing ovation.",
                    options: ["well", "good", "nicely good", "goodly"],
                    answer: "well",
                    explanation: "'Well' is the correct adverb of manner modifying the action verb 'played'."
                },
                {
                    id: "adv-q3",
                    type: "identify",
                    question: "Identify the mistake: 'Seldom she complains about working overtime.'",
                    options: [
                        "Seldom she complains -> Seldom does she complain",
                        "about -> of",
                        "working -> to work",
                        "overtime -> overtimes"
                    ],
                    answer: "Seldom she complains -> Seldom does she complain",
                    explanation: "Starting a sentence with a restrictive adverb like 'Seldom' triggers subject-auxiliary inversion: 'Seldom does she complain'."
                },
                {
                    id: "adv-q4",
                    type: "correction",
                    question: "Choose the sentence that correctly uses 'hard' or 'hardly':",
                    options: [
                        "He was exhausted because he worked hardly all weekend.",
                        "He was exhausted because he worked hard all weekend.",
                        "He worked hardly and finished the assignment.",
                        "Hardly he worked, but he passed."
                    ],
                    answer: "He was exhausted because he worked hard all weekend.",
                    explanation: "'Worked hard' means worked with great effort. 'Hardly' means barely or scarcely."
                }
            ],
            quickRevision: [
                "Adverbs modify verbs, adjectives, other adverbs, or whole clauses.",
                "They answer How? When? Where? How often? and To what extent?",
                "Adverbs of frequency precede main verbs but follow 'to be'.",
                "Do not put an adverb between a verb and its direct object.",
                "'Hard' = with effort; 'Hardly' = barely. 'Good' = adjective; 'Well' = adverb."
            ]
        },
        {
            id: "prepositions",
            title: "Prepositions",
            subtitle: "Connective words indicating relationships of time, place, direction, and logic",
            definition: "A preposition is a word or group of words used before a noun, pronoun, or noun phrase to show direction, time, place, location, spatial relationships, or to introduce an object.",
            explanation: "Prepositions function as grammatical bridges. A preposition plus its object forms a prepositional phrase, which acts either as an adjective modifying a noun or as an adverb modifying a verb. Choosing the correct preposition often depends on established idiomatic collocations.",
            formula: "[Preposition] + [Noun / Pronoun / Gerund (-ing)] = Prepositional Phrase",
            types: [
                {
                    name: "Prepositions of Time",
                    desc: "Indicate when something happens. Key rules: AT for exact clock times/holidays (at 5 PM, at midnight); ON for days and dates (on Monday, on July 4th); IN for months, years, centuries, and longer periods (in 2026, in December, in the morning).",
                    examples: "at, on, in, during, before, after, since, until, for."
                },
                {
                    name: "Prepositions of Place & Position",
                    desc: "Indicate where an object is located. AT for a specific point (at the station); ON for a surface (on the wall, on the table); IN for an enclosed space or geographic area (in the room, in Madrid).",
                    examples: "at, on, in, under, over, beneath, between, among, behind, opposite."
                },
                {
                    name: "Prepositions of Direction & Movement",
                    desc: "Show movement toward, into, or across a destination.",
                    examples: "to, into, onto, through, across, towards, out of, past, along."
                },
                {
                    name: "Prepositions of Agency & Instrument",
                    desc: "Show who or what created or performed an action. BY indicates the person or agent; WITH indicates the instrument or tool used.",
                    examples: "written by Shakespeare, carved with a chisel, painted with oils."
                },
                {
                    name: "Dependent Prepositions (Collocations)",
                    desc: "Prepositions strictly bound to particular verbs, adjectives, or nouns.",
                    examples: "depend ON, interested IN, accused OF, prevent FROM, familiar WITH."
                }
            ],
            rules: [
                "A preposition must always be followed by a noun, pronoun, or gerund (verb + -ing). Never follow a preposition directly with a base verb: 'She succeeded by studying hard' (NOT: 'by study hard').",
                "Preposition pronoun objects must take the object pronoun form: 'between you and me' (NOT: 'between you and I').",
                "Between vs Among: Use 'between' when naming distinct, individual items (even more than two, e.g., 'negotiations between France, Germany, and Italy'); use 'among' for items considered collectively or as part of an undefined group ('scattered among the crowd').",
                "For vs Since: Use 'for' with a duration of time ('for three years'); use 'since' with a specific starting point in time ('since 2021').",
                "In modern English, ending a sentence with a preposition is acceptable and natural when avoiding awkward formality ('Who are you waiting for?' is preferred over 'For whom are you waiting?')."
            ],
            structures: [
                {
                    label: "Time Triad Rule: At, On, In",
                    formula: "AT (exact time/points) | ON (days/dates) | IN (months/years/seasons/enclosed time)",
                    example: "At 9:00 AM on Monday in October."
                },
                {
                    label: "Place Triad Rule: At, On, In",
                    formula: "AT (specific point) | ON (surface/street) | IN (enclosed space/city/country)",
                    example: "At the desk on Fifth Avenue in Chicago."
                },
                {
                    label: "Preposition + Gerund Structure",
                    formula: "[Clause] + [Preposition] + [Verb-ing (Gerund)]",
                    example: "He insisted on paying for the dinner."
                }
            ],
            examples: [
                "The international summit convenes *at* 9:00 AM *on* Wednesday *in* Geneva.",
                "She walked *into* the auditorium and sat *between* two visiting scholars.",
                "They have been collaborating on this research initiative *since* September.",
                "The document was signed *by* the prime minister *with* a fountain pen.",
                "He apologized *for* arriving late *to* the board meeting."
            ],
            commonMistakes: [
                {
                    wrong: "I will meet you in Monday morning at 10 AM.",
                    right: "I will meet you on Monday morning at 10 AM.",
                    why: "Days of the week require 'on', even when combined with 'morning', 'afternoon', or 'evening'."
                },
                {
                    wrong: "This confidential matter is strictly between you and I.",
                    right: "This confidential matter is strictly between you and me.",
                    why: "'Between' is a preposition; it must take the object pronoun 'me'."
                },
                {
                    wrong: "She is capable to accomplish great things in science.",
                    right: "She is capable of accomplishing great things in science.",
                    why: "The adjective 'capable' takes the dependent preposition 'of' followed by a gerund ('of accomplishing')."
                },
                {
                    wrong: "We have lived in this city since five years.",
                    right: "We have lived in this city for five years.",
                    why: "Use 'for' with a span/duration of time (five years). Use 'since' only with a specific starting point (since 2021)."
                }
            ],
            specialCases: [
                "No preposition before certain time expressions: Do not use at/in/on before: this, last, next, every ('I saw him last Tuesday', NOT 'on last Tuesday'; 'We travel every winter', NOT 'in every winter').",
                "Different prepositions changing meaning: 'He threw the ball to me' (for catching) vs 'He threw the ball at me' (aggressively to hit me); 'Arrive at' (a building/event) vs 'Arrive in' (a city/country)."
            ],
            exercises: [
                {
                    id: "prep-q1",
                    type: "mcq",
                    question: "Select the correct preposition: 'The flight will depart ___ 6:30 AM ___ Friday.'",
                    options: ["at / on", "in / at", "on / in", "at / in"],
                    answer: "at / on",
                    explanation: "Use 'at' for specific clock times ('at 6:30 AM') and 'on' for days of the week ('on Friday')."
                },
                {
                    id: "prep-q2",
                    type: "fill",
                    question: "She has been working as a software architect ___ (for / since) she graduated in 2020.",
                    options: ["since", "for", "during", "from"],
                    answer: "since",
                    explanation: "'She graduated in 2020' denotes a specific starting moment in the past, requiring 'since'."
                },
                {
                    id: "prep-q3",
                    type: "identify",
                    question: "Identify the mistake: 'He entered into the room without knocking.'",
                    options: ["entered into -> entered", "without -> with", "knocking -> knock", "No error"],
                    answer: "entered into -> entered",
                    explanation: "When entering a physical space, 'enter' is transitive and takes no preposition: 'He entered the room'."
                },
                {
                    id: "prep-q4",
                    type: "correction",
                    question: "Choose the sentence with correct dependent preposition usage:",
                    options: [
                        "She is very interested with learning ancient history.",
                        "She is very interested in learning ancient history.",
                        "She is very interested for learning ancient history.",
                        "She is very interested about learning ancient history."
                    ],
                    answer: "She is very interested in learning ancient history.",
                    explanation: "The adjective 'interested' takes the dependent preposition 'in'."
                }
            ],
            quickRevision: [
                "Prepositions show time, place, direction, and relational connections.",
                "Time: AT (clock/exact), ON (days/dates), IN (months/years/periods).",
                "Place: AT (point), ON (surface), IN (enclosed space/area).",
                "Prepositions must take noun or gerund (-ing) objects, never bare verbs.",
                "Use 'for' with durations; use 'since' with specific starting points."
            ]
        },
        {
            id: "conjunctions",
            title: "Conjunctions",
            subtitle: "Connecting words that link words, phrases, and clauses into cohesive sentences",
            definition: "A conjunction is a part of speech used to connect words, phrases, or clauses, establishing logical relationships such as addition, contrast, cause, condition, or choice.",
            explanation: "Without conjunctions, language would be reduced to short, choppy, simplistic statements. Conjunctions allow writers to construct compound and complex sentences that express nuanced thoughts, causal relationships, and intellectual contrasts.",
            formula: "[Clause / Word 1] + [Conjunction] + [Clause / Word 2]",
            types: [
                {
                    name: "Coordinating Conjunctions (FANBOYS)",
                    desc: "Join words, phrases, or independent clauses of equal grammatical importance: For, And, Nor, But, Or, Yet, So.",
                    examples: "For (reason), And (addition), Nor (negative choice), But (contrast), Or (option), Yet (unexpected contrast), So (result)."
                },
                {
                    name: "Subordinating Conjunctions",
                    desc: "Join an independent (main) clause to a dependent (subordinate) clause, establishing relationships of time, cause, condition, or concession.",
                    examples: "because, although, since, unless, while, whereas, even though, after, before, if."
                },
                {
                    name: "Correlative Conjunctions",
                    desc: "Pairs of conjunctions that work together to join grammatically parallel elements in a sentence.",
                    examples: "either...or, neither...nor, not only...but also, both...and, whether...or."
                },
                {
                    name: "Conjunctive Adverbs (Transition Words)",
                    desc: "Adverbs that connect independent clauses. When joining two clauses, they are preceded by a semicolon and followed by a comma.",
                    examples: "however, therefore, furthermore, nevertheless, moreover, consequently."
                }
            ],
            rules: [
                "When a coordinating conjunction links two independent clauses (full sentences), place a comma BEFORE the conjunction: 'I wanted to attend, but the tickets were sold out.'",
                "Do NOT use a comma when a coordinating conjunction connects only two words or phrases: 'She ordered soup and salad' (no comma).",
                "When a subordinating clause comes FIRST in a sentence, use a comma after it: 'Although it rained, we enjoyed the concert.' When it comes SECOND, usually no comma is needed: 'We enjoyed the concert although it rained.'",
                "Correlative parallelism: The grammatical structures following both halves of a correlative pair must match: 'She likes not only swimming but also running' (both gerunds).",
                "Never use 'although' and 'but' together in the same sentence: Say 'Although it was late, he continued working' (NOT: 'Although it was late, but he continued working')."
            ],
            structures: [
                {
                    label: "Compound Sentence with FANBOYS",
                    formula: "[Independent Clause] + [, + FANBOYS] + [Independent Clause]",
                    example: "The deadline was tight, yet the team delivered exceptional results."
                },
                {
                    label: "Complex Sentence with Subordinating Conjunction",
                    formula: "[Subordinating Conjunction] + [Dependent Clause] + [,] + [Independent Clause]",
                    example: "Because she prepared thoroughly, she passed the examination with honors."
                },
                {
                    label: "Correlative Parallel Structure",
                    formula: "[not only] + [Parallel Structure A] + [but also] + [Parallel Structure B]",
                    example: "He is not only an accomplished pianist but also a gifted composer."
                }
            ],
            examples: [
                "She completed the complex programming assignment, *and* her colleague deployed it to production.",
                "*Although* the experimental vaccine showed promise, further trials were required.",
                "You can *either* submit the application online *or* deliver it in person.",
                "The weather was freezing; *nevertheless*, the expedition pressed onward.",
                "He declined the executive offer *not only* because of the salary *but also* because of the relocation requirement."
            ],
            commonMistakes: [
                {
                    wrong: "Although he studied hard, but he failed the exam.",
                    right: "Although he studied hard, he failed the exam. (OR: He studied hard, but he failed the exam).",
                    why: "Do not double-up conjunctions expressing the same relationship. Use either 'although' or 'but', never both."
                },
                {
                    wrong: "She likes both reading books and to write poetry.",
                    right: "She likes both reading books and writing poetry.",
                    why: "Correlative conjunctions require parallel grammatical structures (both + gerund, and + gerund)."
                },
                {
                    wrong: "Neither the manager or the assistants were notified.",
                    right: "Neither the manager nor the assistants were notified.",
                    why: "'Neither' pairs strictly with 'nor'. 'Either' pairs with 'or'."
                },
                {
                    wrong: "I stayed home because of I was sick.",
                    right: "I stayed home because I was sick. (OR: I stayed home because of my illness).",
                    why: "'Because' is followed by a full clause (subject + verb). 'Because of' is followed by a noun phrase."
                }
            ],
            specialCases: [
                "Starting sentences with 'And' or 'But': While schoolteachers historically discouraged it to prevent sentence fragments, starting a sentence with a coordinating conjunction is completely standard in published professional and literary writing when used deliberately for rhetorical emphasis.",
                "'Nor' inversion: When 'nor' introduces an independent clause, the subject and auxiliary verb invert: 'He doesn't eat meat, nor does he consume dairy products.'"
            ],
            exercises: [
                {
                    id: "conj-q1",
                    type: "mcq",
                    question: "Choose the correct pair: '___ the director ___ the producer attended the festival.'",
                    options: ["Neither / nor", "Neither / or", "Either / nor", "Both / or"],
                    answer: "Neither / nor",
                    explanation: "'Neither' strictly pairs with 'nor' in English grammar."
                },
                {
                    id: "conj-q2",
                    type: "fill",
                    question: "We will proceed with the outdoor ceremony ___ (unless / although) it starts pouring with rain.",
                    options: ["unless", "although", "because", "despite"],
                    answer: "unless",
                    explanation: "'Unless' means 'if not' or 'except on the condition that', which fits the logical condition."
                },
                {
                    id: "conj-q3",
                    type: "identify",
                    question: "Identify the grammatical error: 'Even though she felt exhausted, but she finished the marathon.'",
                    options: [
                        "Remove 'but'",
                        "Change 'exhausted' to 'exhausting'",
                        "Change 'Even though' to 'Because'",
                        "No error"
                    ],
                    answer: "Remove 'but'",
                    explanation: "Using 'Even though' and 'but' together creates a redundant double conjunction. Remove 'but'."
                },
                {
                    id: "conj-q4",
                    type: "correction",
                    question: "Select the sentence with correct parallel structure:",
                    options: [
                        "She wants not only to study medicine but also practicing surgery.",
                        "She wants not only to study medicine but also to practice surgery.",
                        "She wants to not only study medicine but also surgery.",
                        "Not only she wants to study medicine but also to practice."
                    ],
                    answer: "She wants not only to study medicine but also to practice surgery.",
                    explanation: "Both parts after 'not only' and 'but also' must match in form (infinitive + infinitive)."
                }
            ],
            quickRevision: [
                "Coordinating (FANBOYS) link equal grammatical elements.",
                "Subordinating conjunctions link dependent clauses to independent clauses.",
                "Correlative pairs (either/or, neither/nor, not only/but also) require parallel structure.",
                "Never use 'although' and 'but' in the same sentence.",
                "Use a comma before FANBOYS when joining two independent sentences."
            ]
        },
        {
            id: "interjections",
            title: "Interjections",
            subtitle: "Expressive words conveying immediate emotion, reaction, or conversational pauses",
            definition: "An interjection is a word, phrase, or vocal sound inserted into an utterance to express sudden emotion, reaction, feeling, agreement, or hesitation. It stands outside the core syntactic structure of a clause.",
            explanation: "Interjections convey tone, sentiment, and spoken reality. They are abundant in dialogue, creative writing, drama, and informal communication. In formal academic and technical writing, interjections are rare except when quoting direct speech.",
            formula: "[Interjection] + [! / ,] + [Sentence / Utterance]",
            types: [
                {
                    name: "Interjections of Emotion & Pain",
                    desc: "Express instinctive physical or emotional reactions such as surprise, relief, pain, or joy.",
                    examples: "Ouch! (pain), Wow! (amazement), Phew! (relief), Alas! (grief/sorrow), Hurray! (joy)."
                },
                {
                    name: "Interjections of Greeting & Parting",
                    desc: "Initiate or conclude social interactions.",
                    examples: "Hello!, Hey!, Good morning!, Farewell!, Bye!, Cheers!."
                },
                {
                    name: "Interjections of Agreement & Disagreement",
                    desc: "Express affirmation, acceptance, doubt, or dismissal.",
                    examples: "Yes, Absolutely, Indeed, No, Nope, Nah, Bah!."
                },
                {
                    name: "Hesitation Markers & Fillers",
                    desc: "Spoken sounds indicating pauses, thinking, or checking conversational reception.",
                    examples: "Um, Uh, Er, Well, Hmm, You know, Like."
                },
                {
                    name: "Attention-Getting Interjections",
                    desc: "Used to capture someone's focus or command silence.",
                    examples: "Psst!, Hey!, Look!, Shh!, Listen!."
                }
            ],
            rules: [
                "Punctuation with strong emotion: Follow with an exclamation point, and start the following sentence with a capital letter: 'Ouch! That pan is scalding hot.'",
                "Punctuation with mild emotion or introductory pause: Follow with a comma, and continue the sentence in lowercase: 'Well, I suppose we can reschedule.'",
                "Grammatical independence: Interjections do not have a grammatical subject-predicate tie to the rest of the sentence; removing them leaves the sentence grammatically complete.",
                "Register and tone: Avoid interjections in formal research papers, legal briefs, and professional business reports unless transcribing interviews."
            ],
            structures: [
                {
                    label: "Stand-Alone Strong Reaction",
                    formula: "[Interjection]! + [Independent Clause]",
                    example: "Brilliant! You solved the riddle in record time."
                },
                {
                    label: "Integrated Mild Conversational Marker",
                    formula: "[Interjection] + [,] + [Sentence]",
                    example: "Oh, I didn't realize you were waiting outside."
                }
            ],
            examples: [
                "*Ouch!* I accidentally pinched my finger in the drawer.",
                "*Well*, we have reviewed all candidates, and one stands out clearly.",
                "*Alas*, the historic theatre was destroyed in the fire.",
                "*Psst!* Don't forget your security pass on the reception counter.",
                "*Indeed*, the experimental data fully supports the hypothesis."
            ],
            commonMistakes: [
                {
                    wrong: "Ouch, that broke my arm!",
                    right: "Ouch! That broke my arm!",
                    why: "Severe pain or high-intensity emotions require an exclamation mark, not a weak comma."
                },
                {
                    wrong: "In conclusion, alas, the economy dropped because of inflation. (In a formal thesis)",
                    right: "In conclusion, economic indicators declined as a result of inflationary pressure.",
                    why: "Archaic and dramatic interjections like 'alas' are inappropriate in formal analytical writing."
                }
            ],
            specialCases: [
                "Multi-word interjections: Expressions like 'Oh dear!', 'Good grief!', 'Thank heavens!', 'For heaven's sake!' function as compound interjections.",
                "Onomatopoeic interjections: Sounds mimicking actions, like 'Achoo!' (sneezing), 'Thud!' (heavy fall), or 'Shh!' (silencing)."
            ],
            exercises: [
                {
                    id: "inter-q1",
                    type: "mcq",
                    question: "Which punctuation mark is most appropriate for a sudden, intense cry of pain: 'Ouch ___ That hurt!'",
                    options: [
                        "An exclamation point (!)",
                        "A semicolon (;)",
                        "A question mark (?)",
                        "A period (.)"
                    ],
                    answer: "An exclamation point (!)",
                    explanation: "Strong emotional outbursts like pain require an exclamation mark."
                },
                {
                    id: "inter-q2",
                    type: "fill",
                    question: "___, I think we have debated this topic enough for today. (Well / Ouch / Alas)",
                    options: ["Well", "Ouch", "Alas", "Shh"],
                    answer: "Well",
                    explanation: "'Well' functions as a mild introductory marker transitioning to a conclusion."
                },
                {
                    id: "inter-q3",
                    type: "identify",
                    question: "Identify the purpose of 'Psst!' in dialogue:",
                    options: [
                        "Attracting someone's attention quietly",
                        "Expressing severe grief",
                        "Indicating total agreement",
                        "Expressing physical exhaustion"
                    ],
                    answer: "Attracting someone's attention quietly",
                    explanation: "'Psst!' is an attention-getting interjection intended to be discreet."
                },
                {
                    id: "inter-q4",
                    type: "correction",
                    question: "Select the sentence with proper mild interjection punctuation:",
                    options: [
                        "Oh, I didn't see you standing there.",
                        "Oh! i didn't see you standing there.",
                        "Oh? I didn't see you standing there!",
                        "Oh: I didn't see you standing there."
                    ],
                    answer: "Oh, I didn't see you standing there.",
                    explanation: "Mild interjections take a comma and are followed by a standard clause."
                }
            ],
            quickRevision: [
                "Interjections express sudden emotion, reactions, greetings, or conversational pauses.",
                "Strong emotion takes an exclamation point (!).",
                "Mild emotion or conversational pauses take a comma (,).",
                "Interjections are syntactically independent of the sentence.",
                "Avoid interjections in formal academic and technical writing."
            ]
        },
        {
            id: "articles",
            title: "Articles",
            subtitle: "Essential determiners: Indefinite ('A', 'An'), Definite ('The'), and the Zero Article",
            definition: "Articles are a specialized class of determiners used with nouns to indicate whether the noun refers to something specific, unique, and known to the listener, or something general, non-specific, and introduced for the first time.",
            explanation: "English has three article choices: the indefinite article ('a' and 'an'), the definite article ('the'), and the zero article (omission of any article). The choice depends on phonetic sounds (consonants vs vowels), countability (countable vs uncountable), and pragmatic reference (known vs unknown).",
            formula: "[a / an] + [Singular Countable Noun]  OR  [the] + [Any Noun (specific)]  OR  [Ø (Zero)] + [Plural / Uncountable]",
            types: [
                {
                    name: "Indefinite Article: 'A'",
                    desc: "Used before singular, countable nouns introduced for the first time that begin with a CONSONANT SOUND.",
                    examples: "a book, a cat, a university (starts with /j/ consonant sound), a European country, a one-dollar bill."
                },
                {
                    name: "Indefinite Article: 'An'",
                    desc: "Used before singular, countable nouns introduced for the first time that begin with a VOWEL SOUND.",
                    examples: "an apple, an elephant, an hour (silent 'h' -> starts with vowel /aʊ/), an honest mistake, an MBA degree (starts with /em/)."
                },
                {
                    name: "Definite Article: 'The'",
                    desc: "Used with singular, plural, or uncountable nouns when the specific identity of the noun is already known to both speaker and listener (previously mentioned, unique in context, or defined by a modifying clause).",
                    examples: "the sun, the moon, the president, the car we rented, the water in this bottle."
                },
                {
                    name: "Zero Article (No Article: Ø)",
                    desc: "Used with plural countable nouns and uncountable nouns when speaking about them generally, as well as most proper nouns, meals, sports, and languages.",
                    examples: "Elephants are intelligent (general). Water is life. Breakfast, tennis, Spanish, Mount Fuji."
                }
            ],
            rules: [
                "Sound over spelling rule: The choice between 'a' and 'an' depends strictly on the PRONUNCIATION sound, NOT the letter: 'a university' (sounds like 'you-niversity'), 'an hour' (silent 'h'), 'an FBI agent' (pronounced 'eff-bee-eye').",
                "First vs Second mention: Use 'a/an' when first introducing a countable noun, and switch to 'the' for all subsequent mentions: 'I bought a bicycle yesterday. The bicycle is lightweight.'",
                "Unique entities take 'the': the Earth, the internet, the Eiffel Tower, the Pacific Ocean, the Renaissance.",
                "Superlatives and ordinals require 'the': the best player, the tallest building, the first attempt.",
                "Geographic rules for 'the': Use 'the' with oceans, rivers, mountain ranges, island groups, and plural/federated countries (the Atlantic, the Thames, the Alps, the Philippines, the United States, the United Kingdom). Do NOT use 'the' with individual mountains, single islands, lakes, or most countries (Mount Everest, Madagascar, Lake Michigan, France, Canada)."
            ],
            structures: [
                {
                    label: "Indefinite Introduction to Definite Identification",
                    formula: "[Sentence introducing a/an + Noun] -> [Sentence specifying the + Noun]",
                    example: "A scientist formulated a hypothesis. The hypothesis proved correct."
                },
                {
                    label: "Zero Article for General Categories",
                    formula: "[Plural Countable Noun / Uncountable Noun] + [Verb] (general statement)",
                    example: "Teachers shape the future of society."
                }
            ],
            examples: [
                "She earned *an* honors degree from *a* prestigious *university* in *the* United Kingdom.",
                "*The* sun rose above *the* horizon, illuminating *the* snow-covered peaks of *the* Himalayas.",
                "*Honesty* is *a* virtue that builds *trust* in relationships (Zero article with abstract nouns).",
                "Could you please pass *the* salt on *the* counter?",
                "*A* representative arrived to inspect *the* damaged equipment."
            ],
            commonMistakes: [
                {
                    wrong: "She has been waiting for a hour at the terminal.",
                    right: "She has been waiting for an hour at the terminal.",
                    why: "The 'h' in 'hour' is silent. The word begins with a vowel sound (/aʊər/), requiring 'an'."
                },
                {
                    wrong: "He is studying in an university in Munich.",
                    right: "He is studying at a university in Munich.",
                    why: "'University' begins with a consonant sound (/j/ as in 'yellow'), requiring 'a', not 'an'."
                },
                {
                    wrong: "The dogs are loyal animals. (When meaning dogs in general)",
                    right: "Dogs are loyal animals.",
                    why: "When making a general statement about a plural countable noun, use the zero article."
                },
                {
                    wrong: "She visited the Mount Kilimanjaro and the France last summer.",
                    right: "She visited Mount Kilimanjaro and France last summer.",
                    why: "Individual mountains and standard single-name countries take the zero article."
                }
            ],
            specialCases: [
                "'The' with adjectives representing groups of people: When 'the' precedes an adjective without a noun, it functions as a plural noun: 'the rich' (rich people), 'the poor' (poor people), 'the elderly', 'the injured'.",
                "Institution nouns (school, prison, hospital, university, bed): In British English, use the zero article when visiting for the primary purpose ('He is in hospital' = as a patient). Use 'the' when visiting the physical location ('She went to the hospital to visit her friend')."
            ],
            exercises: [
                {
                    id: "art-q1",
                    type: "mcq",
                    question: "Which sentence uses the correct article?",
                    options: [
                        "She was awarded an MBA from a European business school.",
                        "She was awarded a MBA from an European business school.",
                        "She was awarded the MBA from an European business school.",
                        "She was awarded a MBA from a European business school."
                    ],
                    answer: "She was awarded an MBA from a European business school.",
                    explanation: "'MBA' starts with vowel sound /em/ -> 'an MBA'. 'European' starts with consonant sound /j/ -> 'a European'."
                },
                {
                    id: "art-q2",
                    type: "fill",
                    question: "We crossed ___ (the / a / Ø) Atlantic Ocean on our way to London.",
                    options: ["the", "a", "an", "Ø (Zero article)"],
                    answer: "the",
                    explanation: "Oceans always require the definite article 'the': 'the Atlantic Ocean'."
                },
                {
                    id: "art-q3",
                    type: "identify",
                    question: "Identify the mistake: 'The gold is a precious metal that has been prized for centuries.'",
                    options: ["The gold -> Gold", "precious -> more precious", "prized -> prize", "centuries -> century"],
                    answer: "The gold -> Gold",
                    explanation: "When speaking of materials or substances in general, use the zero article: 'Gold is a precious metal'."
                },
                {
                    id: "art-q4",
                    type: "correction",
                    question: "Select the sentence with correct article usage for a specific object:",
                    options: [
                        "Could you close a door? The wind is cold.",
                        "Could you close the door? The wind is cold.",
                        "Could you close door? The wind is cold.",
                        "Could you close an door? The wind is cold."
                    ],
                    answer: "Could you close the door? The wind is cold.",
                    explanation: "Because both speaker and listener are in the room, the door is specific and known, requiring 'the door'."
                }
            ],
            quickRevision: [
                "'A' precedes consonant sounds; 'An' precedes vowel sounds (sound matters, not letter).",
                "'The' is used when the noun is specific, unique, or previously introduced.",
                "Zero article is used with plural and uncountable nouns in general statements.",
                "Use 'the' with oceans, rivers, and mountain ranges, but not with individual peaks or standard countries.",
                "Superlatives always take 'the' (the best, the fastest)."
            ]
        },
        {
            id: "determiners",
            title: "Determiners",
            subtitle: "Specifying and quantifying words that precede nouns to establish reference",
            definition: "A determiner is a modifying word placed before a noun to clarify what the noun refers to and indicate quantity, possession, definiteness, or distribution. Unlike descriptive adjectives, determiners cannot take comparative forms.",
            explanation: "Determiners establish the grammatical scope of a noun phrase. Every singular countable noun must have a determiner. Determiners include articles (a, an, the), demonstratives (this, that), possessives (my, your), quantifiers (some, many), and distributives (each, every).",
            formula: "[Determiner] + [Adjective(s) (optional)] + [Noun]",
            types: [
                {
                    name: "Demonstrative Determiners",
                    desc: "Clarify proximity in space or time: this/these (near), that/those (far). Must precede a noun.",
                    examples: "this experiment, that building, these findings, those candidates."
                },
                {
                    name: "Possessive Determiners",
                    desc: "Indicate ownership or association preceding a noun.",
                    examples: "my research, your passport, his career, her initiative, our team, their feedback."
                },
                {
                    name: "Quantifiers",
                    desc: "Indicate quantity or amount. Some work only with countable nouns (many, few, fewer); some only with uncountable nouns (much, little, less); some with both (some, any, all, most, plenty of).",
                    examples: "many volunteers (countable), much patience (uncountable), some water, some books."
                },
                {
                    name: "Distributive Determiners",
                    desc: "Refer to members of a group individually: each, every, either, neither, both.",
                    examples: "each student, every participant, either option, neither outcome, both candidates."
                },
                {
                    name: "Interrogative & Relative Determiners",
                    desc: "Used before nouns in questions and relative clauses.",
                    examples: "'Which route should we take?' 'Whatever decision you make...'"
                }
            ],
            rules: [
                "Countable vs Uncountable Quantifiers: Use 'many', 'few', and 'fewer' with plural countable nouns; use 'much', 'little', and 'less' with uncountable nouns ('fewer errors', 'less water').",
                "'Few' vs 'A Few': 'Few' has a negative connotation meaning 'almost none'; 'A few' has a positive connotation meaning 'some / a small number' ('Few passed' = bad; 'A few passed' = encouraging).",
                "'Little' vs 'A Little': 'Little' has a negative meaning ('almost no money'); 'A little' has a positive meaning ('some money').",
                "'Each' vs 'Every': 'Each' emphasizes individual items in a group of two or more ('Each twin'); 'Every' views all members collectively in groups of three or more ('Every citizen'). Both take singular verbs ('Each participant has a badge').",
                "'Some' vs 'Any': Use 'some' in affirmative sentences and polite offers ('We have some time', 'Would you like some tea?'); use 'any' in negative sentences and general questions ('We don't have any time', 'Do you have any questions?')."
            ],
            structures: [
                {
                    label: "Quantifier + Countable Plural Noun",
                    formula: "[many / few / several / fewer] + [Countable Plural Noun]",
                    example: "Several delegates arrived early."
                },
                {
                    label: "Quantifier + Uncountable Noun",
                    formula: "[much / little / less / amount of] + [Uncountable Noun]",
                    example: "The director demonstrated great patience during the trial."
                },
                {
                    label: "Distributive + Singular Noun + Singular Verb",
                    formula: "[Each / Every] + [Singular Noun] + [Singular Verb]",
                    example: "Every employee receives annual health benefits."
                }
            ],
            examples: [
                "*Every* applicant must submit *their* portfolio before *the* closing date.",
                "There were *fewer* complaints recorded after *the* software update was deployed.",
                "She had *little* hope of recovering the lost documents, but *a few* files were salvaged.",
                "*Neither* proposal satisfies all the environmental requirements set by the council.",
                "Do you have *any* suggestions for improving *our* team communication?"
            ],
            commonMistakes: [
                {
                    wrong: "There are less people in the auditorium today.",
                    right: "There are fewer people in the auditorium today.",
                    why: "'People' is a plural countable noun. Use 'fewer' for countable nouns, and 'less' for uncountable quantities ('less water')."
                },
                {
                    wrong: "Each of the candidates have presented their vision.",
                    right: "Each of the candidates has presented their vision.",
                    why: "'Each' is grammatically singular and takes the singular verb 'has'."
                },
                {
                    wrong: "I don't have some money left in my bank account.",
                    right: "I don't have any money left in my bank account.",
                    why: "Use 'any' instead of 'some' in negative statements."
                },
                {
                    wrong: "Much students attended the technology seminar.",
                    right: "Many students attended the technology seminar.",
                    why: "'Students' is countable, requiring 'many', not 'much'."
                }
            ],
            specialCases: [
                "'Less' used informally with numbers: In standard prescriptive grammar, use 'fewer than 10 items'. Supermarket signs often read '10 items or less', which is colloquially common but considered an error on formal grammar exams.",
                "Determiner stacking restrictions: You cannot stack articles and possessives together: say 'my car' or 'the car', NEVER 'the my car'. To combine them, use the 'of mine' structure: 'a friend of mine'."
            ],
            exercises: [
                {
                    id: "det-q1",
                    type: "mcq",
                    question: "Choose the correct quantifier: 'The project manager noted that ___ errors were found during testing.'",
                    options: ["fewer", "less", "lesser", "little"],
                    answer: "fewer",
                    explanation: "'Errors' is a plural countable noun; 'fewer' is the correct quantifier for countable items."
                },
                {
                    id: "det-q2",
                    type: "fill",
                    question: "He was pleased because ___ (few / a few) students scored above ninety percent.",
                    options: ["a few", "few", "little", "a little"],
                    answer: "a few",
                    explanation: "'A few' has a positive meaning ('some students scored high, which is good'). 'Few' would mean 'almost none'."
                },
                {
                    id: "det-q3",
                    type: "identify",
                    question: "Identify the error: 'Every citizens must cast their vote in the national election.'",
                    options: ["Every citizens -> Every citizen", "their -> his", "cast -> casts", "No error"],
                    answer: "Every citizens -> Every citizen",
                    explanation: "'Every' must be followed directly by a singular countable noun: 'Every citizen'."
                },
                {
                    id: "det-q4",
                    type: "correction",
                    question: "Select the sentence with correct determiner usage in a negative sentence:",
                    options: [
                        "We haven't received some responses yet.",
                        "We haven't received any responses yet.",
                        "We have received none any responses yet.",
                        "We didn't received some responses yet."
                    ],
                    answer: "We haven't received any responses yet.",
                    explanation: "Use 'any' in negative clauses ('haven't received any')."
                }
            ],
            quickRevision: [
                "Determiners clarify which noun or how much/many of a noun we are talking about.",
                "Many/few/fewer = countable; Much/little/less = uncountable.",
                "'Few'/'little' = negative (almost none); 'A few'/'a little' = positive (some).",
                "'Each' and 'every' take singular nouns and singular verbs.",
                "Never stack an article and a possessive determiner together ('the my car' is incorrect)."
            ]
        }
    ]
};

