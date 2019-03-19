$(document).on('turbolinks:load', function() {
  $.ajax ({
    type: 'GET',
    url: '/cars.json',
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
})

