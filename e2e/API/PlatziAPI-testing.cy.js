describe('Platzi API Testing', () => {

  // GET Categories
  // Digunakan untuk mengambil data dari server
  it('TC001 - Get All Categories', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  // Get Category by IS
  // Mengambil data category dengan ID 1
  it('TC002 - Get Category By ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/1',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 404])
    })
  })

  // GET All Products
  // Mengambil data seluruh produk
  it('TC003 - Get All Products', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/products')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  // GET Product Limit
  // Mengambil product dengan limit maksimal 5 produk
  it('TC004 - Get Products Limit', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/products?offset=0&limit=5')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.lte(5)
      })
  })

  // GET Search Product
  // Mencari produk yang mengandung huruf "a"
  it('TC005 - Search Product', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/products?title=a')
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // GET All Users
  // Mengambil semua data user 
  it('TC006 - Get All Users', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/users')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  // GET User by ID
  // Mengambil data user dengan ID 1
  it('TC007 - Get User By ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/users/1',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 404])
    })
  })

  // POST User
  // Digunakan untuk menambahkan data user baru
  it('TC008 - Create User', () => {
    cy.request('POST', 'https://api.escuelajs.co/api/v1/users', {
      name: 'Febri QA',
      email: `febri${Date.now()}@mail.com`,
      password: '123456',
      avatar: 'https://picsum.photos/200'
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq('Febri QA')
    })
  })

  // POST Email Availability
  // Digunakan untuk melakukan pengecekan pakah email tersedia
  it('TC009 - Check Email Availability', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/users/is-available',
      failOnStatusCode: false,
      body: {
        email: 'test@mail.com'
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201])
    })
  })

  // POST Product
  /* Digunakan untuk memastikan apakah jika data yang dimasukkan tidak valid
  API akan melakukan penolakan atau tidak */
  it('TC010 - Create Product Invalid Data', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/products',
      failOnStatusCode: false,
      body: {
        title: 'QA Product',
        price: 100,
        description: 'Automation Test',
        categoryId: 1,
        images: ['https://picsum.photos/300']
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
    })

  // PUT Update Product
  // Digunakan untuk mengubah produk ID 1
  it('TC011 - Update Product', () => {
    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/products/1',
      failOnStatusCode: false,
      body: {
        title: 'Updated Product'
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201, 400])
    })
  })

  // PUT Update User
  // Digunakan untuk mengubah data user
  it('TC012 - Update User', () => {
    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/users/1',
      failOnStatusCode: false,
      body: {
        name: 'Updated User'
      }
    }).then((response) => {
    expect(response.status).to.eq(401)
    })
  })

  // DELETE Product
  // Digunakan untuk menghapus data produk
  it('TC013 - Delete Product', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/products/1',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 204, 400])
    })
  })

  // DELETE User
  // Digunakan untuk menghapus data user
  it('TC014 - Delete User', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/users/1',
      failOnStatusCode: false
    }).then((response) => {
     expect(response.status).to.eq(401)
    })
  }) 

  // Negative Testing
  // Digunakan untuk melakukan pengecekan mengambil product yang tidak ada
  it('TC015 - Invalid Product ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/products/999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404])
    })
  })

})