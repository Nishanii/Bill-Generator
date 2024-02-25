// db.collection('events').onSnapshot(snapshot => {
//     // Handle the latest event
//     const newestEvent = snapshot.docChanges()[0].doc.data()
//     const id = snapshot.docChanges()[0].doc.id
//     showLatestEvent(newestEvent, id);

//     // delete the latest event element
//     snapshot.docChanges().shift()

//     snapshot.docChanges().forEach(event => {
//         showEvents(event.doc.data(), event.doc.id)
//     });
// })

// const addNewEvent = () => {
//     const event = {
//         name: form.name.value,
//         attendee: form.attendee.value,
//         booked: 0,
//         description: form.description.value,
//         status: parseInt(form.status.value, 10)
//     }
//     db.collection('events').add(event)
//         .then(() => {
//             // Reset the form values
//             form.name.value = "",
//                 form.attendee.value = "",
//                 form.description.value = "",
//                 form.status.value = ""

//             alert('Your event has been successfully saved')
//         })
//         .catch(err => console.log(err))
// }
async function generateBill() {
    var itemName = document.getElementById("itemName").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;

    if (!itemName || !quantity || !price) {
        alert("Please fill in all fields.");
        return;
    }


    var table = document.getElementById("billItemsTable");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = itemName;
    cell2.innerHTML = quantity;
    cell3.innerHTML = "₹" + price;

    calculateTotalPrice();

    try {
        // await setDoc(doc(db, "bills"), {
        //     itemName: itemName,
        //     quantity: quantity,
        //     price: price
        // });
        let data = {
            itemName: itemName,
            quantity: quantity,
            price: price
        }
        db.collection("bills").add(data);



        // Update UI or perform other actions after successful data write
        console.log("Data written to Firestore successfully.");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

function updateShopInfo() {
    var shopName = document.getElementById("shopName").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;

    var shopInfoDiv = document.getElementById("shopInfo");
    shopInfoDiv.innerHTML = "<p><strong>Shop Name:</strong> " + shopName + "</p>" +
        "<p><strong>Address:</strong> " + address + "</p>" +
        "<p><strong>Phone Number:</strong> " + phone + "</p>";
}

function calculateTotalPrice() {
    var table = document.getElementById("billItemsTable");
    var totalPrice = 0;
    for (var i = 1; i < table.rows.length; i++) {
        totalPrice += parseFloat(table.rows[i].cells[2].innerHTML.slice(1));
    }
    document.getElementById("totalPrice").textContent = "Total Price: ₹" + totalPrice.toFixed(2);
}

function printBill() {
    window.print();
}

window.onload = function () {
    updateShopInfo();
}