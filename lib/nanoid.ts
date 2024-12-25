import { customAlphabet } from "nanoid";

const alpabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alpabet, 16);

export { nanoid };
