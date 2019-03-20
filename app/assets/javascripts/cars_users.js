function isNumeric(num) {
  return !isNaN(num)
}

$(document).on('turbolinks:load', function() {
  const carsURL = window.location.pathname;
  if (carsURL === '/cars') {
    $.ajax ({
      type: 'GET',
      url: `${carsURL}.json`,
      success: function(cars) {

        const carsHTML = cars.map(function(car) {
          return `<tr>
          <td>${car.parking_space.space_number}</td>
          <td>${car.make}</td>
          <td>${car.model}</td>
          <td>${car.year}</td>
          <td>${car.color}</td>
          <td>${car.size}</td>
          </tr>`
        })

        $('#user_cars').append(carsHTML);
      }
    })
  } else if (isNumeric(carsURL)) {
    $.ajax ({
      type: 'GET',
      url: `${carsURL}.json`,
      success: function(car) {

        const carInfo = `
          <p><strong>Car:</strong> ${car.make} ${car.model} ${car.year}</p>
          <p><strong>Color:</strong> ${car.color}</p>
          <p><strong>Size:</strong> ${car.size}</p>
          <p><strong>Parking Space Number:</strong> ${car.parking_space.space_number}</p>`

        $('#cars').append(carInfo);

      }
    })
  } else if (carsURL === '/cars/new') {
    $(function () {
      $('form').submit(function(event) {
        event.preventDefault();
        const values = $(this).serialize();
        const posting = $.post('/cars.json', values);
        posting.done(function(data) {
          const car = data;
          $('#new_parking').text(`${car.parking_space.space_number}`);
          $('new_make').text(`${car.make}`);
          $('new_model').text(`${car.model}`);
          $('new_year').text(`${car.year}`);
          $('new_color').text(`${car.color}`);
          $('new_size').text(`${car.size}`)
        })
      })
    })
  }
  
})


// <%= link_to "Edit Car", edit_car_path(@car) %> | <%= link_to "Delete Car", @car, :method => :delete %>

