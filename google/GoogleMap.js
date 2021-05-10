import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'
import { MAP_STYLES } from './GoogleMapStyles'
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
      // styles: MAP_STYLES,
      zoom: 10,
      center: {
        lat: -33,
        lng: 151
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

    this.items = items

    this.bounds = null
  }

  setMarkers() {
    // переменная для определения границ маркеров
    this.bounds = new google.maps.LatLngBounds()

    this.items.forEach((item) => {
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
    const markerCluster = new MarkerClusterer(this.map, this.markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })

    // после класстеризации всех маркеров, центрируем карту относительно позиции всех маркеров
    this.centeredMap()
  }

  centeredMap() {
    // центрируем карту относительно всех маркеров
    this.map.fitBounds(this.bounds)
  }

  createInfoWindow(marker, markerData) {
    // добавляем модальное окно
    const modalTemplate = getMapWindowTemplate(markerData) // шаблон модального окна карты в строковом формате
    const infowindow = new google.maps.InfoWindow({
      content: modalTemplate
    })

    // при клике на маркер связываем модальное окно и маркер, далее открываем модалку
    marker.addListener('click', () => {
      if(infowindow.getMap()) {
        infowindow.close(this.map, marker)
      } else {
        // имитация клика по карте для закрытия всех infoWindow
        google.maps.event.trigger(this.map, 'click')

        // открываем нужный infowindow
        infowindow.open(this.map, marker)

        // Центрируем карту относительно нужного маркера
        this.map.setCenter(marker.getPosition())

        // приближаем карту
        this.map.setZoom(10)
      }
    })

    // при клике на карту закрываем все модальные окна
    this.map.addListener('click', () => {
      infowindow.close(this.map, marker)
    })
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
