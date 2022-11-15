export function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id){
        let storedItem = this.items[id]
        if(!storedItem){
            storedItem = this.items[id] = {item: item, amount: 0, price: 0}
        }
        storedItem.amount++;
        storedItem.price = storedItem.item.price * storedItem.amount;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.generateArray = function(){
        let arr =[]
        for(let id in this.items){
            arr.push(this.items[id])
        }
        return arr
    }

}