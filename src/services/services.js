import { getDatabase, onValue, ref } from 'firebase/database';

const getCentres = async () => {
  try {
    const db = getDatabase();
    const reference = await ref(db, `jobData`);
    return onValue(reference, (snapshot) => {
      return snapshot;
    });
  } catch (error) {
    console.log(error.message);
  }
};
export { getCentres };
