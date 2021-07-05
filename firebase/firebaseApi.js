import firebase from '~/firebase/firebaseApp'

const db = firebase.firestore()

export const getCollection = async (collection) => {
  return new Promise((res, rej) => {
    db.collection(collection)
      // .orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) res([]) // возвращаем пустой массив
        const items = []
        querySnapshot.forEach((doc) => {
          if (!doc.exists) return []
          const item = doc.data()
          if (item.hasOwnProperty('public') && !item.public) {return}
          item._id = doc.id
          items.push(item)
          res(items)
        })
      })
      .catch((err) => rej(err))
  })
}

export const createDoc = async (collection, item) => {
  return new Promise((res, rej) => {
    db.collection(collection).add(item)
      .then((docRef) => res(docRef.id))
      .catch((err) => rej(err))
  })
}

export const getDoc = async (collection, id) => {
  const item = await db.collection(collection).doc(id).get()
  return item.exists ? item.data() : null
}

export const updateDoc = async (collection, id, item) => {
  return new Promise((res, rej) => {
    db.collection(collection)
      .doc(id)
      .update(item)
      .then(() => res())
      .catch((err) => rej(err))
  })
}

export const deleteDoc = async (collection, id) => {
  return new Promise((res, rej) => {
    db.collection(collection).doc(id).delete()
      .then(() => res())
      .catch((err) => rej(err))
  })
}
