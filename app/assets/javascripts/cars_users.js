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
  } else if (carsURL === '/cars')
  
})

$(document).on('turbolinks:load', function() {
  $.ajax ({
    type: 'GET',
    url: `${carsURL}.json`,
    success: function(car) {

      const carInfo = `
        <p><strong>Car:</strong> ${car.make} ${car.model} ${car.year}</p>
        <p><strong>Color:</strong> ${car.color}</p>
        <p><strong>Size:</strong> ${car.size}</p>
        <p><strong>Parking Space Number:</strong> ${car.parking_space.space_number}</p>
        `

      $('#car_info').append(carInfo);

    }
  })
})

$(document).on('turbolinks:load', function() {

})

// <%= link_to "Edit Car", edit_car_path(@car) %> | <%= link_to "Delete Car", @car, :method => :delete %>

