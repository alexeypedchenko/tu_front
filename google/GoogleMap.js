import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'

import {
  MAP_STYLES_DARK,
  MAP_STYLES_WHITE,
} from './GoogleMapStyles'

import {
  infoWindowTemplate
} from './utils'

export class GoogleMap {
  constructor(selector, pin) {
    this.loader = new Loader({
      apiKey: 'AIzaSyBOMQAKjVaaYfe_fSHNn3CBFcbNS651GnA',
      version: 'weekly',
    })

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
    this.markers = []
    this.pin = pin

    this.route = null
    this.circle = null
    this.cluster = null

    this.hoveredMarkerIndex = null
  }

  setMarkers(markers = []) {
    // очищаем маркеры
    this.clearMarkers()

    markers.forEach((item) => {
      // создаем маркер
      const marker = this.createMarker(item)
      // добавляем маркер в массив
      this.markers.push(marker)

      // добавляем новую позицию маркера для центрирования карты
      this.cluster.setPoint(item)

      // создаем модальное окно маркера
      this.createInfoWindow(marker, item)

      // Добавляем события наведении мишки
      this.markerOnMouseover(marker, item)
      this.markerOnMouseout(marker, item)
    })

    // группируем маркеры в класстере
    this.cluster.group(this.markers)
    this.centeredMap()
  }

  createMarker(marker, showOnMap = false) {
    const options = {
      position: {
        lat: +marker.coordinates.lat,
        lng: +marker.coordinates.lng,
      },
      zIndex: 10,
      // https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
      icon: {
        url: marker.icon || this.pin,
        size: new google.maps.Size(30, 30),
        // если изображение меньше или больше 30px, масштабируем до 30
        scaledSize: new google.maps.Size(30, 30),
      },
      // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
      // label: {
      //   text: marker.name,
      //   color: 'black',
      //   fontFamily: 'Arial',
      //   fontSize: '16',
      //   fontWeight: '700',
      //   className: 'custom-label-class',
      // },
    }

    if (showOnMap) {
      options.map = this.map
    }

    const newMarker = new google.maps.Marker(options)

    return newMarker
  }

  handleCreateMarker(data) {
    const showOnMap = true
    const marker = this.createMarker(data, showOnMap)
    this.markers.push(marker)
    this.circle.show(marker)
  }

  removeMarker(index) {
    this.markers[index].setMap(null)
  }

  removeLastMarker() {
    this.markers[this.markers.length - 1].setMap(null)
    this.circle.hide()
  }

  centeredMap() {
    // центрируем карту относительно всех маркеров
    if (this.markers.length > 1) {
      this.map.fitBounds(this.cluster.bounds)
      this.rebotMapZoom()
      return
    }

    // Центрируем карту относительно одного маркера
    if (this.markers.length === 1) {
      this.map.setCenter(this.markers[0].getPosition())
      this.map.setZoom(14)
      return
    }

    // если маркеров нет, сбрасываем центр в исходную позицию
    this.map.setCenter(this.mapOptions.center)
    this.map.setZoom(this.mapOptions.zoom)
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
    const modalTemplate = infoWindowTemplate(markerData) // шаблон модального окна карты в строковом формате
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
        this.centeredMap()
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
    const index = this.markers.findIndex((el) => el === marker)
    marker.addListener('mouseover', () => {
      this.hoveredMarkerIndex = index
      this.circle.show(marker)
    })
  }
  markerOnMouseout(marker) {
    marker.addListener('mouseout', () => {
      this.circle.hide()
      this.hoveredMarkerIndex = null
    })
  }

  clearMarkers() {
    this.cluster.clear()
    this.route.clear()

    this.markers.forEach((marker, index) => {
      this.removeMarker(index)
    })

    this.markers = []
  }

  handleClickMarker(index) {
    // имитируем клик по маркеру
    google.maps.event.trigger(this.markers[index], 'click')
  }

  handleMarkerMouseover(index) {
    // Реализовать подсветку маркера
    google.maps.event.trigger(this.markers[index], 'mouseover')
  }

  handleMarkerMouseout(index) {
    google.maps.event.trigger(this.markers[index], 'mouseout')
  }

  init() {
    return new Promise((resolve, reject) => {
      this.loader
        .load()
        .then(() => {
          this.map = new google.maps.Map(this.mapContainer, this.mapOptions)
          this.circle = new Circle(this.map)
          this.route = new Route(this.map)
          this.cluster = new Cluster(this.map)
          return resolve()
        })
        .catch((error) => {
          console.log('GoogleMap init error:', error)
          return reject()
        })
    })
  }
}

class Cluster {
  constructor(map) {
    this.markerCluster = null
    this.bounds = null
    this.map = map
  }

  group(markers) {
    // группируем маркеры
    this.markerCluster = new MarkerClusterer(this.map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })
  }

  // добавляем новую позицию маркера для центрирования карты
  setPoint(item) {
    this.init()
    this.bounds.extend({
      lat: +item.coordinates.lat,
      lng: +item.coordinates.lng,
    })
  }

  clear() {
    if (this.markerCluster !== null) {
      this.bounds = null
      this.markerCluster.clearMarkers()
    }
  }

  init() {
    // переменная для определения границ маркеров
    if (this.bounds === null) {
      this.bounds = new google.maps.LatLngBounds()
    }
  }
}

class Route {
  constructor(map) {
    this.directionsService = null
    this.directionsRenderer = null
    this.map = map
    this.init()
  }

  draw(waypts = []) {
    if (!waypts.length) {
      return
    }

    // для отрисовки маршрута, точек на карте должно быть больше 2 и более
    if (waypts.langth < 2) return

    // связать маршрут с картой
    this.directionsRenderer.setMap(this.map)

    waypts = waypts.map((waypt) => {
      return this.createWaypoint(waypt)
    })

    const request = {
      origin: waypts[0].location, // определяем стартовую точку
      destination: waypts[waypts.length - 1].location, // определяем конечную точку
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }

    // определяем промежуточные точки
    if (waypts.length > 2) {
      request.waypoints = waypts.splice(1, waypts.length - 2)
    }

    this.directionsService.route(request, (response, status) => {
      if (status === "OK" && response) {
        this.directionsRenderer.setDirections(response)
      } else {
        window.alert("Directions request failed due to " + status);
      }
    })
  }

  createWaypoint(marker) {
    const lat = marker.coordinates ? +marker.coordinates.lat : marker.getPosition().lat()
    const lng = marker.coordinates ? +marker.coordinates.lng : marker.getPosition().lng()
    // https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsWaypoint
    return {
      location: new google.maps.LatLng(lat, lng),
      stopover: false,
    }
  }

  clear() {
    this.directionsRenderer.setMap(null)
  }

  init() {
    this.directionsService = new google.maps.DirectionsService()
    // https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Подавить рендеринг маркеров.
      // https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions
      // polylineOptions: {
      //   strokeColor: 'blue',
      //   zIndex: 1,
      // }
    })
  }
}

class Circle {
  constructor(map) {
    this.options = {
      zIndex: 2,
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
        zIndex: 2
      },
      map: map
    }

    this.circle = new google.maps.Marker(this.options)
  }

  show(marker) {
    const position = marker.getPosition()
    this.circle.setPosition(position)
    this.circle.setVisible(true)
  }

  hide() {
    this.circle.setVisible(false)
  }
}
