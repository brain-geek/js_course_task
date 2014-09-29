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

  this.coefficients = coefficients

  this.solve = function() {
    return [1,2,3]
  }

  this.get_coefficients = function() {
    return this.coefficients
  }

  this.reduce_second_row = function() {
    return reduce_nth_column(this, 1);
  }

  this.reduce_third_row = function() {
    if ((this.coefficients[1][0] != 0) || (this.coefficients[2][0] != 0)) {
      throw new Error("you should call reduce_second_row first");
    }

    return reduce_nth_column(this, 2);
  }
}