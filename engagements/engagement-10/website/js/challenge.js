const questions = [
    {
        question: `
            An EC2 web server has a Public IPv4, a Security Group allowing
            TCP/443, a web service listening on port 443, and an allowing NACL.
            Clients on the Internet still time out.

            The subnet's associated route table contains only:
            10.10.0.0/16 → local

            An Internet Gateway is attached to the VPC.

            What is the smallest architectural repair?
        `,
        options: [
            "Add 0.0.0.0/0 → IGW to the subnet's associated route table.",
            "Add 0.0.0.0/0 to the Security Group.",
            "Restart the web service.",
            "Replace the EC2 public IPv4."
        ],
        answer: 0,
        feedback:
            "The Internet Gateway exists, but the subnet has no route telling Internet-bound traffic to use it. Adding 0.0.0.0/0 → IGW repairs the path."
    },
    {
        question: `
            A private application server needs to download operating-system
            updates from the Internet, but it must not accept
            Internet-initiated connections.

            Which architecture fits?
        `,
        options: [
            "Give the instance a public IPv4 and open its Security Group.",
            "Private subnet → NAT Gateway → public subnet → IGW.",
            "Private subnet → IGW directly.",
            "Add 0.0.0.0/0 inbound to its NACL."
        ],
        answer: 1,
        feedback:
            "A NAT Gateway gives the private tier outbound Internet capability without making the instance directly Internet-addressable."
    },
    {
        question: `
            Your subnet has the correct route to the Internet Gateway.
            The Security Group permits TCP/443 and the application is
            listening on port 443.

            The subnet's NACL allows inbound TCP/443 but blocks the necessary
            return traffic.

            Which property explains the failure?
        `,
        options: [
            "Security Groups are stateless.",
            "Route tables control return traffic permissions.",
            "NACLs are stateless and evaluate each direction independently.",
            "The Internet Gateway requires an inbound rule."
        ],
        answer: 2,
        feedback:
            "NACLs are stateless, so inbound and outbound traffic are evaluated independently. Security Groups, by contrast, are stateful."
    },
    {
        question: `
            An engineer says:

            "The subnet is named production-public-subnet, so we know it's public."

            What evidence actually proves the subnet is public in this IPv4 architecture?
        `,
        options: [
            "Its name contains public.",
            "Its NACL allows Internet traffic.",
            "Its associated route table has 0.0.0.0/0 → IGW.",
            "An EC2 instance inside it has a Security Group."
        ],
        answer: 2,
        feedback:
            "Names describe intent. Configuration proves architecture. The route to the Internet Gateway is the evidence that establishes the subnet's Internet path."
    },
    {
        question: `
            An engineer tells you:

            "The network is broken because users can't reach the application."

            You have no evidence yet.

            What is your best first response?
        `,
        options: [
            "Check the Security Group because that's the most common AWS problem.",
            "Restart the application and see whether it recovers.",
            "Determine the failure boundary by collecting evidence through the request path.",
            "Inspect the route table because networking starts with routing."
        ],
        answer: 2,
        feedback:
            "Start with evidence, not a favorite AWS service. Establish the failure boundary through the request path before changing the system."
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