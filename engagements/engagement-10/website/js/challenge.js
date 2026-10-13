const questions = [
    {
        question: `
            You're troubleshooting an application hosted on EC2.

            From your laptop, a TCP connection to port 443
            times out.

            A colleague says, "The Security Group is broken."

            What does the evidence actually establish?

            What is the smallest architectural repair?
        `,
        options: [
            "The Security Group is definitely blocking traffic.",
            "The application process has crashed.",
            "TCP connectivity was not established; the cause still needs investigation.",
            "The server accepted the connection but rejected the request."
        ],
        answer: 2,
        feedback:
            "A timeout tells us the TCP connection wasn't established. It doesn't identify the cause by itself. Routing, filtering, addressability, and other conditions still need investigation."

    },
    {
        question: `
            You update the access rules and test again.

            This time, your laptop reports:
            Connection refused.

            On the EC2 instance, ss -tlnp shows
            no process listening on port 443.

            What should you investigate next?
        `,
        options: [
            "Replace the Internet Gateway.",
            "Investigate why the expected service isn't listening.",
            "Add another public IPv4 address.",
            "Rebuild the VPC."
        ],
        answer: 1,
        feedback:
            "The refusal, combined with the absence of a listener, directs the investigation toward the service. Check its status, configuration, and logs before making changes."
    },
    {
        question: `
            Now the service is listening.

            Your laptop establishes TCP connectivity
            to port 443 successfully.

            But an HTTP request returns:
            503 Service Unavailable.

            A developer insists the Security Group
            must still be broken.

            What's your next move?
        `,
        options: [
           "Open every port in the Security Group.",
            "Replace the route table.",
            "Assume the EC2 instance is healthy because TCP succeeded.",
            "Investigate the HTTP-serving component, application logs, and dependencies."
        ],
        answer: 3,
        feedback:
            "TCP connectivity succeeded and an HTTP-speaking component returned 503. That moves the investigation toward service availability and dependencies. Connectivity alone doesn't prove application health."
    },
    {
        question: `
            An engineer says:

             An EC2 instance has a public IPv4 address.
            Its Security Group allows TCP/443.
            The web service is listening.

            The VPC has an Internet Gateway attached.

            But the subnet's associated route table
            contains only:
            10.10.0.0/16 → local

            What configuration is missing?
        `,
        options: [
            "A default route, 0.0.0.0/0 → IGW, in the associated route table.",
            "A second Security Group.",
            "A different Linux process.",
            "A larger subnet CIDR."
        ],
        answer: 0,
        feedback:
            "An attached Internet Gateway doesn't automatically create a usable Internet route. The subnet's associated route table must direct Internet-bound IPv4 traffic toward the IGW."
    },
    {
        question: `
            You're leading an incident.

            Users report that the application is down.
            One engineer wants to restart the service.
            Another wants to change the Security Group.

            Neither has collected evidence.

            What should happen first?
        `,
        options: [
            "Restart the service because it's the fastest possible fix.",
            "Change the Security Group because networking is the foundation.",
            "Trace the request path, establish the failure boundary, and collect evidence.",
            "Rebuild the application so the problem can't happen again."
        ],
        answer: 2,
        feedback:
            "Good incident response begins by identifying what is known and what remains uncertain. Evidence helps isolate the failure boundary and reduces unnecessary changes."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionContainer = document.getElementById("question-container");
const questionNumber = document.getElementById("question-number");
const feedback = document.getElementById("feedback");
const actionButton = document.getElementById("quiz-action");
const quizResult = document.getElementById("quiz-result");

function renderQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionContainer.innerHTML = `
        <p class="quiz-question">${current.question}</p>

        <div class="quiz-options">
            ${current.options
                .map(
                    (option, index) => `
                        <label class="quiz-option">
                            <input
                                type="radio"
                                name="answer"
                                value="${index}"
                            >
                            <span>${String.fromCharCode(65 + index)}. ${option}</span>
                        </label>
                    `
                )
                .join("")}
        </div>
    `;

    feedback.hidden = true;
    feedback.textContent = "";
    actionButton.textContent = "Check Answer";
    answered = false;
}

function checkAnswer() {
    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selected) {
        feedback.textContent = "Choose an answer before continuing.";
        feedback.hidden = false;
        return;
    }

    const selectedAnswer = Number(selected.value);
    const current = questions[currentQuestion];
    const isCorrect = selectedAnswer === current.answer;

    if (isCorrect) {
        score++;
        feedback.innerHTML = `
            <strong>Correct.</strong>
            ${current.feedback}
        `;
    } else {
        const correctLetter = String.fromCharCode(65 + current.answer);

        feedback.innerHTML = `
            <strong>Not quite.</strong>
            The best answer is ${correctLetter}.
            ${current.feedback}
        `;
    }

    document
        .querySelectorAll('input[name="answer"]')
        .forEach((input) => {
            input.disabled = true;
        });

    feedback.hidden = false;
    actionButton.textContent =
        currentQuestion === questions.length - 1
            ? "See Results"
            : "Next Question";

    answered = true;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.querySelector(".quiz").hidden = true;

    quizResult.innerHTML = `
        <p class="quiz-score">${score} / ${questions.length}</p>

        <h2>You followed the request path.</h2>

        <p>
            The important lesson isn't memorizing AWS services.
            It's knowing how to establish the failure boundary
            before changing the system.
        </p>

        <a href="index.html" class="quiz-home-link">
            Explore More Engineering Work
        </a>
    `;

    quizResult.hidden = false;
}

actionButton.addEventListener("click", () => {
    if (!answered) {
        checkAnswer();
    } else {
        nextQuestion();
    }
});

renderQuestion();