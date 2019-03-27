$(document).on('turbolinks:load', function() {
  const url = window.location.pathname;

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
      `<p><strong>Car:</strong> ${showCar.make} ${showCar.model} (${showCar.year})</p>
      <p><strong>Color:</strong> ${showCar.color}</p>
      <p><strong>Size:</strong> ${showCar.size}</p>
      <p><strong>Parking Space Number:</strong> ${showCar.parking_space.space_number}</p>`

      return $('#cars').append(singleCar);  
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

      user.userName();

      user.carList();

      user.parkingSpaceList();
    })
  }
})