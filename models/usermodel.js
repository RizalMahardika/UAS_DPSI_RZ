const { db } = require('../config');

class User {
  constructor(id, email, password, name, role) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
  }

  static async findByEmail(email) {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    if (snapshot.empty) return null;

    let user = null;
    snapshot.forEach(doc => {
      user = doc.data();
      user.id = doc.id;
    });
    return user;
  }

  static async findById(id) {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    if (!doc.exists) return null;

    return { id: doc.id, ...doc.data() };
  }

  async save() {
    const usersRef = db.collection('users');
    const userDoc = await usersRef.add({
      email: this.email,
      password: this.password,
      name: this.name,
      role: this.role
    });
    this.id = userDoc.id;
    return this;
  }
}

module.exports = User;
