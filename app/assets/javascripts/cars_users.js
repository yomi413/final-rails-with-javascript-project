$(document).on('turbolinks:load', function() {
  const url = window.location.pathname

  if (url === '/cars') {
    $.get(`${url}.json`, function(cars) {
      cars.map((carJSON) => {
        const car = new Car(carJSON);

        const carsHTML = car.toHTML();
        
        if (!car.user.admin) {
          car.registeredCars();
        } 

        car.userCars();
      })
    })
  } else if (/cars\/\d+$/.test(url)) {
    $.get(`${url}.json`, function(showCar) {

      const singleCar = 
      `<p><strong>Car:</strong> ${showCar.make} ${showCar.model} ${showCar.year}</p>
      <p><strong>Color:</strong> ${showCar.color}</p>
      <p><strong>Size:</strong> ${showCar.size}</p>
      <p><strong>Parking Space Number:</strong> ${showCar.parking_space.space_number}</p>`

      $('#cars').append(singleCar);
    })
  } else if (url === '/cars/new') {
    $('form').submit(function(event) {
      event.preventDefault();
      const values = $(this).serialize();
      const posting = $.post('/cars.json', values);
      posting.done(function(carData) {
        const car = new Car(carData);
        return car.newCar();
      })
    })
  } else if (/users\/\d+$/.test(url)) {
    $.get(`${url}.json`, function(userJSON) {
      const user = new User(userJSON);

      let carId = 1;

      const carList = user.cars().map(function(car) {
        return `<li><a href='/cars/${carId++}'>${car.make} ${car.model} ${car.year}</a></li>`
      })

      // console.log(carList)
      // const parkingSpaceList = user.parking_spaces.map(function(parkingSpace) {
      //   return `<li>${parkingSpace.space_number}</li>`
      // })

      $('#user_name').append(`Welcome, ${user.firstName()}!`)

      $('#car_list').html(carList);

      // $('#parking_space_list').append(parkingSpaceList);
    })
  }
})


class Car {
  constructor(carJSON) {
    this.carJSON = carJSON;
  }

  get user() {
    return this.carJSON.user;
  }

  get parkingSpace() {
    return this.carJSON.parking_space;
  }

  toHTML() {
    return `<td>${this.carJSON.parking_space.space_number}</td>
    <td>${this.carJSON.make}</td>
    <td>${this.carJSON.model}</td>
    <td>${this.carJSON.year}</td>
    <td>${this.carJSON.color}</td>
    <td>${this.carJSON.size}</td>`
  }

  registeredCars() {
    return $('#registered_cars').append(`<tr>
    <td>${this.carJSON.user.name}</td> 
    ${this.toHTML()}</tr>`)
  }

  userCars() {
    return $('#user_cars').append(`<tr>${this.toHTML()}</tr>`)
  }

  newCar() {
    $('#new_parking').text(`${this.carJSON.parking_space.space_number}`)
    $('#new_make').text(`${this.carJSON.make}`)
    $('#new_model').text(`${this.carJSON.model}`)
    $('#new_year').text(`${this.carJSON.year}`)
    $('#new_color').text(`${this.carJSON.color}`)
    $('#new_size').text(`${this.carJSON.size}`)
  }
}

class User {
  constructor(userJSON) {
    this.userJSON = userJSON;
  }

  firstName() {
    return this.userJSON.name.split(' ')[0]
  }

  cars() {
    const cars = this.userJSON.cars;
    return cars;
  }

  // carList() {
  //   this.userJSON

  // //   map(function(car) {
  // //     return `<li><a href='/cars/show'>${car.make} ${car.model} ${car.year}</a></li>`
  // //   })
  // }
}



