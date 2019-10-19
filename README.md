<h1 align="center">RESTful API for Point Of Sales App</h1>

# Overview

## Introduction

Point of Sales is an API that allows users to view product information from a database. Point of Sales API is also possible
create, update and delete products and categories.

There are several features included in the API that allow to sort out products (based on date updated, name, category), search product by name, add/reduce product quantity and make orders product from the database.

This documentation outlines the Point of Sales API functionality.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/mysql-v2..17.2-blue)](https://www.npmjs.com/search?q=mysql) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-v8.x-critical)](https://www.npmjs.com/package/jsonwebtoken)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## Getting Started

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

### Node.js
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

Nodejs allow developers to use javascript to write command line tools and for **server side scripting**. Hence, Nodejs represent what we know about "Javascript Everywhere" Paradigm, which allow us to us javascript on both **client-side** and **server-side**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used.

Nodejs was written in 2009 by Ryan Dahl, 13 years after the introduction of first server-side javascript environment which is **Netscape's LiveWire Pro Web**. Dahl write Nodejs based on his critic on the performance limitation of the most popular web server in 2009, Apache HTTP Server.

The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

### Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

The philosophy of Expressjs is to provide a small and robust tooling for HTTP servers. Making it a great solution for single page apps, website, hybrids, or public HTTP APIs. 

![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)

### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

RESTful API design was defined by Dr. Roy Fielding in his 2000 doctorate dissertation. In order to be a true RESTful API, a web service must adhere to the following six REST architectural constraints:

* Use of a uniform interface (UI). Resources should be uniquely identifiable through a single URL, and only by using the underlying methods of the network protocol, such as DELETE, PUT and GET with HTTP, should it be possible to manipulate a resource.
* Client-server based. There should be a clear delineation between the client and server. UI and request-gathering concerns are the client’s domain. Data access, workload management and security are the server’s domain. This loose coupling of the client and server enables each to be developed and enhanced independent of the other.
* Stateless operations. All client-server operations should be stateless, and any state management that is required should take place on the client, not the server.
* RESTful resource caching. All resources should allow caching unless explicitly indicated that caching is not possible.
* Layered system. REST allows for an architecture composed of multiple layers of servers.
* Code on demand. Most of the time a server will send back static representations of resources in the form of XML or JSON. However, when necessary, servers can send executable code to the client.
  
### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
|

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:3000/product)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
SERVER_PORT = 3000

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'pos'
```
## Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **rent-book** :

```
CREATE DATABASE pos;
```

Create Table named **products** :

```
CREATE TABLE  products `products` (
  `id_product` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `id_categories` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

Create Table categories categories **categories** :

```
CREATE TABLE `categories` (
  `id_categories` int(11) NOT NULL,
  `Categories` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

Create Table named **detail_order** :

```
CREATE TABLE `detail_order` (
  `id_detail_order` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `sub_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

Create Table order **order** :

```
CREATE TABLE `order` (
  `id_order` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```


## Endpoints

#### **Product**

#### **CRUD product Endpoint**
* **Read All product**
  - **Request** : **`GET product`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "name": "Tshirt What For",
            "Price": 121500,
            "Description": "Color : Navy\r\nMaterial : Cotton",
            "Category": "Tshirt ",
            "Date_Added": "Fri Oct 18 2019 18:57:44",
            "Date_Updated": "Sat Oct 19 2019 07:48:07",
            "Quantity": 79
        },
        {
            "name": "Tshirt 100 PERCENT WILD",
            "Price": 121500,
            "Description": "Color : Blue\r\nMaterial : Cotton\r\n",
            "Category": "Tshirt ",
            "Date_Added": "Fri Oct 18 2019 19:01:45",
            "Date_Updated": "Sat Oct 19 2019 01:39:08",
            "Quantity": 27
        },
        {
            "name": "Denim Long Pants - SJM 469",
            "Price": 301500,
            "Description": "Color : Navy\r\nMaterial : Denim",
            "Category": "Long Pants",
            "Date_Added": "Fri Oct 18 2019 19:05:34",
            "Date_Updated": "Fri Oct 18 2019 19:15:13",
            "Quantity": 50
        },
        {
            "name": "Cargo Long Pants - SCL 41",
            "Price": 279000,
            "Description": "Color : Navy\r\nMaterial : Cotton",
            "Category": "Long Pants",
            "Date_Added": "Fri Oct 18 2019 19:07:15",
            "Date_Updated": "Fri Oct 18 2019 19:16:13",
            "Quantity": 50
        },
        {
            "name": "Jacket - JS 817",
            "Price": 292500,
            "Description": "Color : Orange\r\nMaterial : Parachute",
            "Category": "Jacket",
            "Date_Added": "Fri Oct 18 2019 19:08:41",
            "Date_Updated": "Fri Oct 18 2019 19:15:26",
            "Quantity": 50
        }
    ]
}
```
* **Create a product** 
  - **Request** : **`POST /product`**
  - **Response** :
```
"Succes Input"
```
* **Update a product** 
  - **Request** : **`PUT/product/`**
  - **Response** :
```
"Succes Update"
```
* **Delete a product**
  - **Request** : **`DELETE /product/:id`**
  - **Response** : 
```
"Succes Delete"
```

#### CRUD Categories Endpoint
* **Read All Categories**
  - **Request** : **`GET /product/categories`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 667,
            "Categories": "Tshirt "
        },
        {
            "id": 668,
            "Categories": "Long Pants"
        },
        {
            "id": 669,
            "Categories": "Jacket"
        },
        {
            "id": 670,
            "Categories": "asas"
        }
    ]
}
```
* **Create a categories**
  - **Request** : **`POST /product/categories`**
  - **Response** :
```
"Succes Input"
```
* **Update a categories**
  - **Request** : **`PATCH /product/categories`**
  - **Response** :
```
"Succes Update"
```
* **Delete a categories** 
  - **Request** : **`DELETE /product/categories`**
  - **Response** :
```
"Succes Delete"
```

#### Add/Reduce Product Quantity
 
* **Add Product Quantity**
  - **Request** : **`POST /product/add/:id`**
  - **Response** :
```
"Succes Add Quantity"
```  

* **Reduce Product Quantity**

  - **Request** : **`POST /product/reduce/:id`**
  - **Response** :
```
"Succes Reduce Quantity"
```  

#### Sorting Product By Name,Categories and Date Updated

* **Sorting By Name**

  - **Request** : **`GET /product/sort?sortby=name&&orderby=ASC`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "name": "Cargo Long Pants - SCL 41",
            "Price": 279000,
            "Description": "Color : Navy\r\nMaterial : Cotton",
            "Category": "Long Pants",
            "Date_Added": "Fri Oct 18 2019 19:07:15",
            "Date_Updated": "Fri Oct 18 2019 19:16:13"
        },
        {
            "name": "Denim Long Pants - SJM 469",
            "Price": 301500,
            "Description": "Color : Navy\r\nMaterial : Denim",
            "Category": "Long Pants",
            "Date_Added": "Fri Oct 18 2019 19:05:34",
            "Date_Updated": "Fri Oct 18 2019 19:15:13"
        },
        {
            "name": "Jacket - JS 817",
            "Price": 292500,
            "Description": "Color : Orange\r\nMaterial : Parachute",
            "Category": "Jacket",
            "Date_Added": "Fri Oct 18 2019 19:08:41",
            "Date_Updated": "Fri Oct 18 2019 19:15:26"
        },
        {
            "name": "Tshirt 100 PERCENT WILD",
            "Price": 121500,
            "Description": "Color : Blue\r\nMaterial : Cotton\r\n",
            "Category": "Tshirt ",
            "Date_Added": "Fri Oct 18 2019 19:01:45",
            "Date_Updated": "Sat Oct 19 2019 01:39:08"
        },
        {
            "name": "Tshirt What For",
            "Price": 121500,
            "Description": "Color : Navy\r\nMaterial : Cotton",
            "Category": "Tshirt ",
            "Date_Added": "Fri Oct 18 2019 18:57:44",
            "Date_Updated": "Sat Oct 19 2019 07:48:07"
        }
    ]
}
```
* **Sorting By Categories**

  - **Request** : **`GET /product/sort?sortby=Categories&&orderby=ASC`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "name": "Jacket - JS 817",
            "Price": 292500,
            "Description": "Color : Orange\r\nMaterial : Parachute",
            "Category": "Jacket",
            "Date_Added": "Fri Oct 18 2019 19:08:41",
            "Date_Updated": "Fri Oct 18 2019 19:15:26"
        },
        {
            "name": "Denim Long Pants - SJM 469",
            "Price": 301500,
            "Description": "Color : Navy\r\nMaterial : Denim",
            "Category": "Long Pants",
            "Date_Added": "Fri Oct 18 2019 19:05:34",
            "Date_Updated": "Fri Oct 18 2019 19:15:13"
        },
        {
            "name": "Cargo Long Pants - SCL 41",
            "Price": 279000,
            "Description": "Color : Navy\r\nMaterial : Cotton",
            "Category": "Long Pants",
            "Date_Added": "Fri Oct 18 2019 19:07:15",
            "Date_Updated": "Fri Oct 18 2019 19:16:13"
        },
        {
            "name": "Tshirt What For",
            "Price": 121500,
            "Description": "Color : Navy\r\nMaterial : Cotton",
            "Category": "Tshirt ",
            "Date_Added": "Fri Oct 18 2019 18:57:44",
            "Date_Updated": "Sat Oct 19 2019 07:48:07"
        },
        {
            "name": "Tshirt 100 PERCENT WILD",
            "Price": 121500,
            "Description": "Color : Blue\r\nMaterial : Cotton\r\n",
            "Category": "Tshirt ",
            "Date_Added": "Fri Oct 18 2019 19:01:45",
            "Date_Updated": "Sat Oct 19 2019 01:39:08"
        }
    ]
}
```

* **Sorting By Date Updated**

  - **Request** : **`GET /product/sort?sortby=date_updated&&orderby=DESC`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "name": "Tshirt What For",
            "Price": 121500,
            "Description": "Color : Navy\r\nMaterial : Cotton",
            "Category": "Tshirt ",
            "Date_Added": "Fri Oct 18 2019 18:57:44",
            "Date_Updated": "Sat Oct 19 2019 07:48:07"
        },
        {
            "name": "Tshirt 100 PERCENT WILD",
            "Price": 121500,
            "Description": "Color : Blue\r\nMaterial : Cotton\r\n",
            "Category": "Tshirt ",
            "Date_Added": "Fri Oct 18 2019 19:01:45",
            "Date_Updated": "Sat Oct 19 2019 01:39:08"
        },
        {
            "name": "Cargo Long Pants - SCL 41",
            "Price": 279000,
            "Description": "Color : Navy\r\nMaterial : Cotton",
            "Category": "Long Pants",
            "Date_Added": "Fri Oct 18 2019 19:07:15",
            "Date_Updated": "Fri Oct 18 2019 19:16:13"
        },
        {
            "name": "Jacket - JS 817",
            "Price": 292500,
            "Description": "Color : Orange\r\nMaterial : Parachute",
            "Category": "Jacket",
            "Date_Added": "Fri Oct 18 2019 19:08:41",
            "Date_Updated": "Fri Oct 18 2019 19:15:26"
        },
        {
            "name": "Denim Long Pants - SJM 469",
            "Price": 301500,
            "Description": "Color : Navy\r\nMaterial : Denim",
            "Category": "Long Pants",
            "Date_Added": "Fri Oct 18 2019 19:05:34",
            "Date_Updated": "Fri Oct 18 2019 19:15:13"
        }
    ]
}
```




#### Order Product Endpoint
 
* **Create a New Order**
  - **Request** : **`POST /product/order`**
  - **Response** :
```
"Succes Order"
```
### Support

For API support, please email nur.hasan@student.uty.ac.id
