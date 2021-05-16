import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'
import {
  MAP_STYLES_DARK,
  MAP_STYLES_WHITE,
} from './GoogleMapStyles'

export class GoogleMap {
  constructor(selector, pin) {
    this.loader = new Loader({
      apiKey: 'AIzaSyBOMQAKjVaaYfe_fSHNn3CBFcbNS651GnA',
      version: 'weekly',
    })

    // map
    this.map = null
    this.mapContainer = document.querySelector(selector)

    this.mapOptions = {
      // styles: MAP_STYLES_WHITE,
      zoom: 6,
      center: {
        lat: 49.30881846,
        lng: 30.53801849,
      },
      clickableIcons: false, // клик на объекты карты и видеть информацию о них
      // disableDefaultUI: true, // выключить все элементы элементы управления картой
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      scrollwheel: true, // возможность масштабировать карту мышкой или тачпадом
    }

    // markers
    this.markers = []
    this.circle = null

    // cluster
    this.markerCluster = null
    this.bounds = null

    this.pin = pin
  }

  setMarkers(markers = []) {
    // очищаем маркеры
    this.clearMarkers()

    // переменная для определения границ маркеров
    this.bounds = new google.maps.LatLngBounds()

    markers.forEach((item) => {
      // создаем маркер
      const marker = this.createMarker(item)
      // добавляем маркер в массив
      this.markers.push(marker)
      // добавляем новую позицию маркера для центрирования карты
      this.bounds.extend(item.coordinates)
      // создаем модальное окно маркера
      this.createInfoWindow(marker, item)

      // Добавляем события наведении мишки
      this.markerOnMouseover(marker, item)
      this.markerOnMouseout(marker, item)
    })

    // группируем маркеры
    this.markerCluster = new MarkerClusterer(this.map, this.markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })

    this.centeredMap()
  }

  createMarker(data, onMap = false) {
    const options = {
      position: data.coordinates,
      zIndex: 10,
      // https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
      icon: {
        url: data.marker.icon || this.pin,
        size: new google.maps.Size(30, 30),
        // если изображение меньше или больше 30px, масштабируем до 30
        scaledSize: new google.maps.Size(30, 30),
      },
      // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
      // label: {
      //   text: data.name,
      //   color: 'black',
      //   fontFamily: 'Arial',
      //   fontSize: '16',
      //   fontWeight: '700',
      //   className: 'custom-label-class',
      // },
    }
    if (onMap) {
      options.map = this.map
    }
    return new google.maps.Marker(options)
  }

  handleCreateMarker(data) {
    const marker = this.createMarker(data, true)
    this.markers.push(marker)
    this.showCircle(marker)
  }

  removeMarker(index) {
    this.markers[index].setMap(null)
  }

  removeLastMarker() {
    this.markers[this.markers.length - 1].setMap(null)
    this.hideCircle()
  }

  centeredMap() {
    // центрируем карту относительно всех маркеров
    if (this.markers.length > 1) {
      this.map.fitBounds(this.bounds)
      this.rebotMapZoom()
    // Центрируем карту относительно одного маркера
    } else if (this.markers.length === 1) {
      this.map.setCenter(this.markers[0].getPosition())
      this.map.setZoom(10)
    // если маркеров нет, сбрасываем центр в исходную позицию
    } else {
      this.map.setCenter(this.mapOptions.center)
      this.map.setZoom(this.mapOptions.zoom)
    }
  }

  rebotMapZoom() {
    // после обновление маркеров с 0 до n, они группируються в одном класстере
    // сбрасываем зюм для предотарвщения группировки
    const mapZoom = this.map.getZoom()
    this.map.setZoom(mapZoom - 1)
    setTimeout(() => {
      this.map.setZoom(mapZoom)
    }, 0)
  }

  createInfoWindow(marker, markerData) {
    // добавляем модальное окно
    const modalTemplate = this.getInfoWindowTemplate(markerData) // шаблон модального окна карты в строковом формате
    const infoWindow = new google.maps.InfoWindow({
      content: modalTemplate
    })

    this.openInfoWindowOnMarkerClick(marker, infoWindow)
  
    // при клике на карту закрываем все модальные окна
    this.map.addListener('click', () => {
      infoWindow.close(this.map, marker)
    })
  }

  openInfoWindowOnMarkerClick(marker, infoWindow) {
    // при клике на маркер связываем модальное окно и маркер, далее открываем модалку
    marker.addListener('click', () => {
      if(infoWindow.getMap()) {
        infoWindow.close(this.map, marker)
      } else {
        // имитация клика по карте для закрытия всех infoWindow
        google.maps.event.trigger(this.map, 'click')

        // открываем нужный infoWindow
        infoWindow.open(this.map, marker)

        // Центрируем карту относительно нужного маркера
        this.map.setCenter(marker.getPosition())

        // приближаем карту
        this.map.setZoom(10)
      }
    })
  }

  markerOnMouseover(marker, item) {
    marker.addListener('mouseover', () => {
      this.showCircle(marker)
    })
  }
  markerOnMouseout(marker) {
    marker.addListener('mouseout', () => {
      this.hideCircle()
    })
  }

  clearMarkers() {
    this.clearCluster()

    this.markers.forEach((marker, index) => {
      this.removeMarker(index)
    })

    this.markers = []
  }

  clearCluster() {
    if (this.markerCluster !== null) {
      this.bounds = null
      this.markerCluster.clearMarkers()
    }
  }

  handleClickMarker(index) {
    // имитируем клик по маркеру
    google.maps.event.trigger(this.markers[index], 'click')
  }

  handleMarkerMouseover(index) {
    // Реализовать подсветку маркера
    google.maps.event.trigger(this.markers[index], 'mouseover')
  }

  // handleMarkerMouseout(index) {
  //   google.maps.event.trigger(this.markers[index], 'mouseout')
  // }

  getInfoWindowTemplate(data) {
    return `
      <div class="map-window">
        <a>
          <!-- href="{item.link}" -->
          <div class="map-window-img">
            <img src="${data.markerImg}" alt="${data.name}">
          </div>
          <div class="map-window-content">
            <div class="map-window-text">
              <h2 class="map-window-title h5">
                ${data.name}
              </h2>
              <p class="map-window-description p2">
                <span>
                  ${data.shortdescription}
                <span/>
              </p>
            </div>
          </div>
        </a>
      </div>
    `
  }

  createCircle() {
    return new google.maps.Marker({
      zIndex: 1,
      visible: false,
      position: {
        lat: 46.64288927,
        lng: 31.07230514,
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'green',
        fillOpacity: 0.15,
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        scale: 20,
        anchor: new google.maps.Point(0, 0.8),
        zIndex: 1
      },
      map: this.map
    })
  }

  showCircle(marker) {
    const position = marker.getPosition()
    this.circle.setPosition(position)
    this.circle.setVisible(true)
  }

  hideCircle() {
    this.circle.setVisible(false)
  }

  init() {
    return new Promise((resolve, reject) => {
      this.loader
        .load()
        .then(() => {
          this.map = new google.maps.Map(this.mapContainer, this.mapOptions)
          this.circle = this.createCircle()
          return resolve()
        })
        .catch((error) => {
          console.log('GoogleMap init error:', error)
          return reject()
        })
    })
  }
}
