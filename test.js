fn transformInput(inputItem) {

  fn iterateAndTransform(item) {
    iterator := with std.baseIterator() item
    if type(item) {
      itemLength := item |> len()
      itemKeys := keys(item)

      :array -> {
        iterator << with std.each(item) fn(arrayItem, index) if arrayItem {
          _ -> iterateAndTransform(arrayItem)
        }
        iterator.(itemKeys.(itemLength-1))
      }
      
      :object -> {
        with std.each(item) fn(objectItem, index) {
          iterator.(itemKeys.(index)) <- item.(itemKeys.(itemLength-1)) |> iterateAndTransform()
        }
        iterator.(itemKeys.(itemLength-1))
      }
  
      :atom -> {
        iterator <- item
      }
  
      _ -> {
        iterator <- type(item)
      }
    }
    iterator
  }

  inputItem |> iterateAndTransform()
}

fn doesInterfaceMatch?(pattern, instance) {
  instance |> transformInput() = pattern |> transformInput() 

}


