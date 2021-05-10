import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'
import { MAP_STYLES } from './GoogleMapStyles'
import { getMapWindowTemplate } from './halpers'

export class GoogleMap {
  constructor(selector) {
    this.loader = new Loader({
      apiKey: 'AIzaSyBOMQAKjVaaYfe_fSHNn3CBFcbNS651GnA',
      version: 'weekly',
    })

    // map
    this.map = null
    this.mapContainer = document.querySelector(selector)

    this.mapOptions = {
      styles: MAP_STYLES,
      zoom: 4,
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

    this.locations = [
      {
        latlng: {
          lat: -31.56391,
          lng: 147.154312
        }
      },
      {
        latlng: {
          lat: -33.718234,
          lng: 150.363181
        }
      },
      {
        latlng: {
          lat: -33.727111,
          lng: 150.371124
        }
      },
      {
        latlng: {
          lat: -33.848588,
          lng: 151.209834
        }
      },
      {
        latlng: {
          lat: -33.851702,
          lng: 151.216968
        }
      },
      {
        latlng: {
          lat: -34.671264,
          lng: 150.863657
        }
      },
      {
        latlng: {
          lat: -35.304724,
          lng: 148.662905
        }
      },
      {
        latlng: {
          lat: -36.817685,
          lng: 175.699196
        }
      },
      {
        latlng: {
          lat: -36.828611,
          lng: 175.790222
        }
      },
      {
        latlng: {
          lat: -37.75,
          lng: 145.116667
        }
      },
      {
        latlng: {
          lat: -37.759859,
          lng: 145.128708
        }
      },
      {
        latlng: {
          lat: -37.765015,
          lng: 145.133858
        }
      },
      {
        latlng: {
          lat: -37.770104,
          lng: 145.143299
        }
      },
      {
        latlng: {
          lat: -37.7737,
          lng: 145.145187
        }
      },
      {
        latlng: {
          lat: -37.774785,
          lng: 145.137978
        }
      },
      {
        latlng: {
          lat: -37.819616,
          lng: 144.968119
        }
      },
      {
        latlng: {
          lat: -38.330766,
          lng: 144.695692
        }
      },
      {
        latlng: {
          lat: -39.927193,
          lng: 175.053218
        }
      },
      {
        latlng: {
          lat: -41.330162,
          lng: 174.865694
        }
      },
      {
        latlng: {
          lat: -42.734358,
          lng: 147.439506
        }
      },
      {
        latlng: {
          lat: -42.734358,
          lng: 147.501315
        }
      },
      {
        latlng: {
          lat: -42.735258,
          lng: 147.438
        }
      },
      {
        latlng: {
          lat: -43.999792,
          lng: 170.463352
        }
      },
    ]

    this.clusterStyles = [
      // sm cluster
      {
        textColor: 'white',
        // url: IMG_URL,
        // height: MARKER_SIZE,
        // width: MARKER_SIZE
      },
      // md cluster
      {
        textColor: 'white',
      },
      // lg cluster
      {
        textColor: 'white',
      }
    ];
  }

  setMarker() {
    this.marker = new google.maps.Marker({
      position: this.mapOptions.center,
      map: this.map,
      title: 'Hello World!',
    })
  }

  setMarkers() {
    // переменная для определения границ маркеров
    const bounds = new google.maps.LatLngBounds()

    this.locations.forEach((item) => {
      // создаем маркер
      const marker = new google.maps.Marker({
        position: item.latlng,
      })

      // добавляем маркер
      this.markers.push(marker)

      // добавляем новую позицию маркера для центрирования карты
      bounds.extend(item.latlng)

      this.createInfoWindow(marker, item)
    })

    // группируем маркеры
    const markerCluster = new MarkerClusterer(this.map, this.markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })

    // центрируем карту относительно всех маркеров
    this.map.fitBounds(bounds);
  }

  createInfoWindow(marker, markerData) {
    // добавляем модальное окно
    const modal = getMapWindowTemplate(markerData) // шаблон модального окна карты в строковом формате
    const infowindow = new google.maps.InfoWindow({
      content: modal
    })

    // при клике на маркер связываем модальное окно и маркер, далее открываем модалку
    marker.addListener('click', () => {
      if(infowindow.getMap()) {
        infowindow.close(this.map, marker)
      } else {
        infowindow.open(this.map, marker)
      }
    })

    // при клике на карту закрываем все модальные окна
    this.map.addListener('click', () => {
      infowindow.close(this.map, marker)
    })
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
