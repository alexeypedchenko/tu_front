export const state = () => ({
  data: [
    {
      id: '001',
      slag: 'place-name-1',
      name: 'Place name 1',
      type: 'Park',
      img: 'https://via.placeholder.com/1920x1080?text=img-place',
      markerImg: 'https://via.placeholder.com/120x80?text=img-place',
      shortdescription: 'shortdescription',
      description: 'description',
      tags: [
        'tag 1',
        'tag 3',
      ],
      town: 'Kiev',
      region: 'Kiev Region',
      marker: {
        icon: 'https://via.placeholder.com/30x30/000000/ffffff?text=icon',
      },
      coordinates: {
        lat: 46.64288927,
        lng: 31.07230514,
      },
    },
    {
      id: '002',
      slag: 'place-name-2',
      name: 'Place name 2',
      type: 'Park',
      img: 'https://via.placeholder.com/1920x1080?text=img-place',
      markerImg: 'https://via.placeholder.com/120x80?text=img-place',
      shortdescription: 'shortdescription',
      description: 'description',
      tags: [
        'tag 2',
        'tag 3',
      ],
      town: 'Odesa',
      region: 'Odesa Region',
      marker: {
        icon: 'https://via.placeholder.com/30x30/000000/ffffff?text=icon',
      },
      coordinates: {
        lat: 46.64288927,
        lng: 32.07230514,
      },
    },
    {
      id: '003',
      slag: 'place-name-3',
      name: 'Place name 3',
      type: 'Park',
      img: 'https://via.placeholder.com/1920x1080?text=img-place',
      markerImg: 'https://via.placeholder.com/120x80?text=img-place',
      shortdescription: 'shortdescription',
      description: 'description',
      tags: [
        'tag 2',
      ],
      town: 'Lviv',
      region: 'Lviv Region',
      marker: {
        icon: 'https://via.placeholder.com/30x30/000000/ffffff?text=icon',
      },
      coordinates: {
        lat: 46.88288927,
        lng: 32.07230514,
      },
    },
  ]
})

export const getters = {
  filtredPlaces(state, getters, store) {
    const places = state.data
    const { filters } = store

    return places.filter((place) => {
      let condition = true

      for (let [name, value] of Object.entries(filters)) {
        if (!value) continue

        let prop = place[name]
        if (typeof prop === 'string') {
          prop = prop.toLowerCase()
        }
        value = value.toLowerCase().trim()
        if (value && !prop.includes(value)) {
          condition = false
          break
        }

        // 1. - если значение фильтра пустое переходим к следующему фильтру.
        // 2. - если значение фильтра не пустое и объект 'place' по ключу фильтра не имеет вхождений
        // значит условие не соответствует => исключаем объект из фильтра.
        // 3. - примечание!
        // Объект 'place' обязательно должен иметь такие же ключи как и в фильтре.
      }

      return condition
    })
  }
}