import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv";
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from "./utils/translations.json";
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const token = process.env.TOKEN;

function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(
      `\r${gradient(["purple", "pink"])(`Connecting${".".repeat(ponto)}`)}`,
    );
    ponto = (ponto + 1) % 4;
  }, 500);
}

const loading = loading2();

client.on("ready", async () => {
  clearInterval(loading);
  
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang("pt");
  } else {
    setlang("en");
  }

  // معرف السيرفر الجديد الذي طلبته
  const serverId = "1443859816534511701"; 
  const targetServer = client.guilds.cache.get(serverId);

  if (targetServer) {
    // ملاحظة: تأكد أن هذا الأيدي (1139995844007952484) هو لقناة موجودة داخل السيرفر الجديد
    const targetChannel = targetServer.channels.cache.get("1139995844007952484") as TextChannel;
    if (targetChannel) {
      targetChannel.send({ content: "مرحبا شباب <3" }).catch(() => {});
    }
  } else {
    console.log(gradient(["red", "orange"])(t("nosvr")));
    process.exit(1);
  }

  menutext(client);
  choiceinit(client);

  // حساب وقت البداية (قبل 5 ساعات من الآن)
  const startTime = new Date(Date.now() - (5 * 60 * 60 * 1000));

  const r = new Discord.RichPresence()
    .setApplicationId("1146949248617828455")
    .setType("PLAYING")
    .setName("GitHub")
    .setState("Working on Repository...")
    .setDetails("Coding and pushing commits")
    .setURL("https://github.com/")
    // صورة شعار GitHub الشهير
    .setAssetsLargeImage("https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
    .setAssetsLargeText("Mastering Code")
    .setAssetsSmallImage("https://cdn-icons-png.flaticon.com/512/25/25231.png")
    .setAssetsSmallText("GitHub Profile")
    .setStartTimestamp(startTime) 
    .addButton("View My Repo", "https://github.com/");

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(
    gradient(["purple", "pink"])("Your token (Not a bot token)\n» "),
    (input) => {
      if (input.trim() === "") {
        console.log(gradient(["red", "orange"])("this token is empty"));
        process.kill(1);
      } else {
        client.login(input).catch((error) => {
          if (error.message === "An invalid token was provided.") {
            console.clear();
            console.log(gradient(["red", "orange"])("Invalid token"));
          } else {
            console.clear();
            console.error(
              gradient(["red", "orange"])(
                `Erro ao fazer login: ${error.message}`,
              ),
            );
          }
        });
      }
    },
  );
} else {
  console.clear();
  client.login(token).catch((error) => {
    console.clear();
    if (error.message === "An invalid token was provided.") {
      console.log(gradient(["red", "orange"])("Invalid token"));
    } else {
      console.clear();
      console.error(gradient(["red", "orange"])(error.message));
    }
  });
}

export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;
