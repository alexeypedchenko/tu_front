export const infoWindowTemplate = (data) => {
  return `
    <div class="map-window">
      <div class="map-window-img">
        <img src="${data.image}" alt="${data.name}">
      </div>
      <div class="map-window-content">
        <h2 class="map-window-title">
          ${data.name}
        </h2>
        <p class="map-window-description">
          <span>
            ${data.description}
          <span/>
        </p>
        <a href="${data.link}">
          Подробнее
        </a>
      </div>
    </div>
  `
}
