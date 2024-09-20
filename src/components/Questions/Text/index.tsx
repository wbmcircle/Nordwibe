"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import Button from "@/components/Button";
import TextInput from "@/components/Form/TextInput";
import React, { useEffect, useState } from "react";
import { QuestionType } from "@/page/Questions/Provider";

type QuestionProps = {
  question: QuestionType;
  type: "text" | "number";
  onAnswer: (answer: string) => void;
  answerVal?: any
};

export default function TextQuestion(props: QuestionProps) {
  const [answer, setAnswer] = useState<string>();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (answer) props.onAnswer(answer);
  }

  return (
    <Form action={handleSubmit}>
      <FormHeading for={props.question.id.toString()}>
        {props.question.content}
      </FormHeading>

      <TextInput
        id={props.question.id.toString()}
        type={props.type}
        placeholder="Ваш ответ"
        onChange={(value) => setAnswer(value)}
      />

      <Button>Продолжить</Button>
    </Form>
  );
}
