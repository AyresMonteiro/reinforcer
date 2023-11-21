import { Question } from "../types/question";

export class QuestionEntity implements Question {
  constructor(private readonly data: Question) {}

  get id(): string {
    return this.data["id"];
  }

  get statement(): string {
    return this.data["statement"];
  }

  get options(): string[] {
    return this.data["options"];
  }

  get answer(): string {
    return this.data["answer"];
  }

  get author(): string {
    return this.data["author"];
  }

  get tags(): string[] {
    return this.data["tags"];
  }

  plain() {
    return {};
  }
}
