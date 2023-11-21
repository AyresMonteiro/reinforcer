import { RakePosNlpHelper } from "../../../../../src/infra/nlp/classification/rake-pos/helper";

const makeSut = () => {
  return {
    sut: new RakePosNlpHelper(),
    payload: {
      id: "1",
      statement: 'Is "Acceleracers" a good movie series?',
      options: ["Yes", "No"],
      answer: "Yes",
      author: "author",
      tags: [],
    },
  };
};

describe("@infra/nlp/classification/rake-pos/helper.spec.ts", () => {
  test("it should generate question tags", async () => {
    const { sut, payload } = makeSut();

    const tags = await sut.getQuestionTags(payload);

    expect(tags).toEqual(["movie series", "acceleracers"]);
  });
});
