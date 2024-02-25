async function main() {
    const userObj = new User();
    // console.log(await userObj.getAll());
}

class User {
    billRef = db.collection("bill");

    async add(itemName, quantity, price) {
        const user = { itemName, quantity, price };

        try {
            const docRef = await this.billRef.add(user);
            console.log('User Added with ID: ', docRef.id);

        } catch (error) {
            console.error('Error Adding User: ', error)
        }

        return user;

    }
}