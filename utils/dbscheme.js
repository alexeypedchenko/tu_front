export const place = {
  _id: 001,
  type: 'place',
  slag: 'place-name',
  name: 'Place name',
  type: 'Park',
  img: 'https://via.placeholder.com/1920x1080?text=img-place',
  shortdescription: 'Place shortdescription',
  description: 'Place description',
  tags: [
    'tag 1',
    'tag 2',
    'tag 3',
  ],
  town: 'Town',
  region: 'Region',

  // связка с маркером
  markerId: 0,

  // соседние места || что посмотреть рядом?
  markers: [
    {
      markerId: 1,
    },
    {
      markerId: 2,
    },
  ]
}

export const marker = {
  _id: 0,
  type: 'marker',
  isMap: true || false,
  img: 'https://via.placeholder.com/120x80?text=marker-img',
  icon: 'https://via.placeholder.com/120x80?text=img-place',
  coordinates: {
    lat: 46.64288927,
    lng: 31.07230514,
  },
}

export const route = {
  _id: 0,
  type: 'Route',
  name: 'Route 0',
  shortdescription: 'Route shortdescription',
  description: 'Route description',
  waypoints: [
    {
      markerId: 0,
    },
    {
      markerId: 1,
    },
    {
      markerId: 2,
    },
  ],
}
