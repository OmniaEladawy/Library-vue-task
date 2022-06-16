<template>
    <div id="mainwrapper" class="container">
        <div class="header text-center my-3">
            <h1 class="d-inline"> My Library </h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
            </svg>
        </div>
        <!-- authors -->
        <div class="authors">
            <h4>Authors</h4>
            <ul class="row">
                <li v-for="book in books" :title="book.author" class="col-3" >{{book.name}}</li>
            </ul>
        </div>
        <hr>
        <!-- books -->
        <div class="books" v-if="isWishListVisible==false">
            <div class="d-flex justify-content-between">
                <h4>Books</h4>
                <button @click="isWishListVisible=true" href="#" class="btn btn-primary fw-bold">My Wish List</button>
            </div>
            <div class="d-flex flex-wrap">
                <div v-for="book in books" class="card m-3" style="width: 18rem;">
                    <img :src="book.image" class="card-img-top" :title="book.name" style="height: 350px;">
                    <div class="card-body">
                        <h5 class="card-title text-center" style="height: 50px;" >{{book.name}}</h5>
                        <div class="d-flex flex-wrap my-4 justify-content-between" style="height: 100px;"> 
                        <span class="card-text"><span class="fw-bold">Category : </span> {{book.category}}</span>
                        <span class="card-text"><span class="fw-bold">Price : </span> {{book.price}}</span>
                        <span class="card-text"><span class="fw-bold">Author : </span> {{book.author}}</span>
                        
                        <span class="card-text"><span class="fw-bold">ISBN : </span> {{book.ISBN}}</span>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-baseline">
                            <span :class="[book.numberOfPages > 50 ? 'more' : 'less']"># Pages : {{book.numberOfPages}}</span>
                            <button href="#" class="btn btn-info text-white fw-bold" :disabled="checkexist(book) == true" @click="addToList(book)">Add To List</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- wish list -->
        <div class="list" v-if="isWishListVisible==true">
            <div class="d-flex justify-content-between">
                <h4>My Wish List</h4>
                <button @click="isWishListVisible=false" href="#" class="btn btn-primary fw-bold">Books</button>
            </div> 
            <h5 class="m-5" v-if="list.items.length == 0" style="color: red">Wish List is empty ! , add your books</h5>
            <table class="table table-success table-striped text-center mt-5" v-if="list.items.length > 0">
                <thead>
                  <tr>
                    <th scope="col">ISBN</th>
                    <th scope="col">Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Category</th>
                    <th scope="col">Number Of Pages</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="book in list.items">
                    <td>{{book.ISBN}}</td>
                    <td>{{book.name}}</td>
                    <td>{{book.author}}</td>
                    <td>{{book.category}}</td>
                    <td>{{book.numberOfPages}}</td>
                    <td>{{formateCurrency(book.price)}}</td>
                    <td><button class="btn btn-danger" @click="deleteFromList(book)">Delete from list</button></td>
                  </tr>
                  <tr>
                    <td colspan="7">
                        <span class="fw-bold"> Total Price : </span>
                        <span> {{formateCurrency(getTotalPrice())}} </span>
                    </td>
                  </tr>
                </tbody>
              </table>
        </div>
    </div>
</template>

<script>
    import books from '../books'
    export default {
        data:function(){
                return {
                    books: books,
                    isWishListVisible: false,
                    list: {
                        items:[]
                    }
                }
            },
            methods:{
                addToList(book){
                    if(!this.checkexist(book)){
                    this.list.items.push(book);
                    }
                },
                deleteFromList(book){
                    const index = this.list.items.indexOf(book);
                    this.list.items.splice(index,1);
                },
                getTotalPrice(){
                    let total = 0;
                    for(let i = 0 ; i < this.list.items.length ; i++){
                        total += this.list.items[i].price;
                    }
                    return total;
                },
                checkexist(book){
                    return this.list.items.some(item => item.ISBN == book.ISBN)
                },
                formateCurrency(value){
                    return Intl.NumberFormat("ar-SA",{
                        style:'currency',
                        currency: 'SAR',
                        minimumFractionDigits: 0
                    }).format(value);
                }
            }
    }
</script>
