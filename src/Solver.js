var Solver = function (coefficients) {
  function reduce_nth_column (obj, column_number) {
    var clone_of_coef  = JSON.parse(JSON.stringify(obj.coefficients)),
        reducer_row_id = (column_number - 1)

    for (i = column_number; i < 3; i++) {
      var change_ratio   = -(clone_of_coef[i][column_number - 1]/clone_of_coef[reducer_row_id][column_number - 1])

      for (j = 0; j < 4; j++) {
        clone_of_coef[i][j] += clone_of_coef[reducer_row_id][j] * change_ratio
      }
    }

    return new Solver(clone_of_coef)
  }

  for (i=0; i < 3; i++) {
    for(j=0; j < 4; j++) {
      if (typeof(coefficients[i][j]) == 'string'){
        coefficients[i][j] = parseInt(coefficients[i][j])
      }
    }
  }

  this.coefficients = coefficients

  this.solve = function() {
    var reduced = this.reduce_second_row().reduce_third_row()

    var x3 = reduced.coefficients[2][3] / reduced.coefficients[2][2],
        x2 = (reduced.coefficients[1][3] - (reduced.coefficients[1][2] * x3) ) / reduced.coefficients[1][1],
        x1 = (reduced.coefficients[0][3] - (reduced.coefficients[0][2] * x3) - (reduced.coefficients[0][1] * x2) ) / reduced.coefficients[0][0]

    return [x1,x2,x3]
  }

  this.deviation = function() {
    var solved = this.solve()
    var dev = []

    for (i = 0; i < 3; i++) {
      dev.push(
                solved[0] * this.coefficients[i][0] + 
                solved[1] * this.coefficients[i][1] + 
                solved[2] * this.coefficients[i][2] -
                this.coefficients[i][3]
              )
    }

    return dev
  }

  this.get_coefficients = function() {
    return this.coefficients
  }

  this.reduce_second_row = function() {
    return reduce_nth_column(this, 1);
  }

  this.reduce_third_row = function() {
    return reduce_nth_column(this, 2);
  }
}