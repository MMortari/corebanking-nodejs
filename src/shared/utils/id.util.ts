import { customAlphabet } from 'nanoid';

export function generateId(type?: IdType, size?: number): string {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);

  let id = '';

  if (type) id = id + getPrefixByType(type);

  return id + nanoid(size);
}

function getPrefixByType(type: IdType): string {
  switch (type) {
    case 'account':
      return 'ac_';
    case 'client':
      return 'cl_';
    case 'transaction':
      return 'tr_';
    case 'balance':
      return 'ba_';

    default:
      return '';
  }
}

type IdType = 'account' | 'client' | 'transaction' | 'balance';
