import { customAlphabet } from 'nanoid';

export function generateAccountNumber(size?: number): string {
  const nanoid = customAlphabet('1234567890', 10);

  return nanoid(size);
}
