function sum(a, b){
  return(a + b )
}

describe("<SignIn />", () => {
  it('adds 1 + 2 to equal 3', ()=>{
    expect(sum(1,2)).toBe(3)
  })
})

console.log(window)