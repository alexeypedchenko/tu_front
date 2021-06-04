import firebase from '~/firebase/firebaseApp'

const auth = firebase.auth()

// checked [x]
export const authStateChanged = () => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((changedUser) => {
      if (!!changedUser) {
        resolve(changedUser)
      } else {
        resolve(null)
      }
    })
  })
}

export const createUser = async (email, password) => {
  await auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('New User is created')
      const user = userCredential.user
    })
    .catch((error) => {
      console.log('Create User error')
    })
}

// checked [x]
export const userSignIn = (email, password) => {
  return new Promise ((res, rej) => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        res(userCredential.user)
      })
      .catch((error) => {
        rej(error)
      })
  })
}

// checked [x]
export const userUpdate = async (user) => {
  await auth.currentUser
    .updateProfile(user)
    .then(() => {
      console.log('User Update successful')
    })
    .catch(function(error) {
      console.log('User Update error')
    })
}

// checked [ ]
export const userUpdateEmail = async (email) => {
  await auth.currentUser
    .updateEmail(email)
    .then(() => {
      console.log('User Update email successful')
    }).catch((error) => {
      console.log('User Update email error')
    })
}

// checked [x]
export const userSendEmailVerification = async () => {
  await auth.currentUser
    .sendEmailVerification()
    .then(() => {
      console.log('Email Verification sent')
    }).catch((error) => {
      console.log('Email Verification error')
    })
}

// checked [ ]
export const userUpdatePassword = async (newPassword) => {
  await auth.currentUser
    .updatePassword(newPassword)
    .then(() => {
      console.log('Password update successful')
    })
    .catch(function(error) {
      console.log('Password update error')
    })
}

// checked [ ]
export const userPasswordResetEmail = async (email) => {
  await auth.currentUser
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log('Password Reset Email sent')
    }).catch((error) => {
      console.log('Password Reset Email error')
    })
}
