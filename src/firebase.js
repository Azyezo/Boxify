import { initializeApp } from "firebase/app";
import { setAlert } from './store'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,
  query,
  getDocs,
  updateDoc,
  collection,
  collectionGroup,
  orderBy,
  deleteDoc,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'

//data base entry 


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxR5LQAuW03dmlvBfO8LWxEC-a-ISVpYQ",
  authDomain: "gpm10-2283a.firebaseapp.com",
  databaseURL: "https://gpm10-2283a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gpm10-2283a",
  storageBucket: "gpm10-2283a.appspot.com",
  messagingSenderId: "652253456370",
  appId: "1:652253456370:web:151c4618e05d8a73f9ad6b",
  measurementId: "G-JRD4MYCGNL"
};



const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const logInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password).then(
      (res) => res.user
    )
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const registerWithEmailAndPassword = async (
  email,
  password,
  fullname,
  phone,
  account,
  address
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    const userDocRef = doc(db, 'users', user.email)

    await setDoc(userDocRef, {
      uid: user.uid,
      fullname,
      email,
      phone,
      account,
      address,
    })

    return user //can be used ****
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const logout = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const addToOrders = async (cart) => {
  try {
    for (const item of cart) {
      item.timestamp = new Date()
    }
    const order = {
      order: Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: serverTimestamp(),
      cart,
      uid: auth.currentUser.uid,
      total: cart.reduce((accumlator, item) => accumlator + item.price * item.qty, 0),
    }

    await addDoc(
      collection(db, `users/${auth.currentUser.email}`, 'orders'),
      order
    )
    return order
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const addProduct = async (product) => {
  try {
    await addDoc(
      collection(db, `users/${auth.currentUser.email}`, 'products'),
      {
        name: product.name,
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        price: product.price,
        description: product.description,
        account: product.account,
        imgURL: product.imgURL,
        stock: ((Math.random() * 10) | 0) + 1,
        months: product.months,
        timestamp: serverTimestamp(),
      }
    )
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const getProducts = async () => {
  try {
    const products = query(
      collectionGroup(db, 'products'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(products)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      price: Number(doc.data().price),
    }))
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const getProduct = async (id) => {
  try {
    const products = query(
      collectionGroup(db, 'products'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(products)

    const product = snapshot.docs.find((doc) => doc.id == id)
    return {
      id: product.id,
      ...product.data(),
      price: Number(product.data().price),
    }
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const getOrders = async () => {
  try {
    const orders = query(
      collectionGroup(db, 'orders'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(orders)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      uid: doc.data().uid,
    }))
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const getOrder = async (id) => {
  try {
    const orders = query(
      collectionGroup(db, 'orders'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(orders)

    const order = snapshot.docs.find((doc) => doc.id == id)
    return {
      id: order.id,
      ...order.data(),
      uid: order.data().uid,
    }
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const updateProduct = async (product) => {
  const productRef = doc(db, `users/${product.email}/products`, product.id)
  try {
    await updateDoc(productRef, product)
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const deleteProduct = async (product) => {
  const productRef = doc(db, `users/${product.email}/products`, product.id)
  try {
    await deleteDoc(productRef)
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  onAuthStateChanged,
  addProduct,
  addToOrders,
  getProducts,
  getProduct,
  getOrders,
  getOrder,
  updateProduct,
  deleteProduct,
}
