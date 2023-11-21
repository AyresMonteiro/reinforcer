import { Question } from "../../domain/types/question";

export interface GetQuestionTagsAction {
  getQuestionTags(question: Question): Promise<string[]>;
}
