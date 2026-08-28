import { useState } from "react";

import "./ai.css";

import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";

import { askAI } from "../../services/aiservice";
import ReactMarkdown from "react-markdown";
const quickQuestions = [
    "Who has available capacity?",
    "Who is overallocated?",
    "Give me a summary of resource utilization.",
    "Suggest resources for active projects."
];

export default function AIAssistant() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleAsk(text = question) {
        if (!text.trim()) return;

        setLoading(true);
        setAnswer("");

        try {
            const response = await askAI(text);
            setAnswer(response.answer);
        } catch (err) {
            console.error(err);
            setAnswer("Unable to get AI response.");
        }

        setLoading(false);
    }

    return (
        <div className="ai-page">

            <Card>

                <h2>🤖 AI Resource Planning Assistant</h2>

                <p>
                    Ask questions about employees, projects,
                    allocation and capacity.
                </p>

                <textarea
                    rows={4}
                    value={question}
                    placeholder="Ask anything..."
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <div className="button-group">

                    <Button onClick={() => handleAsk()}>
                        Ask AI
                    </Button>

                    <Button
                        onClick={() => navigator.clipboard.writeText(answer)}
                        disabled={!answer}
                    >
                        Copy Response
                    </Button>

                </div>

            </Card>

            <Card>

                <h3>Quick Questions</h3>

                <div className="quick-buttons">

                    {quickQuestions.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setQuestion(item);
                                handleAsk(item);
                            }}
                        >
                            {item}
                        </button>
                    ))}

                </div>

            </Card>

            <Card>

                <h3>Response</h3>

                {loading ? (
                    <p>Analyzing your resource plan...</p>
                ) : (
                    <div className="ai-response">

                        {answer ? (
                            <ReactMarkdown>{answer}</ReactMarkdown>
                        ) : (
                            "Ask a question to begin."
                        )}

                    </div>
                )}

            </Card>

        </div>
    );
}