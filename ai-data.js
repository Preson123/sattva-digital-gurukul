/* ============================================
   SATTVA NEURAL GURU - ADVANCED CORE v3.0
   Lineage Wisdom + Biometric Intelligence + History
============================================ */

const GURU_MEMORY = {
    user: localStorage.getItem("sattva_user_name") || "Sadhaka",
    streak: Number(localStorage.getItem("streak") || 12),
    minutes: Number(localStorage.getItem("minutes") || 720),
    last_intent: localStorage.getItem("last_intent") || "neutral",
    sentiment_score: 0,
    session_count: Number(localStorage.getItem("session_count") || 142)
};

const AI_CORE = [
    /* 1. KNOWLEDGE & HISTORY LAYER */
    {
        intent: "history_yoga",
        keywords: ["history of yoga", "origin of yoga", "how old is yoga", "yoga roots", "vedic"],
        responses: [
            "Yoga is a 5,000-year-old Vedic science. It originated in Northern India as a path to spiritual and physical liberation.",
            "The first mention of Yoga is found in the Rig Veda. It was later systematized by Patanjali in the Yoga Sutras.",
            "Yoga means 'to yoke' or 'to unite'—the union of individual consciousness with the universal."
        ],
        action: () => "View Heritage Timeline",
        color: "#F0A500"
    },
    {
        intent: "history_sattva",
        keywords: ["history of sattva", "about sattva", "mysuru lineage", "jaganmohan", "pattabhi jois"],
        responses: [
            "Our lineage was born in 1924 at the Jaganmohan Palace, Mysuru, under the patronage of the Maharaja.",
            "Sattva preserves the Vinyasa method codified by Krishnamacharya and Pattabhi Jois.",
            "We bridge 100 years of palace tradition with modern neural biometrics."
        ],
        action: () => "Explore Our Lineage",
        color: "#FF7F00"
    },

    /* 2. BIOMETRIC & STATE LAYER */
    {
        intent: "stress",
        keywords: ["stress", "anxiety", "tense", "pressure", "overthinking", "worried", "exhausted"],
        responses: [
            "Your nervous system is in a 'Rajasic' state. Longer exhales will activate the Vagus nerve 🌿",
            "The mind follows the breath. Slow the prana, and the thoughts will follow.",
            "I detect high cognitive pressure. Soften your jaw and let the shoulders drop 🙏"
        ],
        action: () => "Recommended: 4-7-8 Pranayama (3 min)",
        color: "#F0A500"
    },
    {
        intent: "physical_pain",
        keywords: ["back", "neck", "shoulder", "pain", "hurt", "stiff", "ache"],
        responses: [
            "Prana often gets blocked in the joints. Gentle spinal lengthening is required.",
            "Move with 'Ahimsa' toward your body today. No forced depth.",
            "I suggest a restorative focus to realign the structural integrity of your spine."
        ],
        action: () => "Start: Neural-Vision Posture Correction",
        color: "#FF7F00"
    },

    /* 3. SOCIAL & RITUAL LAYER */
    {
        intent: "greetings",
        keywords: ["hi", "hello", "hey", "namaste", "greetings", "hlo", "hi guru"],
        responses: [
            `Namaste, ${GURU_MEMORY.user}. The light in me recognizes the light in you.`,
            "Welcome back to your sacred space. How is your energy today?",
            "I am ready to guide your journey. Shall we practice?"
        ],
        action: () => "Quick Start: Daily Flow",
        color: "#1F382B"
    },
    {
        intent: "gratitude",
        keywords: ["thanks", "thank you", "helpful", "dhanyavad", "thx"],
        responses: [
            "Gratitude is the highest form of Yoga. Dhanyavad, Sadhaka.",
            "It is my purpose to guide you. May your practice be fruitful.",
            "You are welcome. Stay centered in this peace."
        ],
        action: () => "Check Daily Analytics",
        color: "#F0A500"
    }
];

/* ADVANCED BRAIN LOGIC */
function getAIReply(message) {
    const rawMsg = message.toLowerCase().trim();
    
    // Update Sentiment Score
    updateSentiment(rawMsg);

    // 1. Time-Based Greeting logic (Ritual Intelligence)
    if (rawMsg === "hi" || rawMsg === "hello" || rawMsg === "namaste") {
        const hour = new Date().getHours();
        let timeGreet = "";
        if (hour < 12) timeGreet = "Good morning. A perfect time for Surya Namaskara.";
        else if (hour < 18) timeGreet = "Good afternoon. Keep your prana steady.";
        else timeGreet = "Good evening. A time for reflection and Yoga Nidra.";
        
        const block = AI_CORE.find(b => b.intent === "greetings");
        return `
            <div class="guru-msg">
                <p>${timeGreet} <br> ${random(block.responses)}</p>
                <button onclick="handleGuruAction('greetings')" style="color:${block.color}; font-size:10px; font-weight:bold; margin-top:10px; display:block">
                    ${block.action()}
                </button>
            </div>
        `;
    }

    // 2. Scan AI_CORE for Knowledge and Intent
    for (const block of AI_CORE) {
        if (block.keywords.some(key => rawMsg.includes(key))) {
            GURU_MEMORY.last_intent = block.intent;
            saveMemory();
            return formatResponse(block);
        }
    }

    // 3. Smart Short-Form Handling
    if (rawMsg.length < 4) {
        return "Namaste. I am present and listening. How can I guide your practice?";
    }

    // 4. Final Intelligent Fallback
    return generateContextualFallback(rawMsg);
}

/* UTILS (Formatted for Professional UI) */
function formatResponse(block) {
    const msg = random(block.responses);
    const action = block.action();
    return `
        <div class="guru-msg">
            <p>${msg}</p>
            <div class="mt-3 pt-3 border-t border-gray-100">
                <button onclick="handleGuruAction('${block.intent}')" 
                        style="color:${block.color}; font-size:11px; font-weight:bold; letter-spacing:1px; text-transform:uppercase">
                    <i class="fas fa-play-circle mr-1"></i> ${action}
                </button>
            </div>
        </div>
    `;
}

function generateContextualFallback(msg) {
    const options = [
        `Stay aware of your breath, ${GURU_MEMORY.user}. Consistency is the key to progress.`,
        "I didn't quite catch that. Would you like to hear about the history of our lineage?",
        "Your current streak is 14 days. Let's keep the momentum alive with a 5-minute session.",
        "The wisdom of Yoga is 5,000 years old. Ask me about our Mysuru heritage."
    ];
    return random(options);
}

function updateSentiment(msg) {
    const pos = ["good", "great", "happy", "love", "amazing"];
    const neg = ["bad", "tired", "hurt", "sad", "unhappy"];
    pos.forEach(w => { if(msg.includes(w)) GURU_MEMORY.sentiment_score++ });
    neg.forEach(w => { if(msg.includes(w)) GURU_MEMORY.sentiment_score-- });
}

function saveMemory() {
    localStorage.setItem("last_intent", GURU_MEMORY.last_intent);
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* NAVIGATION BRIDGE */
function handleGuruAction(intent) {
    if(intent.includes("history")) window.location.href = "heritage.html";
    else if(intent === "stress") window.location.href = "practices.html?filter=therapy";
    else if(intent === "greetings") window.location.href = "practices.html";
    else window.location.href = "journey.html";
}