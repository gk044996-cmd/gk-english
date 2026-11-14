// English Coach Grammar Curriculum Aggregator & Helper Utilities
import { basicGrammar } from './basicGrammar.js';
import { tenses } from './tenses.js';
import { sentenceStructure } from './sentenceStructure.js';
import { advancedGrammar } from './advancedGrammar.js';

export const grammarSections = [
    basicGrammar,
    tenses,
    sentenceStructure,
    advancedGrammar
];

// Flatten all topics across all sections with their parent category attached
export const allGrammarTopics = grammarSections.flatMap((section) =>
    section.topics.map((topic) => ({
        ...topic,
        sectionCategory: section.category
    }))
);

export const TOTAL_GRAMMAR_TOPICS = allGrammarTopics.length;

export function getTopicById(id) {
    if (!id) return allGrammarTopics[0];
    return allGrammarTopics.find((t) => t.id === id) || allGrammarTopics[0];
}

export function getNextTopic(currentId) {
    const currentIndex = allGrammarTopics.findIndex((t) => t.id === currentId);
    if (currentIndex === -1 || currentIndex >= allGrammarTopics.length - 1) {
        return null;
    }
    return allGrammarTopics[currentIndex + 1];
}

export function getPrevTopic(currentId) {
    const currentIndex = allGrammarTopics.findIndex((t) => t.id === currentId);
    if (currentIndex <= 0) {
        return null;
    }
    return allGrammarTopics[currentIndex - 1];
}

export function getTopicIndexInfo(currentId) {
    const index = allGrammarTopics.findIndex((t) => t.id === currentId);
    return {
        currentIndex: index === -1 ? 0 : index,
        total: allGrammarTopics.length,
        positionText: `${(index === -1 ? 0 : index) + 1} of ${allGrammarTopics.length}`
    };
}
