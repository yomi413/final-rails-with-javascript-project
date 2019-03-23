$(document).on('turbolinks:load', function() {
  const url = window.location.pathname;
  
  if (url === '/cars') {
    $.get(`${url}.json`, function(cars) {
      cars.map((carJSON, user) => {
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
      const car = new Car(showCar);

      const carInfo = car.showCarHTML();

      car.showCars();
    })
  } else if (url === '/cars/new') {
    $(function () {
      $('form').submit(function(event) {
        event.preventDefault();
        const values = $(this).serialize();
        const posting = $.post('/cars.json', values);
        posting.done(function(data) {
          const car = data;
          $('#new_parking').text(`${car.parking_space.space_number}`);
          $('#new_make').text(`${car.make}`);
          $('#new_model').text(`${car.model}`);
          $('#new_year').text(`${car.year}`);
          $('#new_color').text(`${car.color}`);
          $('#new_size').text(`${car.size}`)
        })
      })
    })
  } else if (/users\/\d+$/.test(url)) {
    $.get(`${url}.json`, function(user) {
      const firstName = user.name.split(' ')[0];

      const carList = user.cars.map(function(car) {
        return `<li><a href='#' class="user_cars">${car.make} ${car.model} ${car.year}</a></li>`
      })

      const parkingSpaceList = user.parking_spaces.map(function(parkingSpace) {
        return `<li>${parkingSpace.space_number}</li>`
      })

      $('#user_name').append(`Welcome, ${firstName}!`)

      $('#car_list').append(carList);

      $('#parking_space_list').append(parkingSpaceList);
    })
  }
})


class Car {
  constructor(carJSON) {
    this.carJSON = carJSON;
  }

  toHTML() {
    return `<td>${this.carJSON.parking_space.space_number}</td>
    <td>${this.carJSON.make}</td>
    <td>${this.carJSON.model}</td>
    <td>${this.carJSON.year}</td>
    <td>${this.carJSON.color}</td>
    <td>${this.carJSON.size}</td>`
  }

  get user() {
    return this.carJSON.user
  }

  registeredCars() {
    return $('#registered_cars').append(`<tr>
    <td>${this.carJSON.user.name}</td> 
    ${this.toHTML()}</tr>`)
  }

  userCars() {
    return $('#user_cars').append(`<tr>${this.toHTML()}</tr>`)
  }

  showCarHTML() {
    return `<p><strong>Car:</strong> ${this.carJSON.make} ${this.carJSON.model} ${this.carJSON.year}</p>
    <p><strong>Color:</strong> ${this.carJSON.color}</p>
    <p><strong>Size:</strong> ${this.carJSON.size}</p>
    <p><strong>Parking Space Number:</strong> ${this.carJSON.parking_space.space_number}</p>`
  }

  showCars() {
    return $('#cars').append(`${this.showCarHTML()}`);
  }


}



