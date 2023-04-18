# Cake Store
#
# 前台使用：

## getAllProductType()

method : post

return :
``` json
{
    "status" : 200,
    "message" : "ok",
    "data":
    [
        {
            "chinese": "本日精選",
            "status": 1,
            "type_id": 1
        },
        {...}
    ]
}
```
實作：直接 query db
#
## getProductsByTypeId( int typeId )

method : post

HttpBody :
```json
{
    typeId: 1
}
```

return :
``` json
{
    "status": 200,
    "message": "ok",
    "data":
    [
        {
            "product_id": 2,
            "type_id": 3,
            "name": "Mouse Cake",
            "price": 210,
            "inventories": 44,
            "img" : "data:image/png;base64,/9j/4A..."
        },
        {...}
    ]
}
```
實作：
檢查有無typeId，如果有的話用 typeId 來 query db，否則回傳 Exception

#
## login(string username, string password)
method : post

HttpBody :
```json
{
    username : "asd@gmail.com",
    password : "myPassword"
}
```
return :
```json
{
    "status": 200,
    "message": "ok",
    "data": "eyJhbGciOiJIUzUxMiJ9.eyJz..."
}
```
實作：jwt
#
## checkUserExist(string username)
method : post

HttpBody :
```json
{
    username : "asd@gmail.com",
}
```
return :
```json
{
    "status": 200,
    "message": "ok",
    "data" : true, // true if user exists, otherwise false
}
```

#
## register(string username, string password)
method : post

HttpBody :
```json
{
    username : "asd@gmail.com",
    password : "myPassword"
}
```
return :
```json
{
    "status": 200,
    "message": "成功" | "使用者重複" | "其他...",
    "data": true, // true if create success, otherwise false
}
```

實作：檢查資料庫有無此使用者 => 若不重複就新增至 db (密碼要加密)，重複的話就回傳錯誤
#
## getUserCart(string token)
method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz..."
}
```

return :
``` json
{
    "status": 200,
    "message": "ok",
    "data":
    [
        {
            "productId": 9,
            "orderQuantity": 1,
            "name": "Shiba Inu Cake",
            "price": 750,
            "inventories": 19,
            "img": "data:image/png;base64,/9j/4AA..."
        },
        {...}
    ]
}

```

實作：使用 jwt 來從 token 取得 id，並用此 id 來 query db

<id部分待實作>

#
### 新增購物車用
## addUserCart(string token, int productId, int orderQuantity)
method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    productId : 1,
    orderQuantity: 1,
}
```
return : Object
``` json
{
    "status": 200,
    "message": "成功" | "{token, productId, orderQuantity} 錯誤",
    // => e.g. token 錯誤、orderQuantity 錯誤
    "data": true, // true if success, otherwise false
}
```

實作：使用 jwt 來從 token 取得 id，

然後檢查使用者購物車中有無此項產品，

若沒有的話就新增此產品\<orderQuantity\> 項，

若有的話就更新成 \<原本數量+orderQuantity\> 項
#
### 更改購物車用
## updateUserCart(string token, int productId, int orderQuantity)
method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    productId : 1,
    orderQuantity : 1,
}
```

return : Object
``` json
{
    "status": 200,
    "message": "成功" | "{token, productId, orderQuantity} 錯誤",
    // => e.g. token 錯誤、orderQuantity 錯誤
    "data": true, // true if success, otherwise false
}
```

實作：使用 jwt 來從 token 取得 id，

然後檢查使用者購物車中有無此項產品，

若沒有的話就回傳錯誤

若有的話就更新成 \<orderQuantity\> 項
#
## batchUpdateUserCartQuantity()
method : post

HttpParams :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz..."
}
```

HttpBody :
```json
[
    {
        productId : 1,
        orderQuantity : 2,
    },
    {
        productId : 3,
        orderQuantity : 4,
    },
    {...}
]
```

return : Object
``` json
{
    "status": 200,
    "message": "成功" | "<產品1>, <產品2>, ... 錯誤",
    // => e.g. cake 數量太多、cookie 數量太少
    "data": true, // true if success, otherwise false
}
```

實作：使用 jwt 來從 token 取得 id，

檢查 0 < orderQuantity < db庫存

若 List 中其中一項產品發生錯誤，即不做後續更新動作
#
## deleteFromUserCart(string token, int productId)
method : delete

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    productId : 1,
}
```
return : Object
``` json
{
    "status": 200,
    "message": "成功" | "{token, productId}發生錯誤",
    // => e.g. token 錯誤、productId 不存在
    "data": true, // true if success, otherwise false
}
```

#
## deleteAllFromUserCart(string token)
method : delete

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz..."
}
```
return : Object
``` json
{
    "status": 200,
    "message": "成功" | "網路錯誤",
    // => e.g. token 錯誤、productId 不存在
    "data": true, // true if success, otherwise false
}
```

#
## checkoutUserCart(string token)

method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    credit : "0123456701234567",
    address : "123台北市...",
    ... // 待確認
}
```
return : Object
``` json
{
    "status": 200,
    "message": "成功" | "購物車為空",
    "data": true, // true if success, otherwise false
}
```

實作：

1. 將購物車中產品新增至 db 中 `userOrderItem`
2. 將使用者購買資料新增至 db 中 `userOrderInfo`
3. 刪除購物車中所有產品 => deleteAllFromUserCart()
4. 減少對應產品的 inventories

# 自訂 table：

# `userOrderItem`：

order_id, user_id, product_id, order_quantity

# `userOrderInfo`：

order_id, user_id, credit, address, ...

#
# 後台使用：
## loginAdmin(string username, string password)
method : post

HttpBody :
```json
{
    username : "asd@gmail.com",
    password : "myPassword"
}
```
return :
```json
{
    "status": 200,
    "message": "成功" | "權限不足" | "無此使用者",
    "data": {
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJz..."
    }
}
```
實作：jwt，並檢查此使用者是否為admin
#
## uploadProduct
method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    img : "data:image...",
    name : "好吃的蛋糕",
    inventories : 1,
    price: 123,
    productTypes : [1,2,3...]
}
```
return :
```json
{
    "status": 200,
    "message": "成功" | "某項參數錯誤",
}
```
實作：直接新增至db，productId 用 AI，所以不用帶參數


#
### 把產品設定跟產品圖片分開
## updateProductSetting
method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    productId : 1,
    name : "好吃的蛋糕",
    inventories : 1,
    price: 123,
    productTypes : [1,2,3...]
}
```
return :
```json
{
    "status": 200,
    "message": "成功" | "某項參數錯誤",
}
```
實作：直接更新db，這裡是文字數字設定，跟img分開，避免只是想更改文字，卻還要上傳整張圖片

#
### 把產品設定跟產品圖片分開
## updateProductImage
method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    productId : 1,
    img : "data:image..."
}
```
return :
```json
{
    "status": 200,
    "message": "成功" | "某項參數錯誤",
}
```
實作：直接更新db，這裡是img

#
## getAllOrder
method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
}
```
return :
```json
{
    "status" : 200,
    "message" : "成功" | "某些錯誤",
    "data" :
    [
        {
            "username" : "asd@gmail.com",
            "userId" : 1,
            "orderStatus" : int, // 用來表示訂單狀態, 待確認
            "orderItems" :
            [
                {
                    "productId": 9,
                    "orderQuantity": 1,
                    "name": "Shiba Inu Cake",
                    "price": 750,
                    "inventories": 19,
                },
                {...}
            ]
        },
        {
            "username" : "asd@gmail.com",
            "userId" : 1,
            "orderStatus" : int, // 用來表示訂單狀態, 待確認
            "orderItems" :  [{...}]
        },
        {...}
    ]
}
```

#
用來改 client 某項產品購買數量
## updateOrderQuantity


method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    userId : 1,
    productId: 9,
    orderQuantity: 1,
}
```
return :
```json
{
    "status" : 200,
    "message" : "成功" | "某些錯誤",
}
```

#
## updateOrderStatus
method : post

HttpBody :
```json
{
    token : "eyJhbGciOiJIUzUxMiJ9.eyJz...",
    userId : 1,
    orderStatus : int, // 用來表示訂單狀態, 待確認
}
```
return :
```json
{
    "status" : 200,
    "message" : "成功" | "某些錯誤",
}
```
