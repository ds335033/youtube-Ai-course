"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle2, Circle, Trophy } from "lucide-react";

const quizData = {
  title: "Module 1 Assessment: AI Fundamentals",
  description: "Test your knowledge of LLMs and Prompt Engineering",
  questions: [
    {
      id: 1,
      question: "Which of the following best describes 'Zero-Shot Prompting'?",
      options: [
        "Providing the AI with 10 examples before asking a question",
        "Asking the AI a question without providing any prior examples or context",
        "Training a new model from scratch",
        "Setting the temperature to 0"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Why is context window size important?",
      options: [
        "It determines how fast the AI types",
        "It limits the amount of text the AI can process and remember at one time",
        "It changes the color of the chat interface",
        "It increases the cost per token linearly"
      ],
      correct: 1
    }
  ]
};

export default function QuizzesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (optionIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIdx });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quizData.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interactive Quizzes</h1>
        <p className="text-muted-foreground mt-2">
          Validate your knowledge and earn your certificate.
        </p>
      </div>

      {!showResults ? (
        <Card className="border-zinc-800 bg-zinc-950 shadow-xl overflow-hidden">
          <CardHeader className="bg-zinc-900 border-b border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-500 uppercase tracking-wider">Question {currentQuestion + 1} of {quizData.questions.length}</span>
              <span className="text-sm text-zinc-400">{Math.round(((currentQuestion) / quizData.questions.length) * 100)}% Complete</span>
            </div>
            <CardTitle className="text-2xl leading-relaxed">{quizData.questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {quizData.questions[currentQuestion].options.map((option, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleSelectOption(idx)}
                  className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    selectedAnswers[currentQuestion] === idx 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50'
                  }`}
                >
                  <div className="mt-0.5">
                    {selectedAnswers[currentQuestion] === idx ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-600" />
                    )}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-zinc-900/50 border-t border-zinc-800 flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-lg px-8"
            >
              {currentQuestion === quizData.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border-zinc-800 bg-zinc-950 shadow-xl text-center p-12">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold mb-4">Quiz Complete!</h2>
          <p className="text-xl text-zinc-400 mb-8">
            You scored <span className="text-white font-bold">{calculateScore()}</span> out of {quizData.questions.length}.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => {setShowResults(false); setCurrentQuestion(0); setSelectedAnswers({});}} className="border-zinc-700 hover:bg-zinc-800">
              Retake Quiz
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Continue to Module 2
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
