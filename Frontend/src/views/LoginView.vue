<template>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="display-4 text-center my-5">Bejelentkezés</h1>
        </div>
        <div class="col-12 col-md-4 mx-auto">
          <form>
            <div class="form-floating mb-3">
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                placeholder="E-mail">
              <label for="name">Név</label>
            </div>
            <div class="form-floating mb-3">
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                placeholder="Jelszó" >
              <label for="password">Jelszó</label>
            </div>
  
            <div class="mb-3">
              <button type="submit" class="btn btn-primary w-100 py-3 mt-3">Bejelentkezés</button>
            </div>
        </form>  
      </div>
    </div>
  </div></template>
  