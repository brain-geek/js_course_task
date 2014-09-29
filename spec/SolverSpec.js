describe("Solver", function() {
  describe("#solve", function() {
    it("should be able to solve simple case", function() {
      mas = 
      [
        [1, 2, 3, 14],
        [1, 3, 4, 19],
        [2, 1, 2, 10]
      ]

      result = new Solver(mas)

      expect(result.solve()).toEqual([1,2,3]);
    });
  });

  describe("#reduce_second_row", function() {
    it("should return new Solver object with first column reduced", function() {
      mas = 
      [
        [1, 2, 3, 14],
        [1, 3, 4, 19],
        [2, 1, 2, 10]
      ]

      object = new Solver(mas)
      result = object.reduce_second_row()

      expect(result.get_coefficients()).toEqual([
          [1, 2, 3, 14],
          [0, 1, 1, 5],
          [0, -3, -4, -18]
        ])

      expect(object.get_coefficients()[1][0]).toEqual(1)
    });
  });

  describe("#reduce_third_row", function() {
    it("should raise if first element in third row is not zero", function() {
      mas = 
      [
        [1, 2, 3, 14],
        [1, 3, 4, 19],
        [2, 1, 2, 10]
      ]

      object = new Solver(mas)

      expect(function() {
        object.reduce_third_row();
      }).toThrowError("you should call reduce_second_row first");
    });

    it("should return new Solver object with upper triangular matrix", function() {
      mas = 
      [
        [1, 2, 3, 14],
        [1, 3, 4, 19],
        [2, 1, 2, 10]
      ]

      object = new Solver(mas)
      result = object.reduce_second_row().reduce_third_row()

      expect(result.get_coefficients()).toEqual([
          [1, 2, 3, 14],
          [0, 1, 1, 5],
          [0, 0, -1, -3]
        ])
    });
  });
});