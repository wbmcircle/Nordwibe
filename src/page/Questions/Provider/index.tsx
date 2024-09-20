"use client";

import React, { createContext, useState } from "react";

export type QuestionType = {
  id: number;
  answer: any;
  content: string;
  subheading?: string;
  anotherText?: {
    first: string;
    second: string;
  };
  placeholder?: {
    floor: string;
    all: string;
  };
  Radiovalues?: {
    first: string;
    second: string;
    third: string;
  };
  Optionsvalues?: string[];
  labels?: string[];
  type:
    | "text"
    | "yesNo"
    | "yesNoUnsure"
    | "slider"
    | "file"
    | "multiFile"
    | "switch"
    | "twoNumber"
    | "number"
    | "toggles"
    | "miltiOption"
    | "checklist"
    | "textAndMap"
    | "description"
    | "days";
};

export type AnswerType = {
  id: number;
  content: string | string[] | null;
};

type ContextProps = {
  questions: QuestionType[];
  addAnswer: (answer: AnswerType) => void;
  currentId?: number;
  setCurrentId: (id: number) => void;
  answers: AnswerType[];
  index?: number;
};

type ProviderProps = {
  children: React.ReactNode;
  questions: QuestionType[];
};

export const QuestionsContext = createContext<ContextProps>({
  questions: [],
  answers: [],
  addAnswer: () => {},
  setCurrentId: () => {},
});

export default function QuestionProvider(props: ProviderProps) {
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [currentId, setCurrentId] = useState<number>();

  function addAnswer(answer: AnswerType) {
    let newAnswers: AnswerType[] = [];
    if (answers.map((answer) => answer.id).includes(answer.id)) {
      newAnswers = answers.filter(
        (currentAnswer) => currentAnswer.id !== answer.id
      );
    } else {
      newAnswers = [...answers, answer];
    }
    setAnswers((prev) =>
      answers.map((answer) => answer.id).includes(answer.id)
        ? [
            ...prev.filter((currentAnswer) => currentAnswer.id !== answer.id),
            answer,
          ]
        : [...prev, answer]
    );
  }

  return (
    <QuestionsContext.Provider
      value={{
        questions: props.questions,
        addAnswer: addAnswer,
        answers: answers,
        currentId: currentId,
        setCurrentId: setCurrentId,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
}
