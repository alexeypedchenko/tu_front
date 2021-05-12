import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'
import {
  MAP_STYLES_DARK,
  MAP_STYLES_WHITE,
} from './GoogleMapStyles'
import { getMapWindowTemplate } from './halpers'

export class GoogleMap {
  constructor(selector, items = []) {
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

    // marker
    this.marker = null
    this.markers = []
    this.markerCluster = null

    this.items = items

    this.bounds = null
  }

  setMarkers(markers = []) {
    // очищаем маркеры
    this.clearMarkers()

    // переменная для определения границ маркеров
    this.bounds = new google.maps.LatLngBounds()

    markers.forEach((item) => {
      // создаем маркер
      const marker = new google.maps.Marker({
        position: item.coordinates,
      })

      // добавляем маркер
      this.markers.push(marker)

      // добавляем новую позицию маркера для центрирования карты
      this.bounds.extend(item.coordinates)

      // создаем модальное окно маркера
      this.createInfoWindow(marker, item)
    })

    // группируем маркеры
    this.markerCluster = new MarkerClusterer(this.map, this.markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })

    // после класстеризации всех маркеров, центрируем карту относительно позиции всех маркеров
    if (this.markers.length > 1) {
      this.centeredMap()
    } else if (this.markers.length === 1) {
      // Центрируем карту относительно единственного маркера
      this.map.setCenter(this.markers[0].getPosition())
      this.map.setZoom(10)
    } else {
      // сбрасываем центр в исходную позицию
      this.map.setCenter(this.mapOptions.center)
      this.map.setZoom(this.mapOptions.zoom)
    }
  }

  centeredMap() {
    // центрируем карту относительно всех маркеров
    this.map.fitBounds(this.bounds)

    // после обновление маркеров с 0 до n они группируються в одном класстере
    // сбрасываем зюм для предотарвщения группировки
    const mapZoom = this.map.getZoom()
    this.map.setZoom(mapZoom - 1)
    setTimeout(() => {
      this.map.setZoom(mapZoom)
    }, 0)
  }

  createInfoWindow(marker, markerData) {
    // добавляем модальное окно
    const modalTemplate = getMapWindowTemplate(markerData) // шаблон модального окна карты в строковом формате
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

  clearMarkers() {
    if (this.markerCluster !== null) {
      this.bounds = null
      this.markerCluster.clearMarkers()
    }
    this.markers.forEach((marker, index) => {
      this.markers[index].setMap(null)
    })
    this.markers = []
  }

  handleClickMarker(index) {
    // имитируем клик по маркеру
    google.maps.event.trigger(this.markers[index], 'click')
  }

  init() {
    return new Promise((resolve, reject) => {
      this.loader
        .load()
        .then(() => {
          this.map = new google.maps.Map(this.mapContainer, this.mapOptions)
          return resolve()
        })
        .catch((error) => {
          console.log('GoogleMap init error:', error)
          return reject()
        })
    })
  }
}
