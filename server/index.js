const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors());

app.all('/server/products', (req, res) => {
    const name           = 'Product Name'
    const primaryTitle   = 'Some Good Stuff'
    const secondaryTitle = 'Pretty neat, I think'
    return res.send([
                        {
                            "id":             1,
                            "name":           name,
                            "primaryTitle":   primaryTitle,
                            "secondaryTitle": secondaryTitle,
                            "weight":         Math.random() * 1200,
                            "wasSold":        true,
                            "basePrice":      "$123,000.00"
                        },
                        {
                            "id":             2,
                            "name":           name,
                            "primaryTitle":   primaryTitle,
                            "secondaryTitle": secondaryTitle,
                            "weight":         Math.random() * 1500,
                            "wasSold":        false,
                            "basePrice":      "$12,345.67"
                        },
                        {
                            "id":             3,
                            "name":           name,
                            "primaryTitle":   primaryTitle,
                            "secondaryTitle": secondaryTitle,
                            "weight":         Math.random() * 900,
                            "wasSold":        true,
                            "basePrice":      "$1,020.99"
                        }
                    ])
});
app.all('/server/product-details', (req, res) => {
    let phone       = "555-555-555";
    let name        = "This Product is Named";
    let email       = "name@email.com";
    let companyName = 'Company Name'
    return res.send({
                        1: [{
                            "id":              Math.random() + '',
                            "status":          "EXPIRED",
                            "companyName":     companyName,
                            "creationDate":    "2012-04-01",
                            "updateDate":      "2018-04-30",
                            "relatedProducts": {
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["PRIMARY", "STANDARD"]
                                }
                            }
                        }, {
                            "id":              Math.random() + '',
                            "status":          "EXPIRED",
                            "companyName":     companyName,
                            "creationDate":    "2018-06-01",
                            "updateDate":      "2020-05-31",
                            "relatedProducts": {
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["PRIMARY", "STANDARD"]
                                },
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["STANDARD", "SECONDARY"]
                                }
                            }
                        }, {
                            "id":              Math.random() + '',
                            "status":          "ACTIVE",
                            "companyName":     companyName,
                            "creationDate":    "2020-08-01",
                            "updateDate":      "2028-07-31",
                            "relatedProducts": {
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["STANDARD"]
                                },
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["STANDARD"]
                                },
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["STANDARD"]
                                },
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["STANDARD"]
                                }
                            }
                        }, {
                            "id":              "727c976d",
                            "status":          "UPCOMING",
                            "companyName":     companyName,
                            "creationDate":    "2022-01-01",
                            "updateDate":      "2026-12-31",
                            "relatedProducts": {
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["STANDARD"]
                                },
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["PRIMARY", "STANDARD"]
                                }
                            }
                        }],
                        2: [],
                        3: [{
                            "id":              "6f24746f",
                            "status":          "EXPIRED",
                            "companyName":     companyName,
                            "creationDate":    "2018-10-01",
                            "updateDate":      "2021-03-31",
                            "relatedProducts": {
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["PRIMARY", "STANDARD"]
                                }
                            }
                        }, {
                            "id":              "ff358dec",
                            "status":          "ACTIVE",
                            "companyName":     companyName,
                            "creationDate":    "2021-05-01",
                            "updateDate":      "2024-04-30",
                            "relatedProducts": {
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["PRIMARY", "STANDARD"]
                                },
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["STANDARD"]
                                },
                                [name]: {
                                    "id":   Math.random() + '',
                                    phone, email,
                                    "tags": ["SECONDARY"]
                                }
                            }
                        }]
                    }[+req.query.product])
});
app.listen(4095);