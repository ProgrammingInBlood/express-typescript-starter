import { ExampleData } from "@/interfaces/example.interface";

export const exampleService = () => {
  return "Hello World!";
};

export const examplePostService = (data: ExampleData) => {
  return `Hello ${data.firstName} ${data.lastName}!`;
};
