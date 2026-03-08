const UI_TEXT = {
    hi: {
        title: "Farmer Community Q&A",
        placeholder: "Apna sawal yahan likhen...",
        post: "Post Question",
        back: "वापस",
        emptyQuestion: "Kripya sawal likhen.",
        replyPlaceholder: "Reply likhen...",
        replyBtn: "Reply",
        questionLabel: "Q:",
        defaultReply: "Dhanyavad. AI aapke sawal ka vishleshan kar raha hai. Krishi Kendra se bhi salah lein."
    },
    en: {
        title: "Farmer Community Q&A",
        placeholder: "Write your question here...",
        post: "Post Question",
        back: "Back",
        emptyQuestion: "Please enter a question.",
        replyPlaceholder: "Write reply...",
        replyBtn: "Reply",
        questionLabel: "Q:",
        defaultReply: "Thank you. AI is analyzing your question. Please consult your nearby Krishi Kendra."
    },
    bh: {
        title: "Farmer Community Q&A",
        placeholder: "Apna sawal yahan likhin...",
        post: "Sawal Post Karin",
        back: "लौटिन",
        emptyQuestion: "Kripya sawal likhin.",
        replyPlaceholder: "Reply likhin...",
        replyBtn: "Reply",
        questionLabel: "Q:",
        defaultReply: "Dhanyavad. AI sawal dekh raha ba. Nazdeeki Krishi Kendra se salah lein."
    },
    mr: {
        title: "Farmer Community Q&A",
        placeholder: "Tumcha prashna ithe liha...",
        post: "Prashna Post Kara",
        back: "परत",
        emptyQuestion: "Kripaya prashna liha.",
        replyPlaceholder: "Reply liha...",
        replyBtn: "Reply",
        questionLabel: "Q:",
        defaultReply: "Dhanyavad. AI tumcha prashna tapast aahe. Krishi Kendra shi sampark kara."
    },
    pa: {
        title: "Farmer Community Q&A",
        placeholder: "Apna sawal ithhe likho...",
        post: "Sawal Post Karo",
        back: "ਵਾਪਸ",
        emptyQuestion: "Kirpa karke sawal likho.",
        replyPlaceholder: "Reply likho...",
        replyBtn: "Reply",
        questionLabel: "Q:",
        defaultReply: "Dhanvaad. AI tuhade sawal nu dekh riha hai. Krishi Kendra ton salah lao."
    }
};

function getLang() {
    const langEl = document.getElementById("lang");
    return (langEl && UI_TEXT[langEl.value]) ? langEl.value : "hi";
}

function changeLang() {
    const lang = getLang();
    const t = UI_TEXT[lang];
    document.getElementById("pageTitle").innerText = t.title;
    document.getElementById("questionInput").placeholder = t.placeholder;
    document.getElementById("postBtn").innerText = t.post;
    document.getElementById("backBtn").innerText = t.back;
    loadQuestions();
}

function postQuestion() {
    const questionText = document.getElementById("questionInput").value.trim();
    const lang = getLang();

    if (!questionText) {
        alert(UI_TEXT[lang].emptyQuestion);
        return;
    }

    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const newQuestion = {
        text: questionText,
        replies: []
    };

    const lowerText = questionText.toLowerCase();
    if (lowerText.includes("rice") || lowerText.includes("chawal")) {
        newQuestion.replies.push("Rice issue: Possible fungal infection. Try neem oil spray.");
    } else if (lowerText.includes("wheat") || lowerText.includes("gehu")) {
        newQuestion.replies.push("Wheat issue: Check for rust disease. Use recommended fungicide.");
    } else if (lowerText.includes("potato") || lowerText.includes("alu")) {
        newQuestion.replies.push("Potato issue: Could be late blight. Avoid overwatering.");
    } else if (lowerText.includes("tomato")) {
        newQuestion.replies.push("Tomato issue: Yellow leaves may indicate nitrogen deficiency.");
    } else if (lowerText.includes("yellow")) {
        newQuestion.replies.push("Yellowing leaves can indicate nutrient deficiency. Check soil nitrogen.");
    } else if (lowerText.includes("brown")) {
        newQuestion.replies.push("Brown spots may indicate fungal infection. Try neem spray.");
    } else {
        newQuestion.replies.push(UI_TEXT[lang].defaultReply);
    }

    questions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(questions));
    document.getElementById("questionInput").value = "";
    loadQuestions();
}

function loadQuestions() {
    const lang = getLang();
    const t = UI_TEXT[lang];
    const questionList = document.getElementById("questionList");
    questionList.innerHTML = "";

    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "question-box";
        div.innerHTML = `
            <p><strong>${t.questionLabel}</strong> ${q.text}</p>
            <div class="reply-box">
                <input type="text" id="reply-${index}" placeholder="${t.replyPlaceholder}">
                <button onclick="addReply(${index})">${t.replyBtn}</button>
            </div>
            <div>
                ${q.replies.map((r) => `<p>-> ${r}</p>`).join("")}
            </div>
        `;
        questionList.appendChild(div);
    });
}

function addReply(index) {
    const replyInput = document.getElementById(`reply-${index}`);
    const replyText = replyInput.value.trim();
    if (!replyText) return;

    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions[index].replies.push(replyText);
    localStorage.setItem("questions", JSON.stringify(questions));
    loadQuestions();
}

document.addEventListener("DOMContentLoaded", function () {
    changeLang();
});
