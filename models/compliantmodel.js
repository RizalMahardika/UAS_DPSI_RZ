const { db } = require('../config');

class Complaint {
  constructor(id, userId, description, evidence, status, createdAt) {
    this.id = id;
    this.userId = userId;
    this.description = description;
    this.evidence = evidence;
    this.status = status;
    this.createdAt = createdAt;
  }

  static async findByUserId(userId) {
    const complaintsRef = db.collection('complaints');
    const snapshot = await complaintsRef.where('userId', '==', userId).get();
    if (snapshot.empty) return [];

    const complaints = [];
    snapshot.forEach(doc => {
      complaints.push({ id: doc.id, ...doc.data() });
    });
    return complaints;
  }

  static async findById(id) {
    const complaintRef = db.collection('complaints').doc(id);
    const doc = await complaintRef.get();
    if (!doc.exists) return null;

    return { id: doc.id, ...doc.data() };
  }

  async save() {
    const complaintsRef = db.collection('complaints');
    const complaintDoc = await complaintsRef.add({
      userId: this.userId,
      description: this.description,
      evidence: this.evidence,
      status: this.status,
      createdAt: this.createdAt
    });
    this.id = complaintDoc.id;
    return this;
  }
}

module.exports = Complaint;
