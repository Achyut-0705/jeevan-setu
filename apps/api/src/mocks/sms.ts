import { nanoid } from "nanoid";
import { insertOutbox } from "../db/repo";
import type { OutboxMessage } from "../db/repo";

export function sendMockSms(
  userId: string,
  toMobile: string,
  body: { en: string; hi: string },
  relatedTo: { type: string; id: string }
): OutboxMessage {
  const msg: OutboxMessage = {
    id: `msg_${nanoid(8)}`,
    userId,
    channel: "sms",
    toMobile,
    body,
    relatedTo,
    sentAt: new Date().toISOString(),
  };
  insertOutbox(msg);
  return msg;
}
