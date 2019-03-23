$(document).on('turbolinks:load', function() {
  const url = window.location.pathname;
  
  if (url === '/cars') {
    $.get(`${url}.json`, function(cars) {
      cars.map((carJSON, user) => {
        const car = new Car(carJSON);

        const carsHTML = car.toHTML();
        
        if (!car.user.admin) {
          car.registeredCarsHTML();
        } 

        $('#user_cars').append(`<tr>${carsHTML}</tr>`)
      })
    })
  } else if (/cars\/\d+$/.test(url)) {
    $.get(`${url}.json`, function(car) {
      const carInfo = `
      <p><strong>Car:</strong> ${car.make} ${car.model} ${car.year}</p>
      <p><strong>Color:</strong> ${car.color}</p>
      <p><strong>Size:</strong> ${car.size}</p>
      <p><strong>Parking Space Number:</strong> ${car.parking_space.space_number}</p>`

      $('#cars').append(carInfo);
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

// debugger
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

  registeredCarsHTML() {
    return $('#registered_cars').append(`<tr>
    <td>${this.carJSON.user.name}</td> 
    ${this.toHTML()}</tr>`)
  }


}



