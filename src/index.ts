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
  if (client.guilds.cache.get("1138539529435893901")) {
    if (
      client.guilds.cache
        .get("1138539529435893901")
        .channels.cache.get("1139995844007952484")
    ) {
      (
        client.guilds.cache
          .get("1138539529435893901")
          .channels.cache.get("1139995844007952484") as TextChannel
      )
        .send({ content: "مرحبا شباب <3" })
        .catch((error) => {});
    } else {
      console.log("...");
    }
  } else {
    console.log(gradient(["red", "orange"])(t("nosvr")));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId("1146949248617828455")
    .setType("PLAYING")
    .setURL("https://discord.gg/vf9Sf6Zf4X")
    .setName("Pirt Community")
    .setState("Running...")
    .setDetails("The best server about selfbots and bots")
    .setAssetsLargeImage(
      "https://cdn.discordapp.com/icons/1138539529435893901/98f810eb6cb783fec999c75fd269a67b.png?size=1024",
    )
    .setAssetsLargeText("Pirt Community")
    .setAssetsSmallImage(
      "https://cdn.discordapp.com/icons/1138539529435893901/98f810eb6cb783fec999c75fd269a67b.png?size=1024",
    )
    .setAssetsSmallText("Join")
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t("join"), "https://discord.gg/vf9Sf6Zf4X");
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