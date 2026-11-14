// Tenses Curriculum (All 12 traditional English tenses with formulas, comparisons, signal words, and exercises)
export const tenses = {
    category: "Tenses",
    description: "Master all 12 English tenses: time references, aspectual nuances, conjugation rules, signal words, and comparative usages.",
    topics: [
        {
            id: "present-simple",
            title: "Present Simple",
            subtitle: "Routines, permanent situations, universal truths, habits, and scheduled timetables",
            definition: "The Present Simple tense describes habits, unchanging situations, general truths, and scheduled future events.",
            explanation: "The Present Simple is the base tense for everyday facts and regular routines. It describes things that are generally true or happen repeatedly. In the third-person singular (he, she, it), the main verb takes an '-s', '-es', or '-ies' suffix. In negative and question forms, the auxiliary verb 'do' or 'does' carries the tense, and the main verb reverts to its bare base form.",
            formula: "Positive: Subject + Base Verb (+ s/es for he/she/it) | Negative: Subject + do/does not + Base Verb | Question: Do/Does + Subject + Base Verb?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject (I/You/We/They) + V1 (base) | Subject (He/She/It) + V1 + s/es", example: "She drinks coffee every morning. / They live in Bristol." },
                { type: "Negative Form", structure: "Subject + do not (don't) / does not (doesn't) + V1 (bare infinitive)", example: "He does not (doesn't) eat seafood. / I don't work on Sundays." },
                { type: "Yes/No Question", structure: "Do / Does + Subject + V1 (bare infinitive)?", example: "Does the train stop at Oxford? / Do you speak Spanish?" },
                { type: "WH- Question", structure: "Question Word + do / does + Subject + V1?", example: "Where does your brother work? / When do the classes begin?" }
            ],
            signalWords: ["always", "usually", "often", "sometimes", "rarely", "seldom", "never", "every day/week/month/year", "on Mondays", "once a week", "normally", "generally"],
            rules: [
                "Third-person singular inflection: Add -s to most verbs (walk -> walks). Add -es to verbs ending in -ch, -sh, -ss, -x, -zz, -o (watch -> watches, pass -> passes, go -> goes). Change consonant + -y to -ies (study -> studies; but vowel + y retains y: play -> plays).",
                "Auxiliary verb rule: In negatives and questions, 'does' absorbs the third-person marker; NEVER add '-s' to the main verb (Correct: 'Does he like tea?' NOT: 'Does he likes tea?').",
                "Stative verbs rule: Verbs of emotion, thought, possession, and senses (like, love, hate, know, believe, understand, belong, own) are predominantly used in the Present Simple rather than the continuous.",
                "Timetables and schedules: Use Present Simple for fixed future events based on official timetables or public transport ('The flight departs at 08:30 tomorrow').",
                "Zero conditional & time clauses: Use Present Simple in 'if' and 'when/as soon as/until' clauses referring to the future ('When he arrives, we will call you')."
            ],
            tenseComparison: {
                title: "Present Simple vs Present Continuous",
                explanation: "Use Present Simple for permanent situations, habits, and general facts ('I live in Manchester; it rains a lot here'). Use Present Continuous for temporary actions occurring right now or around this time period ('I am living in a temporary flat while my house is being renovated')."
            },
            examples: [
                { text: "Water boils at 100 degrees Celsius under standard atmospheric pressure.", breakdown: "Subject (Water) + V1+s (boils) + prepositional phrases", highlight: "Scientific universal truth" },
                { text: "Our project manager conducts a stand-up meeting every weekday morning at nine.", breakdown: "Subject (Our project manager - singular) + V1+s (conducts) + frequency expression", highlight: "Habitual regular routine" },
                { text: "He does not own a car because he relies completely on public transit.", breakdown: "Subject (He) + does not + bare verb (own) [stative verb of possession]", highlight: "Stative verb in negative" },
                { text: "The international express train leaves platform four at 18:45 tonight.", breakdown: "Subject (The train) + V1+s (leaves) + future scheduled time", highlight: "Fixed timetable used for future" },
                { text: "Do they know how to resolve this database issue without restarting the server?", breakdown: "Auxiliary (Do) + Subject (they) + base verb (know)", highlight: "Interrogative stative verb" }
            ],
            commonMistakes: [
                {
                    wrong: "She don't likes spicy food.",
                    right: "She doesn't like spicy food.",
                    why: "Third-person singular takes 'does not' (doesn't), and the main verb must remain in the base form ('like'), not retain the '-s'."
                },
                {
                    wrong: "I am knowing the answer right now.",
                    right: "I know the answer right now.",
                    why: "'Know' is a stative verb describing mental state. It is not used in continuous forms in standard English."
                },
                {
                    wrong: "When you will come tomorrow, we will discuss the contract.",
                    right: "When you come tomorrow, we will discuss the contract.",
                    why: "Future time clauses introduced by 'when', 'as soon as', 'until', or 'before' use the Present Simple, not 'will'."
                }
            ],
            specialCases: [
                {
                    title: "Verbs ending in 'o' or consonant + 'y'",
                    desc: "Verbs like 'do' and 'go' add '-es' ('does', 'goes'). Verbs like 'fly', 'study', 'carry' change 'y' to 'ies' ('flies', 'studies', 'carries'). Verbs with a vowel before 'y' simply take 's' ('enjoys', 'stays').",
                    example: "He flies to Tokyo twice a month and always stays in the same hotel."
                },
                {
                    title: "Performative Verbs",
                    desc: "Verbs where the utterance performs the action itself (e.g. promise, apologize, insist, swear, suggest) are used in Present Simple.",
                    example: "I promise I will return your equipment by Friday."
                }
            ],
            exercises: [
                {
                    id: "ps-1",
                    question: "Which sentence correctly demonstrates the third-person singular in Present Simple?",
                    type: "mcq",
                    options: [
                        "My sister study biology at university.",
                        "My sister studies biology at university.",
                        "My sister is study biology at university.",
                        "My sister studys biology at university."
                    ],
                    answer: "My sister studies biology at university.",
                    explanation: "Verbs ending in a consonant + 'y' (study) change '-y' to '-ies' in the third-person singular (she studies)."
                },
                {
                    id: "ps-2",
                    question: "Complete the negative sentence: 'Martin ___ drink coffee after 4 PM.'",
                    type: "fill-in",
                    options: ["doesn't", "don't", "isn't", "no"],
                    answer: "doesn't",
                    explanation: "Martin is third-person singular (he), which requires the auxiliary 'does not' (doesn't) followed by the base verb 'drink'."
                },
                {
                    id: "ps-3",
                    question: "Identify the grammatically correct question:",
                    type: "mcq",
                    options: [
                        "Does she understands the company guidelines?",
                        "Do she understand the company guidelines?",
                        "Does she understand the company guidelines?",
                        "Is she understand the company guidelines?"
                    ],
                    answer: "Does she understand the company guidelines?",
                    explanation: "The auxiliary 'Does' is used for 'she', and the main verb must remain in its bare base form 'understand'."
                },
                {
                    id: "ps-4",
                    question: "Which sentence correctly uses Present Simple for a scheduled future event?",
                    type: "mcq",
                    options: [
                        "The plane will departing at 6 AM tomorrow.",
                        "The plane departs at 6 AM tomorrow.",
                        "The plane is depart at 6 AM tomorrow.",
                        "The plane has depart at 6 AM tomorrow."
                    ],
                    answer: "The plane departs at 6 AM tomorrow.",
                    explanation: "Official timetables and schedules (flights, trains, classes) use Present Simple for planned future events."
                }
            ],
            quickRevision: [
                "Used for habits, general facts, stative states, and scheduled timetables.",
                "Add -s/-es/-ies for he/she/it in positive statements.",
                "Use do/does + base verb for negatives (don't/doesn't) and questions (Do/Does...?).",
                "Do NOT add 'will' inside time clauses starting with 'when', 'as soon as', or 'if'."
            ]
        },
        {
            id: "present-continuous",
            title: "Present Continuous",
            subtitle: "Actions happening now, temporary situations, ongoing trends, and planned future arrangements",
            definition: "The Present Continuous (also called Present Progressive) expresses actions taking place at the moment of speech, temporary states, changing trends, or definite future arrangements.",
            explanation: "Formed using the present tense of the auxiliary verb 'to be' (am, is, are) plus the present participle of the main verb (verb + -ing). It highlights the progress, duration, or temporary nature of an activity rather than a permanent fact.",
            formula: "Positive: Subject + am/is/are + Verb-ing | Negative: Subject + am/is/are not + Verb-ing | Question: Am/Is/Are + Subject + Verb-ing?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject + am (I) / is (he/she/it) / are (you/we/they) + V-ing", example: "I am writing a report. / She is reading. / They are studying." },
                { type: "Negative Form", structure: "Subject + am not / isn't / aren't + V-ing", example: "We aren't traveling this summer. / He isn't sleeping." },
                { type: "Yes/No Question", structure: "Am / Is / Are + Subject + V-ing?", example: "Are you attending the webinar right now? / Is it raining outside?" },
                { type: "WH- Question", structure: "Question Word + am / is / are + Subject + V-ing?", example: "Why is the system displaying an error? / What are you cooking?" }
            ],
            signalWords: ["now", "right now", "at the moment", "currently", "at present", "these days", "nowadays", "this week/month", "Look!", "Listen!"],
            rules: [
                "Spelling of -ing: Drop final silent -e before adding -ing (make -> making, write -> writing). Double the final consonant of one-syllable verbs ending in consonant-vowel-consonant (run -> running, sit -> sitting). Change -ie to -y (lie -> lying, die -> dying).",
                "Stative verbs limitation: Perception, emotion, thought, and possession verbs generally resist continuous aspect (e.g. 'I understand', NEVER 'I am understanding').",
                "Dual-meaning verbs: Some stative verbs change meaning in continuous form: 'I think that's good' (opinion) vs 'I am thinking about the offer' (mental process of deliberation); 'I have a car' (possession) vs 'I am having lunch' (eating/experiencing).",
                "Annoying habits with 'always': When used with 'always', 'constantly', or 'forever', it conveys irritation or emotional emphasis ('He is always interrupting during meetings!').",
                "Fixed personal arrangements: Used for confirmed plans with a specified future time or companion ('I am meeting Dr. Bennett tomorrow afternoon')."
            ],
            tenseComparison: {
                title: "Present Continuous vs Future Simple (will)",
                explanation: "Use Present Continuous for pre-arranged, already confirmed appointments ('I am flying to Madrid on Friday; tickets are booked'). Use Future Simple ('will') for spontaneous decisions made at the instant of speaking ('The doorbell rang; I will get it')."
            },
            examples: [
                { text: "The engineering team is currently testing the new software build.", breakdown: "Subject (The engineering team - singular entity) + is + testing + object", highlight: "Action in progress right now" },
                { text: "Global temperatures are rising at an alarming rate across arctic regions.", breakdown: "Subject (Global temperatures) + are + rising + adverbial phrase", highlight: "Gradual ongoing trend" },
                { text: "I am staying with my cousins for two weeks until my apartment is ready.", breakdown: "Subject (I) + am + staying + duration expression", highlight: "Temporary situation" },
                { text: "Why are you always leaving your dirty mugs on the conference table?", breakdown: "Question word + are + subject (you) + always + leaving", highlight: "Annoying habit with 'always'" },
                { text: "We are meeting the design consultants at 3:00 PM this Thursday.", breakdown: "Subject (We) + are + meeting + time marker", highlight: "Definite future arrangement" }
            ],
            commonMistakes: [
                {
                    wrong: "I am having two laptops and a tablet.",
                    right: "I have two laptops and a tablet.",
                    why: "When 'have' indicates possession, it is stative and cannot take continuous form. Use 'have' for ownership."
                },
                {
                    wrong: "Look outside! It rains heavily.",
                    right: "Look outside! It is raining heavily.",
                    why: "An event visibly happening at the precise moment of speaking ('Look!') requires the Present Continuous."
                },
                {
                    wrong: "She is runing to catch the bus.",
                    right: "She is running to catch the bus.",
                    why: "'Run' is a one-syllable CVC (consonant-vowel-consonant) word; double the final consonant before adding -ing."
                }
            ],
            specialCases: [
                {
                    title: "Sensory verbs with dynamic meanings",
                    desc: "Verbs like 'smell', 'taste', and 'feel' are stative when describing a quality ('The soup tastes delicious'), but continuous when an active deliberate test is performed ('The chef is tasting the soup').",
                    example: "The florist is smelling the fresh roses before arranging the bouquet."
                }
            ],
            exercises: [
                {
                    id: "pc-1",
                    question: "Choose the correct verb form: 'Listen! Somebody ___ at the front gate.'",
                    type: "mcq",
                    options: ["knocks", "is knocking", "knocked", "has knock"],
                    answer: "is knocking",
                    explanation: "'Listen!' signals an action unfolding at the exact moment of speaking, requiring Present Continuous (is knocking)."
                },
                {
                    id: "pc-2",
                    question: "Select the sentence where the verb 'have' is used correctly in the continuous form:",
                    type: "mcq",
                    options: [
                        "He is having a sports car.",
                        "They are having lunch in the courtyard right now.",
                        "She is having a lot of money in the bank.",
                        "I am having three brothers."
                    ],
                    answer: "They are having lunch in the courtyard right now.",
                    explanation: "'Having lunch' means eating or experiencing an activity (dynamic), whereas cars, money, and siblings denote static possession."
                },
                {
                    id: "pc-3",
                    question: "Complete the sentence: 'Right now, our company ___ a major restructuring.'",
                    type: "fill-in",
                    options: ["is undergoing", "undergoes", "are undergo", "undergoing"],
                    answer: "is undergoing",
                    explanation: "'Right now' specifies an ongoing event, and 'our company' is a singular collective subject requiring 'is undergoing'."
                },
                {
                    id: "pc-4",
                    question: "Which sentence conveys an irritating, repetitive habit?",
                    type: "mcq",
                    options: [
                        "He is reading a mystery novel.",
                        "He is always losing his keys right before we leave.",
                        "He always loses his keys every morning.",
                        "He lost his keys once."
                    ],
                    answer: "He is always losing his keys right before we leave.",
                    explanation: "Present Continuous paired with 'always' emphasizes annoyance or exasperation with a chronic habit."
                }
            ],
            quickRevision: [
                "Form: Subject + am/is/are + Verb-ing.",
                "Used for: ongoing actions right now, temporary states, trends, and pre-arranged future appointments.",
                "Double final consonant for short CVC verbs (running, swimming, stopping).",
                "Avoid using continuous form for pure stative verbs (know, like, belong, believe)."
            ]
        },
        {
            id: "present-perfect",
            title: "Present Perfect",
            subtitle: "Past actions with present relevance, life experiences, and unfinished time periods",
            definition: "The Present Perfect connects the past with the present. It refers to actions that occurred at an unspecified past time, completed actions whose consequences affect the present, or actions beginning in the past that continue today.",
            explanation: "Constructed with the auxiliary 'have' or 'has' plus the past participle (V3) of the main verb. Crucially, the exact historical time of the action is either unknown or irrelevant; what matters is the current result or experiential state.",
            formula: "Positive: Subject + have/has + Past Participle (V3) | Negative: Subject + have/has not + V3 | Question: Have/Has + Subject + V3?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject (I/You/We/They) + have + V3 | Subject (He/She/It) + has + V3", example: "I have submitted the application. / She has visited Canada." },
                { type: "Negative Form", structure: "Subject + haven't / hasn't + V3", example: "They haven't received the parcel yet. / He hasn't called." },
                { type: "Yes/No Question", structure: "Have / Has + Subject + V3?", example: "Have you ever seen an eclipse? / Has the flight landed?" },
                { type: "WH- Question", structure: "Question Word + have / has + Subject + V3?", example: "How many chapters have you finished? / Where has she gone?" }
            ],
            signalWords: ["already", "yet", "just", "ever", "never", "recently", "lately", "so far", "up to now", "since (+ point in time)", "for (+ duration)"],
            rules: [
                "Unspecified time: Do NOT use specific past time markers (yesterday, last night, in 2018, two days ago) with Present Perfect. Use Past Simple instead.",
                "Since vs For: Use 'since' with a specific starting point in time (since 2015, since 9:00 AM, since breakfast). Use 'for' with a duration or period (for five years, for two hours, for decades).",
                "Been vs Gone: 'She has gone to Paris' means she is still in Paris or traveling there now. 'She has been to Paris' means she visited Paris in the past and has now returned.",
                "Already vs Yet: 'Already' typically appears in affirmative sentences between the auxiliary and participle ('I have already finished'). 'Yet' is placed at the end of negative sentences and questions ('I haven't called yet', 'Has he replied yet?').",
                "Superlatives and ordinals: Frequently paired with structures like 'This is the first time I have seen...' or 'It is the best meal I have ever eaten'."
            ],
            tenseComparison: {
                title: "Present Perfect vs Past Simple",
                explanation: "Past Simple requires a finished time period or specific historical timestamp ('I saw that movie yesterday' / 'Mozart composed 600 works'). Present Perfect connects an event to the present moment without a finished timestamp ('I have seen that movie twice' / 'She has composed many songs so far in her career')."
            },
            examples: [
                { text: "Dr. Aris has published five peer-reviewed papers on quantum computing so far.", breakdown: "Subject (Dr. Aris) + has + published (V3) + time expression (so far)", highlight: "Cumulative achievement up to the present" },
                { text: "I have lost my security badge, so I cannot enter the research lab.", breakdown: "Subject (I) + have + lost (V3) + present consequence", highlight: "Past action with immediate present impact" },
                { text: "We have lived in Edinburgh since November 2021.", breakdown: "Subject (We) + have + lived (V3) + since + specific starting point", highlight: "State beginning in the past and continuing now" },
                { text: "Have you ever operated this high-precision CNC lathe before?", breakdown: "Auxiliary (Have) + Subject (you) + ever + V3 (operated)", highlight: "Life experience inquiry" },
                { text: "The finance committee has not approved the budget allocation yet.", breakdown: "Subject (committee) + has not + approved + yet", highlight: "Negative with 'yet'" }
            ],
            commonMistakes: [
                {
                    wrong: "I have graduated from college in 2020.",
                    right: "I graduated from college in 2020.",
                    why: "'In 2020' is a finished past time marker. Finished past times require the Past Simple, not Present Perfect."
                },
                {
                    wrong: "She has been working here since five months.",
                    right: "She has been working here for five months.",
                    why: "'Five months' is a duration of time, which requires 'for'. 'Since' requires a starting point (e.g., 'since January')."
                },
                {
                    wrong: "The courier has arrived five minutes ago.",
                    right: "The courier arrived five minutes ago.",
                    why: "'Ago' always anchors the sentence in the Past Simple."
                }
            ],
            specialCases: [
                {
                    title: "Unfinished time periods",
                    desc: "Periods like 'today', 'this morning', 'this week' can take Present Perfect if the period is still ongoing when speaking ('I have drank three coffees this morning' said at 10 AM). If the period is over, use Past Simple ('I drank three coffees this morning' said at 4 PM).",
                    example: "Have you seen Julian this morning? (It is still 11:00 AM)."
                }
            ],
            exercises: [
                {
                    id: "pp-1",
                    question: "Select the sentence with the correct usage of Present Perfect:",
                    type: "mcq",
                    options: [
                        "We have visited the museum last Saturday.",
                        "We have visited the museum three times so far.",
                        "We visited the museum so far.",
                        "We have visit the museum recently."
                    ],
                    answer: "We have visited the museum three times so far.",
                    explanation: "'So far' denotes an ongoing cumulative count up to the present, requiring Present Perfect. 'Last Saturday' would require Past Simple."
                },
                {
                    id: "pp-2",
                    question: "Fill in the blank with the correct preposition: 'She has worked as lead architect ___ 2018.'",
                    type: "fill-in",
                    options: ["since", "for", "from", "in"],
                    answer: "since",
                    explanation: "'2018' is a specific starting point in time, which requires 'since'."
                },
                {
                    id: "pp-3",
                    question: "What does 'Arthur has gone to Berlin' mean?",
                    type: "mcq",
                    options: [
                        "Arthur visited Berlin and is now back home.",
                        "Arthur is currently in Berlin or on his way there.",
                        "Arthur never visited Berlin in his life.",
                        "Arthur plans to visit Berlin next year."
                    ],
                    answer: "Arthur is currently in Berlin or on his way there.",
                    explanation: "'Has gone' indicates the subject departed and has not yet returned. 'Has been' would mean he went and returned."
                },
                {
                    id: "pp-4",
                    question: "Choose the correct sentence:",
                    type: "mcq",
                    options: [
                        "Have you finished your assignment yet?",
                        "Did you finished your assignment yet?",
                        "Have you finish your assignment yet?",
                        "Has you finished your assignment yet?"
                    ],
                    answer: "Have you finished your assignment yet?",
                    explanation: "Present Perfect question requires 'Have' + Subject (you) + Past Participle (finished) + 'yet'."
                }
            ],
            quickRevision: [
                "Form: Subject + have/has + V3 (Past Participle).",
                "Used for: unspecified past time, life experiences, unfinished periods, and past actions with current results.",
                "NEVER use with specific past time markers (yesterday, in 2010, ago, last week).",
                "Use 'since' for starting points and 'for' for lengths of time."
            ]
        },
        {
            id: "present-perfect-continuous",
            title: "Present Perfect Continuous",
            subtitle: "Actions started in the past, continuing into the present, with emphasis on ongoing duration or visible recent effects",
            definition: "The Present Perfect Continuous focuses on the duration or process of an activity that began in the past and is either still happening now or has just recently ceased with evident physical results.",
            explanation: "Constructed with 'have/has' + 'been' + present participle (verb + -ing). Unlike the simple Present Perfect, which highlights the completion or result of an action, the continuous form highlights the ongoing effort, duration, or temporary nature of the task.",
            formula: "Positive: Subject + have/has been + Verb-ing | Negative: Subject + have/has not been + Verb-ing | Question: Have/Has + Subject + been + Verb-ing?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject (I/You/We/They) + have been + V-ing | Subject (He/She/It) + has been + V-ing", example: "I have been coding for five hours. / She has been studying all day." },
                { type: "Negative Form", structure: "Subject + haven't / hasn't been + V-ing", example: "He hasn't been sleeping well lately. / We haven't been working together." },
                { type: "Yes/No Question", structure: "Have / Has + Subject + been + V-ing?", example: "Have you been waiting long? / Has it been raining?" },
                { type: "WH- Question", structure: "How long + have / has + Subject + been + V-ing?", example: "How long have they been renovating this building?" }
            ],
            signalWords: ["for (+ duration)", "since (+ starting point)", "how long", "all morning/day/week", "lately", "recently"],
            rules: [
                "Emphasis on activity vs result: 'I have painted the kitchen' (Present Perfect: the job is complete, walls are dry) vs 'I have been painting the kitchen' (Present Perfect Continuous: emphasis on the messy process; paint is on my hands, might still be incomplete).",
                "Stative verbs restriction: Pure stative verbs (know, believe, understand, belong) cannot be used in the continuous form; use simple Present Perfect instead ('I have known her for ten years', NOT 'I have been knowing').",
                "Recent actions with visible evidence: Used even if the action has just stopped a moment ago, if the physical trace is obvious ('Why are your eyes red? — I have been chopping onions').",
                "Work & Live interchangeability: With verbs like 'work' and 'live', both Present Perfect and Present Perfect Continuous can often be used with little difference in meaning when accompanied by 'since' or 'for' ('She has lived here for years' / 'She has been living here for years')."
            ],
            tenseComparison: {
                title: "Present Perfect vs Present Perfect Continuous",
                explanation: "Present Perfect answers 'How many?' or 'How much?' and focuses on completion ('I have written three essays today'). Present Perfect Continuous answers 'How long?' and focuses on the duration of the activity ('I have been writing essays all afternoon')."
            },
            examples: [
                { text: "The researchers have been analyzing the genomic samples since dawn.", breakdown: "Subject (researchers) + have been + analyzing (V-ing) + since phrase", highlight: "Action continuing uninterrupted from past into present" },
                { text: "His hands are stained with grease because he has been repairing the motorcycle.", breakdown: "Present visible evidence + because + has been + repairing", highlight: "Recent activity with present visible proof" },
                { text: "How long have you been studying English grammar?", breakdown: "How long + have + subject (you) + been + studying", highlight: "Duration question" },
                { text: "It has been drizzling continuously since Tuesday morning.", breakdown: "Subject (It) + has been + drizzling + time marker", highlight: "Unbroken atmospheric condition" },
                { text: "She hasn't been feeling well for the past couple of days.", breakdown: "Subject (She) + hasn't been + feeling + time span", highlight: "Negative ongoing condition" }
            ],
            commonMistakes: [
                {
                    wrong: "I have been knowing him for fifteen years.",
                    right: "I have known him for fifteen years.",
                    why: "'Know' is a stative verb. Use the Present Perfect Simple, never continuous, for stative verbs."
                },
                {
                    wrong: "How long are you waiting here?",
                    right: "How long have you been waiting here?",
                    why: "To express duration extending from the past into the present, use the Present Perfect Continuous, not the Present Continuous."
                },
                {
                    wrong: "I have been writing three emails this morning.",
                    right: "I have written three emails this morning.",
                    why: "When stating the exact number of finished items produced ('three emails'), use the Present Perfect Simple."
                }
            ],
            specialCases: [
                {
                    title: "Temporary vs Permanent Habits",
                    desc: "Present Perfect Continuous often implies a temporary habit or recent disruption ('I have been taking the bus this week because my car broke down'), whereas Present Simple implies permanent routine.",
                    example: "He has been cycling to work lately to train for the marathon."
                }
            ],
            exercises: [
                {
                    id: "ppc-1",
                    question: "Complete the sentence: 'The team ___ on the proposal since 8 AM and they are exhausted.'",
                    type: "fill-in",
                    options: ["has been working", "have worked", "is working", "worked"],
                    answer: "has been working",
                    explanation: "'The team' acting as a single unit with 'since 8 AM' and an ongoing duration requires 'has been working'."
                },
                {
                    id: "ppc-2",
                    question: "Which sentence correctly focuses on the visible effect of a recently ended activity?",
                    type: "mcq",
                    options: [
                        "He is out of breath because he has been running.",
                        "He was out of breath because he runs.",
                        "He is out of breath because he will run.",
                        "He has run so he is breath."
                    ],
                    answer: "He is out of breath because he has been running.",
                    explanation: "Present Perfect Continuous describes an activity whose physical trace ('out of breath') is visible in the present."
                },
                {
                    id: "ppc-3",
                    question: "Why is 'I have been owning this watch since 2010' grammatically incorrect?",
                    type: "mcq",
                    options: [
                        "'Own' is a stative verb of possession and cannot take continuous aspect.",
                        "'Since' cannot be used with years.",
                        "The subject 'I' requires 'has'.",
                        "'Watch' is an uncountable noun."
                    ],
                    answer: "'Own' is a stative verb of possession and cannot take continuous aspect.",
                    explanation: "Stative verbs (own, belong, know, like) cannot be used in continuous tenses. The correct sentence is 'I have owned this watch since 2010'."
                },
                {
                    id: "ppc-4",
                    question: "Choose between simple and continuous: 'She ___ five glasses of water today.'",
                    type: "mcq",
                    options: [
                        "has been drinking",
                        "has drunk",
                        "is drinking",
                        "drank"
                    ],
                    answer: "has drunk",
                    explanation: "When the quantity of completed items ('five glasses') is stated, use Present Perfect Simple (has drunk)."
                }
            ],
            quickRevision: [
                "Form: Subject + have/has been + Verb-ing.",
                "Answers 'How long?' emphasizing ongoing duration or recent physical traces.",
                "Never use with stative verbs; use Present Perfect Simple instead.",
                "When expressing completed quantities (e.g. 5 chapters, 3 cups), switch to Present Perfect Simple."
            ]
        },
        {
            id: "past-simple",
            title: "Past Simple",
            subtitle: "Completed actions, historical events, and definite past states",
            definition: "The Past Simple tense describes actions, events, or states that began and were completely finished at a definite, specific time in the past.",
            explanation: "For regular verbs, the Past Simple is formed by adding '-ed' or '-d' to the base form. Irregular verbs undergo unique vowel and consonant changes that must be memorized. In negative and interrogative sentences, the auxiliary 'did' is used, and the main verb reverts to its bare base form.",
            formula: "Positive: Subject + Past Verb (V2) | Negative: Subject + did not + Base Verb | Question: Did + Subject + Base Verb?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject + V2 (regular: -ed, irregular: specific form)", example: "Alexander Fleming discovered penicillin in 1928. / We went to Spain." },
                { type: "Negative Form", structure: "Subject + did not (didn't) + V1 (bare infinitive)", example: "He did not (didn't) receive the confirmation email. / They didn't come." },
                { type: "Yes/No Question", structure: "Did + Subject + V1 (bare infinitive)?", example: "Did you speak to the operations director yesterday?" },
                { type: "WH- Question", structure: "Question Word + did + Subject + V1?", example: "When did the treaty take effect? / Where did they find the artifact?" }
            ],
            signalWords: ["yesterday", "last night/week/month/year", "in 1999", "two hours ago", "the other day", "when I was a child", "at that time"],
            rules: [
                "Regular spelling rules: Add -ed to base (play -> played). If ending in -e, add only -d (hope -> hoped). Consonant + -y changes to -ied (hurry -> hurried). Double final consonant for short CVC verbs (stop -> stopped, plan -> planned).",
                "Irregular verb patterns: Irregular verbs do not use -ed (go -> went, see -> saw, buy -> bought, break -> broke, write -> wrote).",
                "Auxiliary 'did' reverts main verb: When 'did' or 'didn't' is present, the main verb MUST remain in the bare base form (Correct: 'Did you see?', NOT: 'Did you saw?').",
                "Past form of 'be': 'Was' is used with I/he/she/it; 'were' is used with you/we/they. 'Be' does NOT use the auxiliary 'did' in negatives or questions ('Were you tired?', NOT 'Did you be tired?').",
                "Narrative sequences: Past Simple is the principal narrative tense for sequential past events in chronological order ('He opened the door, turned on the light, and noticed the open window')."
            ],
            tenseComparison: {
                title: "Past Simple vs Present Perfect",
                explanation: "Past Simple is tied to a completed past time window ('I sent the email an hour ago'). Present Perfect connects an action to the current moment and rejects specific past time markers ('I have already sent the email')."
            },
            examples: [
                { text: "The Apollo 11 mission landed on the lunar surface on July 20, 1969.", breakdown: "Subject (The Apollo 11 mission) + V2 (landed) + past date", highlight: "Definite historical milestone" },
                { text: "We negotiated the lease terms thoroughly and signed the contract last Friday.", breakdown: "Subject (We) + V2 (negotiated) + V2 (signed) + time marker", highlight: "Sequential completed past actions" },
                { text: "Did the technician replace the damaged capacitor before testing the circuit?", breakdown: "Auxiliary (Did) + Subject + base verb (replace) + time clause", highlight: "Interrogative with bare infinitive" },
                { text: "The ancient library did not survive the catastrophic fire in 48 BC.", breakdown: "Subject + did not + bare verb (survive) + past date", highlight: "Negative completed past event" },
                { text: "When I was in college, I walked three miles across campus every single day.", breakdown: "Past time clause + Subject (I) + V2 (walked) + past habit", highlight: "Past habit/routine that no longer occurs" }
            ],
            commonMistakes: [
                {
                    wrong: "Did you bought the tickets online?",
                    right: "Did you buy the tickets online?",
                    why: "The auxiliary 'Did' already carries the past tense. The main verb must be in its base form 'buy'."
                },
                {
                    wrong: "I didn't saw anyone at the reception desk.",
                    right: "I didn't see anyone at the reception desk.",
                    why: "Following 'didn't', the main verb reverts to its bare base form 'see'."
                },
                {
                    wrong: "She has arrived ten minutes ago.",
                    right: "She arrived ten minutes ago.",
                    why: "'Ago' specifies a finished past time and cannot be used with Present Perfect."
                }
            ],
            specialCases: [
                {
                    title: "Used to / Would for Past Habits",
                    desc: "To emphasize past habits or states that are no longer true, English frequently uses 'used to + base verb' ('I used to play tennis') or 'would + base verb' for repeated actions ('My grandfather would read the paper every morning').",
                    example: "We used to live in Melbourne before relocating to Toronto."
                }
            ],
            exercises: [
                {
                    id: "past-s-1",
                    question: "Which sentence correctly forms a negative in Past Simple?",
                    type: "mcq",
                    options: [
                        "She didn't wrote the final report.",
                        "She didn't write the final report.",
                        "She not wrote the final report.",
                        "She didn't written the final report."
                    ],
                    answer: "She didn't write the final report.",
                    explanation: "After 'didn't', the main verb must remain in its bare infinitive form 'write'."
                },
                {
                    id: "past-s-2",
                    question: "Complete the sentence with the correct past form of 'catch': 'The goalkeeper ___ the ball in the final second.'",
                    type: "fill-in",
                    options: ["caught", "catched", "cought", "was catch"],
                    answer: "caught",
                    explanation: "'Catch' is an irregular verb whose Past Simple form is 'caught'."
                },
                {
                    id: "past-s-3",
                    question: "Choose the correct question form:",
                    type: "mcq",
                    options: [
                        "Did you went to the conference last month?",
                        "Did you go to the conference last month?",
                        "Were you go to the conference last month?",
                        "Have you went to the conference last month?"
                    ],
                    answer: "Did you go to the conference last month?",
                    explanation: "'Did' + subject (you) + base verb (go) + past time expression ('last month')."
                },
                {
                    id: "past-s-4",
                    question: "Which verb form correctly completes the sentence: 'They ___ in Prague for three years before moving to Berlin in 2021.'",
                    type: "mcq",
                    options: [
                        "lived",
                        "have lived",
                        "live",
                        "are living"
                    ],
                    answer: "lived",
                    explanation: "The living in Prague is completely finished and anchored before a past date (2021), requiring Past Simple (lived)."
                }
            ],
            quickRevision: [
                "Form: Subject + V2 (regular: -ed; irregular: memorized forms).",
                "Use 'did not (didn't) + bare base verb' for negatives.",
                "Use 'Did + subject + bare base verb?' for questions.",
                "Always use Past Simple with definite past time markers (yesterday, ago, last week, in [year])."
            ]
        },
        {
            id: "past-continuous",
            title: "Past Continuous",
            subtitle: "Actions in progress at a specific past moment, parallel background activities, or interrupted actions",
            definition: "The Past Continuous tense indicates that an action was ongoing or in progress at a specific point in the past, or was interrupted by another event.",
            explanation: "Constructed with the past auxiliary of 'to be' ('was' for I/he/she/it; 'were' for you/we/they) plus the present participle (verb + -ing). It often sets the descriptive background scene in stories or pairs with the Past Simple to show an interruption.",
            formula: "Positive: Subject + was/were + Verb-ing | Negative: Subject + was/were not + Verb-ing | Question: Was/Were + Subject + Verb-ing?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject (I/He/She/It) + was + V-ing | Subject (You/We/They) + were + V-ing", example: "I was reading at 8 PM. / They were discussing the budget." },
                { type: "Negative Form", structure: "Subject + wasn't / weren't + V-ing", example: "He wasn't paying attention. / We weren't sleeping when you called." },
                { type: "Yes/No Question", structure: "Was / Were + Subject + V-ing?", example: "Were you waiting for me? / Was she working late?" },
                { type: "WH- Question", structure: "Question Word + was / were + Subject + V-ing?", example: "What were they doing when the alarm sounded?" }
            ],
            signalWords: ["while", "as", "when", "at 10:00 last night", "all day yesterday", "during that time"],
            rules: [
                "Interrupted action pattern: 'While' / 'as' usually introduces the longer background action in Past Continuous; 'when' typically introduces the shorter interrupting action in Past Simple ('While I was cooking, the power went out').",
                "Parallel past actions: Use Past Continuous in both clauses with 'while' to show two activities taking place concurrently in the past ('While Clara was playing the piano, Felix was studying for his exam').",
                "Polite requests: English speakers often use Past Continuous for polite or tentative inquiries ('I was wondering if you could help me with this calculation').",
                "No stative verbs: Stative verbs of thought, possession, or emotion are not used in Past Continuous (Use: 'I knew what to do', NOT 'I was knowing')."
            ],
            tenseComparison: {
                title: "Past Continuous vs Past Simple",
                explanation: "Past Continuous focuses on the duration and progress of an uncompleted activity at a past moment ('At 8 PM, I was having dinner'). Past Simple focuses on the complete event from start to finish ('I had dinner at 8 PM')."
            },
            examples: [
                { text: "At precisely 3:15 yesterday afternoon, the lead analyst was presenting the quarterly figures.", breakdown: "Specific past time point + Subject + was + presenting (V-ing)", highlight: "Action in progress at exact past moment" },
                { text: "While the engineers were inspecting the turbine, an unexpected pressure drop occurred.", breakdown: "While + past continuous (background) + past simple (interruption)", highlight: "Interrupted action pattern" },
                { text: "The students were working quietly while the proctor was monitoring the examination hall.", breakdown: "Past continuous + while + past continuous", highlight: "Two simultaneous parallel activities" },
                { text: "I wasn't driving fast when the deer suddenly leaped across the highway.", breakdown: "Subject + wasn't + driving (negative background) + when + past simple", highlight: "Negative background state" },
                { text: "What were you researching when the network connection disconnected?", breakdown: "Question word + were + you + researching + interruption clause", highlight: "Interrogative past continuous" }
            ],
            commonMistakes: [
                {
                    wrong: "When the phone rang, I answered it while I cooked.",
                    right: "When the phone rang, I was cooking, so I answered it.",
                    why: "The background ongoing activity ('cooking') requires the Past Continuous ('was cooking'), while the interruption ('rang') is Past Simple."
                },
                {
                    wrong: "We was discussing the project yesterday.",
                    right: "We were discussing the project yesterday.",
                    why: "The plural subject 'We' requires the auxiliary 'were', not 'was'."
                },
                {
                    wrong: "I was having a car during my university years.",
                    right: "I had a car during my university years.",
                    why: "'Have' denoting possession is stative and cannot be used in continuous aspect."
                }
            ],
            specialCases: [
                {
                    title: "Atmospheric Scene Setting",
                    desc: "Writers frequently open narratives with Past Continuous to establish the ambiance before introducing the central plot in Past Simple.",
                    example: "The rain was pounding against the windowpanes and the wind was howling through the eaves when Marcus knocked on the door."
                }
            ],
            exercises: [
                {
                    id: "past-c-1",
                    question: "Choose the correct sentence combining interrupted actions:",
                    type: "mcq",
                    options: [
                        "While I was walking home, it began to rain.",
                        "While I walked home, it was beginning to rain.",
                        "When I was walking home, it was beginning to rain.",
                        "While I was walked home, it began to rain."
                    ],
                    answer: "While I was walking home, it began to rain.",
                    explanation: "The ongoing background action takes Past Continuous ('was walking') introduced by 'while', and the sudden event takes Past Simple ('began')."
                },
                {
                    id: "past-c-2",
                    question: "Complete the sentence: 'At 10:00 PM yesterday, the technicians ___ the server migration.'",
                    type: "fill-in",
                    options: ["were performing", "was performing", "did performed", "are performing"],
                    answer: "were performing",
                    explanation: "'The technicians' is a plural subject requiring 'were', and the specific past timestamp ('At 10:00 PM yesterday') calls for Past Continuous."
                },
                {
                    id: "past-c-3",
                    question: "Identify the parallel simultaneous action sentence:",
                    type: "mcq",
                    options: [
                        "Sarah prepared dinner and watched TV.",
                        "While Sarah was preparing dinner, Leo was setting the dining table.",
                        "Sarah prepared dinner before Leo set the table.",
                        "Sarah was preparing dinner when Leo arrived."
                    ],
                    answer: "While Sarah was preparing dinner, Leo was setting the dining table.",
                    explanation: "Both clauses use Past Continuous linked with 'while' to describe two activities unfolding at the same time."
                },
                {
                    id: "past-c-4",
                    question: "Which auxiliary correctly fills the blank: 'I ___ wondering if you had a few minutes to review my resume.'",
                    type: "fill-in",
                    options: ["was", "were", "did", "am"],
                    answer: "was",
                    explanation: "'I' takes 'was' in the polite tentative past continuous formula ('I was wondering...')."
                }
            ],
            quickRevision: [
                "Form: Subject + was/were + Verb-ing.",
                "Used for actions in progress at a specific past point in time.",
                "Classic structure: Past Continuous (longer background) + WHEN + Past Simple (short interruption).",
                "Used with WHILE for two simultaneous background actions."
            ]
        },
        {
            id: "past-perfect",
            title: "Past Perfect",
            subtitle: "The 'past of the past' — actions completed prior to another past action or reference point",
            definition: "The Past Perfect tense indicates an action that was completed before another specified action, event, or point in time in the past.",
            explanation: "Formed with 'had' + past participle (V3) for all grammatical persons (I, you, he, she, it, we, they). It functions like a time machine taking you back before another past event to show sequence and causation clearly without ambiguity.",
            formula: "Positive: Subject + had + Past Participle (V3) | Negative: Subject + had not + V3 | Question: Had + Subject + V3?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject + had ('d) + V3", example: "By the time we arrived, the train had already left." },
                { type: "Negative Form", structure: "Subject + had not (hadn't) + V3", example: "They hadn't finalized the contract when the merger collapsed." },
                { type: "Yes/No Question", structure: "Had + Subject + V3?", example: "Had she worked in finance before she joined our firm?" },
                { type: "WH- Question", structure: "Question Word + had + Subject + V3?", example: "What had they discovered before the expedition was halted?" }
            ],
            signalWords: ["before", "after", "by the time", "already", "just", "never... before", "until that day", "by 5 PM yesterday"],
            rules: [
                "Sequence rule: When two events occurred in the past, the earlier event takes Past Perfect ('had + V3') and the later event takes Past Simple ('V2').",
                "Redundancy with before/after: If 'before' or 'after' makes the chronological order 100% obvious, Past Simple can sometimes replace Past Perfect ('He ate before he left' or 'He had eaten before he left'). However, Past Perfect is essential when causation or non-obvious sequencing exists.",
                "Third Conditional pairing: Past Perfect is standardly used in the 'if' clause of the Third Conditional for hypothetical past situations ('If I had known, I would have warned you').",
                "Reported speech backshifting: In reported speech, Present Perfect and Past Simple both shift into Past Perfect ('He said: I lived here' -> 'He said that he had lived there').",
                "By the time + Past Simple clause: The main clause takes Past Perfect ('By the time the ambulance arrived, the patient had regained consciousness')."
            ],
            tenseComparison: {
                title: "Past Perfect vs Past Simple",
                explanation: "Compare: 'When I arrived at the cinema, the movie started' (The movie started right after I walked in). vs 'When I arrived at the cinema, the movie had started' (The movie was already playing 15 minutes before I arrived; I missed the opening scene)."
            },
            examples: [
                { text: "By the time the fire brigade arrived at the warehouse, the blaze had engulfed the roof.", breakdown: "By the time + Past Simple (arrived) + Past Perfect (had engulfed)", highlight: "First past event completed prior to second past event" },
                { text: "She had never visited a manufacturing plant before she started her engineering internship.", breakdown: "Subject + had never visited (V3) + before clause", highlight: "Prior experiential milestone" },
                { text: "The pilot aborted the landing because the air traffic controllers had reported severe wind shear.", breakdown: "Past simple effect (aborted) + because + past perfect cause (had reported)", highlight: "Prior cause explaining subsequent past effect" },
                { text: "Had you studied Japanese before you accepted the expatriate assignment in Osaka?", breakdown: "Had + you + studied (V3) + before clause", highlight: "Inquiry into prior background knowledge" },
                { text: "They hadn't realized how severe the structural damage was until the inspector examined the foundation.", breakdown: "Subject + hadn't realized + until clause", highlight: "Negative realization prior to past revelation" }
            ],
            commonMistakes: [
                {
                    wrong: "When we reached the station, the train left already.",
                    right: "When we reached the station, the train had already left.",
                    why: "Because the train departed before we arrived, the earlier past action must be in the Past Perfect ('had already left')."
                },
                {
                    wrong: "I had seen him yesterday afternoon.",
                    right: "I saw him yesterday afternoon.",
                    why: "Do not use Past Perfect for an isolated past action with a specific past time marker. Past Perfect requires a secondary past anchor."
                },
                {
                    wrong: "If I would have known about the traffic, I would have left earlier.",
                    right: "If I had known about the traffic, I would have left earlier.",
                    why: "In third conditional 'if' clauses, use Past Perfect ('had known'), never 'would have'."
                }
            ],
            specialCases: [
                {
                    title: "Hardly / Scarcely / No sooner with Inversion",
                    desc: "When starting a sentence with negative adverbs denoting immediate succession, invert the subject and auxiliary 'had': 'No sooner had we sat down than the bell rang.'",
                    example: "Hardly had the meeting begun when the fire alarm interrupted the discussion."
                }
            ],
            exercises: [
                {
                    id: "past-p-1",
                    question: "Complete the sentence: 'By the time the semester ended, our professor ___ over thirty essays.'",
                    type: "mcq",
                    options: [
                        "has graded",
                        "had graded",
                        "was graded",
                        "grades"
                    ],
                    answer: "had graded",
                    explanation: "'By the time' + past simple ('ended') establishes a past reference point; the grading occurred prior to that, requiring Past Perfect ('had graded')."
                },
                {
                    id: "past-p-2",
                    question: "Which action occurred FIRST in: 'When the police arrived, the burglar had fled the premises'?",
                    type: "mcq",
                    options: [
                        "The police arrived.",
                        "The burglar fled the premises.",
                        "Both events occurred at the identical moment.",
                        "Neither event occurred."
                    ],
                    answer: "The burglar fled the premises.",
                    explanation: "The Past Perfect ('had fled') always denotes the earlier event in the timeline, occurring prior to the Past Simple action ('arrived')."
                },
                {
                    id: "past-p-3",
                    question: "Fill in the blank: 'She realized she ___ her passport at the hotel when she reached the airport.'",
                    type: "fill-in",
                    options: ["had left", "has left", "leaves", "was left"],
                    answer: "had left",
                    explanation: "Leaving the passport took place before reaching the airport and realizing it; thus 'had left' is required."
                },
                {
                    id: "past-p-4",
                    question: "Choose the grammatically correct inverted structure:",
                    type: "mcq",
                    options: [
                        "No sooner had he submitted the bid than the portal closed.",
                        "No sooner he had submitted the bid than the portal closed.",
                        "No sooner had he submitted the bid when the portal closed.",
                        "No sooner did he submitted the bid than the portal closed."
                    ],
                    answer: "No sooner had he submitted the bid than the portal closed.",
                    explanation: "'No sooner' triggers subject-auxiliary inversion ('had he submitted') and pairs with 'than'."
                }
            ],
            quickRevision: [
                "Form: Subject + had + V3 (Past Participle).",
                "Represents the 'past before the past' — the earlier of two completed past events.",
                "Commonly used with: before, after, by the time, already, until.",
                "Do not use in isolated sentences that have no secondary past reference."
            ]
        },
        {
            id: "past-perfect-continuous",
            title: "Past Perfect Continuous",
            subtitle: "Ongoing past actions leading up to another past event or explaining a past state",
            definition: "The Past Perfect Continuous tense expresses an ongoing activity that began in the past and continued up until another specific point or action in the past, often emphasizing the duration or explaining a past consequence.",
            explanation: "Constructed using 'had been' + present participle (verb + -ing). Just as Present Perfect Continuous relates a past duration to the present, Past Perfect Continuous relates an ongoing duration to another past checkpoint.",
            formula: "Positive: Subject + had been + Verb-ing | Negative: Subject + had not been + Verb-ing | Question: Had + Subject + been + Verb-ing?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject + had been + V-ing", example: "He had been driving for eight hours before he stopped for rest." },
                { type: "Negative Form", structure: "Subject + hadn't been + V-ing", example: "They hadn't been cooperating before the new director stepped in." },
                { type: "Yes/No Question", structure: "Had + Subject + been + V-ing?", example: "Had you been working there long when the company went public?" },
                { type: "WH- Question", structure: "How long + had + Subject + been + V-ing?", example: "How long had she been practicing before her debut performance?" }
            ],
            signalWords: ["for (+ duration)", "since (+ point in time)", "before (+ past event)", "by the time (+ past clause)", "all day", "how long"],
            rules: [
                "Duration prior to past event: Used when an ongoing action was in progress for a measurable duration leading right up to or just before another past event.",
                "Cause of a past condition: Explains why someone or something was in a particular condition in the past ('The pavement was wet because it had been raining' / 'Her eyes were tired because she had been reading all night').",
                "Stative verbs forbidden: As with all continuous tenses, stative verbs cannot take the continuous form; use Past Perfect Simple instead ('She had owned the violin for 30 years before selling it', NOT 'had been owning').",
                "Contrast with Past Continuous: Past Continuous specifies what was happening at a past moment ('At 4 PM, I was working'). Past Perfect Continuous emphasizes the duration leading up to that moment ('At 4 PM, I had been working for seven consecutive hours')."
            ],
            tenseComparison: {
                title: "Past Perfect Continuous vs Past Perfect Simple",
                explanation: "Past Perfect Simple emphasizes the completion or total quantity produced before a past event ('He had written three novels before his thirtieth birthday'). Past Perfect Continuous emphasizes the uninterrupted duration of the activity ('He had been writing novels for a decade before receiving critical acclaim')."
            },
            examples: [
                { text: "The pilots had been flying in dense fog for two hours before they received clearance to divert.", breakdown: "Subject (The pilots) + had been flying + duration (for two hours) + before clause", highlight: "Ongoing past activity with duration prior to another past event" },
                { text: "Her shoulders ached because she had been carrying heavy camera gear across the festival grounds.", breakdown: "Past simple state (ached) + because + had been carrying (past activity)", highlight: "Explanation for a physical condition in the past" },
                { text: "How long had the software team been debugging the script before they discovered the misplaced semicolon?", breakdown: "How long + had + subject + been debugging + before clause", highlight: "Duration inquiry prior to past discovery" },
                { text: "The ground was completely waterlogged because it had been raining heavily throughout the night.", breakdown: "Past condition (was waterlogged) + because + had been raining", highlight: "Past evidence of ongoing prior weather" },
                { text: "They had been negotiating the settlement for months before both parties finally reached an agreement.", breakdown: "Subject + had been negotiating + for months + before + past simple", highlight: "Unbroken process leading to conclusion" }
            ],
            commonMistakes: [
                {
                    wrong: "I had been knowing my mentor for five years when she retired.",
                    right: "I had known my mentor for five years when she retired.",
                    why: "'Know' is a stative verb. Use Past Perfect Simple ('had known'), not continuous."
                },
                {
                    wrong: "He was tired because he was running for two hours.",
                    right: "He was tired because he had been running for two hours.",
                    why: "To show duration leading up to a past state ('was tired'), use Past Perfect Continuous ('had been running')."
                },
                {
                    wrong: "We had been finishing four reports before lunch yesterday.",
                    right: "We had finished four reports before lunch yesterday.",
                    why: "When stating a completed number of items ('four reports'), use Past Perfect Simple, not continuous."
                }
            ],
            specialCases: [
                {
                    title: "Repeated past actions as continuous process",
                    desc: "An action that was repeated over a long period can be conceptualized as an ongoing continuous process.",
                    example: "He had been taking guitar lessons for years before he felt confident enough to perform on stage."
                }
            ],
            exercises: [
                {
                    id: "ppc-past-1",
                    question: "Complete the sentence: 'Dr. Vance was exhausted because she ___ emergency surgeries all night.'",
                    type: "fill-in",
                    options: ["had been performing", "has been performing", "was perform", "performed"],
                    answer: "had been performing",
                    explanation: "The past state of exhaustion ('was exhausted') is explained by the preceding ongoing duration ('had been performing all night')."
                },
                {
                    id: "ppc-past-2",
                    question: "Select the sentence that correctly emphasizes duration leading up to a past event:",
                    type: "mcq",
                    options: [
                        "They had been driving for six hours when the tire blew out.",
                        "They were driving for six hours when the tire blew out.",
                        "They drove for six hours when the tire was blowing out.",
                        "They have been driving for six hours when the tire blew out."
                    ],
                    answer: "They had been driving for six hours when the tire blew out.",
                    explanation: "To express how long an ongoing activity had been occurring ('for six hours') before a past event ('blew out'), use Past Perfect Continuous."
                },
                {
                    id: "ppc-past-3",
                    question: "Why is 'She had been belonging to the club for a decade' incorrect?",
                    type: "mcq",
                    options: [
                        "'Belong' is a stative verb of association and cannot be used in continuous tenses.",
                        "'For a decade' requires Present Perfect.",
                        "The preposition 'to' is wrong.",
                        "'Had' cannot be used with 'she'."
                    ],
                    answer: "'Belong' is a stative verb of association and cannot be used in continuous tenses.",
                    explanation: "Stative verbs do not take continuous aspect. The correct form is 'She had belonged to the club for a decade'."
                },
                {
                    id: "ppc-past-4",
                    question: "Choose between simple and continuous: 'Before the deadline, they ___ three comprehensive drafts.'",
                    type: "mcq",
                    options: [
                        "had produced",
                        "had been producing",
                        "were producing",
                        "have produced"
                    ],
                    answer: "had produced",
                    explanation: "When the exact quantity of completed outputs ('three comprehensive drafts') is stated, use Past Perfect Simple."
                }
            ],
            quickRevision: [
                "Form: Subject + had been + Verb-ing.",
                "Expresses how long an ongoing action had been occurring before another past event.",
                "Explains the cause of a past physical condition or emotional state.",
                "Switch to Past Perfect Simple for stative verbs or completed unit counts."
            ]
        },
        {
            id: "future-simple",
            title: "Future Simple",
            subtitle: "Predictions, spontaneous decisions, promises, offers, and unalterable future facts",
            definition: "The Future Simple tense expresses actions that will happen after the moment of speaking, typically reflecting spontaneous decisions, predictions, offers, promises, or inevitable facts.",
            explanation: "Constructed with the modal auxiliary 'will' + the bare infinitive of the main verb for all persons. While traditional prescriptive grammar formerly used 'shall' with 'I' and 'we', modern international English overwhelmingly uses 'will', retaining 'shall' primarily for polite offers or official legal obligations.",
            formula: "Positive: Subject + will ('ll) + Base Verb | Negative: Subject + will not (won't) + Base Verb | Question: Will + Subject + Base Verb?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject + will ('ll) + V1 (bare infinitive)", example: "I will call you tonight. / Technology will transform medicine." },
                { type: "Negative Form", structure: "Subject + will not (won't) + V1", example: "We will not (won't) compromise on safety standards." },
                { type: "Yes/No Question", structure: "Will + Subject + V1?", example: "Will the shipment arrive before Monday?" },
                { type: "WH- Question", structure: "Question Word + will + Subject + V1?", example: "When will the results be announced?" }
            ],
            signalWords: ["tomorrow", "next week/month/year", "in the future", "soon", "in two days", "probably", "definitely", "I think", "I hope", "I promise"],
            rules: [
                "Spontaneous decisions: Use 'will' at the moment you decide something without prior planning ('The phone is ringing; I'll answer it').",
                "Predictions based on belief/opinion: Use 'will' when predicting based on intuition, personal opinion, or extrapolation ('I think our team will win the tournament').",
                "Promises and commitments: 'I will never forget your assistance' / 'We will protect your data'.",
                "Offers and willingness: 'I'll carry that suitcase for you' / 'The mechanic won't work on holidays'.",
                "Time clauses exception: In subordinate clauses introduced by 'when', 'before', 'after', 'as soon as', 'until', or 'if', DO NOT use 'will'; use Present Simple ('I will call you when I arrive', NOT 'when I will arrive')."
            ],
            tenseComparison: {
                title: "Will vs Be Going To vs Present Continuous",
                explanation: "• 'Will': Spontaneous decision ('I'm hungry; I'll make a sandwich') or belief prediction ('I think robots will teach classes in 2050').\n• 'Be going to': Pre-existing intention/plan ('I'm going to buy a new laptop this weekend') or prediction based on present physical evidence ('Look at those black clouds; it's going to rain').\n• 'Present Continuous': Confirmed arrangement with fixed time/date/people ('I am flying to Frankfurt tomorrow morning at 7:00')."
            },
            examples: [
                { text: "Autonomous vehicles will drastically reduce traffic congestion over the next three decades.", breakdown: "Subject (Autonomous vehicles) + will + reduce (bare verb) + time frame", highlight: "Long-term prediction based on analysis" },
                { text: "Don't carry all those files yourself; I'll help you with the heavy boxes.", breakdown: "Imperative + semi-colon + I + 'll + help (spontaneous offer)", highlight: "Immediate spontaneous offer" },
                { text: "We won't disclose any client details without prior written authorization.", breakdown: "Subject (We) + won't + disclose (bare verb) + conditional restriction", highlight: "Firm promise / commitment" },
                { text: "If the temperature drops below zero, the pipes will freeze.", breakdown: "If clause (Present Simple) + main clause (will + freeze)", highlight: "First conditional consequence" },
                { text: "Will artificial intelligence eventually replace human translators completely?", breakdown: "Auxiliary (Will) + Subject + adverb + replace (bare verb)", highlight: "Predictive inquiry" }
            ],
            commonMistakes: [
                {
                    wrong: "I will call you as soon as I will land in London.",
                    right: "I will call you as soon as I land in London.",
                    why: "Subordinate time clauses starting with 'as soon as', 'when', 'until', or 'after' must use Present Simple, not 'will'."
                },
                {
                    wrong: "Look at the dark clouds! It will rain.",
                    right: "Look at the dark clouds! It is going to rain.",
                    why: "When a future prediction is grounded in immediate visible evidence ('dark clouds'), use 'be going to'."
                },
                {
                    wrong: "I will to submit the documentation tomorrow.",
                    right: "I will submit the documentation tomorrow.",
                    why: "Modal auxiliaries like 'will' must be followed by the bare infinitive without 'to'."
                }
            ],
            specialCases: [
                {
                    title: "Shall in Contemporary English",
                    desc: "'Shall' is still used in first-person questions for suggestions or offers ('Shall we begin the meeting?' / 'Shall I open the window?'), and in formal legal texts ('The licensee shall maintain accurate records').",
                    example: "Shall we proceed to the conference room now?"
                }
            ],
            exercises: [
                {
                    id: "fut-s-1",
                    question: "Someone knocks at your front door. Which response is natural for an instant decision?",
                    type: "mcq",
                    options: [
                        "I am going to get it.",
                        "I will get it.",
                        "I get it.",
                        "I was getting it."
                    ],
                    answer: "I will get it.",
                    explanation: "Spontaneous decisions made at the instant of speaking use 'will' ('I'll get it')."
                },
                {
                    id: "fut-s-2",
                    question: "Identify the grammatically correct sentence with a future time clause:",
                    type: "mcq",
                    options: [
                        "We will start the presentation when the director will arrive.",
                        "We will start the presentation when the director arrives.",
                        "We start the presentation when the director will arrive.",
                        "We will start the presentation when the director arrived."
                    ],
                    answer: "We will start the presentation when the director arrives.",
                    explanation: "Time clauses starting with 'when' take the Present Simple ('arrives'), while the main clause takes 'will start'."
                },
                {
                    id: "fut-s-3",
                    question: "Complete the promise: 'I ___ your confidence; you can rely on me.'",
                    type: "fill-in",
                    options: ["won't betray", "am not betraying", "don't betraying", "haven't betrayed"],
                    answer: "won't betray",
                    explanation: "Promises and commitments regarding future actions standardly use 'will not' (won't) + bare infinitive."
                },
                {
                    id: "fut-s-4",
                    question: "Which modal is traditionally used for polite suggestions with 'we'?",
                    type: "mcq",
                    options: [
                        "Shall",
                        "Will",
                        "Would",
                        "Must"
                    ],
                    answer: "Shall",
                    explanation: "'Shall we...?' is the idiomatic formulation for polite suggestions and offers with 'I' and 'we'."
                }
            ],
            quickRevision: [
                "Form: Subject + will + Bare Verb.",
                "Negative: won't + Bare Verb.",
                "Used for: spontaneous decisions, predictions based on opinion, promises, and offers.",
                "NEVER use 'will' inside time clauses ('when I arrive', NOT 'when I will arrive')."
            ]
        },
        {
            id: "future-continuous",
            title: "Future Continuous",
            subtitle: "Actions in progress at a specific future moment, or events that will occur as a routine matter of course",
            definition: "The Future Continuous tense expresses an action that will be ongoing or in progress at a specific point in the future, or actions that will unfold as a routine, expected part of a schedule.",
            explanation: "Constructed using 'will be' + present participle (verb + -ing) for all grammatical persons. It visualizes the speaker looking into the future and watching an activity underway at a designated moment.",
            formula: "Positive: Subject + will be + Verb-ing | Negative: Subject + will not (won't) be + Verb-ing | Question: Will + Subject + be + Verb-ing?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject + will be + V-ing", example: "This time next week, I will be lounging on a beach in Crete." },
                { type: "Negative Form", structure: "Subject + won't be + V-ing", example: "He won't be attending the symposium due to a scheduling clash." },
                { type: "Yes/No Question", structure: "Will + Subject + be + V-ing?", example: "Will you be utilizing the laboratory equipment this afternoon?" },
                { type: "WH- Question", structure: "What + will + Subject + be + doing?", example: "What will they be doing during the server maintenance window?" }
            ],
            signalWords: ["this time tomorrow", "this time next week", "at 10 AM tomorrow", "in five years' time", "during the weekend"],
            rules: [
                "Action in progress at a future moment: The action starts before and continues through the designated future time point ('At 3 PM tomorrow, our lawyers will be arguing before the appeals court').",
                "Routine event as a matter of course: Used to describe events that will happen naturally as part of an established routine or regular schedule, without personal arrangement ('I'll be seeing Dave at the weekly staff meeting anyway, so I can give him the file').",
                "Polite inquiries about plans: Inquiring about someone's plans with Future Continuous sounds much more polite and less intrusive than direct questions ('Will you be using your car tonight?' sounds neutral and gentle, whereas 'Are you going to use your car?' might sound like an interrogation).",
                "Stative verbs limitation: Stative verbs cannot take the continuous form (Use: 'I will know the score by midnight', NOT 'I will be knowing')."
            ],
            tenseComparison: {
                title: "Future Continuous vs Future Simple",
                explanation: "Compare: 'At 8 PM tomorrow, I will watch the documentary' (At 8 PM, I will turn on the TV and begin watching). vs 'At 8 PM tomorrow, I will be watching the documentary' (I will have started earlier, and at 8 PM I will be in the middle of watching it)."
            },
            examples: [
                { text: "At 11:00 AM on Monday, our engineering team will be deploying the database upgrade.", breakdown: "Future time anchor + Subject + will be + deploying (V-ing)", highlight: "Activity ongoing at an exact future moment" },
                { text: "This time next month, the exchange students will be studying at the Sorbonne.", breakdown: "Time phrase + Subject + will be + studying + location", highlight: "Ongoing state at future date" },
                { text: "Will you be driving past the post office on your way home this afternoon?", breakdown: "Will + you + be driving + routine path", highlight: "Polite inquiry about someone's natural routine" },
                { text: "They won't be accepting any late submissions after the electronic portal locks.", breakdown: "Subject + won't be + accepting + condition", highlight: "Negative ongoing policy" },
                { text: "Don't phone her between 2 and 4 PM because she will be conducting interviews.", breakdown: "Imperative advice + because + will be + conducting", highlight: "Future period of continuous occupation" }
            ],
            commonMistakes: [
                {
                    wrong: "At 9 PM tonight, I will watch the game.",
                    right: "At 9 PM tonight, I will be watching the game.",
                    why: "To emphasize being in the middle of the game at 9 PM, use Future Continuous ('will be watching')."
                },
                {
                    wrong: "This time tomorrow I will be know my test scores.",
                    right: "This time tomorrow I will know my test scores.",
                    why: "'Know' is a stative verb. Do not use continuous form for stative verbs."
                },
                {
                    wrong: "Will you be use the projector today?",
                    right: "Will you be using the projector today?",
                    why: "Future Continuous requires the present participle (-ing) after 'will be', not the base form."
                }
            ],
            specialCases: [
                {
                    title: "Tactful Requests via Routine Inquiries",
                    desc: "Asking 'Will you be passing by the supermarket?' asks about existing plans without pressuring the listener, making it easy to ask for a favor if they were already going.",
                    example: "Will you be going near the cafeteria? Could you grab me a coffee?"
                }
            ],
            exercises: [
                {
                    id: "fut-c-1",
                    question: "Complete the sentence: 'Don't call him at 3 PM; he ___ a crucial client presentation.'",
                    type: "fill-in",
                    options: ["will be giving", "will give", "gives", "is give"],
                    answer: "will be giving",
                    explanation: "At 3 PM, he will be in the middle of giving the presentation, requiring the Future Continuous ('will be giving')."
                },
                {
                    id: "fut-c-2",
                    question: "Which question is the most polite, neutral way to ask about a colleague's plans?",
                    type: "mcq",
                    options: [
                        "Will you be using the conference room after lunch?",
                        "Do you use the conference room after lunch?",
                        "Are you going to use the conference room after lunch?",
                        "Must you use the conference room after lunch?"
                    ],
                    answer: "Will you be using the conference room after lunch?",
                    explanation: "The Future Continuous is internationally recognized as the most polite, non-pressuring way to inquire about someone's intended routine."
                },
                {
                    id: "fut-c-3",
                    question: "Choose the correct sentence for this time next week:",
                    type: "mcq",
                    options: [
                        "This time next week, we will be flying over the Atlantic.",
                        "This time next week, we will flying over the Atlantic.",
                        "This time next week, we are flying over the Atlantic always.",
                        "This time next week, we will be fly over the Atlantic."
                    ],
                    answer: "This time next week, we will be flying over the Atlantic.",
                    explanation: "The correct structure is Subject + 'will be' + V-ing ('will be flying')."
                },
                {
                    id: "fut-c-4",
                    question: "Why can't we say: 'In five years, scientists will be understanding dark matter'?",
                    type: "mcq",
                    options: [
                        "'Understand' is a stative verb and resists continuous aspect.",
                        "'In five years' only takes Past Simple.",
                        "'Scientists' requires 'shall'.",
                        "'Dark matter' is uncountable."
                    ],
                    answer: "'Understand' is a stative verb and resists continuous aspect.",
                    explanation: "Stative verbs of cognition (understand, realize, know) do not take continuous aspect; say 'scientists will understand'."
                }
            ],
            quickRevision: [
                "Form: Subject + will be + Verb-ing.",
                "Used for actions that will be in progress at a specific future moment.",
                "Used for polite inquiries about someone's natural schedule or plans.",
                "Used for routine events occurring as a matter of course."
            ]
        },
        {
            id: "future-perfect",
            title: "Future Perfect",
            subtitle: "Actions that will be finished or achieved before a specific deadline or future moment",
            definition: "The Future Perfect tense looks back from a vantage point in the future to describe an action that will be completed prior to a designated future time or before another future event occurs.",
            explanation: "Constructed using 'will have' + the past participle (V3) of the main verb for all subjects. It is the ultimate deadline and milestone tense, establishing that when a future date arrives, the action will already be history.",
            formula: "Positive: Subject + will have + Past Participle (V3) | Negative: Subject + will not (won't) have + V3 | Question: Will + Subject + have + V3?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject + will have ('ll have) + V3", example: "By 2030, the company will have built twelve renewable energy stations." },
                { type: "Negative Form", structure: "Subject + won't have + V3", example: "They won't have finished the renovation before the wedding reception." },
                { type: "Yes/No Question", structure: "Will + Subject + have + V3?", example: "Will you have submitted your dissertation by Friday afternoon?" },
                { type: "WH- Question", structure: "How much + will + Subject + have + V3?", example: "How much money will they have invested by the end of this fiscal year?" }
            ],
            signalWords: ["by (+ future time)", "by the time (+ Present Simple clause)", "by then", "before (+ future time)", "in two years' time", "by tomorrow evening"],
            rules: [
                "Deadline preposition 'By': 'By' means 'no later than' or 'at or before' a specified moment. It is the primary signal word for Future Perfect ('By 5 PM, I will have left').",
                "By the time + Present Simple clause: When pairing with a clause, the time clause MUST take the Present Simple, while the main clause takes the Future Perfect ('By the time he arrives, we will have prepared the conference room'). NEVER say 'By the time he will arrive'.",
                "Predicting the present with Future Perfect: In formal or idiomatic English, 'will have + V3' can express an assumption about something that has probably already happened ('You will have heard the news by now').",
                "Duration up to a future point: Can describe how long a state will have lasted when a future milestone is reached ('Next July, they will have been married for 25 years')."
            ],
            tenseComparison: {
                title: "Future Perfect vs Future Simple",
                explanation: "Compare: 'At 6 PM, she will finish the assignment' (She will finish the final sentence precisely at 6 PM). vs 'By 6 PM, she will have finished the assignment' (The assignment will be completed sometime prior to 6 PM; at 6 PM, it is already done)."
            },
            examples: [
                { text: "By the time the semester ends, our professor will have graded over three hundred term papers.", breakdown: "By the time + Present Simple (ends) + Subject + will have graded (V3)", highlight: "Milestone completion before future event" },
                { text: "The contractors will have completed the bypass tunnel by the fourth quarter of 2027.", breakdown: "Subject (The contractors) + will have completed (V3) + by-phrase", highlight: "Project completion before future target date" },
                { text: "Will the committee have reached a consensus before the press briefing at noon?", breakdown: "Will + Subject + have reached (V3) + before clause", highlight: "Deadline verification inquiry" },
                { text: "We won't have saved enough capital for the property purchase by next spring.", breakdown: "Subject (We) + won't have saved + by-phrase", highlight: "Negative deadline assessment" },
                { text: "By this time tomorrow, the surgical team will have performed the complex cardiac procedure.", breakdown: "Time marker + Subject + will have performed (V3)", highlight: "Completed achievement from future perspective" }
            ],
            commonMistakes: [
                {
                    wrong: "By the time she will graduate, she will have written three theses.",
                    right: "By the time she graduates, she will have written three theses.",
                    why: "The clause following 'by the time' must use Present Simple ('graduates'), not 'will graduate'."
                },
                {
                    wrong: "By next Friday, I will finish the migration.",
                    right: "By next Friday, I will have finished the migration.",
                    why: "'By next Friday' specifies a completion deadline before that day, which requires the Future Perfect ('will have finished')."
                },
                {
                    wrong: "She will has completed the course by August.",
                    right: "She will have completed the course by August.",
                    why: "Modal auxiliaries like 'will' must always be followed by the base form 'have', never 'has', regardless of the subject."
                }
            ],
            specialCases: [
                {
                    title: "Assumption about past/present events",
                    desc: "Speakers often use Future Perfect to state confident deductions about what someone has surely already experienced or completed.",
                    example: "As you will have noticed from our latest report, quarterly revenues rose by 14%."
                }
            ],
            exercises: [
                {
                    id: "fut-p-1",
                    question: "Complete the sentence: 'By the time our manager arrives tomorrow, we ___ the quarterly report.'",
                    type: "mcq",
                    options: [
                        "will have completed",
                        "will complete",
                        "have completed",
                        "are completing"
                    ],
                    answer: "will have completed",
                    explanation: "'By the time' + Present Simple ('arrives') indicates an action that will be completed beforehand, requiring Future Perfect ('will have completed')."
                },
                {
                    id: "fut-p-2",
                    question: "Fill in the blank: 'By 2035, astronomers ___ hundreds of exoplanetary atmospheres.'",
                    type: "fill-in",
                    options: ["will have analyzed", "will analyze", "have analyzed", "analyzed"],
                    answer: "will have analyzed",
                    explanation: "'By 2035' sets a future deadline, requiring 'will have analyzed' (Future Perfect)."
                },
                {
                    id: "fut-p-3",
                    question: "Why is 'He will has graduated by July' incorrect?",
                    type: "mcq",
                    options: [
                        "The modal auxiliary 'will' must always be followed by the base infinitive 'have', never 'has'.",
                        "'By July' requires Past Simple.",
                        "'Graduate' is an irregular verb.",
                        "The subject 'He' is plural."
                    ],
                    answer: "The modal auxiliary 'will' must always be followed by the base infinitive 'have', never 'has'.",
                    explanation: "After modal auxiliaries (will, can, should, must), the bare base form 'have' is universally required."
                },
                {
                    id: "fut-p-4",
                    question: "Which sentence accurately conveys that a task will finish BEFORE 5:00 PM?",
                    type: "mcq",
                    options: [
                        "I will have printed the handouts by 5:00 PM.",
                        "I will print the handouts at 5:00 PM.",
                        "I am printing the handouts after 5:00 PM.",
                        "I printed the handouts by 5:00 PM."
                    ],
                    answer: "I will have printed the handouts by 5:00 PM.",
                    explanation: "'By 5:00 PM' paired with Future Perfect ('will have printed') proves completion before or no later than that threshold."
                }
            ],
            quickRevision: [
                "Form: Subject + will have + V3 (Past Participle).",
                "Subject does NOT change 'have' to 'has' ('he will have', NOT 'he will has').",
                "Used for actions that will be completed before a designated future deadline.",
                "Time clauses use Present Simple ('By the time you arrive', NOT 'will arrive')."
            ]
        },
        {
            id: "future-perfect-continuous",
            title: "Future Perfect Continuous",
            subtitle: "The projected duration of an ongoing action up to a designated future milestone",
            definition: "The Future Perfect Continuous tense describes an ongoing activity that will continue up until a specific point in the future, emphasizing the duration of that continuous activity when that milestone is attained.",
            explanation: "Constructed with 'will have been' + present participle (verb + -ing) for all subjects. It looks forward to a future checkpoint and tallies how long an ongoing activity will have been progressing without interruption up to that precise moment.",
            formula: "Positive: Subject + will have been + Verb-ing | Negative: Subject + will not (won't) have been + Verb-ing | Question: Will + Subject + have been + Verb-ing?",
            sentenceStructures: [
                { type: "Positive Form", structure: "Subject + will have been + V-ing", example: "By November, she will have been living in Tokyo for a decade." },
                { type: "Negative Form", structure: "Subject + won't have been + V-ing", example: "They won't have been working together long enough to evaluate teamwork." },
                { type: "Yes/No Question", structure: "Will + Subject + have been + V-ing?", example: "Will you have been driving for too long without a rest stop?" },
                { type: "WH- Question", structure: "How long + will + Subject + have been + V-ing?", example: "How long will the turbine have been spinning before its scheduled inspection?" }
            ],
            signalWords: ["for (+ duration) + by (+ future time)", "by next year", "by the time (+ Present Simple clause)", "in two months' time"],
            rules: [
                "Dual time anchors: Requires both a duration marker ('for five years') and a future checkpoint ('by next December') to show the total length of time accumulated.",
                "Focus on ongoing activity: Unlike Future Perfect (which marks completion of a product), Future Perfect Continuous emphasizes that the activity may even continue past that future mark.",
                "Stative verbs rule: As always, stative verbs cannot be used in continuous forms; use Future Perfect Simple ('Next year, we will have owned this property for 20 years', NOT 'will have been owning').",
                "Time clause conjugation: Just like Future Perfect, subordinate time clauses take Present Simple ('When she retires next spring, she will have been teaching for 35 years')."
            ],
            tenseComparison: {
                title: "Future Perfect vs Future Perfect Continuous",
                explanation: "Compare: 'By 5 PM, he will have written thirty pages' (Future Perfect: focuses on the completed output/quantity). vs 'By 5 PM, he will have been writing for seven hours straight' (Future Perfect Continuous: focuses on the ongoing, unbroken duration of the activity)."
            },
            examples: [
                { text: "By the end of this semester, Professor Thorne will have been teaching comparative literature for forty years.", breakdown: "By phrase + Subject + will have been teaching + duration (for forty years)", highlight: "Duration milestone at future date" },
                { text: "When their flight finally touches down in Sydney, the passengers will have been traveling for over twenty-four hours.", breakdown: "When-clause (Present Simple) + will have been traveling + duration", highlight: "Physical endurance/duration leading up to arrival" },
                { text: "How long will you have been practicing medicine by the time you complete your residency?", breakdown: "How long + will you have been practicing + by the time clause", highlight: "Duration inquiry at future transition" },
                { text: "By midnight, the server will have been running benchmark tests for seventy-two consecutive hours.", breakdown: "Future deadline + will have been running + continuous duration", highlight: "Automated continuous process milestone" },
                { text: "She won't have been training long enough by March to qualify for the Olympic marathon trials.", breakdown: "Subject + won't have been training + duration + by March", highlight: "Negative assessment of accumulated training duration" }
            ],
            commonMistakes: [
                {
                    wrong: "By next month, I will have been knowing him for ten years.",
                    right: "By next month, I will have known him for ten years.",
                    why: "'Know' is a stative verb. Use Future Perfect Simple ('will have known'), never continuous."
                },
                {
                    wrong: "When he will retire, he will have been working here for 40 years.",
                    right: "When he retires, he will have been working here for 40 years.",
                    why: "The time clause beginning with 'When' requires the Present Simple ('retires'), not 'will retire'."
                },
                {
                    wrong: "By 6 PM, he will has been studying for eight hours.",
                    right: "By 6 PM, he will have been studying for eight hours.",
                    why: "Never change 'have' to 'has' after the modal auxiliary 'will'."
                }
            ],
            specialCases: [
                {
                    title: "Future Cause and Effect",
                    desc: "Future Perfect Continuous can be used to predict the future state of someone or something as a consequence of prolonged activity.",
                    example: "When you finally see him at the finish line, he will be exhausted because he will have been running for four hours."
                }
            ],
            exercises: [
                {
                    id: "fut-pc-1",
                    question: "Complete the sentence: 'By December, Dr. Miller ___ at the institute for twenty-five years.'",
                    type: "mcq",
                    options: [
                        "will have been working",
                        "will be work",
                        "has been working",
                        "will work"
                    ],
                    answer: "will have been working",
                    explanation: "'By December' paired with 'for twenty-five years' marks the accumulation of ongoing duration up to a future milestone (Future Perfect Continuous)."
                },
                {
                    id: "fut-pc-2",
                    question: "Fill in the blank: 'When the marathon concludes, the athletes ___ for over two hours in grueling heat.'",
                    type: "fill-in",
                    options: ["will have been running", "will have run", "are running", "have been running"],
                    answer: "will have been running",
                    explanation: "Focusing on the ongoing continuous effort ('for over two hours') up to the future event ('concludes') requires 'will have been running'."
                },
                {
                    id: "fut-pc-3",
                    question: "Why is 'By 2030, we will have been having this agreement for a decade' grammatically incorrect?",
                    type: "mcq",
                    options: [
                        "'Have' indicating possession/state is a stative verb and cannot take continuous aspect.",
                        "'For a decade' cannot be used with future tenses.",
                        "'Agreement' is an uncountable noun.",
                        "2030 is too far in the future."
                    ],
                    answer: "'Have' indicating possession/state is a stative verb and cannot take continuous aspect.",
                    explanation: "Stative verbs cannot be used in continuous tenses. The correct sentence is 'By 2030, we will have had this agreement for a decade'."
                },
                {
                    id: "fut-pc-4",
                    question: "Choose the correct sentence:",
                    type: "mcq",
                    options: [
                        "By the time she finishes her PhD, she will have been researching neuroplasticity for six years.",
                        "By the time she will finish her PhD, she will have been researching neuroplasticity for six years.",
                        "By the time she finishes her PhD, she will has been researching neuroplasticity for six years.",
                        "By the time she finishes her PhD, she is researching neuroplasticity for six years."
                    ],
                    answer: "By the time she finishes her PhD, she will have been researching neuroplasticity for six years.",
                    explanation: "The 'by the time' clause takes Present Simple ('finishes') and the main clause takes 'will have been researching'."
                }
            ],
            quickRevision: [
                "Form: Subject + will have been + Verb-ing.",
                "Always uses 'will have been', never 'will has been'.",
                "Measures how long an ongoing activity will have lasted by a specified future point in time.",
                "Subordinate time clauses always take Present Simple ('when she finishes', NOT 'will finish')."
            ]
        }
    ]
};

