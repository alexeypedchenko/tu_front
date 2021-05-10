import { place } from '~/utils/dbscheme'

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
      town: 'Town',
      region: 'Region',
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
      town: 'Town',
      region: 'Region',
      coordinates: {
        lat: 46.64288927,
        lng: 32.07230514,
      },
    },
  ]
})