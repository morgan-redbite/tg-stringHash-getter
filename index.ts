import input from 'input'
import * as TG from "telegram";
import { StringSession } from "telegram/sessions";

// View https://docs.google.com/document/d/1QfS6MPjsNibeUBYZpf9hbpgVHqQVHb-UN1G5uCF6NLY/edit?usp=sharing on how to obtain API ID and API HASH

export interface ITelegramConn {
  apiId: number;
  apiHash: string;
  stringSession: string;
}

const initialConn: ITelegramConn = {
  apiId: 2555555, // Please obtain this from https://my.telegram.org/auth?to=apps
  apiHash: "60593aa4f7afbd094fbbeb7a097efsample", // Please obtain this from https://my.telegram.org/auth?to=apps
  stringSession: "",
}

const main = async () => {
  const telegramConn: ITelegramConn = initialConn
  const stringSession = new StringSession(initialConn.stringSession)
  
  const client = new TG.TelegramClient(stringSession, telegramConn.apiId, telegramConn.apiHash, {
    connectionRetries: 5,
  })

  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });

  const newstringSession = client.session.save();

  // This string session can be reused. So no need to reauthenticate using api/hash and phone number again
  console.log('YOUR STRING SESSION', newstringSession);
}

main()