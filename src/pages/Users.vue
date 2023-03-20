<template lang="">
  <div class="wrapper-content wrapper-content--fixed home">
    <section>
      <div class="container">

        <!-- table -->
        <table>
          <!-- thead -->
          <thead>
            <tr>
              <th @click="getSort('name')">Name &#8595;</th>
              <th @click="getSort('age')">Age &#8595;</th>
              <th @click="getSort('gender')">Gender &#8595;</th>
            </tr>
          </thead>

          <!-- tbody -->
          <tbody>
            <tr v-for="user in usersSort" :key="user.id">
              <td class="td-head" style="cursor:pointer;">
                <img :src="user.img" :alt="user.name">
                <span>{{ user.name }}</span>
              </td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>

        </table>
        <p style="text-align:center;">
          <span>debug: sort:{{currentSort}}, dir:{{currentSortDir}}</span>
          <span>page: {{this.page.current}}, length: {{this.page.length}}</span>
        </p>
      </div>
    </section>

    <!-- buttons -->
    <section>
     <div class="container">
      <div class="button-list">
        <div class="btn-primary" @click="prevPage">&larr;</div>
        <div class="btn-primary" @click="nextPage">&rarr;</div>
      </div>
     </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: [],
      currentSort:'name',
      currentSortDir:'asc',
      page:{
        current:1,
        length:3
      }
    };
  },
  created(){
     axios
     .get('http://localhost:3000/result')
     .then(response => {
      console.log(response.data[0]);
      this.users = response.data[0]
     })
     .catch(error => {
      console.log(error);
     })
  },
   computed:{
     usersSort () {
      return this.users.sort((a, b) => {
        let mod = 1
        if(this.currentSortDir === 'asc') mod = -1
        if(a[this.currentSort] < b[this.currentSort]) return -1 * mod
        if(a[this.currentSort] > b[this.currentSort]) return 1 * mod
        return 0
      }).filter((row, index) => {
        let start = (this.page.current-1)*this.page.length
        let end = this.page.current * this.page.length
        if(index >= start && index < end) return true
      })
     }
   },
  methods:{
    getSort(e) {
      if(e === this.currentSort){
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }

      this.currentSort = e
    },
    // Pagination
    prevPage() {
      if (this.page.current > 1) this.page.current-=1
    },
    nextPage () {
      if ((this.page.current * this.page.length) < this.users.length) this.page.current+=1
    }
  }
}
</script>
<style lang="css" scoped>
table {
  width: 100%;
  line-height: 1.5em;
  border-collapse: separate;
  border-spacing: 0 34px;
}

thead th{
  cursor: pointer;
}

table th {
  padding: 20px 22px;
  white-space: nowrap;
  font-size: 22px;
}

table td {
  padding: 20px;

}
.td-head{
  display: flex;
  align-items: center;
  justify-content: center;
}
td img{
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
}

table tbody tr {
  background: #d3caca;
  font-weight: 600;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.02);
  cursor: pointer;
}

table tbody tr:hover {
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
  transform: translate(0, -6px);
  transition-delay: 0s !important;
}
.button-list{
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.btn-primary{
  background: #18548b;
  border-radius: 40px;
  padding: 8px 30px;
  cursor: pointer;
  color: #f5f5f5;
}
</style>
