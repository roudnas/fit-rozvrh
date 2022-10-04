import {collection, getDocs, query, where} from "firebase/firestore/lite";

export const getPeople = async (db) => {
    console.log("he")
    const peopleCollection = collection(db, 'users');
    const peopleDocs = await getDocs(peopleCollection);
    const people = [];

    await Promise.all(peopleDocs.docs.map(async per => {
        const pid = per.id;
        const person = per.data();
        const pData = [[], [], [], [], []];

        const q = query(
            collection(db, 'classes'),
            where(
                'user',
                '==',
                pid
            )
        );
        const qs = await getDocs(q);

        qs.forEach((q) => {
            q = q.data();
            pData[q.day][q.order] = q;
        })

        people.push({
            "id": pid,
            "name": person.name,
            "data": pData
        });
    }))

    return people;
}