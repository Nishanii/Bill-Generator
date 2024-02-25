import 'package:flutter/material.dart';

void main() => runApp(BillGeneratorApp());

class BillGeneratorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bill Generator',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BillGeneratorHomePage(),
    );
  }
}

class BillGeneratorHomePage extends StatefulWidget {
  @override
  _BillGeneratorHomePageState createState() => _BillGeneratorHomePageState();
}

class _BillGeneratorHomePageState extends State<BillGeneratorHomePage> {
  TextEditingController itemController = TextEditingController();
  TextEditingController quantityController = TextEditingController();
  TextEditingController priceController = TextEditingController();

  List<Map<String, dynamic>> itemsList = [];

  void addItemToList() {
    String item = itemController.text;
    int quantity = int.tryParse(quantityController.text) ?? 0;
    double price = double.tryParse(priceController.text) ?? 0.0;

    if (item.isNotEmpty && quantity > 0 && price > 0.0) {
      setState(() {
        itemsList.add({
          'item': item,
          'quantity': quantity,
          'price': price,
        });
        itemController.clear();
        quantityController.clear();
        priceController.clear();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Bill Generator'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: itemController,
              decoration: InputDecoration(labelText: 'Item'),
            ),
            TextField(
              controller: quantityController,
              decoration: InputDecoration(labelText: 'Quantity'),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: priceController,
              decoration: InputDecoration(labelText: 'Price'),
              keyboardType: TextInputType.numberWithOptions(decimal: true),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: addItemToList,
              child: Text('Add Item'),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: itemsList.length,
                itemBuilder: (context, index) {
                  final item = itemsList[index];
                  return ListTile(
                    title: Text(item['item']),
                    subtitle: Text(
                        'Quantity: ${item['quantity']}, Price: \$${item['price']}'),
                  );
                },
              ),
            ),
            ElevatedButton(
              onPressed: () {
                // Code to generate bill
                // You can calculate the total and display it here
              },
              child: Text('Generate Bill'),
            ),
          ],
        ),
      ),
    );
  }
}

