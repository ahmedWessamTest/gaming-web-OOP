import { DisplayData } from "./ui.module.js";

export class Details {
  constructor(id) {
    // ==== global ====
    this.id = id;
    this.$loading = $("#loading");
    // ==== when start ====
    $("#games").hide(0);
    $("#gameDetails").show(0);
    this.dataManager();
    // ==== events ====
    $("#closeDetails").on("click", () => {
      $("#gameDetails").hide(0);
      $("#games").show(0);
      this.clearData();
    });
  }
  // ==== functions ====
  clearData() {
    $("#detailsThumbnail").attr("src", "");
    $("#detailsTitle").text("");
    $("#detailsGenera").text("");
    $("#detailsPlatform").text("");
    $("#detailsDescription").text("");
    $("#detailsLink").attr("href", "");
  }
  async dataManager() {
    const detailsData = await this.fetchDetailsApi();
    const displayDetails = new DisplayData();
    displayDetails.displayDetailsInformation(detailsData);
  }

  async fetchDetailsApi() {
    this.$loading.show(0);
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "837131a8b5msh27a6665acf2fbd8p1d2bbfjsneb6bbc0c24d0",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`,
        options
      );
      const result = await response.json();
      this.$loading.hide(0);
      return result;
    } catch (error) {
      console.error("Error when fetch Details: ", error);
      this.$loading.html("<h2>an error occurred</h2>");
      return [];
    }
  }
}
