import { Details } from "./details.module.js";
import { DisplayData } from "./ui.module.js";

export class Games {
  constructor() {
    // ==== global ====
    this.$navList = $("#mainNavList li button");
    this.navValue = "mmorpg";
    this.$loading = $("#loading");
    // ==== when start ====
    $("#gameDetails").hide(0);
    $("#games").show(0);
    this.dataManager(this.navValue);
    // ==== events ====
    this.$navList.on("click", (element) => {
      this.navActivePoint(element);
      this.navValue = this.getNavValue(element);
      this.dataManager(this.navValue);
    });
  }
  // ==== functions ====
  async dataManager(value) {
    const gamesData = await this.fetchGameApi(value);
    const displayData = new DisplayData();
    displayData.displayGamesItems(gamesData);

    $(".game-card").on("click", function () {
      const itemId = this.dataset.gameId;
      const details = new Details(itemId);
    });
  }

  navActivePoint(element) {

    this.$loading.show(0);
    this.$navList.removeClass("active");
    $(element.target).addClass("active");
  }

  getNavValue = (element) => $(element.target).val();

  async fetchGameApi(apiValue) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "837131a8b5msh27a6665acf2fbd8p1d2bbfjsneb6bbc0c24d0",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${apiValue}`,
        options
      );
      const result = await response.json();
      this.$loading.hide(0);
      return result;
    } catch (error) {
      console.error("Error when fetch games: ", error);
      this.$loading.html("<h2>an error occurred</h2>");
      return [];
    }
  }
}
