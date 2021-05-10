export const getMapWindowTemplate = (item) => {
  return `
    <div class="map-window">
      <a>
        <!-- href="{item.link}" -->
        <div class="map-window-img">
          <img src="{item.img}" alt="{item.title}">
        </div>
        <div class="map-window-content">
          <div class="map-window-text">
            <h2 class="map-window-title h5">
              {item.title}
            </h2>
            <p class="map-window-description p2">
              <span>
                {item.address}
              <span/>
            </p>
          </div>
          <img src="{item.marker}">
        </div>
      </a>
    </div>
  `
}
