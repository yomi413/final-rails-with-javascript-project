class Car {
  constructor(carJSON) {
    this.carJSON = carJSON;
  }

  get user() {
    return this.carJSON.user;
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
    return this.userJSON.name.split(' ')[0];
  }

  get cars() {
    const cars = this.userJSON.cars;
    return cars;
  }

  get parkingSpaces() {
    return this.userJSON.parking_spaces;
  }

  userName() {
    return $('#user_name').append(`Welcome, ${this.firstName()}!`);
  }

  carList() {
    const cars = this.cars.map(function(car) {
        return `<li><a href='/cars/${car.id}'>${car.make} ${car.model} (${car.year})</a></li>`;
      })
    return $('#car_list').html(cars);
  }

  parkingSpaceList() {
    const parkingSpaces = this.parkingSpaces.map(function(parkingSpace) {
      return `<li>${parkingSpace.space_number}</li>`;
    })
    return $('#parking_space_list').append(parkingSpaces);
  }

}