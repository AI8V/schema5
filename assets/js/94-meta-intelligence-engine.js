// meta-intelligence-engine.js
'use strict';

/**
 * @file meta-intelligence-engine.js
 * @description Meta-Intelligence Layer for AI-Readable Schema Enhancement
 * @version 1.1.0 - Genesis Fusion Edition
 * @author Ai8V | Mind & Machine
 */

const MetaIntelligenceEngine = (function () {

    // ===================================================================
    //  COGNITIVE PROFILES DATABASE
    // ===================================================================

    const COGNITIVE_PROFILES = {
        'Product': {
            defaultRole: 'Product Entity',
            defaultTone: 'Descriptive',
            defaultGoal: 'Enable informed purchase decisions through rich semantic data',
            semanticDepth: 'Level-2 Hybrid Reasoning',
            metaAlignment: 'Schema-AI Coherence Level-1',

            // Dynamic profile generator based on product type
            analyze: function (schema, entities, pageContext) {
                const profile = {
                    "@type": "CreativeWork",
                    "metaIntelligence": "High",
                    "alignment": "Ai8V Genesis Protocol",
                    "metaAlignment": this.metaAlignment
                };

                // ✅ Detect product category for specialized cognition
                const category = this.detectProductCategory(schema, entities);

                switch (category) {
                    case 'electronics':
                        Object.assign(profile, {
                            role: "Technical Product Specialist",
                            tone: "Analytical + Specification-Driven",
                            goal: "Empower tech-savvy buyers with granular specs and compatibility insights",
                            focus: "Technical attributes, compatibility, performance metrics"
                        });
                        break;

                    case 'fashion':
                        Object.assign(profile, {
                            role: "Style Curator",
                            tone: "Aesthetic + Emotive",
                            goal: "Guide fashion choices through visual and material intelligence",
                            focus: "Color theory, material composition, style matching"
                        });
                        break;

                    case 'food':
                        Object.assign(profile, {
                            role: "Nutritional Guide",
                            tone: "Health-Conscious + Ingredient-Focused",
                            goal: "Enable dietary decisions through ingredient transparency",
                            focus: "Nutritional facts, allergens, dietary compatibility"
                        });
                        break;

                    case 'book':
                        Object.assign(profile, {
                            role: "Literary Connector",
                            tone: "Narrative + Exploratory",
                            goal: "Match readers with knowledge through semantic book discovery",
                            focus: "Genre taxonomy, thematic analysis, reading level"
                        });
                        break;

                    default:
                        Object.assign(profile, {
                            role: this.defaultRole,
                            tone: this.defaultTone,
                            goal: this.defaultGoal,
                            focus: "Core product attributes and value proposition"
                        });
                }

                // ✅ Contextual cognition
                profile.contextSensitivity = this.assessContextSensitivity(schema);
                profile.autonomyLevel = "Guided Generation";
                profile.learningMode = "Reinforced Entity Feedback";
                profile.semanticDepth = this.semanticDepth;

                // ✅ Detect behavioral interaction patterns
                profile.interactionPatterns = this.detectInteractionPatterns(schema);

                // ✅ Reasoning scaffolds for LLMs
                profile.reasoningHints = this.generateReasoningHints(schema, category);

                // ✅ Computed composite richness score
                profile.semanticRichnessScore = computeRichnessScore(pageContext);

                return profile;
            },

            // ─────────────────────────────────────────────
            // Helper Functions
            // ─────────────────────────────────────────────
            detectProductCategory(schema, entities) {
                if (schema.category) {
                    const cat = schema.category.toLowerCase();
                    if (cat.match(/electronic|tech/)) return 'electronics';
                    if (cat.match(/fashion|apparel|clothing/)) return 'fashion';
                    if (cat.match(/food|grocery/)) return 'food';
                    if (cat.match(/book/)) return 'book';
                }
                if (schema.color || schema.size || schema.material) return 'fashion';
                if (schema.mpn || schema.gtin) return 'electronics';
                if (schema.name) {
                    const n = schema.name.toLowerCase();
                    const map = {
                        electronics: /phone|laptop|camera|tablet|headphone|speaker|tv|monitor|processor|gpu|ram|ssd/,
                        fashion: /shirt|dress|pants|shoes|jacket|hat|bag|watch|jewelry|belt|scarf/,
                        food: /organic|protein|vitamin|supplement|snack|drink|coffee|tea|juice/,
                        book: /book|novel|guide|manual|textbook|ebook|kindle/
                    };
                    for (const [c, p] of Object.entries(map)) if (p.test(n)) return c;
                }
                return 'general';
            },

            assessContextSensitivity(schema) {
                let score = 0;
                if (schema.description) score++;
                if (schema.brand) score++;
                if (schema.aggregateRating) score++;
                if (schema.offers?.priceSpecification) score++;
                if (schema.audience) score++;
                return score >= 4 ? "High" : score >= 2 ? "Medium" : "Low";
            },

            detectInteractionPatterns(schema) {
                const patterns = [];
                if (schema.offers) {
                    patterns.push("E-commerce Transaction");
                    if (schema.offers.priceSpecification)
                        patterns.push("Dynamic Pricing (Member/Sale)");
                }
                if (schema.aggregateRating) patterns.push("Social Proof Validation");
                if (schema.hasVariant) patterns.push("Multi-Variant Selection");
                if (schema.review) patterns.push("User-Generated Content");
                return patterns.length ? patterns : ["Information Retrieval"];
            },

            generateReasoningHints(schema, category) {
                const hints = { queryIntent: [], inferencePatterns: [], semanticBridges: [] };

                if (schema.offers?.price)
                    hints.queryIntent.push("price-comparison", "affordability-check");
                if (schema.aggregateRating)
                    hints.queryIntent.push("quality-verification", "peer-validation");
                if (category === 'electronics')
                    hints.queryIntent.push("spec-matching", "compatibility-check");

                if (schema.brand && schema.aggregateRating)
                    hints.inferencePatterns.push("brand-quality-correlation");
                if (schema.offers?.priceValidUntil)
                    hints.inferencePatterns.push("urgency-driven-decision");

                if (schema.brand)
                    hints.semanticBridges.push({
                        property: "brand",
                        linkedTo: "Wikidata/DBpedia Brand Entity",
                        enrichmentPotential: "High"
                    });
                if (category === 'book')
                    hints.semanticBridges.push({
                        property: "author",
                        linkedTo: "Library of Congress / Open Library",
                        enrichmentPotential: "Very High"
                    });
                return hints;
            }
        },

        // ─────────────────────────────────────────────
        // Other Schema Types
        // ─────────────────────────────────────────────
        'Recipe': {
            defaultRole: 'Culinary Guide',
            defaultTone: 'Instructive + Sensory',
            defaultGoal: 'Enable successful meal recreation through detailed culinary intelligence',
            semanticDepth: 'Level-3 Process Reasoning',
            metaAlignment: 'Schema-AI Coherence Level-2',
            analyze(schema) {
                return {
                    "@type": "CreativeWork",
                    "metaIntelligence": "High",
                    "role": this.defaultRole,
                    "tone": this.defaultTone,
                    "goal": this.defaultGoal,
                    "focus": "Ingredient relationships, cooking techniques, timing precision",
                    "contextSensitivity": "High",
                    "semanticDepth": this.semanticDepth,
                    "interactionPatterns": ["Step-by-Step Execution", "Ingredient Substitution"],
                    "reasoningHints": {
                        "queryIntent": ["recipe-discovery", "ingredient-alternatives", "cooking-time"],
                        "inferencePatterns": ["cuisine-type-detection", "difficulty-assessment"],
                        "semanticBridges": [{
                            "property": "recipeIngredient",
                            "linkedTo": "Food Knowledge Graph",
                            "enrichmentPotential": "Very High"
                        }]
                    }
                };
            }
        },

        'JobPosting': {
            defaultRole: 'Career Opportunity Presenter',
            defaultTone: 'Professional + Opportunity-Focused',
            defaultGoal: 'Match qualified candidates with opportunities through intelligent filtering',
            semanticDepth: 'Level-2 Requirement Matching',
            metaAlignment: 'Schema-AI Coherence Level-1',
            analyze(schema) {
                return {
                    "@type": "CreativeWork",
                    "metaIntelligence": "Medium-High",
                    "role": this.defaultRole,
                    "tone": this.defaultTone,
                    "goal": this.defaultGoal,
                    "focus": "Skills taxonomy, experience mapping, location intelligence",
                    "contextSensitivity": "Medium",
                    "semanticDepth": this.semanticDepth,
                    "interactionPatterns": ["Application Submission", "Qualification Filtering"],
                    "reasoningHints": {
                        "queryIntent": ["job-search", "salary-comparison", "location-match"],
                        "inferencePatterns": ["skill-requirement-analysis", "career-level-detection"],
                        "semanticBridges": [{
                            "property": "occupationalCategory",
                            "linkedTo": "O*NET Occupational Database",
                            "enrichmentPotential": "High"
                        }]
                    }
                };
            }
        },

        'Article': {
            defaultRole: 'Knowledge Disseminator',
            defaultTone: 'Informative + Authoritative',
            defaultGoal: 'Facilitate knowledge transfer through structured editorial content',
            semanticDepth: 'Level-2 Topical Reasoning',
            metaAlignment: 'Schema-AI Coherence Level-1',
            analyze(schema) {
                return {
                    "@type": "CreativeWork",
                    "metaIntelligence": "Medium",
                    "role": this.defaultRole,
                    "tone": this.defaultTone,
                    "goal": this.defaultGoal,
                    "focus": "Topic modeling, author credibility, citation networks",
                    "contextSensitivity": "Medium",
                    "semanticDepth": this.semanticDepth,
                    "interactionPatterns": ["Reading Engagement", "Citation Reference"],
                    "reasoningHints": {
                        "queryIntent": ["information-seeking", "fact-checking", "learning"],
                        "inferencePatterns": ["expertise-level-detection", "content-freshness"],
                        "semanticBridges": [{
                            "property": "about",
                            "linkedTo": "Wikipedia Concepts",
                            "enrichmentPotential": "Medium"
                        }]
                    }
                };
            }
        }
    };

    // ===================================================================
    //  PAGE CONTEXT ANALYZER
    // ===================================================================

    function analyzePageContext() {
        const context = {
            pageType: detectPageType(),
            contentDepth: assessContentDepth(),
            interactivity: assessInteractivity(),
            visualRichness: assessVisualRichness()
        };
        return context;
    }

    function detectPageType() {
        const url = window.location.href.toLowerCase();
        if (url.includes('/product/') || url.includes('/p/')) return 'product-detail';
        if (url.includes('/products') || url.includes('/shop')) return 'product-listing';
        if (url.includes('/blog/') || url.includes('/article/')) return 'article-detail';
        if (url.includes('/recipe/')) return 'recipe-detail';
        if (url.includes('/jobs/') || url.includes('/careers/')) return 'job-listing';
        return 'general';
    }

    function assessContentDepth() {
        const wc = document.body.innerText.split(/\s+/).length;
        return wc > 2000 ? "Deep" : wc > 500 ? "Medium" : "Shallow";
    }

    function assessInteractivity() {
        const el = document.querySelectorAll('button, input, select, textarea, [onclick], [data-action]');
        return el.length > 20 ? "High" : el.length > 5 ? "Medium" : "Low";
    }

    function assessVisualRichness() {
        const img = document.querySelectorAll('img').length;
        const vid = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length;
        const score = img + vid * 3;
        return score > 15 ? "High" : score > 5 ? "Medium" : "Low";
    }

    function computeRichnessScore(context) {
        const map = { High: 3, Medium: 2, Low: 1 };
        const avg = (map[context.contentDepth] + map[context.visualRichness] + map[context.interactivity]) / 3;
        return Number(avg.toFixed(2));
    }

    // ===================================================================
    //  MAIN ENHANCEMENT ENGINE
    // ===================================================================

    function enhance(schema, entities, schemaType) {
        const profile = COGNITIVE_PROFILES[schemaType];
        if (!profile) {
            console.warn(`No cognitive profile for schema type: ${schemaType}`);
            return schema;
        }

        const pageContext = analyzePageContext();
        const promptDescriptor = profile.analyze(schema, entities, pageContext);
        promptDescriptor.pageContext = pageContext;
        promptDescriptor.generatedAt = new Date().toISOString();
        promptDescriptor.schemaVersion = "1.1.0-genesis-fusion";
        promptDescriptor.lineage = "Genesis→Cognitive→Fusion→LLM-Ready";

        schema.promptDescriptor = promptDescriptor;

        console.log('✅ Meta-Intelligence Layer injected:', promptDescriptor);
        return schema;
    }

    // ===================================================================
    //  LLM-OPTIMIZED SERIALIZATION
    // ===================================================================

    function serializeForLLM(schema) {
        const llmOptimized = {
            ...schema,
            "_reasoningContext": {
                instruction:
                    "This schema contains a Meta-Intelligence Layer (promptDescriptor). Use it to reason contextually and understand the entity’s role, tone, goal, and semantic intent before generating responses.",
                preferredModelBehavior: "reason_with_promptDescriptor_first",
                usage: {
                    role: "Defines the entity's cognitive purpose",
                    tone: "Guides response style and emotional resonance",
                    goal: "Clarifies entity’s communicative intent",
                    reasoningHints: "Provides inference patterns and context sensitivity"
                }
            }
        };
        return JSON.stringify(llmOptimized, null, 2);
    }

    // ===================================================================
    //  PUBLIC API
    // ===================================================================

    return {
        enhance,
        serializeForLLM,
        analyzePageContext,
        COGNITIVE_PROFILES
    };

})();

window.MetaIntelligenceEngine = MetaIntelligenceEngine;