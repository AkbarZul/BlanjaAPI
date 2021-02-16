# Berikut Daftar Endpoint

untuk endpoint , hhtp response, message response, serta body yang harus dikirim.

### {{host}}/products

| Endpoint    | Method | Body / Params |
|:-----------:|:------:|:-------------:|
| `/products` | `GET`  | none          |

`Response`

```json
{
  "message": "Data Success",
  "status": 200,
  "data": [
    {
      "id": 1,
      "product_name": "Kaos Polos",
      "category_id": 9,
      "size_id": 4,
      "color_id": 1,
      "condition_id": 1,
      "product_price": 50000,
      "product_qty": 20,
      "product_desc": "Kaos Polos dengan serat yang halus.",
      "product_photo": "https://cf.shopee.co.id/file/4c738469884260588c85a7bbc3f50058",
      "created_at": "2020-11-21T21:31:15.000Z",
      "updated_at": "2020-11-22T21:31:27.000Z",
      "product_id": 1,
      "rating": 4
    },
    {
      "id": 4,
      "product_name": "Kaos Polos Merah",
      "category_id": 9,
      "size_id": 4,
      "color_id": 2,
      "condition_id": 1,
      "product_price": 45000,
      "product_qty": 30,
      "product_desc": "Test Doang Kok",
      "product_photo": "Ajskjakjsf",
      "created_at": "2020-11-22T21:30:48.000Z",
      "updated_at": "2020-11-22T21:30:48.000Z",
      "product_id": 3,
      "rating": 4
    }
]
```

| Endpoint    | Method | Body / Params |
|:-----------:|:------:|:-------------:|
| `/products` | `GET`  | params : id   |

`Response Success`

```json
{
  "message": "Data Success",
  "status": 200,
  "data": {
    "id": 13,
    "product_name": "HotPants TikTok Keren",
    "category_id": 4,
    "size_id": 8,
    "color_id": 2,
    "condition_id": 1,
    "product_price": 30000,
    "product_qty": 10,
    "product_desc": "Hotpants Tiktok",
    "product_photo": "https://res.cloudinary.com/devloops7/image/upload/v1605447841/newBlanja/ShortCategory_czom62.png",
    "created_at": "2020-11-23T21:55:42.000Z",
    "updated_at": "2020-11-23T22:02:41.000Z",
    "product_id": 7,
    "rating": 1
  }
}
```

`Response Not Found`

```json
{
  "msg": "Data Not Found",
  "status": 404
}
```

| Endpoint   | Method | Body / Params                                                                                                                |
|:----------:|:------:|:----------------------------------------------------------------------------------------------------------------------------:|
| `products` | `POST` | Body : url Encode<br/>category_id, size_id, color_id, condition_id,  product_price, product_qty, product_desc, product_photo |

`Response Success`

```json
{
  "message": "Data Success",
  "status": 200,
  "data": {
    "id": 8,
    "product_name": "Hotpants New",
    "category_id": "4",
    "size_id": "8",
    "color_id": "2",
    "condition_id": "1",
    "product_price": "30000",
    "product_qty": "5",
    "product_desc": "Hotpants Tiktok",
    "product_photo": "https://res.cloudinary.com/devloops7/image/upload/v1605447841/newBlanja/ShortCategory_czom62.png"
  }
}
```

`Response Error`

```json
{
  "message": "Data Error",
  "status": 500
}
```

| Endpoint    | Method | Body / Params                                                                                                                                      |
|:-----------:|:------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|
| `/products` | `PUT`  | Params : id<br/>Body : url Encode&lt;br/&gt;category_id, size_id, color_id, condition_id,  product_price, product_qty, product_desc, product_photo |

`Response Success`

```json
{
  "message": "Data Success",
  "status": 200,
  "data": {
    "id": "7",
    "product_name": "HotPants TikTok Keren",
    "product_qty": "10"
  }
}
```

`Response Eror`

```json
{
  "message": "Data Error",
  "status": 500
}
```

`Response Not Found`

```json
{
  "msg": "Data Not Found",
  "status": 404
}
```

| Endpoint    | Metod    | Body / Params |
|:-----------:|:--------:|:-------------:|
| `/products` | `DELETE` | Params : id   |

`Response Success`

```json
{
  "msg": "Data Deleted",
  "status": 200
}
```

`Response Not Found`

```json
{
  "msg": "Data Not Found",
  "status": 404
}
```
