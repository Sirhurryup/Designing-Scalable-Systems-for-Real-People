const API_BASE =
    "https://2v6w289860.execute-api.us-east-1.amazonaws.com";

const visitorCountElement = document.getElementById("visitor-count");
const guestbookForm = document.getElementById("guestbook-form");
const guestbookStatus = document.getElementById("guestbook-status");
const guestbookList = document.getElementById("guestbook-list");


async function updateVisitorCount() {
    try {
        const response = await fetch(`${API_BASE}/visitor-count`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        visitorCountElement.textContent = data.count;
    } catch (error) {
        console.error("Visitor counter failed:", error);
        visitorCountElement.textContent = "Unavailable";
    }
}


async function loadComments() {
    try {
        const response = await fetch(`${API_BASE}/comments`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        guestbookList.innerHTML = "";

        data.comments.forEach((entry) => {
            const article = document.createElement("article");
            article.className = "guestbook-comment";

            const name = document.createElement("strong");
            name.textContent = entry.name;

            const comment = document.createElement("p");
            comment.textContent = entry.comment;

            article.appendChild(name);
            article.appendChild(comment);

            guestbookList.appendChild(article);
        });

    } catch (error) {
        console.error("Guestbook loading failed:", error);
    }
}


async function submitComment(event) {
    event.preventDefault();

    const name = document
        .getElementById("guestbook-name")
        .value
        .trim();

    const comment = document
        .getElementById("guestbook-comment")
        .value
        .trim();

    guestbookStatus.textContent = "Submitting...";

    try {
        const response = await fetch(`${API_BASE}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                comment
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Submission failed.");
        }

        guestbookStatus.textContent =
            "Thank you. Your comment was submitted for review.";

        guestbookForm.reset();

    } catch (error) {
        console.error("Guestbook submission failed:", error);
        guestbookStatus.textContent =
            "Unable to submit your comment right now.";
    }
}


guestbookForm.addEventListener("submit", submitComment);

updateVisitorCount();
loadComments();