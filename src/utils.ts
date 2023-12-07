import { decode } from 'iconv-lite'

export function GBKtoUTF8(str: string) {
  return decode(Buffer.from(str, 'binary'), 'gb2312');
}