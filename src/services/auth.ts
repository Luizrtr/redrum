import { v4 as uuid } from "uuid";

type signInRequestData = {
  email: string;
  password: string;
};

const delay = (amout = 750) =>
  new Promise((resolve) => setTimeout(resolve, amout));

export async function signInRequest(data: signInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Luiz Eduardo",
      email: "luizrtr@outlook.com",
      avatar_url: "https://github.com/Luizrtr.png",
    },
  };
}

export async function recoverUserInformation() {
  await delay();
  return {
    user: {
      name: "Luiz Eduardo",
      email: "luizrtr@outlook.com",
      avatar_url: "https://github.com/Luizrtr.png",
    },
  };
}