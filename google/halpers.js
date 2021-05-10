export const getMapWindowTemplate = (item) => {
  return `
    <div class="map-window">
      <a>
        <!-- href="{item.link}" -->
        <div class="map-window-img">
          <img src="${item.markerImg}" alt="${item.name}">
        </div>
        <div class="map-window-content">
          <div class="map-window-text">
            <h2 class="map-window-title h5">
              ${item.name}
            </h2>
            <p class="map-window-description p2">
              <span>
                ${item.shortdescription}
              <span/>
            </p>
          </div>
        </div>
      </a>
    </div>
  `
}
