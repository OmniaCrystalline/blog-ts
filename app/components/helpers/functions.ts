/** @format */

interface DateStringFunction {
  (createdAt: Date): string;
}

export const datestring: DateStringFunction = (createdAt) =>
  ("0" + createdAt.getDate()).slice(-2) +
  "-" +
  ("0" + (createdAt.getMonth() + 1)).slice(-2) +
  "-" +
  createdAt.getFullYear();

