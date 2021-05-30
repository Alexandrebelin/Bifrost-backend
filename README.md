# API - Bifrost - Test


### /product/publish (POST)
Create a new product
| formData      | Required | Description
| ------------- | -------- | -----------
| `title`       | Yes      | product title
| `description` | Yes      | product description
| `price`       | Yes      | product price
| `brand`       | Yes      | product brand
| `color`       | Yes      | product color
| `quantitie`   | Yes      | product quatitie
| `image`       | Yes      | product picture

<br>

### /product/:id (GET)

Get a product

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | product id  |

<br>

### /product (GET)

Get all the products

<br>

### /product/update/:id (PUT)

Update a product

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | product id  |

<br>

| formData      | Required | Description
| ------------- | -------- | -----------
| `title`       | No       | product title
| `description` | No       | product description
| `price`       | No       | product price
| `brand`       | No       | product brand
| `color`       | No       | product color
| `image`       | No       | product picture
 
<br>

### /product/delete/:id (DELETE)

Delete a product

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | product id  |

<br>

## Setup Instructions

Clone this repository :

```
git clone https://github.com/Alexandrebelin/Bifrost-backend.git
```

Install dependencies with npm:

```
npm install
```

Once the installation is complete, run it:

```
npx nodemon index.js
```


