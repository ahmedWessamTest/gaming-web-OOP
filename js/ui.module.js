export class DisplayData {
  constructor() {
    this.$loading = $("#loading");
  }

  displayGamesItems(data) {
    if (!Array.isArray(data)) {
      console.error("invalid data: data not come as array");
      this.$loading.show(0);
      this.$loading.html("<h2>an error occurred</h2>");
      return;
    }
    let container = ``;
    data.forEach((item) => {
      container += `
        <div class="col-md-4 col-lg-3">
              <div data-game-id="${item.id}" class="game-card h-100 card bg-transparent py-3 text-white">
              <span class="d-block game-thumbnail px-3">
                <img
                  src="${item.thumbnail}"
                  class="w-100 d-block"
                  alt="game thumbnail"
                />
              </span>
                <div class="card-body">
                <div class="game-header px-3">
                  <h3 class="game-title text-capitalize">${item.title}</h3>
                  <span class="badge text-capitalize">free</span>
                </div>
                <p class="cart-text game-short-description px-3">
                  ${item.short_description}
                </p>
                </div>
                <div class="game-footer px-3 pt-3">
                  <span class="badge footer-badge">${item.genre}</span>
                  <span class="badge footer-badge">${item.platform}</span>
                </div>
              </div>
            </div>
        `;
    });
    $("#gamesContainer").html(container);
  }
  displayDetailsInformation(data) {
    if (!data || typeof data !== "object") {
      console.error("Invalid data: data not come as object");
      this.$loading.show(0);
      this.$loading.html("<h2>an error occurred</h2>");
      return;
    }
    $("#detailsThumbnail").attr("src", data.thumbnail);
    $("#detailsTitle").text(data.title);
    $("#detailsGenera").text(data.genre);
    $("#detailsPlatform").text(data.platform);
    $("#detailsDescription").text(data.description);
    $("#detailsLink").attr("href", data.game_url);
  }
}
