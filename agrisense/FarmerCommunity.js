document.addEventListener("DOMContentLoaded", loadQuestions);

function postQuestion() {
    let questionText = document.getElementById("questionInput").value;

    if (questionText.trim() === "") {
        alert("Please enter a question!");
        return;
    }

    let questions = JSON.parse(localStorage.getItem("questions")) || [];

    let newQuestion = {
        text: questionText,
        replies: []
    };
        // Simple AI auto reply
        // 🤖 Smart AI Auto Reply System
    let lowerText = questionText.toLowerCase();

    if (lowerText.includes("rice") || questionText.includes("चावल")) {
        newQuestion.replies.push("🌾 Rice Issue: Possible fungal infection. Try neem oil spray or consult local agriculture officer.");
    }

    else if (lowerText.includes("wheat") || questionText.includes("गेहूं")) {
        newQuestion.replies.push("🌾 Wheat Issue: Check for rust disease. Use recommended fungicide.");
    }

    else if (lowerText.includes("potato") || questionText.includes("आलू")) {
        newQuestion.replies.push("🥔 Potato Issue: Could be late blight. Avoid overwatering and apply fungicide.");
    }

    else if (lowerText.includes("tomato") || questionText.includes("टमाटर")) {
        newQuestion.replies.push("🍅 Tomato Issue: Yellow leaves may indicate nitrogen deficiency. Add organic compost.");
    }

    else if (lowerText.includes("yellow") || questionText.includes("पीला")) {
        newQuestion.replies.push("🌱 Yellowing leaves often indicate nutrient deficiency. Check soil nitrogen levels.");
    }

    else if (lowerText.includes("brown") || questionText.includes("भूरा")) {
        newQuestion.replies.push("🌿 Brown spots may indicate fungal infection. Try neem spray.");
    }

    else {
        newQuestion.replies.push("🤖 Thank you for your question. Our AI is analyzing it. Please consult nearby Krishi Kendra for expert advice.");
    }



    questions.push(newQuestion);

    localStorage.setItem("questions", JSON.stringify(questions));

    document.getElementById("questionInput").value = "";

    loadQuestions();
}

function loadQuestions() {
    let questionList = document.getElementById("questionList");
    questionList.innerHTML = "";

    let questions = JSON.parse(localStorage.getItem("questions")) || [];

    questions.forEach((q, index) => {
        let div = document.createElement("div");
        div.className = "question-box";

        div.innerHTML = `
            <p><strong>Q:</strong> ${q.text}</p>

            <div class="reply-box">
                <input type="text" id="reply-${index}" placeholder="Write reply...">
                <button onclick="addReply(${index})">Reply</button>
            </div>

            <div>
                ${q.replies.map(r => `<p>↳ ${r}</p>`).join("")}
            </div>
        `;

        questionList.appendChild(div);
    });
}

function addReply(index) {
    let replyInput = document.getElementById(`reply-${index}`);
    let replyText = replyInput.value;

    if (replyText.trim() === "") return;

    let questions = JSON.parse(localStorage.getItem("questions")) || [];

    questions[index].replies.push(replyText);

    localStorage.setItem("questions", JSON.stringify(questions));

    loadQuestions();
}
