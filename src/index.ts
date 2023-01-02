import Bot from "./lib/bot";
import Server from "./lib/server";
import Spotify from "./lib/spotify";

require("dotenv").config();

(async () => {
  try {
    // Start a new Spotify authentication server
    const spotify = new Spotify();
    new Server(spotify);
    if (!spotify.isAuthenticated) {
      console.log("⚠️  WARNING: Spotify features won't work until you log in");
      return;
    }

    // Validate Spotify credentials
    await spotify.refreshTokens();

    // Boot up bot
    const bot = new Bot();
    await bot.login();
    await bot.addTrackToPlaylist(spotify);
  } catch (e) {
    console.log(e);
  }
})();
