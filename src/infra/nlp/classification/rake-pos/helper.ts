import extractWithRakePos from "rake-pos";

import { GetQuestionTagsAction } from "../../../../data/question/get-tags";
import { Question } from "../../../../domain/types/question";

export class RakePosNlpHelper implements GetQuestionTagsAction {
  async getQuestionTags(question: Question): Promise<string[]> {
    const input = `${question.statement}\n${
      question.answer
    }\n${question.options.join("\n")}`
      .trim()
      .toLowerCase();

    const keywords = extractWithRakePos({ text: input, language: "en" });

    return keywords;
  }
}
